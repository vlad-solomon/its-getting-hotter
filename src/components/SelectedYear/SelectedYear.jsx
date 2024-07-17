import "./SelectedYear.scss";
import { useStore } from "../../stores/useStore";
import { TextCard } from "../TextCard";
import getMean from "../../utils/getMean";
import getHighOrLow from "../../utils/getHighOrLow";
import { TemperatureSlice } from "../TemperatureSlice";

export function SelectedYear() {
	const { year, temperatures } = useStore((state) => state.selectedYear);
	const setSelectedYear = useStore((state) => state.setSelectedYear);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const blurb = `
        The temperatures ranged from
        a low of ${temperatures[getHighOrLow("low", temperatures)]}°C
        in ${months[getHighOrLow("low", temperatures)]} 
        to a high of ${temperatures[getHighOrLow("high", temperatures)]}°C
        in ${months[getHighOrLow("high", temperatures)]}.
        The average temperature for the year was ${getMean(temperatures).toFixed(1)}°C`;

	return (
		<div className="selected-year">
			{temperatures.map((month, index) => (
				<TemperatureSlice key={`${year}-${months[index]}`} temperature={month} tooltipContent={months[index]} tooltipOffset={[0, -5]} tooltipPlacement="bottom-end">
					<span>{month.toFixed(1)}°C</span>
				</TemperatureSlice>
			))}
			<TextCard header={year} blurb={blurb}>
				<button onClick={() => setSelectedYear(null)}>close</button>
			</TextCard>
		</div>
	);
}
