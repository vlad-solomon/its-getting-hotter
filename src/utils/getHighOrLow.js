export default function (type, array) {
	const sign = type === "high" ? ">" : "<";
	let index = 0;
	let value = array[0];

	for (let i = 1; i < array.length; i++) {
		if (eval(`${array[i]} ${sign} ${value}`)) {
			value = array[i];
			index = i;
		}
	}
	return index;
}
