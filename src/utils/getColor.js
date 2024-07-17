const colors = {
	13.1: "00876c",
	13.8: "50a26f",
	13.9: "88bb72",
	14.025: "c1d379",
	14.2: "fde987",
	14.4: "fac067",
	14.6: "f49654",
	14.8: "e86b4e",
	15.1: "d43d51",
};

export default function (value) {
	let nearestKey;
	for (let key in colors) {
		if (key <= value) {
			nearestKey = key;
		}
	}
	return `#${colors[nearestKey]}`;
}
