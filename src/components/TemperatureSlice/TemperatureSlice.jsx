import "./TemperatureSlice.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import getColor from "../../utils/getColor";

export function TemperatureSlice({ temperature, tooltipContent, tooltipPlacement, tooltipOffset, onClick, children }) {
	return (
		<Tippy theme="default" content={tooltipContent} placement={tooltipPlacement} offset={tooltipOffset} animation={false}>
			<div className="temperature-slice" style={{ backgroundColor: getColor(temperature) }} onClick={onClick}>
				{children}
			</div>
		</Tippy>
	);
}
