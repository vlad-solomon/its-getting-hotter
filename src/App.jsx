import "./App.scss";
import { Grid } from "./components/Grid/Grid";
import { SelectedYear } from "./components/SelectedYear";
import { TextCard } from "./components/TextCard";
import { useStore } from "./stores/useStore";

export default function App() {
	const selectedYear = useStore((state) => state.selectedYear);

	return (
		<>
			<Grid />
			<TextCard header="It’s getting hotter" blurb="Year by year statistics about the average global temperature spanning more than 100 years" />
			{selectedYear && <SelectedYear />}
		</>
	);
}
