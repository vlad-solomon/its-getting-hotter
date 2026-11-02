import { HEADERS, TRIMMED_HEADERS } from "./constants.js";

export function parseCsv(text) {
    return text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
            const values = line.split(",");
            const row = Object.fromEntries(
                HEADERS.map((key, i) => [key, values[i]])
            );

            const trimmed = {};
            for (const key of TRIMMED_HEADERS) {
                const value = row[key];
                trimmed[key] =
                    key === "Year"
                        ? parseInt(value)
                        : value == null || value === "***"
                        ? null
                        : parseFloat(value) / 100;
            }
            return trimmed;
        });
}
