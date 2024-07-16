import "./Grid.scss";
import data from "./data.json";
import getColor from "../../utils/getColor";
import getMean from "../../utils/getMean";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export function Grid() {
	return (
		<div className="grid">
			{data.map(({ id, year, temperatures }) => (
				<Tippy key={id} content={year} placement="right" theme="default" animation={false}>
					<div className="mock-square" style={{ backgroundColor: getColor(getMean(temperatures)) }}></div>
				</Tippy>
			))}
		</div>
	);
}
