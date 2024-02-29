import {matMul, transpose, add, invert, subtract as sub, identity as getIdentity} from 'simple-linalg';
import State from './state';
import checkMatrix from './utils/check-matrix';
import type { CoreConfig, DynamicConfig, ObservationConfig, PredictedCallback, PreviousCorrectedCallback, WinstonLogger } from './types/ObservationConfig';

const defaultLogger: WinstonLogger = {
	info: (...args) => console.log(...args),
	debug() {},
	warn: (...args) => console.log(...args),
	error: (...args) => console.log(...args),
};

export default class CoreKalmanFilter {
	dynamic: DynamicConfig;
	observation: ObservationConfig;
	logger: WinstonLogger;

	constructor(options: CoreConfig) {
		const {dynamic, observation, logger = defaultLogger} = options;
		this.dynamic = dynamic;
		this.observation = observation;
		this.logger = logger;
	}

	getValue(fn: number[][] | PreviousCorrectedCallback | PredictedCallback, options: any) {
		return (typeof (fn) === 'function' ? fn(options) : fn);
	}

	getInitState(): State {
		const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;

		const initState = new State({
			mean: meanInit,
			covariance: covarianceInit,
			index: indexInit,
		});
		State.check(initState, {title: 'dynamic.init'});
		return initState;
	}

	/**
	This will return the predicted covariance of a given previousCorrected State, this will help us to build the asymptoticState.
	* @param {State} previousCorrected
	* @returns{Array.<Array.<Number>>}
	*/

	getPredictedCovariance(options: {previousCorrected?: any, index?: number} = {}) {
		let {previousCorrected, index} = options;
		previousCorrected = previousCorrected || this.getInitState();

		const getValueOptions = Object.assign({}, {previousCorrected, index}, options);
		const transition = this.getValue(this.dynamic.transition, getValueOptions);

		checkMatrix(transition, [this.dynamic.dimension, this.dynamic.dimension], 'dynamic.transition');

		const transitionTransposed = transpose(transition);
		const covarianceInter = matMul(transition, previousCorrected.covariance);
		const covariancePrevious = matMul(covarianceInter, transitionTransposed);
		const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);

		const covariance = add(
			dynCov,
			covariancePrevious,
		);
		checkMatrix(covariance, [this.dynamic.dimension, this.dynamic.dimension], 'predicted.covariance');

		return covariance;
	}

	predictMean(o) {
		const mean = this.predictMeanWithoutControl(o);
		if (!this.dynamic.constant) {
			return mean;
		}

		const {opts} = o;
		const control = this.dynamic.constant(opts);
		checkMatrix(control, [this.dynamic.dimension, 1], 'dynamic.constant');
		return add(mean, control);
	}

	predictMeanWithoutControl({opts, transition}) {
		if (this.dynamic.fn) {
			return this.dynamic.fn(opts);
		}

		const {previousCorrected} = opts;
		return matMul(transition, previousCorrected.mean);
	}
	/**
	This will return the new prediction, relatively to the dynamic model chosen
	* @param {State} previousCorrected State relative to our dynamic model
	* @returns{State} predicted State
	*/

	predict(options: {previousCorrected?: State, index?: number, observation?: number[][]} = {}) {
		let {previousCorrected, index} = options;
		previousCorrected = previousCorrected || this.getInitState();

		if (typeof (index) !== 'number' && typeof (previousCorrected.index) === 'number') {
			index = previousCorrected.index + 1;
		}

		State.check(previousCorrected, {dimension: this.dynamic.dimension});
		const getValueOptions = Object.assign({}, options, {
			previousCorrected,
			index,
		});

		const transition = this.getValue(this.dynamic.transition, getValueOptions);

		const mean = this.predictMean({transition, opts: getValueOptions});

		const covariance = this.getPredictedCovariance(getValueOptions);

		const predicted = new State({mean, covariance, index});
		this.logger.debug('Prediction done', predicted);
		if (Number.isNaN(predicted.mean[0][0])) {
			throw (new TypeError('nan'));
		}

		return predicted;
	}
	/**
	* This will return the new correction, taking into account the prediction made
	* and the observation of the sensor
	* @param {State} predicted the previous State
	* @returns{Array<Array>} kalmanGain
	*/
	getGain(options: {predicted: State, stateProjection?: number[][]}) {
		let {predicted, stateProjection} = options;
		const getValueOptions = Object.assign({}, {index: predicted.index}, options);
		stateProjection = stateProjection || this.getValue(this.observation.stateProjection, getValueOptions);
		const obsCovariance = this.getValue(this.observation.covariance, getValueOptions);
		checkMatrix(obsCovariance, [this.observation.dimension, this.observation.dimension], 'observation.covariance');
		const stateProjTransposed = transpose(stateProjection);

		checkMatrix(stateProjection, [this.observation.dimension, this.dynamic.dimension], 'observation.stateProjection');

		const noiselessInnovation = matMul(
			matMul(stateProjection, predicted.covariance),
			stateProjTransposed,
		);

		const innovationCovariance = add(noiselessInnovation, obsCovariance);

		const optimalKalmanGain = matMul(
			matMul(predicted.covariance, stateProjTransposed),
			invert(innovationCovariance),
		);

		return optimalKalmanGain;
	}

	/**
	This will return the corrected covariance of a given predicted State, this will help us to build the asymptoticState.
	* @param {State} predicted the previous State
	* @returns{Array.<Array.<Number>>}
	*/

	getCorrectedCovariance(options: {predicted: State, optimalKalmanGain?: any, stateProjection?: any}) {
		let {predicted, optimalKalmanGain, stateProjection} = options;
		const identity = getIdentity(predicted.covariance.length);
		if (!stateProjection) {
			const getValueOptions = Object.assign({}, {index: predicted.index}, options);
			stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
		}

		if (!optimalKalmanGain) {
			optimalKalmanGain = this.getGain(Object.assign({stateProjection}, options));
		}

		return matMul(
			sub(identity, matMul(optimalKalmanGain, stateProjection)),
			predicted.covariance,
		);
	}

	getPredictedObservation(args: {opts: any, stateProjection: any}) {
		const {opts, stateProjection} = args;
		if (this.observation.fn) {
			return this.observation.fn(opts);
		}

		const {predicted} = opts;
		return matMul(stateProjection, predicted.mean);
	}

	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @param {Array} observation the observation of the sensor
	* @returns{State} corrected State of the Kalman Filter
	*/

	correct(options: {predicted: any, observation: any}) {
		const {predicted, observation} = options;
		State.check(predicted, {dimension: this.dynamic.dimension});
		if (!observation) {
			throw (new Error('no measure available'));
		}

		const getValueOptions = Object.assign({}, {observation, predicted, index: predicted.index}, options);
		const stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);

		const optimalKalmanGain = this.getGain(Object.assign({predicted, stateProjection}, options));

		const innovation = sub(
			observation,
			this.getPredictedObservation({stateProjection, opts: getValueOptions}),
		);

		const mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation),
		);
		if (Number.isNaN(mean[0][0])) {
			console.log({optimalKalmanGain, innovation, predicted});
			throw (new TypeError('Mean is NaN after correction'));
		}

		const covariance = this.getCorrectedCovariance(Object.assign({predicted, optimalKalmanGain, stateProjection}, options));
		const corrected = new State({mean, covariance, index: predicted.index});
		this.logger.debug('Correction done', corrected);
		return corrected;
	}
}
