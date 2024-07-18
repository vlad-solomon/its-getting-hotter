import "./Year.scss";
import { useParams } from "react-router-dom";
import { TextCard } from "../../components/TextCard";
import { TemperatureSlice } from "../../components/TemperatureSlice";
import { useStore } from "../../stores/useStore";
import getMean from "../../utils/getMean";
import getHighOrLow from "../../utils/getHighOrLow";
import { useEffect } from "react";

export default function Year() {
	const { year } = useParams();
	const data = useStore((state) => state.data);
	const { temperatures } = data.find((yearObject) => yearObject.year == year);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const header = year == 2024 ? `2024, so far...` : year;
	const blurb = `
        The temperatures ranged from
        a low of ${temperatures[getHighOrLow("low", temperatures)]}°C
        in ${months[getHighOrLow("low", temperatures)]} 
        to a high of ${temperatures[getHighOrLow("high", temperatures)]}°C
        in ${months[getHighOrLow("high", temperatures)]}.
        The average temperature for the year ${year == 2024 ? "so far is" : "was"} ${getMean(temperatures).toFixed(1)}°C`;

	//todo handle non existing params

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
