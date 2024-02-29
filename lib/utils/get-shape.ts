export default function getShape(matrix: unknown): number[] {
	if (!Array.isArray(matrix)) {
		return [];
	}
	return [matrix.length].concat(getShape(matrix[0]));
}
