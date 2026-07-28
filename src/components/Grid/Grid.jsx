import "./Grid.scss";
import getMean from "../../utils/getMean";
import { TemperatureSlice } from "../TemperatureSlice";
import { Link } from "react-router-dom";
import { useData } from "../../context/useData";

export function Grid() {
	const data = useData();

	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<Link to={`/${year}`} key={id}>
					<TemperatureSlice temperature={getMean(temperatures)}>
						<span>{year}</span>
					</TemperatureSlice>
				</Link>
			))}
		</div>
	);
}
