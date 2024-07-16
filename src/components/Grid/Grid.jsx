import "./Grid.scss";
import data from "./data.json";
import getMean from "../../utils/getMean";
import "tippy.js/dist/tippy.css";
import { TemperatureSlice } from "../TemperatureSlice/TemperatureSlice";

export function Grid() {
	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<TemperatureSlice key={id} temperature={getMean(temperatures)} tooltipContent={year} tooltipPlacement="right" />
			))}
		</div>
	);
}
