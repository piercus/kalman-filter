(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const matMul = require('../lib/linalgebra/mat-mul.js');
const transpose = require('../lib/linalgebra/transpose.js');
const add = require('../lib/linalgebra/add.js');
const invert = require('../lib/linalgebra/invert.js');
const sub = require('../lib/linalgebra/sub.js');
const getIdentity = require('../lib/linalgebra/identity.js');
const State = require('./state.js');

/**
* @callback ObservationCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {Number} opts.previousCorrected
*/

/**
* @typedef {Object} ObservationConfig
* @property {Number} dimension
* @property {Array.Array.<Number>> | ObservationCallback} stateProjection,
* @property {Array.Array.<Number>> | ObservationCallback} covariance
*/

/**
* @callback DynamicCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {State} opts.predicted
* @param {Observation} opts.observation
*/

/**
* @typedef {Object} DynamicConfig
* @property {Number} dimension
* @property {Array.Array.<Number>> | DynamicCallback} transition,
* @property {Array.Array.<Number>> | DynamicCallback} covariance
*/

/**
* @class
* @property {DynamicConfig} dynamic the system's dynamic model
* @property {ObservationConfig} observation the system's observation model
*/
class CoreKalmanFilter {
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation the system's observation model
	*/

	constructor({dynamic, observation}) {
		this.dynamic = dynamic;
		this.observation = observation;
	}

	getValue(fn, options) {
		return (typeof (fn) === 'function' ? fn(options) : fn);
	}

	/**
	This will return the new prediction, relatively to the dynamic model chosen
	* @param {State} previousCorrected State relative to our dynamic model
	* @returns{State} predicted State
	*/

	predict({previousCorrected} = {}) {
		const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;
		const initState = new State({
			mean: meanInit,
			covariance: covarianceInit,
			index: indexInit});
		previousCorrected = previousCorrected || initState;

		State.check(previousCorrected, {dimension: this.dynamic.dimension});

		const getValueOptions = {previousCorrected, index: previousCorrected.index};
		const d = this.getValue(this.dynamic.transition, getValueOptions);
		const dTransposed = transpose(d);

		const mean = matMul(d, previousCorrected.mean);

		const covarianceInter = matMul(d, previousCorrected.covariance);
		const covariancePrevious = matMul(covarianceInter, dTransposed);
		const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);

		const covariance = add(
			dynCov,
			covariancePrevious
		);

		const index = previousCorrected.index + 1;

		const predicted = new State({mean, covariance, index});

		return predicted;
	}
	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @returns{Array<Array>} kalmanGain
	*/

	getGain({predicted, stateProjection}) {
		const getValueOptions = {predicted, index: predicted.index};
		stateProjection = stateProjection || this.getValue(this.observation.stateProjection, getValueOptions);
		const obsCovariance = this.getValue(this.observation.covariance, getValueOptions);
		const stateProjTransposed = transpose(stateProjection);

		const noiselessInnovation = matMul(
			matMul(stateProjection, predicted.covariance),
			stateProjTransposed
		);
		const innovationCovariance = add(noiselessInnovation, obsCovariance);
		const optimalKalmanGain = matMul(
			matMul(predicted.covariance, stateProjTransposed),
			invert(innovationCovariance)
		);
		return optimalKalmanGain;
	}

	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @param {Array} observation the observation of the sensor
	* @returns{State} corrected State of the Kalman Filter
	*/

	correct({predicted, observation}) {
		State.check(predicted, {dimension: this.dynamic.dimension});
		if (!observation) {
			throw (new Error('no measure available'));
		}

		const getValueOptions = {predicted, index: predicted.index};
		const identity = getIdentity(predicted.covariance.length);
		const stateProj = this.getValue(this.observation.stateProjection, getValueOptions);

		const optimalKalmanGain = this.getGain({predicted, stateProjection: stateProj});
		const innovation = sub(
			observation,
			matMul(stateProj, predicted.mean)
		);
		const mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation)
		);

		const covariance = matMul(
			sub(identity, matMul(optimalKalmanGain, stateProj)),
			predicted.covariance
		);
		const corrected = new State({mean, covariance, index: predicted.index});
		return corrected;
	}
}

module.exports = CoreKalmanFilter;

},{"../lib/linalgebra/add.js":2,"../lib/linalgebra/identity.js":4,"../lib/linalgebra/invert.js":5,"../lib/linalgebra/mat-mul.js":6,"../lib/linalgebra/sub.js":7,"../lib/linalgebra/transpose.js":8,"./state.js":9}],2:[function(require,module,exports){
const elemWise = require('./elem-wise');
/**
* Add matrixes together
* @param {...<Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
module.exports = function (...args) {
	return elemWise(args, args2 => {
		return args2.reduce((a, b) => a + b, 0);
	});
};

},{"./elem-wise":3}],3:[function(require,module,exports){
/**
* @callback elemWiseCb
* @param {Array.<Number>} arr
* @param {Number} rowId
* @param {Number} colId
*/
/**
* run a function on cell per cell for each Matrixes
* @param {<Array.<Array.<Array.<Number>>>} arrMatrixes list of matrixes
* @param {elemWiseCb} fn
* @returns {Array.<Array.<Number>>} resulting matrix
* @example
// this will do m1 + m2 + m3 + m4 on matrixes
elemWise([m1, m2, m3, m4], args2 => {
	return args2.reduce((a, b) => a + b, 0);
});
*/

module.exports = function (arrayMatrixes, fn) {
	return arrayMatrixes[0].map((row, rowId) => {
		return row.map((cell, colId) => {
			const array = arrayMatrixes.map(m => m[rowId][colId]);
			return fn(array, rowId, colId);
		});
	});
};


},{}],4:[function(require,module,exports){
module.exports = function (stateSize) {
	const identityArray = [];
	for (let i = 0; i < stateSize; i++) {
		const rowIdentity = [];
		for (let j = 0; j < stateSize; j++) {
			if (i === j) {
				rowIdentity.push(1);
			} else {
				rowIdentity.push(0);
			}
		}

		identityArray.push(rowIdentity);
	}

	return identityArray;
};

},{}],5:[function(require,module,exports){
const matrixInverse = require('matrix-inverse');

module.exports = function (m) {
	return matrixInverse(m);
};

},{"matrix-inverse":10}],6:[function(require,module,exports){
/**
* Multiply 2 matrixes together
* @param {<Array.<Array.<Number>>} m1
* @param {<Array.<Array.<Number>>} m2
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (m1, m2) {
	// Console.log({m1, m2});
	const result = [];
	for (let i = 0; i < m1.length; i++) {
		result[i] = [];
		for (let j = 0; j < m2[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}

			result[i][j] = sum;
		}
	}

	return result;
};

},{}],7:[function(require,module,exports){
const elemWise = require('./elem-wise');

module.exports = function (...args) {
	return elemWise(args, ([a, b]) => a - b);
};

},{"./elem-wise":3}],8:[function(require,module,exports){
module.exports = function (array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};

},{}],9:[function(require,module,exports){
const checkMatrix = function (matrix, shape) {
	if (matrix.reduce((a, b) => a.concat(b)).filter(a => Number.isNaN(a)).length > 0) {
		throw (new Error('Matrix should not have a NaN'));
	}

	if (shape) {
		checkShape(matrix, shape);
	}
};

const checkShape = function (matrix, shape) {
	if (matrix.length !== shape[0]) {
		throw (new Error('shape and length do not match'));
	}

	if (shape.length > 1) {
		return matrix.forEach(m => checkShape(m, shape.slice(1)));
	}
};

/**
 * @class
 * Class representing a multi dimensionnal gaussian, with his mean and his covariance
 * @property {Number} [index=0] the index of the State in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
 * @property {Array.<Array.<Number>>} covariance square matrix of size dimension
 * @property {Array.<Array<Number>>} mean column matrix of size dimension x 1
 */
class State {
	constructor({mean, covariance, index}) {
		this.mean = mean;
		this.covariance = covariance;
		this.index = index;
	}

	/**
	* Check the consistency of the State
	*/
	check() {
		this.constructor.check(this);
	}

	/**
	* Check the consistency of the State's attributes
	*/

	static check(state, {dimension = null} = {}) {
		if (!(state instanceof State)) {
			throw (new TypeError('The argument is not a state'));
		}

		const {mean, covariance} = state; // Index
		const meanDimension = mean.length;
		if (typeof (dimension) === 'number' && meanDimension !== dimension) {
			throw (new Error(`${meanDimension} and ${dimension} are not the same`));
		}

		checkMatrix(mean, [meanDimension, 1]);
		checkMatrix(covariance, [meanDimension, meanDimension]);

		// If (typeof (index) !== 'number') {
		// 	throw (new TypeError('t must be a number'));
		// }
	}
}

module.exports = State;

},{}],10:[function(require,module,exports){
var Sylvester = {}

Sylvester.Matrix = function() {}

Sylvester.Matrix.create = function(elements) {
  var M = new Sylvester.Matrix()
  return M.setElements(elements)
}

Sylvester.Matrix.I = function(n) {
  var els = [],
    i = n,
    j
  while (i--) {
    j = n
    els[i] = []
    while (j--) {
      els[i][j] = i === j ? 1 : 0
    }
  }
  return Sylvester.Matrix.create(els)
}

Sylvester.Matrix.prototype = {
  dup: function() {
    return Sylvester.Matrix.create(this.elements)
  },

  isSquare: function() {
    var cols = this.elements.length === 0 ? 0 : this.elements[0].length
    return this.elements.length === cols
  },

  toRightTriangular: function() {
    if (this.elements.length === 0) return Sylvester.Matrix.create([])
    var M = this.dup(),
      els
    var n = this.elements.length,
      i,
      j,
      np = this.elements[0].length,
      p
    for (i = 0; i < n; i++) {
      if (M.elements[i][i] === 0) {
        for (j = i + 1; j < n; j++) {
          if (M.elements[j][i] !== 0) {
            els = []
            for (p = 0; p < np; p++) {
              els.push(M.elements[i][p] + M.elements[j][p])
            }
            M.elements[i] = els
            break
          }
        }
      }
      if (M.elements[i][i] !== 0) {
        for (j = i + 1; j < n; j++) {
          var multiplier = M.elements[j][i] / M.elements[i][i]
          els = []
          for (p = 0; p < np; p++) {
            // Elements with column numbers up to an including the number of the
            // row that we're subtracting can safely be set straight to zero,
            // since that's the point of this routine and it avoids having to
            // loop over and correct rounding errors later
            els.push(
              p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier
            )
          }
          M.elements[j] = els
        }
      }
    }
    return M
  },

  determinant: function() {
    if (this.elements.length === 0) {
      return 1
    }
    if (!this.isSquare()) {
      return null
    }
    var M = this.toRightTriangular()
    var det = M.elements[0][0],
      n = M.elements.length
    for (var i = 1; i < n; i++) {
      det = det * M.elements[i][i]
    }
    return det
  },

  isSingular: function() {
    return this.isSquare() && this.determinant() === 0
  },

  augment: function(matrix) {
    if (this.elements.length === 0) {
      return this.dup()
    }
    var M = matrix.elements || matrix
    if (typeof M[0][0] === 'undefined') {
      M = Sylvester.Matrix.create(M).elements
    }
    var T = this.dup(),
      cols = T.elements[0].length
    var i = T.elements.length,
      nj = M[0].length,
      j
    if (i !== M.length) {
      return null
    }
    while (i--) {
      j = nj
      while (j--) {
        T.elements[i][cols + j] = M[i][j]
      }
    }
    return T
  },

  inverse: function() {
    if (this.elements.length === 0) {
      return null
    }
    if (!this.isSquare() || this.isSingular()) {
      return null
    }
    var n = this.elements.length,
      i = n,
      j
    var M = this.augment(Sylvester.Matrix.I(n)).toRightTriangular()
    var np = M.elements[0].length,
      p,
      els,
      divisor
    var inverse_elements = [],
      new_element
    // Sylvester.Matrix is non-singular so there will be no zeros on the
    // diagonal. Cycle through rows from last to first.
    while (i--) {
      // First, normalise diagonal elements to 1
      els = []
      inverse_elements[i] = []
      divisor = M.elements[i][i]
      for (p = 0; p < np; p++) {
        new_element = M.elements[i][p] / divisor
        els.push(new_element)
        // Shuffle off the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= n) {
          inverse_elements[i].push(new_element)
        }
      }
      M.elements[i] = els
      // Then, subtract this row from those above it to give the identity matrix
      // on the left hand side
      j = i
      while (j--) {
        els = []
        for (p = 0; p < np; p++) {
          els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i])
        }
        M.elements[j] = els
      }
    }
    return Sylvester.Matrix.create(inverse_elements)
  },

  setElements: function(els) {
    var i,
      j,
      elements = els.elements || els
    if (elements[0] && typeof elements[0][0] !== 'undefined') {
      i = elements.length
      this.elements = []
      while (i--) {
        j = elements[i].length
        this.elements[i] = []
        while (j--) {
          this.elements[i][j] = elements[i][j]
        }
      }
      return this
    }
    var n = elements.length
    this.elements = []
    for (i = 0; i < n; i++) {
      this.elements.push([elements[i]])
    }
    return this
  },
}

module.exports = function(elements) {
  return Sylvester.Matrix.create(elements).inverse().elements
}

},{}]},{},[1]);
