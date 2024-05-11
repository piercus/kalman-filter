const {buildDynamic} = require('../model-collection');

/**
* @typedef {Object.<DynamicName, DynamicConfig>} PerNameConfigs
*/
/**
* @typedef {Object} DynamicConfig
* @param {Array.<Number>} obsIndexes
* @param {Covariance} staticCovariance
*/

/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Object} main
* @param {Object.<String, DynamicConfig>} main.perName
* @param {ObservationConfig} observation
* @param {Array.<Array.<Number>>} opts.observedProjection
* @returns {DynamicConfig}
*/
module.exports = function ({perName}, observation) {
	const {observedProjection} = observation;
	const observedDynamDimension = observedProjection[0].length;

	const dynamicNames = Object.keys(perName);

	const confs = {};
	let nextDynamicDimension = observedDynamDimension;
	let nextObservedDimension = 0;
	dynamicNames.forEach(k => {
		const obsDynaIndexes = perName[k].obsDynaIndexes;
		if (typeof (perName[k].name) === 'string' && perName[k].name !== k) {
			throw (new Error(`${perName[k].name} and "${k}" should match`));
		}

		perName[k].name = k;

		const {dimension, transition, covariance, init} = buildDynamic(perName[k], observation);

		const dynamicIndexes = [];
		for (let i = 0; i < dimension; i++) {
			const isObserved = (i < obsDynaIndexes.length);
			let newIndex;
			if (isObserved) {
				newIndex = nextObservedDimension;
				if (newIndex !== obsDynaIndexes[i]) {
					throw (new Error('thsoe should match'));
				}

				nextObservedDimension++;
			} else {
				newIndex = nextDynamicDimension;
				nextDynamicDimension++;
			}

			dynamicIndexes.push(newIndex);
		}

		confs[k] = {
			dynamicIndexes,
			transition,
			dimension,
			covariance,
			init,
		};
	});

	const totalDimension = dynamicNames.map(k => confs[k].dimension).reduce((a, b) => a + b, 0);

	if (nextDynamicDimension !== totalDimension) {
		throw (new Error('miscalculation of transition'));
	}

	const init = {
		index: -1,
		mean: new Array(totalDimension),
		covariance: new Array(totalDimension).fill(0).map(() => new Array(totalDimension).fill(0)),
	};
	dynamicNames.forEach(k => {
		const {
			dynamicIndexes,
			init: localInit,
		} = confs[k];
		if (typeof (localInit) !== 'object') {
			throw new TypeError('Init is mandatory');
		}

		dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
			init.covariance[c1][c2] = localInit.covariance[i1][i2];
		}));
		dynamicIndexes.forEach((c1, i1) => {
			init.mean[c1] = localInit.mean[i1];
		});
	});
	return {
		dimension: totalDimension,
		init,
		transition(options) {
			const {previousCorrected} = options;
			const resultTransition = new Array(totalDimension).fill().map(() => new Array(totalDimension).fill(0));

			dynamicNames.forEach(k => {
				const {
					dynamicIndexes,
					transition,
				} = confs[k];

				const options2 = Object.assign({}, options, {previousCorrected: previousCorrected.subState(dynamicIndexes)});
				const trans = transition(options2);
				dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
					resultTransition[c1][c2] = trans[i1][i2];
				}));
			});
			return resultTransition;
		},
		covariance(options) {
			const {previousCorrected} = options;
			const resultCovariance = new Array(totalDimension).fill().map(() => new Array(totalDimension).fill(0));

			dynamicNames.forEach(k => {
				const {
					dynamicIndexes,
					covariance,
				} = confs[k];

				const options2 = Object.assign({}, options, {previousCorrected: previousCorrected.subState(dynamicIndexes)});

				const cov = covariance(options2);
				// Console.log('dynamic.composition',k, cov, dynamicIndexes)
				dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
					resultCovariance[c1][c2] = cov[i1][i2];
				}));
			});
			return resultCovariance;
		},
	};
};
