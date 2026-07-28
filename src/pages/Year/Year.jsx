import "./Year.scss";
import { useParams } from "react-router-dom";
import { TextCard } from "../../components/TextCard";
import { TemperatureSlice } from "../../components/TemperatureSlice";
import { useEffect } from "react";
import { useData } from "../../context/useData";
import NotFound from "../NotFound";
import getBlurb from "../../utils/getBlurb";
import months from "../../utils/months";

export default function Year() {
	const { year } = useParams();
	const data = useData();
	const selectedYearData = data.find((yearObject) => yearObject.year == year);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!selectedYearData) return <NotFound />;

	const [header, blurb] = getBlurb(selectedYearData);

	return (
		<>
			<div className="months">
				{selectedYearData.temperatures.map((temperature, index) => (
					<TemperatureSlice key={`${year}-${months[index]}`} temperature={temperature}>
						<span>{temperature}°C</span>
						<span>{months[index]}</span>
					</TemperatureSlice>
				))}
			</div>
			<TextCard header={header} blurb={blurb} />
		</>
	);
}
