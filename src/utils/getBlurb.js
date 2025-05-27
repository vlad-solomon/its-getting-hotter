import getMean from "./getMean";
import months from "./months";

export default function ({ year, temperatures }) {
	const isCurrentYear = year === new Date().getFullYear();

	const min = Math.min(...temperatures);
	const max = Math.max(...temperatures);
	const minIndex = temperatures.indexOf(min);
	const maxIndex = temperatures.indexOf(max);
	const average = getMean(temperatures).toFixed(1);

	return [
		isCurrentYear ? `${year}, so far...` : year,
		`The temperatures ${isCurrentYear ? "are ranging" : "ranged"} from a low of ${min}°C in ${months[minIndex]} to a high of ${max}°C in ${
			months[maxIndex]
		}. The average temperature for the year ${isCurrentYear ? "so far is" : "was"} ${average}°C`,
	];
}
