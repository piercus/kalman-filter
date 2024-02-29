import State from "../state";

interface Observation {
    name: string;
}

export type PreviousCorrectedCallback = (opts: {index: number, previousCorrected: number}) => number[][];
export type PredictedCallback         = (opts: {index: number, predicted: State, observation: Observation}) => number[][];

// export type PredictedCallback = (opts: {index: number, previousCorrected: number}) => number[][];

export interface WinstonLogger {
    info: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

export interface ObservationConfig {
    dimension: number;  // Observation.dimension == observation.sensorDimension * observation.nSensors
    sensorDimension?: number;
    nSensors?: number,
    fn?: PredictedCallback;
    /**
     * stateProjection the matrix to transform state to observation (for EKF, the jacobian of the fn)
     */
    stateProjection: number[][] | PreviousCorrectedCallback;
    /**
     * covariance the covariance of the observation noise
     */
    covariance: number[][] | PreviousCorrectedCallback;
}

export interface DynamicConfig {
    dimension: number;
    /**
     * a function that returns the control parameter B_k*u_k of the kalman filter
     */
    constant?: PreviousCorrectedCallback;
    /**
     * for extended kalman filter only, the non-linear state-transition model
     */
    fn?: PreviousCorrectedCallback;
    /**
     * the state-transition model (or for EKF the jacobian of the fn)
     */
    transition: number[][] | PredictedCallback;
    /**
     * covariance the covariance of the process noise
     */
    covariance: number[][] | PredictedCallback;
    /**
     * 
     */
    init: {
        mean: number[][];
        covariance: number[][];
        index?: number;
    };
}

export interface CoreConfig {
    /**
     * dynamic the system's dynamic model
     */
    dynamic: DynamicConfig;
    /**
     *  the system's observation model
     */
    observation: ObservationConfig;
    /**
     * a Winston-like logger
     */
    logger?: WinstonLogger;
}

// const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;
// 
// const initState = new State({
//     mean: meanInit,
//     covariance: covarianceInit,
//     index: indexInit,
// });
// 