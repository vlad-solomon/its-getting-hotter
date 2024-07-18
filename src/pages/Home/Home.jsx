import { Grid } from "../../components/Grid/Grid";
import { TextCard } from "../../components/TextCard";

export default function Home() {
	return (
		<>
			<Grid />
			<TextCard header="It’s getting hotter" blurb="Year by year statistics about the average global temperature spanning more than 140 years" isWrap={true} />
		</>
	);
}
