const colors = {
	13.5: "00876c",
	13.6875: "50a26f",
	13.875: "88bb72",
	14.0625: "c1d379",
	14.25: "fde987",
	14.4375: "fac067",
	14.625: "f49654",
	14.8125: "e86b4e",
	15: "d43d51",
};

// 1909

export default function (value) {
	let nearestKey;
	for (let key in colors) {
		if (key <= value) {
			nearestKey = key;
		}
	}
	return `#${colors[nearestKey]}`;
}
