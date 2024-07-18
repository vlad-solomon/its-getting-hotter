import "./TextCard.scss";
import { useState, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

export function TextCard({ header, blurb, children }) {
	const [position, setPosition] = useState(25);
	const ref = useRef();

	useEffect(() => {
		const { height } = ref.current.getBoundingClientRect();
		function handlePosition(e) {
			const { innerHeight } = window;
			const { clientY } = e;

			if (isMobile) {
				setPosition(window.scrollY ? `calc(100% - ${height}px - 25px)` : 25);
			} else {
				setPosition(clientY > innerHeight / 2 ? `calc(100% - ${height}px - 25px)` : 25);
			}
		}

		document.addEventListener("mousemove", handlePosition);
		if (isMobile) {
			window.addEventListener("scroll", handlePosition);
		}
		return () => {
			document.removeEventListener("mousedown", handlePosition);
			window.removeEventListener("scroll", handlePosition);
		};
	}, []);

	return (
		<div className="text-card" style={{ bottom: position }} ref={ref}>
			<span className="text-card__header">{header}</span>
			<p className="text-card__blurb">{blurb}</p>
			{children}
		</div>
	);
}
