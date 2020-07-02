const test = require('ava');
const h = require('hasard');
const cholesky = require('cholesky');
const matMul = require('../../lib/linalgebra/mat-mul');
const add = require('../../lib/linalgebra/add');
const getCovariance = require('../../lib/utils/get-covariance');

const buildDataFromCovariance = function (covariance) {
	const dimension = covariance.length;
	const cholTriangle = cholesky(covariance);
	const cholSquare = new Array(dimension).fill(1).map((_, row) => new Array(dimension).fill(1).map((_, col) => (cholTriangle[row][col] || 0)));

	const number = h.number({
		type: 'normal',
		mean: 0,
		std: 1
	});

	const mean = h.array({
		size: dimension,
		value: h.number({
			type: 'uniform',
			start: 0,
			end: 200
		})
	});

	const uncorrelatedRandomVector = h.array({size: dimension, value: number});

	return h.fn((m, mean) => {
		const measure = add(
			mean.map(element => [element]),
			matMul(
				cholSquare,
				m.map(element => [element])
			)
		).map(element => element[0]);

		return {
			measure,
			average: mean
		};
	})(uncorrelatedRandomVector, mean);
};

test('get-covariance should give a results that makes sense on 1000 data', t => {
	const n = 100000;
	const covariance = [[4, 12, -16], [12, 37, -43], [-16, -43, 98]];
	const random = buildDataFromCovariance(covariance);

	const values = random.run(n);

	const cov = getCovariance({
		measures: values.map(({measure}) => measure),
		averages: values.map(({average}) => average)
	});

	covariance.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			t.true(Math.abs(cov[rowIndex][colIndex] - cell) < 1);
		});
	});
});
