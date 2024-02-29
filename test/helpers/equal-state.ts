import {frobenius as distanceMat} from 'simple-linalg';
import State from '../../lib/state';

export default function equalState(state1, state2, tolerance = 1e-6) {
	if ((!(state1 instanceof State)) || (!(state2 instanceof State))) {
		throw (new TypeError('One of the args is not a State'));
	}

	return (
		(distanceMat(state1.mean, state2.mean) < tolerance)
		&& (distanceMat(state1.covariance, state2.covariance) < tolerance)
	);
};
