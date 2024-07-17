import { useParams } from "react-router-dom";
import { TextCard } from "../components/TextCard";
import { useStore } from "../stores/useStore";
import getHighOrLow from "../utils/getHighOrLow";
import getMean from "../utils/getMean";

export default function Year() {
	const { year } = useParams();
	const data = useStore((state) => state.data);
	const { temperatures } = data.find((yearObject) => yearObject.year == year);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const blurb = `
        The temperatures ranged from
        a low of ${temperatures[getHighOrLow("low", temperatures)]}°C
        in ${months[getHighOrLow("low", temperatures)]} 
        to a high of ${temperatures[getHighOrLow("high", temperatures)]}°C
        in ${months[getHighOrLow("high", temperatures)]}.
        The average temperature for the year was ${getMean(temperatures).toFixed(1)}°C`;

	return (
		<>
			<div>x</div>
			<TextCard header={year} blurb={blurb} />
		</>
	);
}
