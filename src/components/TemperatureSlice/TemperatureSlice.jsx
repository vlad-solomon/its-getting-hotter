import "./TemperatureSlice.scss";
import "tippy.js/dist/tippy.css";
import getColor from "../../utils/getColor";

export function TemperatureSlice({ temperature, onClick, children }) {
	return (
		<div className="temperature-slice" style={{ backgroundColor: getColor(temperature) }} onClick={onClick}>
			{children}
		</div>
	);
}
