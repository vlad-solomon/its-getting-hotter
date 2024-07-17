import "./TemperatureSlice.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import getColor from "../../utils/getColor";

//todo i don't really plan to scale the tooltip text with the cell no more so i don't think temperature-slice__wrapper is needed anymore (also appendTo)

export function TemperatureSlice({ temperature, tooltipContent, tooltipPlacement, tooltipOffset, onClick, children }) {
	return (
		<div className="temperature-slice__wrapper">
			<Tippy theme="default" content={tooltipContent} placement={tooltipPlacement} offset={tooltipOffset} appendTo="parent" animation={false}>
				<div className="temperature-slice" style={{ backgroundColor: getColor(temperature) }} onClick={onClick}>
					{children}
				</div>
			</Tippy>
		</div>
	);
}
