/**
* Multiply 2 matrixes together
* @param {Array.<Array.<Number>>} m1
* @param {Array.<Array.<Number>>} m2
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (m1, m2) {
	// Console.log({m1, m2});
	const result = [];
	for (let i = 0; i < m1.length; i++) {
		result[i] = [];
		for (let j = 0; j < m2[0].length; j++) {
			let sum = 0;
			let isNull = false;
			for (let k = 0; k < m1[0].length; k++) {
				if ((m1[i][k] === null && m2[k][j] !== 0) || (m2[k][j] === null && m1[i][k] !== 0)) {
					isNull = true;
				}

				sum += m1[i][k] * m2[k][j];
			}

			result[i][j] = isNull ? null : sum;
		}
	}

	return result;
};
