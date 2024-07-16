import "./Grid.scss";
import data from "./data.json";

export function Grid() {
	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<div key={id} className="mock-square">
					{year}
				</div>
			))}
		</div>
	);
}
