import "./Grid.scss";
import data from "./data.json";
import getColor from "../../utils/getColor";
import getMean from "../../utils/getMean";

export function Grid() {
	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<div key={id} className="mock-square" style={{ backgroundColor: getColor(getMean(temperatures)) }}></div>
			))}
		</div>
	);
}
