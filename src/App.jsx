import "./App.scss";
import { Grid } from "./components/Grid/Grid";
import { TextCard } from "./components/TextCard";

export default function App() {
	return (
		<>
			<Grid />
			<TextCard header="It's Getting Hotter" blurb="Year by year statistics about the average global temperature spanning more than 100 years" />
		</>
	);
}
