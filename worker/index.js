import {
    NASA_DATA_URL,
    BASELINE_TEMP,
    OWNER,
    REPO,
    FILE_PATH,
    BASE_BRANCH,
    TRIMMED_HEADERS,
} from "./utils/constants.js";
import { parseCsv } from "./utils/parseCsv.js";

const GITHUB_API = "https://api.github.com";

class GitHubError extends Error {
    constructor(status, message) {
        super(`GitHub ${status}: ${message}`);
        this.status = status;
    }
}

function github(token) {
    return async (method, path, body) => {
        const res = await fetch(`${GITHUB_API}${path}`, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "its-getting-hotter-automation",
                ...(body && { "Content-Type": "application/json" }),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            throw new GitHubError(res.status, await res.text());
        }
        return res.json();
    };
}

function decodeBase64(b64) {
    const bin = atob(b64.replace(/\n/g, ""));
    return new TextDecoder().decode(
        Uint8Array.from(bin, (c) => c.charCodeAt(0))
    );
}

function encodeBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
}

async function fetchData(retries = 20, delay = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(NASA_DATA_URL, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Cloudflare Worker fetch)",
                },
                signal: AbortSignal.timeout(30_000),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - ${res.statusText}`);
            }

            const raw = await res.text();

            return raw
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => /^\d{4}/.test(line))
                .map((line) => line.replace(/\s+/g, ","))
                .join("\n");
        } catch (err) {
            console.error(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt < retries) {
                await new Promise((res) => setTimeout(res, delay));
            } else {
                console.error("Max retries reached. Giving up.");
                return "";
            }
        }
    }
}

function getTemperature(data, now) {
    const parsed = parseCsv(data);

    const target = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)
    );
    const targetYear = target.getUTCFullYear();
    const targetMonthIndex = target.getUTCMonth();

    const row = parsed.find((entry) => entry.Year === targetYear);
    if (!row) return null;

    const anomaly = row[TRIMMED_HEADERS[targetMonthIndex + 1]];
    if (anomaly == null) return null;

    const actual = anomaly + BASELINE_TEMP;

    // Validate the temperature is a valid number
    if (!Number.isFinite(actual)) {
        console.error(`Invalid temperature value: ${actual}`);
        return null;
    }

    const temperature = Number.isInteger(actual)
        ? actual
        : Number(actual.toFixed(1));

    return { temperature, year: targetYear, monthIndex: targetMonthIndex };
}

function formatData(data) {
    return (
        "[\n" +
        data
            .map(
                (entry) =>
                    `\t{\n` +
                    `\t\t"id": ${entry.id},\n` +
                    `\t\t"year": ${entry.year},\n` +
                    `\t\t"temperatures": [${entry.temperatures.join(", ")}]
\t}`
            )
            .join(",\n") +
        "\n]"
    );
}

async function findAvailableBranchName(gh, baseBranchName) {
    let branchName = baseBranchName;
    let tryNumber = 2;

    for (;;) {
        try {
            await gh("GET", `/repos/${OWNER}/${REPO}/git/ref/heads/${branchName}`);
            // Branch exists, try next number
            branchName = `${baseBranchName}-try${tryNumber}`;
            tryNumber++;
        } catch (error) {
            if (error.status === 404) {
                // Branch doesn't exist, we can use this name
                return branchName;
            }
            throw error;
        }
    }
}

async function updateGitHub(gh, temperature, year, monthIndex) {
    const paddedMonth = String(monthIndex + 1).padStart(2, "0");
    const baseBranchName = `update-${year}-${paddedMonth}`;

    const fileData = await gh(
        "GET",
        `/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BASE_BRANCH}`
    );

    const data = JSON.parse(decodeBase64(fileData.content));

    const yearEntry = data.find((entry) => entry.year === year);
    if (yearEntry) {
        yearEntry.temperatures[monthIndex] = temperature;
    } else {
        data.push({
            id: data.length,
            year,
            temperatures: Array.from({ length: monthIndex + 1 }, (_, i) =>
                i === monthIndex ? temperature : 0
            ),
        });
    }

    const refData = await gh(
        "GET",
        `/repos/${OWNER}/${REPO}/git/ref/heads/${BASE_BRANCH}`
    );

    const branchName = await findAvailableBranchName(gh, baseBranchName);

    await gh("POST", `/repos/${OWNER}/${REPO}/git/refs`, {
        ref: `refs/heads/${branchName}`,
        sha: refData.object.sha,
    });

    await gh("PUT", `/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
        message: `Update temperature for ${year}-${paddedMonth}`,
        content: encodeBase64(formatData(data)),
        branch: branchName,
        sha: fileData.sha,
    });

    console.log(`Branch '${branchName}' pushed with updated data.json`);

    await gh("POST", `/repos/${OWNER}/${REPO}/pulls`, {
        title: `Update temperature for ${year}-${paddedMonth}`,
        head: branchName,
        base: BASE_BRANCH,
        body: `This PR adds the recorded temperature for ${year}-${paddedMonth}.`,
    });
}

async function go(env, now) {
    const data = await fetchData();
    if (!data) {
        throw new Error("Failed to fetch data from NASA.");
    }

    const result = getTemperature(data, now);

    if (result == null) {
        console.log(
            "No valid temperature data for the previous month. Exiting without creating PR."
        );
        return;
    }

    const { temperature, year, monthIndex } = result;
    console.log(`Valid temperature found: ${temperature}`);
    await updateGitHub(github(env.GITHUB_TOKEN), temperature, year, monthIndex);
}

export default {
    // Static site is served from ./dist by the assets binding
    async fetch(request, env) {
        return env.ASSETS.fetch(request);
    },

    async scheduled(controller, env) {
        await go(env, new Date(controller.scheduledTime));
    },
};
