import "./TextCard.scss";

export function TextCard({ header = "header", blurb = "blurb", children }) {
	return (
		<div className="text-card">
			<span className="text-card__header">{header}</span>
			<p className="text-card__blurb">{blurb}</p>
			{children}
		</div>
	);
}
