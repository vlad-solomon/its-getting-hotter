import "./TemperatureSlice.scss";
import getColor from "../../utils/getColor";

export function TemperatureSlice({ temperature, onClick, children }) {
	return (
		<div className="temperature-slice" style={{ backgroundColor: getColor(temperature), rotate: `${Math.random() * 2 - 1}deg` }} onClick={onClick}>
			{children}
		</div>
	);
}
