import "./Grid.scss";
import data from "./data.json";
import getMean from "../../utils/getMean";
import "tippy.js/dist/tippy.css";
import { TemperatureSlice } from "../TemperatureSlice";
import { useStore } from "../../stores/useStore";

export function Grid() {
	const setSelectedYear = useStore((state) => state.setSelectedYear);

	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<TemperatureSlice key={id} temperature={getMean(temperatures)} onClick={() => setSelectedYear({ id, year, temperatures })}>
					<span>{year}</span>
				</TemperatureSlice>
			))}
		</div>
	);
}
