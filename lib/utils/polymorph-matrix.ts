import {diag} from 'simple-linalg';
import checkMatrix from './check-matrix';
import TypeAssert from '../types/TypeAssert';
import {PreviousCorrectedCallback} from '../types/ObservationConfig';

/**
* If cov is a number, result will be Identity*cov
* If cov is an Number[], result will be diag(cov)
* If cov is an Number[][], result will be cov
*/
export default function polymorphMatrix(cov: number | number[] | number[][] | PreviousCorrectedCallback, opts: {dimension?: number, title?: string} = {}): number[][] | PreviousCorrectedCallback | undefined {
	const {dimension, title = 'polymorph'} = opts;
	//if (!cov) {
	//	return undefined;
	//}
	if (typeof (cov) === 'number' || Array.isArray(cov)) {
		if (typeof (cov) === 'number' && typeof (dimension) === 'number') {
			return diag(new Array(dimension).fill(cov));
		}

		if (TypeAssert.isArray2D(cov)) {
			let shape: [number, number];
			if (typeof (dimension) === 'number') {
				shape = [dimension, dimension];
			}
			checkMatrix(cov, shape, title);
			return cov;
		}

		if (TypeAssert.isArray1D(cov)) {
			return diag(cov);
		}
	}
	// throw new Error('Invalid input type in polymorphMatrix get ' + JSON.stringify(cov).slice(0, 100));
	return cov as number[][] | PreviousCorrectedCallback | undefined;
}
