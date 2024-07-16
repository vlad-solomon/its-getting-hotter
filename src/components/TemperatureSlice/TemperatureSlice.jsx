import "./TemperatureSlice.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import getColor from "../../utils/getColor";

export function TemperatureSlice({ temperature, tooltipContent, tooltipPlacement }) {
	return (
		<div className="temperature-slice__wrapper">
			<Tippy theme="default" content={tooltipContent} placement={tooltipPlacement} appendTo="parent" animation={false}>
				<div className="temperature-slice" style={{ backgroundColor: getColor(temperature) }}></div>
			</Tippy>
		</div>
	);
}
