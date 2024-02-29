export default function uniq(array) {
	return array.filter((value, index) =>
		array.indexOf(value) === index,
	);
}
