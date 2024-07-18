import { useParams } from "react-router-dom";
import { TextCard } from "../components/TextCard";
import { useStore } from "../stores/useStore";
import { TemperatureSlice } from "../components/TemperatureSlice";
import getHighOrLow from "../utils/getHighOrLow";
import getMean from "../utils/getMean";

export default function Year() {
	const { year } = useParams();
	const data = useStore((state) => state.data);
	const { temperatures } = data.find((yearObject) => yearObject.year == year);

	//todo handle non existing params

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const header = year == 2024 ? `2024, so far...` : year;
	const blurb = `
        The temperatures ranged from
        a low of ${temperatures[getHighOrLow("low", temperatures)]}°C
        in ${months[getHighOrLow("low", temperatures)]} 
        to a high of ${temperatures[getHighOrLow("high", temperatures)]}°C
        in ${months[getHighOrLow("high", temperatures)]}.
        The average temperature for the year ${year == 2024 ? "so far is" : "was"} ${getMean(temperatures).toFixed(1)}°C`;

	return (
		<>
			<div className="months">
				{temperatures.map((temperature, index) => (
					<TemperatureSlice key={`${year}-${months[index]}`} temperature={temperature}>
						<span>{temperature}°C</span>
						<span>{months[index]}</span>
					</TemperatureSlice>
				))}
			</div>
			<TextCard {...{ header, blurb }} />
		</>
	);
}
