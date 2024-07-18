import "./NotFound.scss";
import { TemperatureSlice } from "../../components/TemperatureSlice";
import { TextCard } from "../../components/TextCard";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="not-found">
			<TemperatureSlice>?</TemperatureSlice>
			<Link to="/">
				<TextCard
					header="It’s getting wronger"
					blurb="It seems the page you are looking for either does not exist or has been moved. Click me to go back home!"
					isWrap={true}
					isMovable={false}
				/>
			</Link>
		</div>
	);
}
