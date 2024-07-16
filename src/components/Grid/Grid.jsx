import "./Grid.scss";
import data from "./data.json";
import getColor from "../../utils/getColor";

export function Grid() {
	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<div key={id} className="mock-square" style={{ backgroundColor: getColor(temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length) }}></div>
			))}
		</div>
	);
}
