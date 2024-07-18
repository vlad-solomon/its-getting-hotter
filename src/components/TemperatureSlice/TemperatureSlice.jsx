import "./TemperatureSlice.scss";
import getColor from "../../utils/getColor";

export function TemperatureSlice({ temperature, onClick, children }) {
	return (
		<div
			className="temperature-slice"
			style={{ backgroundColor: getColor(temperature), rotate: `${Math.random() * 2 - 1}deg`, filter: `brightness(${Math.random() * (1.05 - 0.95) + 0.95})` }}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
