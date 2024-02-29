var kalmanFilter;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acos.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acos.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse cosine function of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse sine function
 */
function acos(num) {
  return this.subtract(new this(Math.PI / 2), this.asin(num));
}

module.exports = acos;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acot.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acot.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse cotangent function of given complex number
 * The domain is C / { i, -i, 0 }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse cotangent function
 */
function acot(num) {
  return this.atan(this.inverse(num));
}

module.exports = acot;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acsc.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acsc.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse cosecant function of given complex number
 * The domain is C / { 0 }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse cosecant function
 */
function acsc(num) {
  return this.asin(this.inverse(num));
}

module.exports = acsc;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/add.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/add.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Returns the sum of two complex numbers
 * @param { Complex } num1 - Complex number on the left of '+' sign
 * @param { Complex } num2 - Complex number on the right of '+' sign
 * @return { Complex } - Sum of two numbers
 */
function add(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  return new this(num1.re + num2.re, num1.im + num2.im);
}

module.exports = add;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/asec.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/asec.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse secant function of given complex number
 * The domain is C / { 0 }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse secant function
 */
function asec(num) {
  return this.acos(this.inverse(num));
}

module.exports = asec;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/asin.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/asin.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse sine function of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse sine function
 */
function asin(num) {
  return this.multiply(new this(0, -1), this.log(this.add(this.multiply(new this(0, 1), num), this.pow(this.subtract(this.ONE, this.pow(num, 2)), 0.5))));
}

module.exports = asin;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/atan.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/atan.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse tangent function of given complex number
 * The domain is C / { i, -i }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse tangent function
 */
function atan(num) {
  return this.multiply(new this(0, 1 / 2), this.subtract(this.log(this.subtract(this.ONE, this.multiply(new this(0, 1), num))), this.log(this.add(this.ONE, this.multiply(new this(0, 1), num)))));
}

module.exports = atan;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/conjugate.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/conjugate.js ***!
  \**********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the complex conjugate of given complex number
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the complex conjugate
 */
function conjugate(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  return new this(num.getReal(), num.getImaginary() * -1);
}

module.exports = conjugate;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/cos.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/cos.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the cosine of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex cosine function
 */
function cos(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var a = num.getReal();
  var b = num.getImaginary();
  return new this(Math.cos(a) * Math.cosh(b), Math.sin(a) * Math.sinh(b) * -1);
}

module.exports = cos;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/cot.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/cot.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the cotangent of given complex number
 * The domain is C / { k * PI / 2 : k is any integer }
 * Note that cot(PI / 2) should gives NaN instead of 0
 * because we won't introduce the concept of Infinity in this class
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex cotangent function
 */
function cot(num) {
  return this.divide(this.ONE, this.tan(num));
}

module.exports = cot;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/csc.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/csc.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the cosecant of given complex number
 * The domain is C / { k * PI : k is any integer }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex cosecant function
 */
function csc(num) {
  return this.divide(this.ONE, this.sin(num));
}

module.exports = csc;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/divide.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/divide.js ***!
  \*******************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Returns the quotient of two complex numbers.
 * If the denominator is considered as 0,
 * return NaN instead of Infinity
 * @param { Complex } num1 - Complex number on the left of '/' sign
 * @param { Complex } num2 - Complex number on the right of '/' sign
 * @return { Complex } - Quotient of two numbers
 */
function divide(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  var a = num1.re;
  var b = num1.im;
  var c = num2.re;
  var d = num2.im;

  if (Math.abs(c) < this.EPSILON && Math.abs(d) < this.EPSILON) {
    return this.NaN;
  }

  var denominator = Math.pow(c, 2) + Math.pow(d, 2);
  return new this((a * c + b * d) / denominator, (b * c - a * d) / denominator);
}

module.exports = divide;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/exp.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/exp.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the exponential function with base E
 * @param { Complex } num - Exponent
 * @return { Complex } - Return the e to the power of num
 */
function exp(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var re = num.getReal();
  var theta = num.getImaginary();
  var r = Math.exp(re);
  return new this(r * Math.cos(theta), r * Math.sin(theta));
}

module.exports = exp;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getArgument.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getArgument.js ***!
  \************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Note that the argument is restricted to the interval [ 0, 2 * PI )
 * If the given number is considered as 0, return undefined
 * @return { Number } - Return the argument of given complex number
 */
function getArgument() {
  var x = this.re;
  var y = this.im;
  var epsilon = 1 / (Math.pow(10, 15) * 2);

  if (Math.abs(x) < epsilon && Math.abs(y) < epsilon) {
    return undefined;
  }

  if (x === 0) {
    if (y > 0) {
      return Math.PI * 0.5;
    }

    return Math.PI * 1.5;
  }

  if (y === 0) {
    if (x > 0) {
      return 0;
    }

    return Math.PI;
  }

  if (x > 0 && y > 0) {
    return Math.atan(y / x);
  }

  if (x < 0 && y > 0) {
    return Math.PI - Math.atan(y / (x * -1));
  }

  if (x < 0 && y < 0) {
    return Math.PI + Math.atan(y * -1 / (x * -1));
  }

  return Math.PI * 2 - Math.atan(y * -1 / x);
}

module.exports = getArgument;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getImaginary.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getImaginary.js ***!
  \*************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * @return { Number } - Return the imaginary part of given complex number
 */
function getImaginary() {
  return this.im;
}

module.exports = getImaginary;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getModulus.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getModulus.js ***!
  \***********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * @return { Number } - Return the modulus (length) of given complex number
 */
function getModulus() {
  return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2));
}

module.exports = getModulus;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getReal.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getReal.js ***!
  \********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * @return { Number } - Return the real part of given complex number
 */
function getReal() {
  return this.re;
}

module.exports = getReal;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/inverse.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/inverse.js ***!
  \********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the inverse of given complex number, i.e. 1/z
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the inverse
 */
function inverse(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  return this.divide(this.ONE, num);
}

module.exports = inverse;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/isEqual.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/isEqual.js ***!
  \********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determine whether two complex numbers are considered as identical.
 * Either both are NaN or both real and imaginary parts are extremely closed.
 * @param { Complex } num1 - Complex number
 * @param { Complex } num2 - Complex number
 * @param { Integer } digit - Number of significant digits
 * @return { Boolean } - Return true if two complex numbers are considered as identical
 */
function isEqual(num1, num2) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return false;
  }

  if (!Number.isInteger(digit) || digit < 0) {
    throw new Error('Invalid argument: Expected a non-negative integer digit');
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var a = num1.getReal();
  var b = num1.getImaginary();
  var c = num2.getReal();
  var d = num2.getImaginary();

  if (Number.isNaN(a) && Number.isNaN(b) && Number.isNaN(c) && Number.isNaN(d)) {
    return true;
  }

  return Math.abs(a - c) < EPSILON && Math.abs(b - d) < EPSILON;
}

module.exports = isEqual;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/isNaN.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/isNaN.js ***!
  \******************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determine whether the given complex number is NaN or not
 * @param { Complex } num - Complex number
 * @return { Boolean } - Return true if one of real and imaginary part are NaN
 */
function isNaN(num) {
  if (!(num instanceof this)) {
    return false;
  }

  var re = num.getReal();
  var im = num.getImaginary();

  if (Number.isNaN(re) || Number.isNaN(im)) {
    return true;
  }

  return false;
}

module.exports = isNaN;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/log.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/log.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the natural log of given complex number
 * Note that complex log is a multivalued function,
 * But this function only provides the principal value by
 * restricting the imaginary part to the interval [0, 2 * Pi).
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result after taking natural log
 */
function log(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var r = num.getModulus();
  var theta = num.getArgument();

  if (r < this.EPSILON || theta === undefined) {
    return this.NaN;
  }

  return new this(Math.log(r), theta);
}

module.exports = log;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/multiply.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/multiply.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Returns the product of two complex numbers
 * @param { Complex } num1 - Complex number on the left of 'x' sign
 * @param { Complex } num2 - Complex number on the right of 'x' sign
 * @return { Complex } - Product of two numbers
 */
function multiply(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  var a = num1.re;
  var b = num1.im;
  var c = num2.re;
  var d = num2.im;
  return new this(a * c - b * d, a * d + b * c);
}

module.exports = multiply;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/pow.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/pow.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the power of complex number,
 * The exponent can be any real number
 * If you want to calculate the k-th root,
 * You should know that it only returns one out of k solutions,
 * Although there are total k possible solutions for k-th root problem.
 * @param { Complex } num - Base
 * @param { Complex | Number } n - Exponent
 * @return { Complex } - Return the result of the exponentiation
 */
function pow(num, n) {
  if (!(num instanceof this) || typeof n !== 'number' && !(n instanceof this)) {
    return this.NaN;
  }

  if (typeof n === 'number') {
    if (!Number.isFinite(n) || Number.isNaN(n)) {
      return this.NaN;
    }

    if (n === 0) {
      return this.ONE;
    }

    if (this.isEqual(num, this.ZERO)) {
      return this.ZERO;
    }

    return this.exp(this.multiply(new this(n, 0), this.log(num)));
  }

  if (n instanceof this) {
    return this.exp(this.multiply(n, this.log(num)));
  }

  return this.NaN;
}

module.exports = pow;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/sec.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/sec.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the secant of given complex number
 * The domain is C / { ( 2k + 1) * PI / 2 : k is any integer }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex secant function
 */
function sec(num) {
  return this.divide(this.ONE, this.cos(num));
}

module.exports = sec;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/sin.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/sin.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the sine of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex sine function
 */
function sin(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var a = num.getReal();
  var b = num.getImaginary();
  return new this(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
}

module.exports = sin;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/subtract.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/subtract.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Returns the difference of two complex numbers
 * @param { Complex } num1 - Complex number on the left of '-' sign
 * @param { Complex } num2 - Complex number on the right of '-' sign
 * @return { Complex } - Difference of two numbers
 */
function subtract(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  return new this(num1.re - num2.re, num1.im - num2.im);
}

module.exports = subtract;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/tan.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/tan.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculate the tangent of given complex number
 * The domain is C / { ( 2k + 1) * PI / 2 : k is any integer }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex tangent function
 */
function tan(num) {
  return this.divide(this.sin(num), this.cos(num));
}

module.exports = tan;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/toString.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/toString.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * @return { String } - Return the stringified and formatted complex number
 */
function toString() {
  var re = this.re,
      im = this.im;

  if (Number.isNaN(re) || Number.isNaN(im)) {
    return 'NaN';
  }

  if (re === 0 && im === 0) {
    return '0';
  }

  if (re === 0) {
    if (im === 1) {
      return 'i';
    }

    if (im === -1) {
      return '-i';
    }

    return "".concat(im, "i");
  }

  if (im === 0) {
    return "".concat(re);
  }

  if (im > 0) {
    if (im === 1) {
      return "".concat(re, " + i");
    }

    return "".concat(re, " + ").concat(im, "i");
  }

  if (im === -1) {
    return "".concat(re, " - i");
  }

  return "".concat(re, " - ").concat(Math.abs(im), "i");
}

module.exports = toString;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/index.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/index.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns a Complex Number
 * @param { Number } arg1 - real part of the complex number
 * @param { Number } arg2 - imaginary part of the complex number
 * @return { Complex } - Complex Number
 */
function Complex(arg1, arg2) {
  var type1 = _typeof(arg1);

  var type2 = _typeof(arg2);

  if (type1 === 'number' && type2 === 'undefined') {
    if (Number.isNaN(arg1) || !Number.isFinite(arg1)) {
      this.re = NaN;
      this.im = NaN;
      return this;
    }

    this.re = arg1;
    this.im = 0;
    return this;
  }

  if (type1 === 'number' && type2 === 'number') {
    if (Number.isNaN(arg1) || Number.isNaN(arg2) || !Number.isFinite(arg1) || !Number.isFinite(arg2)) {
      this.re = NaN;
      this.im = NaN;
      return this;
    }

    this.re = arg1;
    this.im = arg2;
    return this;
  }

  this.re = NaN;
  this.im = NaN;
  return this;
}

Complex.prototype.getReal = __webpack_require__(/*! ./core/getReal */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getReal.js");
Complex.prototype.getImaginary = __webpack_require__(/*! ./core/getImaginary */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getImaginary.js");
Complex.prototype.getModulus = __webpack_require__(/*! ./core/getModulus */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getModulus.js");
Complex.prototype.getArgument = __webpack_require__(/*! ./core/getArgument */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/getArgument.js");
Complex.prototype.toString = __webpack_require__(/*! ./core/toString */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/toString.js");
Complex.isNaN = __webpack_require__(/*! ./core/isNaN */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/isNaN.js");
Complex.isEqual = __webpack_require__(/*! ./core/isEqual */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/isEqual.js");
Complex.conjugate = __webpack_require__(/*! ./core/conjugate */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/conjugate.js");
Complex.inverse = __webpack_require__(/*! ./core/inverse */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/inverse.js");
Complex.add = __webpack_require__(/*! ./core/add */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/add.js");
Complex.subtract = __webpack_require__(/*! ./core/subtract */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/subtract.js");
Complex.multiply = __webpack_require__(/*! ./core/multiply */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/multiply.js");
Complex.divide = __webpack_require__(/*! ./core/divide */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/divide.js");
Complex.exp = __webpack_require__(/*! ./core/exp */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/exp.js");
Complex.log = __webpack_require__(/*! ./core/log */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/log.js");
Complex.pow = __webpack_require__(/*! ./core/pow */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/pow.js");
Complex.sin = __webpack_require__(/*! ./core/sin */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/sin.js");
Complex.cos = __webpack_require__(/*! ./core/cos */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/cos.js");
Complex.tan = __webpack_require__(/*! ./core/tan */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/tan.js");
Complex.csc = __webpack_require__(/*! ./core/csc */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/csc.js");
Complex.sec = __webpack_require__(/*! ./core/sec */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/sec.js");
Complex.cot = __webpack_require__(/*! ./core/cot */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/cot.js");
Complex.asin = __webpack_require__(/*! ./core/asin */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/asin.js");
Complex.acos = __webpack_require__(/*! ./core/acos */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acos.js");
Complex.atan = __webpack_require__(/*! ./core/atan */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/atan.js");
Complex.acsc = __webpack_require__(/*! ./core/acsc */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acsc.js");
Complex.asec = __webpack_require__(/*! ./core/asec */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/asec.js");
Complex.acot = __webpack_require__(/*! ./core/acot */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/core/acot.js");
Complex.NaN = new Complex(NaN);
Complex.ONE = new Complex(1);
Complex.ZERO = new Complex(0);
Complex.PI = new Complex(Math.PI);
Complex.E = new Complex(Math.E);
Complex.EPSILON = 1 / (Math.pow(10, 15) * 2);
module.exports = Complex;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js ***!
  \**********************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  INVALID_ARRAY: 'Invalid argument: Received a non-array argument',
  INVALID_MATRIX: 'Invalid argument: Received an invalid matrix',
  INVALID_SQUARE_MATRIX: 'Invalid argument: Received a non-square matrix',
  INVALID_UPPER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non upper-triangular matrix',
  INVALID_LOWER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non lower-triangular matrix',
  INVALID_EXPONENT: 'Invalid argument: Expected a non-negative integer exponent',
  INVALID_ROW_COL: 'Invalid argument: Expected non-negative integer row and column',
  INVALID_ROW: 'Invalid argument: Expected non-negative integer row',
  INVALID_COLUMN: 'Invalid argument: Expected non-negative integer column',
  INVALID_ROWS_EXPRESSION: 'Invalid argument: Received invalid rows expression',
  INVALID_COLUMNS_EXPRESSION: 'Invalid argument: Received invalid columns expression',
  INVALID_P_NORM: 'Invalid argument: Received invalid p-norm',
  OVERFLOW_INDEX: 'Invalid argument: Matrix index overflow',
  OVERFLOW_COLUMN: 'Invalid argument: Column index overflow',
  OVERFLOW_ROW: 'Invalid argument: Row index overflow',
  NO_UNIQUE_SOLUTION: 'Arithmetic Exception: The system has no unique solution',
  SIZE_INCOMPATIBLE: 'Invalid argument: Matrix size-incompatible',
  SINGULAR_MATRIX: 'Arithmetic Exception: The matrix is not invertible',
  EXPECTED_STRING_NUMBER_AT_POS_1_2: 'Invalid argument: Expected a string or a number at arguments[1] and arguments[2]',
  EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES: 'Invalid argument: Expected either an array of numbers or an array of square matrices'
};

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the LUP decomposition of the Matrix,
 * where L is lower triangular matrix which diagonal entries are always 1,
 * U is upper triangular matrix, and P is permutation matrix.<br><br>
 * 
 * It is implemented using Gaussian Elimination with Partial Pivoting in order to
 * reduce the error caused by floating-point arithmetic.<br><br>
 * 
 * Note that if optimized is true, P is a Permutation Array and both L and U are merged
 * into one matrix in order to improve performance.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {boolean} [optimized=false] - Returns [P, LU] if it is true, [P, L, U] if it is false
 * @returns {Matrix[]} The LUP decomposition of Matrix
 */


function LU(A) {
  var optimized = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);
  var permutation = initPermutation(row);

  var copy = this.clone(A)._matrix;

  for (var i = 0; i < row - 1; i++) {
    var currentCol = Math.min(i, col); // apply Partial Pivoting

    PartialPivoting(copy, permutation, currentCol, row, col);
    var ith = permutation[i];
    var pivot = copy[ith][currentCol];

    if (Math.abs(pivot) < EPSILON) {
      continue;
    }

    for (var j = i + 1; j < row; j++) {
      var jth = permutation[j];
      var entry = copy[jth][currentCol];

      if (Math.abs(entry) >= EPSILON) {
        var factor = entry / pivot;

        for (var k = currentCol; k < col; k++) {
          copy[jth][k] -= factor * copy[ith][k];
        }

        copy[jth][currentCol] = factor;
      }
    }
  }

  var result = new Array(row);

  for (var _i2 = 0; _i2 < row; _i2++) {
    result[_i2] = copy[permutation[_i2]];
  }

  if (optimized) {
    return [permutation, new this(result)];
  }

  var P = this.generate(row, row, function (i, j) {
    var idx = permutation[i];

    if (j === idx) {
      return 1;
    }

    return 0;
  });
  var L = this.generate(row, size, function (i, j) {
    if (i === j) {
      return 1;
    }

    if (i < j) {
      return 0;
    }

    return result[i][j];
  });
  var U = this.generate(size, col, function (i, j) {
    if (i > j) {
      return 0;
    }

    return result[i][j];
  });
  return [P, L, U];
}

;

function initPermutation(size) {
  var permutation = new Array(size);

  for (var i = 0; i < size; i++) {
    permutation[i] = i;
  }

  return permutation;
}

function PartialPivoting(matrix, permutation, pos, row, col) {
  var currentCol = Math.min(pos, col);
  var maxIdx = pos;
  var max = Math.abs(matrix[permutation[pos]][currentCol]);

  for (var i = pos + 1; i < row; i++) {
    var value = Math.abs(matrix[permutation[i]][currentCol]);

    if (value > max) {
      maxIdx = i;
      max = value;
    }
  }

  var t = permutation[pos];
  permutation[pos] = permutation[maxIdx];
  permutation[maxIdx] = t;
}

module.exports = LU;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the QR decomposition of the Matrix
 * where Q is orthogonal matrix, R is upper triangular matrix.<br><br>
 * 
 * The algorithm is implemented using Householder Transform instead of Gram–Schmidt process
 * because the Householder Transform is more numerically stable.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @returns {Matrix[]} The QR decomposition of matrix in the form of [Q, R]
 */


function QR(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var matrixR = this.clone(A)._matrix;

  var matrixQ = this.identity(row)._matrix;

  for (var j = 0; j < size; j++) {
    // if all entries below main diagonal are considered as zero, skip this round
    var skip = true;

    for (var i = j + 1; i < row; i++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        skip = false;
        break;
      }
    }

    if (!skip) {
      // Apply Householder transform
      var norm = 0;

      for (var _i2 = j; _i2 < row; _i2++) {
        norm += Math.pow(matrixR[_i2][j], 2);
      }

      norm = Math.sqrt(norm); // reduce floating point arithmatic error

      var s = -1;

      if (matrixR[j][j] < 0) {
        s = 1;
      }

      var u1 = matrixR[j][j] - s * norm;
      var w = new Array(row - j);

      for (var _i3 = 0; _i3 < row - j; _i3++) {
        w[_i3] = matrixR[_i3 + j][j] / u1;
      }

      w[0] = 1;
      var tau = -1 * s * u1 / norm;
      var subR = new Array(row - j);

      for (var _i4 = 0; _i4 < row - j; _i4++) {
        var newRow = new Array(col);

        for (var k = 0; k < col; k++) {
          newRow[k] = matrixR[j + _i4][k];
        }

        subR[_i4] = newRow;
      }

      for (var _i5 = j; _i5 < row; _i5++) {
        for (var _k = 0; _k < col; _k++) {
          var summation = 0;

          for (var m = 0; m < row - j; m++) {
            summation += subR[m][_k] * w[m];
          }

          matrixR[_i5][_k] = subR[_i5 - j][_k] - tau * w[_i5 - j] * summation;
        }
      }

      var subQ = new Array(row);

      for (var _i6 = 0; _i6 < row; _i6++) {
        var _newRow = new Array(row - j);

        for (var _k2 = 0; _k2 < row - j; _k2++) {
          _newRow[_k2] = matrixQ[_i6][j + _k2];
        }

        subQ[_i6] = _newRow;
      }

      for (var _i7 = 0; _i7 < row; _i7++) {
        for (var _k3 = j; _k3 < row; _k3++) {
          var _summation = 0;

          for (var _m = 0; _m < row - j; _m++) {
            _summation += subQ[_i7][_m] * w[_m];
          }

          matrixQ[_i7][_k3] = subQ[_i7][_k3 - j] - tau * w[_k3 - j] * _summation;
        }
      }
    }
  }

  for (var _i8 = 0; _i8 < row; _i8++) {
    for (var _j = 0; _j < col; _j++) {
      if (_i8 > _j) {
        matrixR[_i8][_j] = 0;
      }
    }
  }

  return [new this(matrixQ), new this(matrixR)];
}

;
module.exports = QR;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js ***!
  \***********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_UPPER_TRIANGULAR_MATRIX = _require.INVALID_UPPER_TRIANGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION;
/**
* Solve system of linear equations Ux = y using backward substitution,
* where U is an upper triangular matrix.
* If there is no unique solutions, an error is thrown.
* @memberof Matrix
* @static
* @param {Matrix} U - Any n x n upper triangular Matrix
* @param {Matrix} y - Any n x 1 Matrix
* @returns {Matrix} n x 1 Matrix which is the solution of Ux = y
*/


function backward(U, y) {
  if (!(U instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!U.isUpperTriangular()) {
    throw new Error(INVALID_UPPER_TRIANGULAR_MATRIX);
  }

  if (!U.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = U.size()[0];

  var _y$size = y.size(),
      _y$size2 = _slicedToArray(_y$size, 2),
      yrow = _y$size2[0],
      ycol = _y$size2[1];

  var matrixU = U._matrix;
  var matrixY = y._matrix;

  if (yrow !== size || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, U._digit) * 2);

  for (var i = 0; i < size; i++) {
    if (Math.abs(matrixU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var coefficients = empty(size, 1);

  for (var _i2 = size - 1; _i2 >= 0; _i2--) {
    var summation = 0;

    for (var j = _i2 + 1; j < size; j++) {
      summation += coefficients[j][0] * matrixU[_i2][j];
    }

    coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixU[_i2][_i2];
  }

  return new this(coefficients);
}

;
module.exports = backward;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_LOWER_TRIANGULAR_MATRIX = _require.INVALID_LOWER_TRIANGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION;
/**
 * Solve system of linear equations Lx = y using forward substitution,
 * where L is a lower triangular matrix.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n lower triangular Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Lx = y
 */


function forward(L, y) {
  if (!(L instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!L.isLowerTriangular()) {
    throw new Error(INVALID_LOWER_TRIANGULAR_MATRIX);
  }

  if (!L.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = L.size()[0];

  var _y$size = y.size(),
      _y$size2 = _slicedToArray(_y$size, 2),
      yrow = _y$size2[0],
      ycol = _y$size2[1];

  var matrixL = L._matrix;
  var matrixY = y._matrix;

  if (size !== yrow || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, L._digit) * 2);

  for (var i = 0; i < size; i++) {
    if (Math.abs(matrixL[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var coefficients = empty(size, 1);

  for (var _i2 = 0; _i2 < size; _i2++) {
    var summation = 0;

    for (var j = 0; j < _i2; j++) {
      summation += coefficients[j][0] * matrixL[_i2][j];
    }

    coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixL[_i2][_i2];
  }

  return new this(coefficients);
}

;
module.exports = forward;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Solve system of linear equations Ax = y using LU decomposition.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n square Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Ax = y
 */


function solve(A, b) {
  if (!(A instanceof this) || !(b instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      aRow = _A$size2[0],
      aCol = _A$size2[1];

  var _b$size = b.size(),
      _b$size2 = _slicedToArray(_b$size, 2),
      bRow = _b$size2[0],
      bCol = _b$size2[1];

  if (aCol !== bRow || bCol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var _this$LU = this.LU(A, true),
      _this$LU2 = _slicedToArray(_this$LU, 2),
      P = _this$LU2[0],
      LU = _this$LU2[1];

  var matrixLU = LU._matrix;
  var matrixB = b._matrix;

  for (var i = aRow - 1; i >= 0; i--) {
    if (Math.abs(matrixLU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var clonedVector = new Array(bRow);
  var coefficients = new Array(bRow);

  for (var _i2 = 0; _i2 < bRow; _i2++) {
    // eslint-disable-next-line prefer-destructuring
    clonedVector[_i2] = matrixB[P[_i2]][0];
  }

  for (var _i3 = 0; _i3 < aRow; _i3++) {
    var summation = 0;

    for (var j = 0; j < _i3; j++) {
      summation += coefficients[j] * matrixLU[_i3][j];
    }

    coefficients[_i3] = clonedVector[_i3] - summation;
  }

  for (var _i4 = aRow - 1; _i4 >= 0; _i4--) {
    var _summation = 0;

    for (var _j = _i4 + 1; _j < aRow; _j++) {
      _summation += matrixLU[_i4][_j] * clonedVector[_j];
    }

    clonedVector[_i4] = (coefficients[_i4] - _summation) / matrixLU[_i4][_i4];
  }

  for (var _i5 = 0; _i5 < bRow; _i5++) {
    coefficients[_i5] = [clonedVector[_i5]];
  }

  return new this(coefficients);
}

;
module.exports = solve;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/add.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/add.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Calculates the sum of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The sum of two Matrices
 */


function add(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      row2 = _B$size2[0],
      col2 = _B$size2[1];

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrix1 = A._matrix;
  var matrix2 = B._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix1[i][j] + matrix2[i][j];
  });
}

;
module.exports = add;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js ***!
  \****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SINGULAR_MATRIX = _require.SINGULAR_MATRIX;

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");
/**
 * Find the inverse of non-singular matrix using Elementary Row Operations.
 * If the matrix is singular, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any square Matrix
 * @returns {Matrix} The inverse of A
 */


function inverse(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = A.size()[0];

  if (size === 0) {
    // inverse of 0x0 matrix is itself
    return new Matrix([]);
  }

  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var inv = this.identity(size)._matrix;

  var clone = this.clone(A)._matrix;

  var permutation = initPermutation(size); // iterate each column

  for (var j = 0; j < size; j++) {
    var pivotIdx = j;
    var pivot = clone[permutation[j]][j];

    while (Math.abs(pivot) < EPSILON && pivotIdx < size - 1) {
      pivotIdx++;
      pivot = clone[permutation[pivotIdx]][j];
    }

    if (Math.abs(pivot) < EPSILON) {
      throw new Error(SINGULAR_MATRIX);
    }

    if (j !== pivotIdx) {
      var temp = permutation[j];
      permutation[j] = permutation[pivotIdx];
      permutation[pivotIdx] = temp;
    }

    var pivotRow = permutation[j]; // the pivot is guaranteed to be non-zero

    for (var i = 0; i < size; i++) {
      var ith = permutation[i];

      if (i === j) {
        for (var k = 0; k < size; k++) {
          if (k === j) {
            clone[ith][k] = 1;
          }

          if (k > j) {
            clone[ith][k] /= pivot;
          }

          inv[ith][k] /= pivot;
        }

        pivot = 1;
      }

      if (i !== j && Math.abs(clone[ith][j]) >= EPSILON) {
        var factor = clone[ith][j] / pivot;

        for (var _k = 0; _k < size; _k++) {
          if (_k === j) {
            clone[ith][_k] = 0;
          }

          if (_k > j) {
            clone[ith][_k] -= factor * clone[pivotRow][_k];
          }

          inv[ith][_k] -= factor * inv[pivotRow][_k];
        }
      }
    }
  }

  for (var _i = 0; _i < size; _i++) {
    clone[_i] = inv[permutation[_i]];
  }

  return new this(clone);
}

;

function initPermutation(size) {
  var permutation = new Array(size);

  for (var i = 0; i < size; i++) {
    permutation[i] = i;
  }

  return permutation;
}

module.exports = inverse;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Calculates the product of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that is size-compatible with A
 * @returns {Matrix} The product of two Matrices
 */


function multiply(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      Arow = _A$size2[0],
      Acol = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      Brow = _B$size2[0],
      Bcol = _B$size2[1];

  if (Acol !== Brow) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrixA = A._matrix;
  var matrixB = B._matrix;
  var result = empty(Arow, Bcol);

  for (var i = 0; i < Arow; i++) {
    for (var j = 0; j < Bcol; j++) {
      result[i][j] = 0;

      for (var k = 0; k < Brow; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return new this(result);
}

;
module.exports = multiply;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/pow.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/pow.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    INVALID_EXPONENT = _require.INVALID_EXPONENT;
/**
 * Calculates the power of any square matrix.
 * The algorithm is implemented recursively.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any square Matrix
 * @param {number} exponent - Any Non-negative integer
 * @returns {Matrix} The power of A
 */


function pow(A, exponent) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new Error(INVALID_EXPONENT);
  }

  var size = A.size()[0];

  if (exponent === 0) {
    return this.identity(size);
  }

  if (exponent === 1) {
    return this.clone(A);
  }

  if (exponent % 2 === 0) {
    var _temp = this.pow(A, exponent / 2);

    return this.multiply(_temp, _temp);
  }

  var temp = this.pow(A, (exponent - 1) / 2);
  return this.multiply(this.multiply(temp, temp), A);
}

;
module.exports = pow;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the difference of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The difference of two Matrices
 */


module.exports = function subtract(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      row2 = _B$size2[0],
      col2 = _B$size2[1];

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrix1 = A._matrix;
  var matrix2 = B._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix1[i][j] - matrix2[i][j];
  });
};

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Find the transpose of a matrix.
 * @memberof Matrix
 * @static
 * @param { Matrix } A - Any Matrix
 * @returns { Matrix } Returns transpose of A
 */


function transpose(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(col, row, function (i, j) {
    return matrix[j][i];
  });
}

;
module.exports = transpose;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/cond.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/cond.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_P_NORM = _require.INVALID_P_NORM,
    SINGULAR_MATRIX = _require.SINGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculations the condition number of square Matrix
 * with respect to the choice of Matrix norm. 
 * If the Matrix is singular, returns Infinity.<br><br>
 * The condition number is not cached.
 * @memberof Matrix
 * @instance
 * @param {(1|2|Infinity|'F')} p - Type of Matrix norm
 * @returns {number} The condition number of Matrix
 */


function cond() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  try {
    var inverse = Matrix.inverse(this);
    return inverse.norm(p) * this.norm(p);
  } catch (error) {
    if (error.message === SINGULAR_MATRIX) {
      return Infinity;
    }

    throw error;
  }
}

;
module.exports = cond;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/det.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/det.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable prefer-destructuring */
var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the determinant of square Matrix.
 * If the Matrix size is larger than 3, it calculates the determinant using
 * LU decomposition, otherwise, using Leibniz Formula.<br><br>
 * The determinant is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} Returns the determinant of square matrirx
 */


function det() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._det !== undefined) {
    return this._det;
  }

  var matrix = this._matrix;
  var size = matrix.length;

  if (size === 0) {
    this._det = 1;
    return 1; // the determinant of 0x0 matrix must be 1
  }

  if (size === 1) {
    this._det = matrix[0][0];
    return this._det;
  }

  if (size === 2) {
    this._det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return this._det;
  }

  if (size === 3) {
    this._det = matrix[0][0] * matrix[1][1] * matrix[2][2] + matrix[0][1] * matrix[1][2] * matrix[2][0] + matrix[0][2] * matrix[1][0] * matrix[2][1] - matrix[0][2] * matrix[1][1] * matrix[2][0] - matrix[0][1] * matrix[1][0] * matrix[2][2] - matrix[0][0] * matrix[1][2] * matrix[2][1];
    return this._det;
  }

  var _Matrix$LU = Matrix.LU(this, true),
      _Matrix$LU2 = _slicedToArray(_Matrix$LU, 2),
      P = _Matrix$LU2[0],
      LU = _Matrix$LU2[1];

  var matrixLU = LU._matrix; // count whether the number of permutations <swap> is odd or even
  // O(n^2)

  var swap = 0;

  for (var i = 0; i < size; i++) {
    if (P[i] === i) {
      continue;
    }

    while (P[i] !== i) {
      var target = P[i];
      P[i] = P[target];
      P[target] = target;
      swap++;
    }
  }

  var result = 1;

  for (var _i2 = 0; _i2 < size; _i2++) {
    result *= matrixLU[_i2][_i2];
  }

  if (swap % 2 === 1) {
    this._det = result * -1;
    return this._det;
  }

  this._det = result;
  return result;
}

;
module.exports = det;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-param-reassign */
// reference: https://people.inf.ethz.ch/arbenz/ewp/Lnotes/chapter4.pdf
var Complex = __webpack_require__(/*! @rayyamhk/complex */ "./node_modules/.pnpm/@rayyamhk+complex@1.0.10/node_modules/@rayyamhk/complex/lib/index.js");

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the eigenvalues of any square Matrix using QR Algorithm.<br><br>
 * 
 * The eigenvalues can be either real number or complex number.
 * Note that all eigenvalues are instance of Complex,
 * for more details please visit [Complex.js]{@link https://rayyamhk.github.io/Complex.js}.<br><br>
 * 
 * The eigenvalues are cached.
 * @memberof Matrix
 * @instance
 * @returns {Complex[]} Array of eigenvalues
 */


function eigenvalues() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._eigenvalues !== undefined) {
    return this._eigenvalues;
  }

  var size = this.size()[0];
  var values = [];
  var digit = this._digit;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);

  var clone = Matrix.clone(this)._matrix;

  var isConvergent = true; // flag

  var skip = false; // Transform matrix to Hessenberg matrix

  HouseholderTransform(clone, digit);

  for (var i = size - 1; i > 0; i--) {
    var divergenceCount = 0;
    var prev = void 0; // used to determine convergence
    // if obtains complex eigenvalues pair in previous iteration, skip current round

    if (skip) {
      skip = false;
      continue;
    }

    var shift = clone[size - 1][size - 1]; // eslint-disable-next-line no-constant-condition

    while (true) {
      if (!isConvergent) {
        // if the current eigenvalue is not real
        prev = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]).metric;
      } else {
        // if the current eigenvalue is real
        prev = Math.abs(clone[i][i - 1]);
      } // apply single shift


      for (var j = 0; j < size; j++) {
        clone[j][j] -= shift;
      } // Apply QR Algorithm


      HessenbergQR(clone, digit);

      for (var _j = 0; _j < size; _j++) {
        clone[_j][_j] += shift;
      }

      if (isConvergent && prev < Math.abs(clone[i][i - 1])) {
        divergenceCount++;
      } // if the current eigenvalue is real and the entry is almost ZERO => break;


      if (isConvergent && Math.abs(clone[i][i - 1]) < EPSILON) {
        values[i] = new Complex(clone[i][i]);
        break;
      } // if the current eigenvalues pair is complex, if the difference of the previous eiganvalues and the
      // eigenvalues of submatrix is almost ZERO => break


      var _size2Eigenvalues = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]),
          metric = _size2Eigenvalues.metric,
          eigen1 = _size2Eigenvalues.eigen1,
          eigen2 = _size2Eigenvalues.eigen2;

      if (!isConvergent && Math.abs(prev - metric) < EPSILON) {
        isConvergent = true; // re-initialize

        skip = true;
        var re1 = eigen1.re,
            im1 = eigen1.im;
        var re2 = eigen2.re,
            im2 = eigen2.im;
        values[i] = new Complex(re1, im1);
        values[i - 1] = new Complex(re2, im2);
        break;
      } // if the entry doesn't converge => complex eigenvalues pair


      if (divergenceCount > 3) {
        isConvergent = false;
      }
    }
  }

  if (!skip) {
    values[0] = new Complex(clone[0][0]);
  }

  this._eigenvalues = values;
  return values;
}

;

function HouseholderTransform(A, digit) {
  var size = A.length;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);

  for (var j = 0; j < size - 2; j++) {
    var xNorm = 0;
    var u = new Array(size - j - 1);

    for (var i = j + 1; i < size; i++) {
      var entry = A[i][j];
      xNorm += Math.pow(entry, 2);
      u[i - j - 1] = entry;
    }

    xNorm = Math.sqrt(xNorm);

    if (Math.abs(xNorm) < EPSILON) {
      continue;
    }

    if (u[0] >= 0) {
      u[0] += xNorm;
    } else {
      u[0] -= xNorm;
    } // Make 'u' unit vector


    var uNorm = 0;

    for (var _i = 0; _i < u.length; _i++) {
      uNorm += Math.pow(u[_i], 2);
    }

    uNorm = Math.sqrt(uNorm);

    for (var _i2 = 0; _i2 < u.length; _i2++) {
      u[_i2] /= uNorm;
    } // update the matrix, multiply P from left


    for (var n = j; n < size; n++) {
      // column
      var v = new Array(size - j - 1);

      for (var m = j + 1; m < size; m++) {
        v[m - j - 1] = A[m][n];
      }

      var scaler = 0;

      for (var _m = 0; _m < v.length; _m++) {
        scaler += v[_m] * u[_m];
      }

      scaler *= 2;

      for (var _m2 = j + 1; _m2 < size; _m2++) {
        // row
        if (n === j && _m2 !== j + 1) {
          A[_m2][n] = 0;
        } else {
          A[_m2][n] = v[_m2 - j - 1] - scaler * u[_m2 - j - 1];
        }
      }
    } // update the matrix, multiply P from right


    for (var _m3 = 0; _m3 < size; _m3++) {
      // row
      var _v = new Array(size - j - 1);

      for (var _n = j + 1; _n < size; _n++) {
        _v[_n - j - 1] = A[_m3][_n];
      }

      var _scaler = 0;

      for (var _n2 = 0; _n2 < _v.length; _n2++) {
        _scaler += _v[_n2] * u[_n2];
      }

      _scaler *= 2;

      for (var _n3 = j + 1; _n3 < size; _n3++) {
        // column
        A[_m3][_n3] = _v[_n3 - j - 1] - _scaler * u[_n3 - j - 1];
      }
    }
  }
}

function HessenbergQR(H, digit) {
  var size = H.length;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var sincos = new Array(size - 1);

  for (var i = 0; i < size - 1; i++) {
    var a = H[i][i];
    var c = H[i + 1][i];
    var norm = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2));

    if (norm < EPSILON) {
      continue;
    }

    var cos = a / norm;
    var sin = c * -1 / norm;
    sincos[i] = [sin, cos];
    var row1 = new Array(size - i);
    var row2 = new Array(size - i);

    for (var j = i; j < size; j++) {
      row1[j - i] = H[i][j];
      row2[j - i] = H[i + 1][j];
    }

    for (var _j2 = i; _j2 < size; _j2++) {
      H[i][_j2] = cos * row1[_j2 - i] + sin * -1 * row2[_j2 - i];

      if (i === _j2) {
        H[i + 1][_j2] = 0;
      } else {
        H[i + 1][_j2] = sin * row1[_j2 - i] + cos * row2[_j2 - i];
      }
    }
  }

  for (var _j3 = 0; _j3 < size - 1; _j3++) {
    if (!sincos[_j3]) {
      continue;
    }

    var _sincos$_j = _slicedToArray(sincos[_j3], 2),
        _sin = _sincos$_j[0],
        _cos = _sincos$_j[1];

    var col1 = new Array(_j3 + 2);
    var col2 = new Array(_j3 + 2);

    for (var _i3 = 0; _i3 <= _j3 + 1; _i3++) {
      col1[_i3] = H[_i3][_j3];
      col2[_i3] = H[_i3][_j3 + 1];
    }

    for (var _i4 = 0; _i4 <= _j3 + 1; _i4++) {
      H[_i4][_j3] = col1[_i4] * _cos - col2[_i4] * _sin;
      H[_i4][_j3 + 1] = col1[_i4] * _sin + col2[_i4] * _cos;
    }
  }
} // find the eigenvalues of 2x2 matrix


function size2Eigenvalues(e11, e12, e21, e22) {
  var b = (e11 + e22) * -1;
  var c = e11 * e22 - e21 * e12;
  var delta = Math.pow(b, 2) - 4 * c;
  var re1;
  var im1;
  var re2;
  var im2;

  if (delta >= 0) {
    im1 = 0;
    im2 = 0;

    if (b >= 0) {
      re1 = (b * -1 - Math.sqrt(delta)) / 2;
    } else {
      re1 = (b * -1 + Math.sqrt(delta)) / 2;
    }

    re2 = c / re1;
  } else {
    re1 = -b / 2;
    re2 = re1;
    im1 = Math.sqrt(delta * -1) / 2;
    im2 = im1 * -1;
  }

  return {
    metric: Math.sqrt(Math.pow(re1, 2) + Math.pow(im1, 2)),
    eigen1: {
      re: re1,
      im: im1
    },
    eigen2: {
      re: re2,
      im: im2
    }
  };
}

module.exports = eigenvalues;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/norm.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/norm.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_P_NORM = _require.INVALID_P_NORM;
/**
 * Calculates the Matrix norm of any Matrix with respect to the choice of norm.<br><br>
 * 
 * 1-norm: Maximum absolute column sum of the Matrix.<br>
 * 2-norm: The largest singular value of Matrix.<br>
 * Infinity-norm: Maximum absolute row sum of the Matrix.<br>
 * Frobenius-norm: Euclidean norm invloving all entries.<br><br>
 * 
 * The norms are not cached.
 * @memberof Matrix
 * @instance
 * @param {(1|2|Infinity|'F')} p - The choice of Matrix norm
 * @returns {number} The norm of the Matrix.
 */


function norm() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  var matrix = this._matrix;
  var result = 0;

  if (p === 1) {
    // max of column sum
    for (var j = 0; j < col; j++) {
      var columnSum = 0;

      for (var i = 0; i < row; i++) {
        columnSum += Math.abs(matrix[i][j]);
      }

      if (columnSum > result) {
        result = columnSum;
      }
    }

    return result;
  } // largest singular value


  if (p === 2) {
    var transpose = Matrix.transpose(this);
    var M = Matrix.multiply(transpose, this);
    var eigenvalues = M.eigenvalues();

    for (var _i2 = 0; _i2 < eigenvalues.length; _i2++) {
      var value = eigenvalues[_i2].getModulus();

      if (value > result) {
        result = value;
      }
    }

    return Math.sqrt(result);
  }

  if (p === Infinity) {
    // max of row sum
    for (var _i3 = 0; _i3 < row; _i3++) {
      var rowSum = 0;

      for (var _j = 0; _j < col; _j++) {
        rowSum += Math.abs(matrix[_i3][_j]);
      }

      if (rowSum > result) {
        result = rowSum;
      }
    }

    return result;
  } // F


  for (var _i4 = 0; _i4 < row; _i4++) {
    for (var _j2 = 0; _j2 < col; _j2++) {
      result += Math.pow(matrix[_i4][_j2], 2);
    }
  }

  return Math.sqrt(result);
}

;
module.exports = norm;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the nullity of any Matrix, which is the dimension
 * of the nullspace.<br><br>
 * 
 * The nullity is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The nullity of the matrix
 */
function nullity() {
  if (this._nullity !== undefined) {
    return this._nullity;
  }

  var col = this.size()[1];
  var rank = this.rank();
  this._nullity = col - rank;
  return this._nullity;
}

;
module.exports = nullity;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/rank.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/rank.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");
/**
 * Calculates the rank of any Matrix,
 * which is the dimension of the row space.<br><br>
 * 
 * The rank is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The rank of the Matrix
 */


function rank() {
  if (this._rank !== undefined) {
    return this._rank;
  }

  var EPSILON = 1 / (Math.pow(10, this._digit) * 2);
  var R = Matrix.QR(this)[1];
  var matrixR = R._matrix;

  var _R$size = R.size(),
      _R$size2 = _slicedToArray(_R$size, 2),
      row = _R$size2[0],
      col = _R$size2[1];

  if (row === 0) {
    this._rank = 1;
    return 1;
  }

  var rk = 0;

  for (var i = 0; i < row; i++) {
    for (var j = i; j < col; j++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        rk++;
        break;
      }
    }
  }

  this._rank = rk;
  return rk;
}

;
module.exports = rank;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/size.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/size.js ***!
  \*************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the size of any Matrix,
 * which is in the form of [row, column].<br><br>
 * 
 * The size of Matrix is cached.
 * @memberof Matrix
 * @instance
 * @returns {number[]} The number of rows and columns of a Matrix
 */
function size() {
  if (this._size !== undefined) {
    return this._size;
  }

  var A = this._matrix;

  if (A.length === 0) {
    this._size = [0, 0];
    return this._size;
  }

  this._size = [A.length, A[0].length];
  return this._size;
}

;
module.exports = size;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/trace.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/trace.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the trace of any square Matrix,
 * which is the sum of all entries on the main diagonal.<br><br>
 * 
 * The trace is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The trace of the square Matrix.
 */


function trace() {
  var isSquare = this._isSquare !== undefined ? this._isSquare : this.isSquare();

  if (!isSquare) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._trace !== undefined) {
    return this._trace;
  }

  var A = this._matrix;
  var size = A.length;
  var tr = 0;

  for (var i = 0; i < size; i++) {
    tr += A[i][i];
  }

  this._trace = tr;
  return tr;
}

;
module.exports = trace;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js ***!
  \******************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is diagonal or not.<br><br>
 * 
 * Diagonal Matrix is a Matrix in which the entries outside the main diagonal
 * are all zero. Note that the term diagonal refers to rectangular diagonal.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns rue if the Matrix is diagonal Matrix
 */
function isDiagonal() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isDiagonal !== undefined) {
    return this._isDiagonal;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    this._isDiagonal = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (i !== j && Math.abs(A[i][j]) >= EPSILON) {
        this.isDiagonal = false;
        return false;
      }
    }
  }

  this._isDiagonal = true;
  return true;
}

;
module.exports = isDiagonal;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is lower triangular Matrix or not.<br><br>
 * 
 * Lower triangular Matrix is a Matrix in which all the entries
 * above the main diagonal are zero. Note that it can be applied
 * to any non-square Matrix.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is lower triangular
 */
function isLowerTriangular() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isLowerTriangular !== undefined) {
    return this._isLowerTriangular;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    // []
    this._isLowerTriangular = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = i + 1; j < col; j++) {
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isLowerTriangular = false;
        return false;
      }
    }
  }

  this._isLowerTriangular = true;
  return true;
}

;
module.exports = isLowerTriangular;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js ***!
  \********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a square Matrix is orthogonal or not.<br><br>
 * 
 * Orthogonal Matrix is a Matrix in which all rows and columns are
 * orthonormal vectors.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is orthogonal
 */
function isOrthogonal() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isOrthogonal !== undefined) {
    return this._isOrthogonal;
  }

  if (!this.isSquare()) {
    this._isOrthogonal = false;
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  for (var i = 0; i < size; i++) {
    for (var j = i; j < size; j++) {
      var entry = 0;

      for (var k = 0; k < size; k++) {
        entry += A[i][k] * A[j][k];
      }

      if (i === j && Math.abs(entry - 1) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }

      if (i !== j && Math.abs(entry) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }
    }
  }

  this._isOrthogonal = true;
  return true;
}

;
module.exports = isOrthogonal;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a square Matrix is skew symmetric or not.<br><br>
 * 
 * Skew symmetric Matrix is a square Matrix whose transpose equals its negative.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is skew symmetric
 */
function isSkewSymmetric() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isSkewSymmetric !== undefined) {
    return this._isSkewSymmetric;
  }

  if (!this.isSquare()) {
    this._isSkewSymmetric = false;
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  if (size === 0) {
    this._isSkewSymmetric = true;
    return true; // []
  }

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < i; j++) {
      if (Math.abs(A[i][j] + A[j][i]) >= EPSILON) {
        this._isSkewSymmetric = false;
        return false;
      }
    }
  }

  this._isSkewSymmetric = true;
  return true;
}

;
module.exports = isSkewSymmetric;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a Matrix is square or not.<br><br>
 * 
 * Square Matrix is a Matrix with same number of rows and columns.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @returns {boolean} Returns true if the Matrix is square
 */
function isSquare() {
  if (this._isSquare !== undefined) {
    return this._isSquare;
  }

  var A = this._matrix;

  if (A.length === 0) {
    // 0x0 matrix
    this._isSquare = true;
    return true;
  }

  this._isSquare = A.length === A[0].length;
  return this._isSquare;
}

;
module.exports = isSquare;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a square Matrix is symmetric or not.<br><br>
 * 
 * Symmetric Matrix is a square Matrix that is equal to its transpose.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is symmetric
 */
function isSymmetric() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isSymmetric !== undefined) {
    return this._isSymmetric;
  }

  if (!this.isSquare()) {
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  for (var i = 0; i < size; i++) {
    for (var j = 0; j <= i; j++) {
      if (Math.abs(A[i][j] - A[j][i]) >= EPSILON) {
        this._isSymmetric = false;
        return false;
      }
    }
  }

  this._isSymmetric = true;
  return true;
}

;
module.exports = isSymmetric;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is upper triangular Matrix or not.<br><br>
 * 
 * Upper triangular Matrix is a Matrix in which all the entries below the
 * main diagonal are zero. Note that it can be applied to any non-square Matrix.<br><br>
 *  
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is upper triangular
 */
function isUpperTriangular() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isUpperTriangular !== undefined) {
    return this._isUpperTriangular;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    // []
    this._isUpperTriangular = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (i <= j) {
        continue;
      }

      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isUpperTriangular = false;
        return false;
      }
    }
  }

  this._isUpperTriangular = true;
  return true;
}

;
module.exports = isUpperTriangular;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/clone.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/clone.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Creates a copy of Matrix. Note that it resets the cached data.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {Matrix} Copy of A
 */


function clone(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix[i][j];
  });
}

;
module.exports = clone;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/column.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/column.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the column of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid column index
 * @returns {Matrix} Column of A
 */


function column(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      r = _A$size2[0],
      c = _A$size2[1];

  if (index >= c) {
    throw new Error(OVERFLOW_COLUMN);
  }

  var matrix = A._matrix;
  return this.generate(r, 1, function (i) {
    return matrix[i][index];
  });
}

;
module.exports = column;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/diag.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/diag.js ***!
  \********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js");

var isNumber = __webpack_require__(/*! ../../util/isNumber */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isNumber.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ARRAY = _require.INVALID_ARRAY,
    EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES = _require.EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Generates diagonal Matrix if the argument is an array of numbers,
 * generates block diagonal Matrix if the argument is an array of Matrices.
 * @memberof Matrix
 * @static
 * @param {(number[]|Matrix[])} values - Array of numbers or Matrices
 * @returns {Matrix} Block diagonal Matrix
 */


function diag(values) {
  if (!Array.isArray(values)) {
    throw new Error(INVALID_ARRAY);
  }

  var argsNum = values.length;
  var variant;

  for (var i = 0; i < argsNum; i++) {
    var entry = values[i];

    if (!isNumber(entry) && !(entry instanceof Matrix)) {
      throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
    }

    if (isNumber(entry)) {
      if (!variant) {
        variant = 'number';
        continue;
      }

      if (variant !== 'number') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    } else {
      if (!entry.isSquare()) {
        throw new Error(INVALID_SQUARE_MATRIX);
      }

      if (!variant) {
        variant = 'square';
        continue;
      }

      if (variant !== 'square') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    }
  } // HERE: variant should be either 'number' or 'square'


  if (variant === 'number') {
    return Matrix.generate(argsNum, argsNum, function (i, j) {
      if (i === j) {
        return values[i];
      }

      return 0;
    });
  } // Guaranteed that [values] is a list of square matrices


  var size = 0;
  var temp = new Array(argsNum);

  for (var _i = 0; _i < argsNum; _i++) {
    var _len = values[_i].size()[0];

    size += _len;
    temp[_i] = _len;
  }

  var idx = 0;
  var start = 0;
  var len = temp[idx];
  return Matrix.generate(size, size, function (i, j) {
    if (i - start === len && j - start === len) {
      start += len;
      idx++;
    }

    var ith = i - start; // ith < 0 if below main diagonal

    var jth = j - start; // jth < 0 if above main diagonal
    // skip 0x0 matrices

    len = temp[idx];

    while (len === 0) {
      idx++;
      len = temp[idx];
    }

    if (ith < len && ith >= 0 && jth < len && jth >= 0) {
      return values[idx]._matrix[ith][jth];
    }

    return 0;
  });
}

;
module.exports = diag;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * This callback applies on each entry of a Matrix
 * @callback entryCallback
 * @param {number} entry - Entry of a Matrix
 * @returns {number} New entry value
 */

/**
 * Applys a function over each entry of a Matrix and returns
 * a new copy of the new Matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {entryCallback} cb - Callback function which applies on each entry of A
 * @returns {Matrix} A copy of new Matrix
 */


function elementwise(A, cb) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(row, col, function (i, j) {
    return cb(matrix[i][j]);
  });
}

;
module.exports = elementwise;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/entry.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/entry.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_INDEX = _require.OVERFLOW_INDEX;
/**
 * Gets the entry of a Matrix.
 * @memberof Matrix
 * @instance
 * @param {number} row - Any valid row index
 * @param {number} col - Any valid column index
 * @returns {number} Entry of the Matrix
 */


function entry(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      r = _this$size2[0],
      c = _this$size2[1];

  if (row >= r || col >= c) {
    throw new Error(OVERFLOW_INDEX);
  }

  return A[row][col];
}

;
module.exports = entry;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js ***!
  \***********************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Flatten the matrix to an array
 * @memberof Matrix
 * @instance
 * @returns {Array} A flatten array
 */
function flatten() {
  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  var length = row * col;
  var arr = new Array(length);

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      arr[i * col + j] = this._matrix[i][j];
    }
  }

  return arr;
}

;
module.exports = flatten;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Generate a matrix from an array with compatible dimensions 
 * @memberof Matrix
 * @static
 * @param {Array} arr - Source array
 * @param {number} row - Row of the matrix
 * @param {number} col - Column of the matrix
 * @returns {Matrix} Matrix
 */


function fromArray(arr, row, col) {
  if (row * col !== arr.length) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  return this.generate(row, col, function (i, j) {
    return arr[i * col + j];
  });
}

;
module.exports = fromArray;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/generate.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/generate.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/empty.js");
/**
 * This callback generates each entry of a Matrix
 * @callback generateCallback
 * @param {number} i - The i-th row of Matrix 
 * @param {number} j - The j-th column of Matrix 
 * @returns {number} Entry of Matrix
 */

/**
 * Generates a Matrix which entries are the returned value of callback function.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of Matrix
 * @param {number} col - Number of columns of Matrix
 * @param {generateCallback} cb - Callback function which takes row and column as arguments
 * and generates the corresponding entry
 * @returns {Matrix} - Generated Matrix
 */


function generate(row, col, cb) {
  var matrix = empty(row, col);

  if (row === 0 || col === 0) {
    return new this([]);
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      matrix[i][j] = cb(i, j);
    }
  }

  return new this(matrix);
}

;
module.exports = generate;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the entries on the main diagonal.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {number[]} Array of entries of A on the main diagonal
 */


function getDiag(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var matrix = A._matrix;
  var diags = new Array(size);

  for (var i = 0; i < size; i++) {
    diags[i] = matrix[i][i];
  }

  return diags;
}

;
module.exports = getDiag;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Generates a random Matrix.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of a Matrix
 * @param {number} col - Number of columns of a Matrix
 * @param {number} min - Lower bound of each entry
 * @param {number} max - Upper bound of each entry
 * @param {number} toFixed - Number of decimal places
 * @returns {Matrix} Generated random Matrix
 */
function getRandomMatrix(row, col) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var toFixed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return this.generate(row, col, function () {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed));
  });
}

;
module.exports = getRandomMatrix;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/identity.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/identity.js ***!
  \************************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Generates identity Matrix with given size.
 * @memberof Matrix
 * @static
 * @param {number} size - The size of Matrix
 * @returns {Matrix} Identity Matrix
 */
function identity(size) {
  return this.generate(size, size, function (i, j) {
    if (i === j) {
      return 1;
    }

    return 0;
  });
}

;
module.exports = identity;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Determines whether two Matrices are considered as equal.<br><br>
 * 
 * The test criterion is Math.abs(x - y) < 1 / (10 ** digit * 2).
 * For default value 5, it should be 5e-5.
 * That means if the difference of two numbers is less than 5e-5,
 * they are considered as same value.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix
 * @param {number} digit - Number of significant digits
 * @returns {boolean} Returns true if two Matrices are considered as same
 */


function isEqual(A, B) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      Arow = _A$size2[0],
      Acol = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      Brow = _B$size2[0],
      Bcol = _B$size2[1];

  if (Arow !== Brow || Acol !== Bcol) {
    return false;
  }

  var EPISILON = 1 / (Math.pow(10, digit) * 2);
  var matrixA = A._matrix;
  var matrixB = B._matrix;

  for (var i = 0; i < Arow; i++) {
    for (var j = 0; j < Acol; j++) {
      if (Math.abs(matrixA[i][j] - matrixB[i][j]) >= EPISILON) {
        return false;
      }
    }
  }

  return true;
}

;
module.exports = isEqual;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/row.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/row.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_ROW = _require.OVERFLOW_ROW,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the row of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid row index
 * @returns {Matrix} Row of A
 */


function row(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      r = _A$size2[0],
      c = _A$size2[1];

  if (index >= r) {
    throw new Error(OVERFLOW_ROW);
  }

  var matrix = A._matrix;
  return this.generate(1, c, function (i, j) {
    return matrix[index][j];
  });
}

;
module.exports = row;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    EXPECTED_STRING_NUMBER_AT_POS_1_2 = _require.EXPECTED_STRING_NUMBER_AT_POS_1_2,
    INVALID_ROW = _require.INVALID_ROW,
    INVALID_COLUMN = _require.INVALID_COLUMN,
    OVERFLOW_ROW = _require.OVERFLOW_ROW,
    INVALID_ROWS_EXPRESSION = _require.INVALID_ROWS_EXPRESSION,
    INVALID_COLUMNS_EXPRESSION = _require.INVALID_COLUMNS_EXPRESSION,
    OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN;
/**
 * Generates a submatrix of a matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {string|number} rows - Rows expression
 * @param {string|number} cols - Columns expression
 * @returns {Matrix} Submatrix of A
 */


function submatrix(A, rows, cols) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var arg1Type = _typeof(rows);

  var arg2Type = _typeof(cols);

  if (arg1Type !== 'string' && arg1Type !== 'number' || arg2Type !== 'string' && arg2Type !== 'number') {
    throw new Error(EXPECTED_STRING_NUMBER_AT_POS_1_2);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var rowStart;
  var rowEnd;
  var colStart;
  var colEnd;

  if (arg1Type === 'number') {
    if (!Number.isInteger(rows) || rows < 0) {
      throw new Error(INVALID_ROW);
    }

    if (rows >= row) {
      throw new Error(OVERFLOW_ROW);
    }

    rowStart = rows;
    rowEnd = rows;
  } else {
    // string
    var arg = rows.split(':');

    if (arg.length !== 2) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }

    var _arg = _slicedToArray(arg, 2),
        r1 = _arg[0],
        r2 = _arg[1];

    if (r1 === '') {
      rowStart = 0;
    } else {
      var r = Number(r1);

      if (!Number.isInteger(r) || r < 0) {
        throw new Error(INVALID_ROW);
      }

      if (r >= row) {
        throw new Error(OVERFLOW_ROW);
      }

      rowStart = r;
    }

    if (r2 === '') {
      rowEnd = row - 1;
    } else {
      var _r = Number(r2);

      if (!Number.isInteger(_r) || _r < 0) {
        throw new Error(INVALID_ROW);
      }

      if (_r >= row) {
        throw new Error(OVERFLOW_ROW);
      }

      rowEnd = _r;
    }

    if (rowStart > rowEnd) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }
  }

  if (arg2Type === 'number') {
    if (!Number.isInteger(cols) || cols < 0) {
      throw new Error(INVALID_COLUMN);
    }

    if (cols >= col) {
      throw new Error(OVERFLOW_COLUMN);
    }

    colStart = cols;
    colEnd = cols;
  } else {
    // string
    var _arg2 = cols.split(':');

    if (_arg2.length !== 2) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }

    var _arg3 = _slicedToArray(_arg2, 2),
        c1 = _arg3[0],
        c2 = _arg3[1];

    if (c1 === '') {
      colStart = 0;
    } else {
      var c = Number(c1);

      if (!Number.isInteger(c) || c < 0) {
        throw new Error(INVALID_COLUMN);
      }

      if (c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }

      colStart = c;
    }

    if (c2 === '') {
      colEnd = col - 1;
    } else {
      var _c = Number(c2);

      if (!Number.isInteger(_c) || _c < 0) {
        throw new Error(INVALID_COLUMN);
      }

      if (_c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }

      colEnd = _c;
    }

    if (colStart > colEnd) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }
  }

  var matrix = A._matrix;
  var subRow = rowEnd - rowStart + 1;
  var subCol = colEnd - colStart + 1;
  var subMatrix = new Array(subRow);

  for (var i = rowStart; i <= rowEnd; i++) {
    var newRow = new Array(subCol);

    for (var j = colStart; j <= colEnd; j++) {
      newRow[j - colStart] = matrix[i][j];
    }

    subMatrix[i - rowStart] = newRow;
  }

  return new this(subMatrix);
}

;
module.exports = submatrix;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/toString.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/toString.js ***!
  \************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Gets the stringified Matrix
 * @memberof Matrix
 * @instance
 * @returns {string} Stringified Matrix
 */
function toString() {
  var matrix = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  var str = '';

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      str += matrix[i][j].toString();

      if (j !== col - 1) {
        str += ' ';
      }
    }

    if (i !== row - 1) {
      str += '\n';
    }
  }

  return str;
}

;
module.exports = toString;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/zero.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/zero.js ***!
  \********************************************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Generates a zero Matrix
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of the Matrix
 * @param {number} col - Number of columns of the Matrix
 * @returns {Matrix} Zero Matrix
 */
function zero(row, col) {
  if (col === undefined) {
    return this.generate(row, row, function () {
      return 0;
    });
  }

  return this.generate(row, col, function () {
    return 0;
  });
}

;
module.exports = zero;

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isMatrix = __webpack_require__(/*! ./util/isMatrix */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isMatrix.js");

var _require = __webpack_require__(/*! ./Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Creates a new Matrix
 * @namespace Matrix
 * @class
 * @param {number[][]} A - Two dimensional array where
 * A[i][j] represents the i-th row and j-th column of a matrix
 */


function Matrix(A) {
  if (!isMatrix(A)) {
    throw new Error(INVALID_MATRIX);
  }

  this._matrix = A;
  this._digit = 8;
}

module.exports = Matrix; // structure

Matrix.prototype.isDiagonal = __webpack_require__(/*! ./core/structure/isDiagonal */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js");
Matrix.prototype.isSkewSymmetric = __webpack_require__(/*! ./core/structure/isSkewSymmetric */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js");
Matrix.prototype.isSquare = __webpack_require__(/*! ./core/structure/isSquare */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js");
Matrix.prototype.isSymmetric = __webpack_require__(/*! ./core/structure/isSymmetric */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js");
Matrix.prototype.isLowerTriangular = __webpack_require__(/*! ./core/structure/isLowerTriangular */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js");
Matrix.prototype.isUpperTriangular = __webpack_require__(/*! ./core/structure/isUpperTriangular */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js");
Matrix.prototype.isOrthogonal = __webpack_require__(/*! ./core/structure/isOrthogonal */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js"); // property

Matrix.prototype.cond = __webpack_require__(/*! ./core/properties/cond */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/cond.js");
Matrix.prototype.det = __webpack_require__(/*! ./core/properties/det */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/det.js");
Matrix.prototype.eigenvalues = __webpack_require__(/*! ./core/properties/eigenvalues */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js");
Matrix.prototype.nullity = __webpack_require__(/*! ./core/properties/nullity */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js");
Matrix.prototype.norm = __webpack_require__(/*! ./core/properties/norm */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/norm.js");
Matrix.prototype.rank = __webpack_require__(/*! ./core/properties/rank */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/rank.js");
Matrix.prototype.size = __webpack_require__(/*! ./core/properties/size */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/size.js");
Matrix.prototype.trace = __webpack_require__(/*! ./core/properties/trace */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/properties/trace.js"); // operations

Matrix.add = __webpack_require__(/*! ./core/operations/add */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/add.js");
Matrix.inverse = __webpack_require__(/*! ./core/operations/inverse */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js");
Matrix.multiply = __webpack_require__(/*! ./core/operations/multiply */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js");
Matrix.pow = __webpack_require__(/*! ./core/operations/pow */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/pow.js");
Matrix.subtract = __webpack_require__(/*! ./core/operations/subtract */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js");
Matrix.transpose = __webpack_require__(/*! ./core/operations/transpose */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js"); // Linear-equations

Matrix.backward = __webpack_require__(/*! ./core/linear-equations/backward */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js");
Matrix.forward = __webpack_require__(/*! ./core/linear-equations/forward */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js");
Matrix.solve = __webpack_require__(/*! ./core/linear-equations/solve */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js"); // decompositions

Matrix.LU = __webpack_require__(/*! ./core/decompositions/LU */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js");
Matrix.QR = __webpack_require__(/*! ./core/decompositions/QR */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js"); // utils

Matrix.clone = __webpack_require__(/*! ./core/utils/clone */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/clone.js");
Matrix.column = __webpack_require__(/*! ./core/utils/column */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/column.js");
Matrix.diag = __webpack_require__(/*! ./core/utils/diag */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/diag.js");
Matrix.elementwise = __webpack_require__(/*! ./core/utils/elementwise */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js");
Matrix.generate = __webpack_require__(/*! ./core/utils/generate */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/generate.js");
Matrix.getDiag = __webpack_require__(/*! ./core/utils/getDiag */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js");
Matrix.getRandomMatrix = __webpack_require__(/*! ./core/utils/getRandomMatrix */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js");
Matrix.identity = __webpack_require__(/*! ./core/utils/identity */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/identity.js");
Matrix.isEqual = __webpack_require__(/*! ./core/utils/isEqual */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js");
Matrix.row = __webpack_require__(/*! ./core/utils/row */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/row.js");
Matrix.submatrix = __webpack_require__(/*! ./core/utils/submatrix */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js");
Matrix.zero = __webpack_require__(/*! ./core/utils/zero */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/zero.js");
Matrix.fromArray = __webpack_require__(/*! ./core/utils/fromArray */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js");
Matrix.prototype.flatten = __webpack_require__(/*! ./core/utils/flatten */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js");
Matrix.prototype.entry = __webpack_require__(/*! ./core/utils/entry */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/entry.js");
Matrix.prototype.toString = __webpack_require__(/*! ./core/utils/toString */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/core/utils/toString.js");

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/empty.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/empty.js ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../Error */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL;

module.exports = function empty(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  if (row === 0 || col === 0) {
    return [];
  }

  var matrix = new Array(row);

  for (var i = 0; i < row; i++) {
    matrix[i] = new Array(col);
  }

  return matrix;
};

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isMatrix.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isMatrix.js ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isNumber = __webpack_require__(/*! ./isNumber */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isNumber.js");

module.exports = function isMatrix(matrix) {
  if (!Array.isArray(matrix)) {
    return false;
  }

  var height = matrix.length;

  if (height === 0) {
    return true; // [] represents empty matrix (0 x 0 matrix)
  }

  var firstRow = matrix[0];

  if (!Array.isArray(firstRow)) {
    return false;
  }

  var width = firstRow.length;

  if (width === 0) {
    return false; // [ [] ] is not allowed
  }

  for (var i = 0; i < height; i++) {
    var row = matrix[i];

    if (!Array.isArray(row) || row.length !== width) {
      return false;
    }

    for (var j = 0; j < width; j++) {
      if (!isNumber(row[j])) {
        return false;
      }
    }
  }

  return true;
};

/***/ }),

/***/ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isNumber.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/util/isNumber.js ***!
  \******************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isNumber(_int) {
  return Number.isFinite(_int);
};

/***/ }),

/***/ "./node_modules/.pnpm/matrix-inverse@2.0.0/node_modules/matrix-inverse/matrix-inverse.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/.pnpm/matrix-inverse@2.0.0/node_modules/matrix-inverse/matrix-inverse.js ***!
  \***********************************************************************************************/
/***/ ((module) => {

var Sylvester = {}

Sylvester.Matrix = function () {}

Sylvester.Matrix.create = function (elements) {
  var M = new Sylvester.Matrix()
  return M.setElements(elements)
}

Sylvester.Matrix.I = function (n) {
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
  dup: function () {
    return Sylvester.Matrix.create(this.elements)
  },

  isSquare: function () {
    var cols = this.elements.length === 0 ? 0 : this.elements[0].length
    return this.elements.length === cols
  },

  toRightTriangular: function () {
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

  determinant: function () {
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

  isSingular: function () {
    return this.isSquare() && this.determinant() === 0
  },

  augment: function (matrix) {
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

  inverse: function () {
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

  setElements: function (els) {
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

module.exports = function (elements) {
  const mat = Sylvester.Matrix.create(elements).inverse()
  if (mat !== null) {
    return mat.elements
  } else {
    return null
  }
}


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/index.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/index.js");


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/add.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/add.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/elem-wise.js");
/**
* Add matrixes together
* @param {...Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
module.exports = function add(...args) {
	return elemWise(args, args2 => {
		return args2.reduce((a, b) => {
			if (a === null || b === null) {
				return null;
			}

			return a + b;
		}, 0);
	});
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/cos-similarity.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/cos-similarity.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotProduct = __webpack_require__(/*! ./dot-product.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/dot-product.js");
const norm = __webpack_require__(/*! ./norm.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/norm.js");

/**
 * Calculates the cosine similarity between two vectors.
 * @param {number[]} vector1 The first vector.
 * @param {number[]} vector2 The second vector.
 * @returns {number} The cosine similarity between the two vectors.
 * @throws {Error} If the lengths of the vectors do not match.
 */
module.exports = function cosSimilarity(vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw (new Error('The lengths of the vectors do not match'));
	}

	const normProd = (norm(vector1) * norm(vector2));

	if (normProd === 0) {
		return 0;
	}

	return dotProduct(vector1, vector2) / normProd;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/diag-block.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/diag-block.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const identity = __webpack_require__(/*! ./identity.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/identity.js");

/**
 * Constructs a block diagonal matrix from the given blocks.
 * @param {Object} options The options object.
 * @param {number[][][]} options.blocks The blocks to form the diagonal matrix.
 * @param {number[]} [options.order=null] Optional order for arranging the blocks.
 * @returns {number[][]} The block diagonal matrix.
 */
module.exports = function diagBlock({blocks, order = null}) {
	const dimL = blocks.map(a => a.length).reduce((a, b) => a + b, 0);
	const result = identity(dimL);
	let current = 0;
	for (const mat of blocks) {
		for (const [i] of mat.entries()) {
			for (const [j] of mat.entries()) {
				result[i + current][j + current] = mat[i][j];
			}
		}

		current += mat.length;
	}

	if (order) {
		return order.map(i => order.map(j => result[i][j]));
	}

	return result;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/diag.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/diag.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const zeros = __webpack_require__(/*! ./zeros */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/zeros.js");

/**
 * Constructs a diagonal matrix from the given array.
 * @param {number[]} diagonal The array representing the diagonal elements of the matrix.
 * @returns {number[][]} The diagonal matrix.
 */
module.exports = function diag(diagonal) {
	const result = zeros(diagonal.length, diagonal.length);
	for (const [i, element] of diagonal.entries()) {
		result[i][i] = element;
	}
	return result;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/dot-product.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/dot-product.js ***!
  \**********************************************************************************************/
/***/ ((module) => {

/**
 * Calculates the dot product of two vectors.
 * @param {number[]} vector1 The first vector.
 * @param {number[]} vector2 The second vector.
 * @returns {number} The dot product of the two vectors.
 * @throws {Error} If the lengths of the vectors do not match.
 */
module.exports = function dotProduct(vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw (new Error('Lengths not maching'));
	}

	let result = 0;
	for (const [i, element] of vector1.entries()) {
		result += element * vector2[i];
	}

	return result;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/elem-wise.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/elem-wise.js ***!
  \********************************************************************************************/
/***/ ((module) => {

/**
* @callback elemWiseCb
* @param {Array.<Number>} arr
* @param {Number} rowId
* @param {Number} colId
*/
/**
* Run a function on cell per cell for each Matrixes
* @param {<Array.<Array.<Array.<Number>>>} arrMatrixes list of matrixes
* @param {elemWiseCb} fn
* @returns {Array.<Array.<Number>>} resulting matrix
* @example
// this will do m1 + m2 + m3 + m4 on matrixes
elemWise([m1, m2, m3, m4], args2 => {
	return args2.reduce((a, b) => a + b, 0);
});
*/

module.exports = function elemWise(arrayMatrixes, fn) {
	return arrayMatrixes[0].map((row, rowId) => {
		return row.map((cell, colId) => {
			const array = arrayMatrixes.map(m => m[rowId][colId]);
			return fn(array, rowId, colId);
		});
	});
};



/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/euclidean-dist.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/euclidean-dist.js ***!
  \*************************************************************************************************/
/***/ ((module) => {

/**
 * Calculates the Euclidean distance between two vectors.
 * @param {number[]} array1 The first vector.
 * @param {number[]} array2 The second vector.
 * @returns {number} The Euclidean distance between the two vectors.
 * @throws {Error} If the arrays have different lengths or if either array is not an array.
 */
module.exports = function euclideanDist(array1, array2) {
	if (array1.length !== array2.length) {
		throw new Error('Invalid array lengths');
	}

	if (!Array.isArray(array1)) {
		console.log({array1});
		throw new Error('Invalid array');
	}

	const diff = array1.map((element, index) => element - array2[index]).map(element => element * element);
	return Math.sqrt(diff.reduce((a, b) => a + b));
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/frobenius.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/frobenius.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const trace = __webpack_require__(/*! ./trace.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/trace.js");
const transpose = __webpack_require__(/*! ./transpose.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/transpose.js");
const matSub = __webpack_require__(/*! ./subtract.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/subtract.js");
const matMul = __webpack_require__(/*! ./mat-mul.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-mul.js");
const sum = __webpack_require__(/*! ./sum.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum.js");

/**
 * Calculates the Frobenius norm of the given matrices or vectors.
 * [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm)
 * @param {number[][]} [array1] The first matrix or vector (optional).
 * @param {number[][]} [array2] The second matrix or vector (optional).
 * @returns {number} The Frobenius norm of the matrices or vectors.
 */
module.exports = function frobenius(array1, array2) {
	if (array1 === undefined) {
		return sum(array2);
	}

	if (array2 === undefined) {
		return sum(array1);
	}

	const m = matSub(array1, array2);
	const p = matMul(transpose(m), m);
	return Math.sqrt(trace(p));
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/identity.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/identity.js ***!
  \*******************************************************************************************/
/***/ ((module) => {

/**
 * build an identity square matrix
 * @param stateSize matrix size
 */
module.exports = function identity(stateSize) {
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


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/index.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
	add: __webpack_require__(/*! ./add.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/add.js"),
	cosSimilarity: __webpack_require__(/*! ./cos-similarity */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/cos-similarity.js"),
	euclideanDist: __webpack_require__(/*! ./euclidean-dist */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/euclidean-dist.js"),
	diag: __webpack_require__(/*! ./diag.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/diag.js"),
	diagBlock: __webpack_require__(/*! ./diag-block */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/diag-block.js"),
	dotProduct: __webpack_require__(/*! ./dot-product */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/dot-product.js"),
	elemWise: __webpack_require__(/*! ./elem-wise.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/elem-wise.js"),
	frobenius: __webpack_require__(/*! ./frobenius.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/frobenius.js"),
	identity: __webpack_require__(/*! ./identity.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/identity.js"),
	invert: __webpack_require__(/*! ./invert.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/invert.js"),
	mapMatrix: __webpack_require__(/*! ./map-matrix.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/map-matrix.js"),
	matMul: __webpack_require__(/*! ./mat-mul.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-mul.js"),
	matPermutation: __webpack_require__(/*! ./mat-permutation.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-permutation.js"),
	padWithZeroCols: __webpack_require__(/*! ./pad-with-zero-cols.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/pad-with-zero-cols.js"),
	subtract: __webpack_require__(/*! ./subtract.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/subtract.js"),
	subSquareMatrix: __webpack_require__(/*! ./sub-square-matrix.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sub-square-matrix.js"),
	sum: __webpack_require__(/*! ./sum.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum.js"),
	trace: __webpack_require__(/*! ./trace.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/trace.js"),
	transpose: __webpack_require__(/*! ./transpose.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/transpose.js"),
	zeros: __webpack_require__(/*! ./zeros.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/zeros.js"),
	norm: __webpack_require__(/*! ./norm.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/norm.js"),
	sumVector: __webpack_require__(/*! ./sum-vector.js */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum-vector.js"),
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/invert.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/invert.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const matrixInverse = __webpack_require__(/*! matrix-inverse */ "./node_modules/.pnpm/matrix-inverse@2.0.0/node_modules/matrix-inverse/matrix-inverse.js");

module.exports = function invert(m) {
	return matrixInverse(m);
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/map-matrix.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/map-matrix.js ***!
  \*********************************************************************************************/
/***/ ((module) => {

/**
 * Maps a function over each element of the given matrix.
 * @param {Array<Array<any>>} a The matrix to map over.
 * @param {function(any, number, number): any} fn The mapping function to apply.
 * @returns {Array<Array<any>>} The matrix with the function applied to each element.
 */
module.exports = function mapMatrix(a, fn) {
	return a.map((row, rowId) => row.map((cell, colId) => fn(cell, rowId, colId)));
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-mul.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-mul.js ***!
  \******************************************************************************************/
/***/ ((module) => {

/**
* Multiply 2 matrixes together
* @param {Array.<Array.<Number>>} m1
* @param {Array.<Array.<Number>>} m2
* @returns {Array.<Array.<Number>>}
*/
module.exports = function matMul(m1, m2) {
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
					break;
				}
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = isNull ? null : sum;
		}
	}

	return result;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-permutation.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-permutation.js ***!
  \**************************************************************************************************/
/***/ ((module) => {

/**
 *
 * @param {Array.<Array.<Number>>} matrix
 * @param {[Number, Number]} outputSize
 * @param {Array.<Number>} rowIndexes the permutation indexes, result[j][k] = matrix[rowIndexes.indexOf(j)][colIndexes.indexOf(k)]
 * @param {Array.<Number>} colIndexes the permutation indexes, result[j][k] = matrix[rowIndexes.indexOf(j)][colIndexes.indexOf(k)]
 * @returns {Array.<Array.<Number>>}
 */
module.exports = function matPermutation({
	matrix,
	outputSize,
	rowIndexes,
	colIndexes,
}) {
	const [nRow, nCol] = outputSize;

	if (!Array.isArray(rowIndexes)) {
		throw (new TypeError(`Invalid rowIndexes ${rowIndexes}`));
	}

	if (!Array.isArray(colIndexes)) {
		throw (new TypeError(`Invalid colIndexes ${colIndexes}`));
	}

	return new Array(nRow).fill(0).map((_, i) => new Array(nCol).fill(0).map((_, j) => {
		if (colIndexes.includes(j) && rowIndexes.includes(i)) {
			return matrix[rowIndexes.indexOf(i)][colIndexes.indexOf(j)];
		}

		return 0;
	}));
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/norm.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/norm.js ***!
  \***************************************************************************************/
/***/ ((module) => {

/**
 * Calculates the Euclidean norm of the given vector.
 * @param {number[]} vector The vector for which to calculate the Euclidean norm.
 * @returns {number} The Euclidean norm of the vector.
 */
module.exports = function norm(vector) {
	let result = 0;
	for (const element of vector) {
		result += (element * element);
	}
	return Math.sqrt(result);
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/pad-with-zero-cols.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/pad-with-zero-cols.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const matPermutation = __webpack_require__(/*! ./mat-permutation */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/mat-permutation.js");
/**
* This function returns the padded matrix with zeros with respect to a given
* target columns number
* @param {Array.<Array.<Number>>} matrix the matrix we need to pad
* @param {Number} columns in our case, the dynamic dimension
* @returns {Array.<Array.<Number>>} padded matrix
*/
module.exports = function (matrix, {columns}) {
	if (columns < matrix[0].length) {
		throw (new TypeError(`Output columns ${columns} is greater than input columns ${matrix[0].length}`));
	}

	return matPermutation({
		matrix,
		outputSize: [matrix.length, columns],
		rowIndexes: new Array(matrix.length).fill(0).map((_, index) => index),
		colIndexes: new Array(matrix[0].length).fill(0).map((_, index) => index),
	});
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sub-square-matrix.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sub-square-matrix.js ***!
  \****************************************************************************************************/
/***/ ((module) => {

/**
 * Extracts a sub-square matrix from the provided matrix based on the given indexes.
 * @param {number[][]} mat The matrix from which to extract the sub-square matrix.
 * @param {number[]} indexes The indexes to select rows and columns from the matrix.
 * @returns {number[][]} The sub-square matrix extracted from the original matrix.
 */
module.exports = function subSquareMatrix(mat, indexes) {
	return indexes.map(s1 => indexes.map(s2 => mat[s1][s2]));
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/subtract.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/subtract.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/elem-wise.js");

module.exports = function subtract(...args) {
	return elemWise(args, ([a, b]) => a - b);
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum-vector.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum-vector.js ***!
  \*********************************************************************************************/
/***/ ((module) => {

/**
 * Sums all the elements of the given vector.
 * @param {number[]} vector The vector whose elements are to be summed.
 * @returns {number} The sum of all elements in the vector.
 */
module.exports = function sumVector(vector) {
	let s = 0;
	for (const element of vector) {
		s += element;
	}
	return s;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const sumVector = __webpack_require__(/*! ./sum-vector */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/sum-vector.js");

// Sum all the terms of a given matrix
module.exports = function sum(array) {
	let s = 0;
	for (const element of array) {
		s += sumVector(element);
	}

	return s;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/trace.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/trace.js ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = function trace(array) {
	let diag = 0;
	for (const [row, element] of array.entries()) {
		diag += element[row];
	}
	return diag;
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/transpose.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/transpose.js ***!
  \********************************************************************************************/
/***/ ((module) => {

/**
 * Transposes the given 2D array.
 * @param {Array<Array<any>>} array The 2D array to transpose.
 * @returns {Array<Array<any>>} The transposed 2D array.
 */
module.exports = function transpose(array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};


/***/ }),

/***/ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/zeros.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/lib/zeros.js ***!
  \****************************************************************************************/
/***/ ((module) => {

/**
 * Generates a 2D array filled with zeros with the specified number of rows and columns.
 * @param {number} rows The number of rows for the 2D array.
 * @param {number} cols The number of columns for the 2D array.
 * @returns {number[][]} A 2D array filled with zeros.
 */
module.exports = function zeros(rows, cols) {
	return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
};


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.projectObservation = exports.covarianceToCorrelation = exports.correlationToCovariance = exports.checkCovariance = exports.State = exports.getCovariance = exports.KalmanFilter = void 0;
const modelCollection = __importStar(__webpack_require__(/*! ./lib/model-collection */ "./lib/model-collection.ts"));
const defaultDynamicModels = __importStar(__webpack_require__(/*! ./lib/dynamic */ "./lib/dynamic/index.ts"));
const defaultObservationModels = __importStar(__webpack_require__(/*! ./lib/observation */ "./lib/observation/index.ts"));
function camelToDash(str) {
    if (str === str.toLowerCase()) {
        return str;
    }
    return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}
Object.keys(defaultDynamicModels).forEach((k) => {
    modelCollection.registerDynamic(camelToDash(k), defaultDynamicModels[k]);
});
Object.keys(defaultObservationModels).forEach((k) => {
    modelCollection.registerObservation(camelToDash(k), defaultObservationModels[k]);
});
__exportStar(__webpack_require__(/*! ./lib/model-collection */ "./lib/model-collection.ts"), exports);
__exportStar(__webpack_require__(/*! ./lib/dynamic */ "./lib/dynamic/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./lib/observation */ "./lib/observation/index.ts"), exports);
var kalman_filter_1 = __webpack_require__(/*! ./lib/kalman-filter */ "./lib/kalman-filter.ts");
Object.defineProperty(exports, "KalmanFilter", ({ enumerable: true, get: function () { return __importDefault(kalman_filter_1).default; } }));
var get_covariance_1 = __webpack_require__(/*! ./lib/utils/get-covariance */ "./lib/utils/get-covariance.ts");
Object.defineProperty(exports, "getCovariance", ({ enumerable: true, get: function () { return __importDefault(get_covariance_1).default; } }));
var state_1 = __webpack_require__(/*! ./lib/state */ "./lib/state.ts");
Object.defineProperty(exports, "State", ({ enumerable: true, get: function () { return __importDefault(state_1).default; } }));
var check_covariance_1 = __webpack_require__(/*! ./lib/utils/check-covariance */ "./lib/utils/check-covariance.ts");
Object.defineProperty(exports, "checkCovariance", ({ enumerable: true, get: function () { return __importDefault(check_covariance_1).default; } }));
var correlation_to_covariance_1 = __webpack_require__(/*! ./lib/utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.ts");
Object.defineProperty(exports, "correlationToCovariance", ({ enumerable: true, get: function () { return __importDefault(correlation_to_covariance_1).default; } }));
var covariance_to_correlation_1 = __webpack_require__(/*! ./lib/utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.ts");
Object.defineProperty(exports, "covarianceToCorrelation", ({ enumerable: true, get: function () { return __importDefault(covariance_to_correlation_1).default; } }));
var project_observation_1 = __webpack_require__(/*! ./lib/utils/project-observation */ "./lib/utils/project-observation.ts");
Object.defineProperty(exports, "projectObservation", ({ enumerable: true, get: function () { return __importDefault(project_observation_1).default; } }));


/***/ }),

/***/ "./lib/core-kalman-filter.ts":
/*!***********************************!*\
  !*** ./lib/core-kalman-filter.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const state_1 = __importDefault(__webpack_require__(/*! ./state */ "./lib/state.ts"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/check-matrix */ "./lib/utils/check-matrix.ts"));
const defaultLogger = {
    info: (...args) => console.log(...args),
    debug() { },
    warn: (...args) => console.log(...args),
    error: (...args) => console.log(...args),
};
class CoreKalmanFilter {
    dynamic;
    observation;
    logger;
    constructor(options) {
        const { dynamic, observation, logger = defaultLogger } = options;
        this.dynamic = dynamic;
        this.observation = observation;
        this.logger = logger;
    }
    getValue(fn, options) {
        return (typeof (fn) === 'function' ? fn(options) : fn);
    }
    getInitState() {
        const { mean: meanInit, covariance: covarianceInit, index: indexInit } = this.dynamic.init;
        const initState = new state_1.default({
            mean: meanInit,
            covariance: covarianceInit,
            index: indexInit,
        });
        state_1.default.check(initState, { title: 'dynamic.init' });
        return initState;
    }
    getPredictedCovariance(options = {}) {
        let { previousCorrected, index } = options;
        previousCorrected = previousCorrected || this.getInitState();
        const getValueOptions = Object.assign({}, { previousCorrected, index }, options);
        const transition = this.getValue(this.dynamic.transition, getValueOptions);
        (0, check_matrix_1.default)(transition, [this.dynamic.dimension, this.dynamic.dimension], 'dynamic.transition');
        const transitionTransposed = (0, simple_linalg_1.transpose)(transition);
        const covarianceInter = (0, simple_linalg_1.matMul)(transition, previousCorrected.covariance);
        const covariancePrevious = (0, simple_linalg_1.matMul)(covarianceInter, transitionTransposed);
        const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);
        const covariance = (0, simple_linalg_1.add)(dynCov, covariancePrevious);
        (0, check_matrix_1.default)(covariance, [this.dynamic.dimension, this.dynamic.dimension], 'predicted.covariance');
        return covariance;
    }
    predictMean(o) {
        const mean = this.predictMeanWithoutControl(o);
        if (!this.dynamic.constant) {
            return mean;
        }
        const { opts } = o;
        const control = this.dynamic.constant(opts);
        (0, check_matrix_1.default)(control, [this.dynamic.dimension, 1], 'dynamic.constant');
        return (0, simple_linalg_1.add)(mean, control);
    }
    predictMeanWithoutControl({ opts, transition }) {
        if (this.dynamic.fn) {
            return this.dynamic.fn(opts);
        }
        const { previousCorrected } = opts;
        return (0, simple_linalg_1.matMul)(transition, previousCorrected.mean);
    }
    predict(options = {}) {
        let { previousCorrected, index } = options;
        previousCorrected = previousCorrected || this.getInitState();
        if (typeof (index) !== 'number' && typeof (previousCorrected.index) === 'number') {
            index = previousCorrected.index + 1;
        }
        state_1.default.check(previousCorrected, { dimension: this.dynamic.dimension });
        const getValueOptions = Object.assign({}, options, {
            previousCorrected,
            index,
        });
        const transition = this.getValue(this.dynamic.transition, getValueOptions);
        const mean = this.predictMean({ transition, opts: getValueOptions });
        const covariance = this.getPredictedCovariance(getValueOptions);
        const predicted = new state_1.default({ mean, covariance, index });
        this.logger.debug('Prediction done', predicted);
        if (Number.isNaN(predicted.mean[0][0])) {
            throw (new TypeError('nan'));
        }
        return predicted;
    }
    getGain(options) {
        let { predicted, stateProjection } = options;
        const getValueOptions = Object.assign({}, { index: predicted.index }, options);
        stateProjection = stateProjection || this.getValue(this.observation.stateProjection, getValueOptions);
        const obsCovariance = this.getValue(this.observation.covariance, getValueOptions);
        (0, check_matrix_1.default)(obsCovariance, [this.observation.dimension, this.observation.dimension], 'observation.covariance');
        const stateProjTransposed = (0, simple_linalg_1.transpose)(stateProjection);
        (0, check_matrix_1.default)(stateProjection, [this.observation.dimension, this.dynamic.dimension], 'observation.stateProjection');
        const noiselessInnovation = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(stateProjection, predicted.covariance), stateProjTransposed);
        const innovationCovariance = (0, simple_linalg_1.add)(noiselessInnovation, obsCovariance);
        const optimalKalmanGain = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(predicted.covariance, stateProjTransposed), (0, simple_linalg_1.invert)(innovationCovariance));
        return optimalKalmanGain;
    }
    getCorrectedCovariance(options) {
        let { predicted, optimalKalmanGain, stateProjection } = options;
        const identity = (0, simple_linalg_1.identity)(predicted.covariance.length);
        if (!stateProjection) {
            const getValueOptions = Object.assign({}, { index: predicted.index }, options);
            stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
        }
        if (!optimalKalmanGain) {
            optimalKalmanGain = this.getGain(Object.assign({ stateProjection }, options));
        }
        return (0, simple_linalg_1.matMul)((0, simple_linalg_1.subtract)(identity, (0, simple_linalg_1.matMul)(optimalKalmanGain, stateProjection)), predicted.covariance);
    }
    getPredictedObservation(args) {
        const { opts, stateProjection } = args;
        if (this.observation.fn) {
            return this.observation.fn(opts);
        }
        const { predicted } = opts;
        return (0, simple_linalg_1.matMul)(stateProjection, predicted.mean);
    }
    correct(options) {
        const { predicted, observation } = options;
        state_1.default.check(predicted, { dimension: this.dynamic.dimension });
        if (!observation) {
            throw (new Error('no measure available'));
        }
        const getValueOptions = Object.assign({}, { observation, predicted, index: predicted.index }, options);
        const stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
        const optimalKalmanGain = this.getGain(Object.assign({ predicted, stateProjection }, options));
        const innovation = (0, simple_linalg_1.subtract)(observation, this.getPredictedObservation({ stateProjection, opts: getValueOptions }));
        const mean = (0, simple_linalg_1.add)(predicted.mean, (0, simple_linalg_1.matMul)(optimalKalmanGain, innovation));
        if (Number.isNaN(mean[0][0])) {
            console.log({ optimalKalmanGain, innovation, predicted });
            throw (new TypeError('Mean is NaN after correction'));
        }
        const covariance = this.getCorrectedCovariance(Object.assign({ predicted, optimalKalmanGain, stateProjection }, options));
        const corrected = new state_1.default({ mean, covariance, index: predicted.index });
        this.logger.debug('Correction done', corrected);
        return corrected;
    }
}
exports["default"] = CoreKalmanFilter;


/***/ }),

/***/ "./lib/dynamic/composition.ts":
/*!************************************!*\
  !*** ./lib/dynamic/composition.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const model_collection_1 = __webpack_require__(/*! ../model-collection */ "./lib/model-collection.ts");
function composition({ perName }, observation) {
    const { observedProjection } = observation;
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
        const { dimension, transition, covariance, init } = (0, model_collection_1.buildDynamic)(perName[k], observation);
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
            }
            else {
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
        const { dynamicIndexes, init: localInit, } = confs[k];
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
            const { previousCorrected } = options;
            const resultTransition = new Array(totalDimension).fill(undefined).map(() => new Array(totalDimension).fill(0));
            dynamicNames.forEach(k => {
                const { dynamicIndexes, transition, } = confs[k];
                const options2 = Object.assign({}, options, { previousCorrected: previousCorrected.subState(dynamicIndexes) });
                const trans = transition(options2);
                dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
                    resultTransition[c1][c2] = trans[i1][i2];
                }));
            });
            return resultTransition;
        },
        covariance(options) {
            const { previousCorrected } = options;
            const resultCovariance = new Array(totalDimension).fill(undefined).map(() => new Array(totalDimension).fill(0));
            dynamicNames.forEach(k => {
                const { dynamicIndexes, covariance, } = confs[k];
                const options2 = Object.assign({}, options, { previousCorrected: previousCorrected.subState(dynamicIndexes) });
                const cov = covariance(options2);
                dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
                    resultCovariance[c1][c2] = cov[i1][i2];
                }));
            });
            return resultCovariance;
        },
    };
}
exports["default"] = composition;
;


/***/ }),

/***/ "./lib/dynamic/constant-acceleration.ts":
/*!**********************************************!*\
  !*** ./lib/dynamic/constant-acceleration.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
function constantAcceleration(dynamic, observation) {
    const timeStep = dynamic.timeStep || 1;
    const { observedProjection } = observation;
    const { stateProjection } = observation;
    const observationDimension = observation.dimension;
    let dimension;
    if (stateProjection && Number.isInteger(stateProjection[0].length / 3)) {
        dimension = observation.stateProjection[0].length;
    }
    else if (observedProjection) {
        dimension = observedProjection[0].length * 3;
    }
    else if (observationDimension) {
        dimension = observationDimension * 3;
    }
    else {
        throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
    }
    const baseDimension = dimension / 3;
    const transition = (0, simple_linalg_1.identity)(dimension);
    for (let i = 0; i < baseDimension; i++) {
        transition[i][i + baseDimension] = timeStep;
        transition[i][i + (2 * baseDimension)] = 0.5 * (timeStep ** 2);
        transition[i + baseDimension][i + (2 * baseDimension)] = timeStep;
    }
    const arrayCovariance = new Array(baseDimension).fill(1)
        .concat(new Array(baseDimension).fill(timeStep * timeStep))
        .concat(new Array(baseDimension).fill(timeStep ** 4));
    const covariance = dynamic.covariance || arrayCovariance;
    return Object.assign({}, dynamic, { dimension, transition, covariance });
}
exports["default"] = constantAcceleration;
;


/***/ }),

/***/ "./lib/dynamic/constant-position-with-null.ts":
/*!****************************************************!*\
  !*** ./lib/dynamic/constant-position-with-null.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const huge = 1e6;
function constantPositionWithNull({ staticCovariance, obsDynaIndexes, init }) {
    const dimension = obsDynaIndexes.length;
    if (!init) {
        init = {
            mean: new Array(obsDynaIndexes.length).fill(0).map(() => [0]),
            covariance: (0, simple_linalg_1.diag)(new Array(obsDynaIndexes.length).fill(huge)),
            index: -1,
        };
    }
    if (staticCovariance && staticCovariance.length !== dimension) {
        throw (new Error('staticCovariance has wrong size'));
    }
    return {
        dimension,
        transition() {
            return (0, simple_linalg_1.identity)(dimension);
        },
        covariance({ previousCorrected, index }) {
            const diffBetweenIndexes = index - previousCorrected.index;
            if (staticCovariance) {
                return staticCovariance.map(row => row.map(element => element * diffBetweenIndexes));
            }
            return (0, simple_linalg_1.identity)(dimension);
        },
        init,
    };
}
exports["default"] = constantPositionWithNull;
;


/***/ }),

/***/ "./lib/dynamic/constant-position.ts":
/*!******************************************!*\
  !*** ./lib/dynamic/constant-position.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
function constantPosition(dynamic, observation) {
    let { dimension } = dynamic;
    const observationDimension = observation.dimension;
    const { observedProjection } = observation;
    const { stateProjection } = observation;
    let { covariance } = dynamic;
    if (!dynamic.dimension) {
        if (observationDimension) {
            dimension = observationDimension;
        }
        else if (observedProjection) {
            dimension = observedProjection[0].length;
        }
        else if (stateProjection) {
            dimension = stateProjection[0].length;
        }
    }
    const transition = (0, simple_linalg_1.identity)(dimension);
    covariance = covariance || (0, simple_linalg_1.identity)(dimension);
    return Object.assign({}, dynamic, { dimension, transition, covariance });
}
exports["default"] = constantPosition;
;


/***/ }),

/***/ "./lib/dynamic/constant-speed-dynamic.ts":
/*!***********************************************!*\
  !*** ./lib/dynamic/constant-speed-dynamic.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
function constantSpeedDynamic(args, observation) {
    const { staticCovariance, avSpeed, center } = args;
    const observationDimension = observation.observedProjection[0].length;
    const dimension = 2 * observationDimension;
    if ((center) === undefined) {
        throw (new TypeError('Center must be defined'));
    }
    if (center.length !== observationDimension) {
        throw (new TypeError(`Center size should be ${observationDimension}`));
    }
    if (avSpeed.length !== observationDimension) {
        throw (new TypeError(`avSpeed size should be ${observationDimension}`));
    }
    const initCov = (0, simple_linalg_1.diag)(center.map(c => c * c / 3).concat(avSpeed.map(c => c * c / 3)));
    const init = {
        mean: center.map(c => [c]).concat(center.map(() => [0])),
        covariance: initCov,
        index: -1,
    };
    const transition = (args) => {
        const { getTime, index, previousCorrected } = args;
        const dT = getTime(index) - getTime(previousCorrected.index);
        if (typeof (dT) !== 'number' || Number.isNaN(dT)) {
            throw (new TypeError(`dT (${dT}) should be a number`));
        }
        const mat = (0, simple_linalg_1.diag)(center.map(() => 1).concat(center.map(() => 1)));
        for (let i = 0; i < observationDimension; i++) {
            mat[i][observationDimension + i] = dT;
        }
        if (Number.isNaN(mat[0][2])) {
            throw (new TypeError('nan mat'));
        }
        return mat;
    };
    const covariance = (args) => {
        const { index, previousCorrected, getTime } = args;
        const dT = getTime(index) - getTime(previousCorrected.index);
        if (typeof (dT) !== 'number') {
            throw (new TypeError(`dT (${dT}) should be a number`));
        }
        const sqrt = Math.sqrt(dT);
        if (Number.isNaN(sqrt)) {
            console.log({ lastPreviousIndex: previousCorrected.index, index });
            console.log(dT, previousCorrected.index, index, getTime(index), getTime(previousCorrected.index));
            throw (new Error('Sqrt(dT) is NaN'));
        }
        return (0, simple_linalg_1.diag)(staticCovariance.map(v => v * sqrt));
    };
    return {
        init,
        dimension,
        transition,
        covariance,
    };
}
exports["default"] = constantSpeedDynamic;
;


/***/ }),

/***/ "./lib/dynamic/constant-speed.ts":
/*!***************************************!*\
  !*** ./lib/dynamic/constant-speed.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
function constantSpeed(dynamic, observation) {
    const timeStep = dynamic.timeStep || 1;
    const { observedProjection } = observation;
    const { stateProjection } = observation;
    const observationDimension = observation.dimension;
    let dimension;
    if (stateProjection && Number.isInteger(stateProjection[0].length / 2)) {
        dimension = observation.stateProjection[0].length;
    }
    else if (observedProjection) {
        dimension = observedProjection[0].length * 2;
    }
    else if (observationDimension) {
        dimension = observationDimension * 2;
    }
    else {
        throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
    }
    const baseDimension = dimension / 2;
    const transition = (0, simple_linalg_1.identity)(dimension);
    for (let i = 0; i < baseDimension; i++) {
        transition[i][i + baseDimension] = timeStep;
    }
    const arrayCovariance = new Array(baseDimension).fill(1).concat(new Array(baseDimension).fill(timeStep * timeStep));
    const covariance = dynamic.covariance || arrayCovariance;
    return Object.assign({}, dynamic, { dimension, transition, covariance });
}
exports["default"] = constantSpeed;
;


/***/ }),

/***/ "./lib/dynamic/index.ts":
/*!******************************!*\
  !*** ./lib/dynamic/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shorttermConstantSpeed = exports.constantSpeedDynamic = exports.constantPositionWithNull = exports.composition = exports.constantAcceleration = exports.constantSpeed = exports.constantPosition = void 0;
var constant_position_1 = __webpack_require__(/*! ./constant-position */ "./lib/dynamic/constant-position.ts");
Object.defineProperty(exports, "constantPosition", ({ enumerable: true, get: function () { return __importDefault(constant_position_1).default; } }));
var constant_speed_1 = __webpack_require__(/*! ./constant-speed */ "./lib/dynamic/constant-speed.ts");
Object.defineProperty(exports, "constantSpeed", ({ enumerable: true, get: function () { return __importDefault(constant_speed_1).default; } }));
var constant_acceleration_1 = __webpack_require__(/*! ./constant-acceleration */ "./lib/dynamic/constant-acceleration.ts");
Object.defineProperty(exports, "constantAcceleration", ({ enumerable: true, get: function () { return __importDefault(constant_acceleration_1).default; } }));
var composition_1 = __webpack_require__(/*! ./composition */ "./lib/dynamic/composition.ts");
Object.defineProperty(exports, "composition", ({ enumerable: true, get: function () { return __importDefault(composition_1).default; } }));
var constant_position_with_null_1 = __webpack_require__(/*! ./constant-position-with-null */ "./lib/dynamic/constant-position-with-null.ts");
Object.defineProperty(exports, "constantPositionWithNull", ({ enumerable: true, get: function () { return __importDefault(constant_position_with_null_1).default; } }));
var constant_speed_dynamic_1 = __webpack_require__(/*! ./constant-speed-dynamic */ "./lib/dynamic/constant-speed-dynamic.ts");
Object.defineProperty(exports, "constantSpeedDynamic", ({ enumerable: true, get: function () { return __importDefault(constant_speed_dynamic_1).default; } }));
var shortterm_constant_speed_1 = __webpack_require__(/*! ./shortterm-constant-speed */ "./lib/dynamic/shortterm-constant-speed.ts");
Object.defineProperty(exports, "shorttermConstantSpeed", ({ enumerable: true, get: function () { return __importDefault(shortterm_constant_speed_1).default; } }));


/***/ }),

/***/ "./lib/dynamic/shortterm-constant-speed.ts":
/*!*************************************************!*\
  !*** ./lib/dynamic/shortterm-constant-speed.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const constant_speed_dynamic_1 = __importDefault(__webpack_require__(/*! ./constant-speed-dynamic */ "./lib/dynamic/constant-speed-dynamic.ts"));
const safeDiv = function (a, b) {
    if (a === 0) {
        return 0;
    }
    if (b === 0) {
        return 1;
    }
    return a / b;
};
function shorttermConstantSpeed(options, observation) {
    const { typicalTimes } = options;
    if (!Array.isArray(typicalTimes)) {
        throw (new TypeError('typicalTimes must be defined'));
    }
    const constantSpeed = (0, constant_speed_dynamic_1.default)(options, observation);
    const { dimension, init } = constantSpeed;
    if (typicalTimes.length !== dimension) {
        throw (new TypeError(`typicalTimes (${typicalTimes.length}) length is not as expected (${dimension})`));
    }
    const mixMatrix = function ({ ratios, aMat, bMat, }) {
        return (0, simple_linalg_1.elemWise)([aMat, bMat], ([m, d], rowIndex, colIndex) => {
            const ratio = rowIndex === colIndex ? ratios[rowIndex] : (ratios[rowIndex] + ratios[colIndex]) / 2;
            return (ratio * m) + ((1 - ratio) * d);
        });
    };
    return {
        dimension,
        init,
        transition(options) {
            const aMat = constantSpeed.transition(options);
            const { getTime, index, previousCorrected } = options;
            const dT = getTime(index) - getTime(previousCorrected.index);
            const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
            const bMat = (0, simple_linalg_1.diag)((0, simple_linalg_1.elemWise)([init.mean, previousCorrected.mean], ([m, d]) => safeDiv(m, d))
                .reduce((a, b) => a.concat(b)));
            return mixMatrix({ ratios, aMat, bMat });
        },
        covariance(options, observation) {
            const { getTime, index, previousCorrected } = options;
            const dT = getTime(index) - getTime(previousCorrected.index);
            const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
            const aMat = constantSpeed.covariance(options);
            return mixMatrix({ ratios, aMat, bMat: init.covariance });
        },
    };
}
exports["default"] = shorttermConstantSpeed;
;


/***/ }),

/***/ "./lib/kalman-filter.ts":
/*!******************************!*\
  !*** ./lib/kalman-filter.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const array_to_matrix_1 = __importDefault(__webpack_require__(/*! ../lib/utils/array-to-matrix */ "./lib/utils/array-to-matrix.ts"));
const set_dimensions_1 = __importDefault(__webpack_require__(/*! ../lib/setup/set-dimensions */ "./lib/setup/set-dimensions.ts"));
const check_dimensions_1 = __importDefault(__webpack_require__(/*! ../lib/setup/check-dimensions */ "./lib/setup/check-dimensions.ts"));
const build_state_projection_1 = __importDefault(__webpack_require__(/*! ../lib/setup/build-state-projection */ "./lib/setup/build-state-projection.ts"));
const extend_dynamic_init_1 = __importDefault(__webpack_require__(/*! ../lib/setup/extend-dynamic-init */ "./lib/setup/extend-dynamic-init.ts"));
const to_function_1 = __importDefault(__webpack_require__(/*! ../lib/utils/to-function */ "./lib/utils/to-function.ts"));
const deep_assign_1 = __importDefault(__webpack_require__(/*! ../lib/utils/deep-assign */ "./lib/utils/deep-assign.ts"));
const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../lib/utils/polymorph-matrix */ "./lib/utils/polymorph-matrix.ts"));
const state_1 = __importDefault(__webpack_require__(/*! ./state */ "./lib/state.ts"));
const modelCollection = __importStar(__webpack_require__(/*! ./model-collection */ "./lib/model-collection.ts"));
const core_kalman_filter_1 = __importDefault(__webpack_require__(/*! ./core-kalman-filter */ "./lib/core-kalman-filter.ts"));
const buildDefaultDynamic = function (dynamic) {
    if (typeof (dynamic) === 'string') {
        return { name: dynamic };
    }
    return { name: 'constant-position' };
};
const buildDefaultObservation = function (observation) {
    if (typeof (observation) === 'number') {
        return { name: 'sensor', sensorDimension: observation };
    }
    if (typeof (observation) === 'string') {
        return { name: observation };
    }
    return { name: 'sensor' };
};
const setupModelsParameters = function (args) {
    let { observation, dynamic } = args;
    if (typeof (observation) !== 'object' || observation === null) {
        observation = buildDefaultObservation(observation);
    }
    if (typeof (dynamic) !== 'object' || dynamic === null) {
        dynamic = buildDefaultDynamic(dynamic);
    }
    if (typeof (observation.name) === 'string') {
        observation = modelCollection.buildObservation(observation);
    }
    if (typeof (dynamic.name) === 'string') {
        dynamic = modelCollection.buildDynamic(dynamic, observation);
    }
    const withDimensionOptions = (0, set_dimensions_1.default)({ observation, dynamic });
    const checkedDimensionOptions = (0, check_dimensions_1.default)(withDimensionOptions);
    const buildStateProjectionOptions = (0, build_state_projection_1.default)(checkedDimensionOptions);
    return (0, extend_dynamic_init_1.default)(buildStateProjectionOptions);
};
const modelsParametersToCoreOptions = function (modelToBeChanged) {
    const { observation, dynamic } = modelToBeChanged;
    return (0, deep_assign_1.default)(modelToBeChanged, {
        observation: {
            stateProjection: (0, to_function_1.default)((0, polymorph_matrix_1.default)(observation.stateProjection), { label: 'observation.stateProjection' }),
            covariance: (0, to_function_1.default)((0, polymorph_matrix_1.default)(observation.covariance, { dimension: observation.dimension }), { label: 'observation.covariance' }),
        },
        dynamic: {
            transition: (0, to_function_1.default)((0, polymorph_matrix_1.default)(dynamic.transition), { label: 'dynamic.transition' }),
            covariance: (0, to_function_1.default)((0, polymorph_matrix_1.default)(dynamic.covariance, { dimension: dynamic.dimension }), { label: 'dynamic.covariance' }),
        },
    });
};
class KalmanFilter extends core_kalman_filter_1.default {
    constructor(options = {}) {
        const modelsParameters = setupModelsParameters(options);
        const coreOptions = modelsParametersToCoreOptions(modelsParameters);
        super(Object.assign({}, options, coreOptions));
    }
    correct(options) {
        const coreObservation = (0, array_to_matrix_1.default)({ observation: options.observation, dimension: this.observation.dimension });
        return super.correct(Object.assign({}, options, { observation: coreObservation }));
    }
    filter(options) {
        const predicted = super.predict(options);
        return this.correct(Object.assign({}, options, { predicted }));
    }
    filterAll(observations) {
        let previousCorrected = this.getInitState();
        const results = [];
        for (const observation of observations) {
            const predicted = this.predict({ previousCorrected });
            previousCorrected = this.correct({
                predicted,
                observation,
            });
            results.push(previousCorrected.mean.map(m => m[0]));
        }
        return results;
    }
    asymptoticStateCovariance({ limitIterations = 1e2, tolerance = 1e-6 } = {}) {
        let previousCorrected = super.getInitState();
        const results = [];
        for (let i = 0; i < limitIterations; i++) {
            const predicted = new state_1.default({
                mean: [],
                covariance: super.getPredictedCovariance({ previousCorrected }),
            });
            previousCorrected = new state_1.default({
                mean: [],
                covariance: super.getCorrectedCovariance({ predicted }),
            });
            results.push(previousCorrected.covariance);
            if ((0, simple_linalg_1.frobenius)(previousCorrected.covariance, results[i - 1]) < tolerance) {
                return results[i];
            }
        }
        throw (new Error('The state covariance does not converge asymptotically'));
    }
    asymptoticGain({ tolerance = 1e-6 } = {}) {
        const covariance = this.asymptoticStateCovariance({ tolerance });
        const asymptoticState = new state_1.default({
            mean: Array.from({ length: covariance.length }).fill(0).map(() => [0]),
            covariance,
        });
        return super.getGain({ predicted: asymptoticState });
    }
}
exports["default"] = KalmanFilter;


/***/ }),

/***/ "./lib/model-collection.ts":
/*!*********************************!*\
  !*** ./lib/model-collection.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildDynamic = exports.buildObservation = exports.registerDynamic = exports.registerObservation = void 0;
const registeredObservationModels = {};
const registeredDynamicModels = {};
function registerObservation(name, fn) {
    registeredObservationModels[name] = fn;
}
exports.registerObservation = registerObservation;
function registerDynamic(name, fn) {
    registeredDynamicModels[name] = fn;
}
exports.registerDynamic = registerDynamic;
function buildObservation(observation) {
    if (typeof (registeredObservationModels[observation.name]) !== "function") {
        throw (new TypeError(`The provided observation model name (${observation.name}) is not registered`));
    }
    return registeredObservationModels[observation.name](observation);
}
exports.buildObservation = buildObservation;
function buildDynamic(dynamic, observation) {
    if (typeof (registeredDynamicModels[dynamic.name]) !== "function") {
        throw (new TypeError(`The provided dynamic model (${dynamic.name}) name is not registered`));
    }
    return registeredDynamicModels[dynamic.name](dynamic, observation);
}
exports.buildDynamic = buildDynamic;


/***/ }),

/***/ "./lib/observation/index.ts":
/*!**********************************!*\
  !*** ./lib/observation/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sensorProjected = exports.sensorLocalVariance = exports.sensor = void 0;
var sensor_1 = __webpack_require__(/*! ./sensor */ "./lib/observation/sensor.ts");
Object.defineProperty(exports, "sensor", ({ enumerable: true, get: function () { return __importDefault(sensor_1).default; } }));
var sensor_local_variance_1 = __webpack_require__(/*! ./sensor-local-variance */ "./lib/observation/sensor-local-variance.ts");
Object.defineProperty(exports, "sensorLocalVariance", ({ enumerable: true, get: function () { return __importDefault(sensor_local_variance_1).default; } }));
var sensor_projected_1 = __webpack_require__(/*! ./sensor-projected */ "./lib/observation/sensor-projected.ts");
Object.defineProperty(exports, "sensorProjected", ({ enumerable: true, get: function () { return __importDefault(sensor_projected_1).default; } }));


/***/ }),

/***/ "./lib/observation/sensor-local-variance.ts":
/*!**************************************************!*\
  !*** ./lib/observation/sensor-local-variance.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const model_collection_1 = __webpack_require__(/*! ../model-collection */ "./lib/model-collection.ts");
function nullableSensor(options) {
    const { dimension, observedProjection, covariance: baseCovariance } = (0, model_collection_1.buildObservation)(Object.assign({}, options, { name: 'sensor' }));
    return {
        dimension,
        observedProjection,
        covariance(o) {
            const covariance = (0, simple_linalg_1.identity)(dimension);
            const { variance } = o;
            variance.forEach((v, i) => {
                covariance[i][i] = v * baseCovariance[i][i];
            });
            return covariance;
        },
    };
}
exports["default"] = nullableSensor;
;


/***/ }),

/***/ "./lib/observation/sensor-projected.ts":
/*!*********************************************!*\
  !*** ./lib/observation/sensor-projected.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const correlation_to_covariance_1 = __importDefault(__webpack_require__(/*! ../utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.ts"));
const covariance_to_correlation_1 = __importDefault(__webpack_require__(/*! ../utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.ts"));
function sensorProjected({ selectedCovariance, totalDimension, obsIndexes, selectedStateProjection }) {
    if (!selectedStateProjection) {
        selectedStateProjection = new Array(obsIndexes.length).fill(0).map(() => new Array(obsIndexes.length).fill(0));
        obsIndexes.forEach((index1, i1) => {
            selectedStateProjection[i1][i1] = 1;
        });
    }
    else if (selectedStateProjection.length !== obsIndexes.length) {
        throw (new Error(`[Sensor-projected] Shape mismatch between ${selectedStateProjection.length} and ${obsIndexes.length}`));
    }
    const baseCovariance = (0, simple_linalg_1.identity)(totalDimension);
    obsIndexes.forEach((index1, i1) => {
        if (selectedCovariance) {
            obsIndexes.forEach((index2, i2) => {
                baseCovariance[index1][index2] = selectedCovariance[i1][i2];
            });
        }
    });
    const { correlation: baseCorrelation, variance: baseVariance } = (0, covariance_to_correlation_1.default)(baseCovariance);
    const dynaDimension = selectedStateProjection[0].length;
    if (selectedStateProjection.length !== obsIndexes.length) {
        throw (new Error(`shape mismatch (${selectedStateProjection.length} vs ${obsIndexes.length})`));
    }
    const observedProjection = (0, simple_linalg_1.matPermutation)({
        outputSize: [totalDimension, dynaDimension],
        colIndexes: selectedStateProjection[0].map((_, i) => i),
        rowIndexes: obsIndexes,
        matrix: selectedStateProjection,
    });
    return {
        dimension: totalDimension,
        observedProjection,
        covariance(o) {
            const { variance } = o;
            if (!variance) {
                return baseCovariance;
            }
            if (variance.length !== baseCovariance.length) {
                throw (new Error('variance is difference size from baseCovariance'));
            }
            const result = (0, correlation_to_covariance_1.default)({ correlation: baseCorrelation, variance: baseVariance.map((b, i) => variance[i] * b) });
            return result;
        },
    };
}
exports["default"] = sensorProjected;
;


/***/ }),

/***/ "./lib/observation/sensor.ts":
/*!***********************************!*\
  !*** ./lib/observation/sensor.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/polymorph-matrix */ "./lib/utils/polymorph-matrix.ts"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/check-matrix */ "./lib/utils/check-matrix.ts"));
const copy = mat => mat.map(a => a.concat());
function sensor(options) {
    const { sensorDimension = 1, sensorCovariance = 1, nSensors = 1 } = options;
    const sensorCovarianceFormatted = (0, polymorph_matrix_1.default)(sensorCovariance, { dimension: sensorDimension });
    (0, check_matrix_1.default)(sensorCovarianceFormatted, [sensorDimension, sensorDimension], 'observation.sensorCovariance');
    const oneSensorObservedProjection = (0, simple_linalg_1.identity)(sensorDimension);
    let concatenatedObservedProjection = [];
    const dimension = sensorDimension * nSensors;
    const concatenatedCovariance = (0, simple_linalg_1.identity)(dimension);
    for (let i = 0; i < nSensors; i++) {
        concatenatedObservedProjection = concatenatedObservedProjection.concat(copy(oneSensorObservedProjection));
        for (const [rIndex, r] of sensorCovarianceFormatted.entries()) {
            for (const [cIndex, c] of r.entries()) {
                concatenatedCovariance[rIndex + (i * sensorDimension)][cIndex + (i * sensorDimension)] = c;
            }
        }
    }
    return Object.assign({}, options, {
        dimension,
        observedProjection: concatenatedObservedProjection,
        covariance: concatenatedCovariance,
    });
}
exports["default"] = sensor;
;


/***/ }),

/***/ "./lib/setup/build-state-projection.ts":
/*!*********************************************!*\
  !*** ./lib/setup/build-state-projection.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const simple_linalg_2 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
function buildStateProjection({ observation, dynamic }) {
    const { observedProjection, stateProjection } = observation;
    const observationDimension = observation.dimension;
    const dynamicDimension = dynamic.dimension;
    if (observedProjection && stateProjection) {
        throw (new TypeError('You cannot use both observedProjection and stateProjection'));
    }
    if (observedProjection) {
        const stateProjection = (0, simple_linalg_1.padWithZeroCols)(observedProjection, { columns: dynamicDimension });
        return {
            observation: Object.assign({}, observation, {
                stateProjection,
            }),
            dynamic,
        };
    }
    if (observationDimension && dynamicDimension && !stateProjection) {
        const observationMatrix = (0, simple_linalg_2.identity)(observationDimension);
        return {
            observation: Object.assign({}, observation, {
                stateProjection: (0, simple_linalg_1.padWithZeroCols)(observationMatrix, { columns: dynamicDimension }),
            }),
            dynamic,
        };
    }
    return { observation, dynamic };
}
exports["default"] = buildStateProjection;
;


/***/ }),

/***/ "./lib/setup/check-dimensions.ts":
/*!***************************************!*\
  !*** ./lib/setup/check-dimensions.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function checkDimensions({ observation, dynamic }) {
    const dynamicDimension = dynamic.dimension;
    const observationDimension = observation.dimension;
    if (!dynamicDimension || !observationDimension) {
        throw (new TypeError('Dimension is not set'));
    }
    return { observation, dynamic };
}
exports["default"] = checkDimensions;
;


/***/ }),

/***/ "./lib/setup/extend-dynamic-init.ts":
/*!******************************************!*\
  !*** ./lib/setup/extend-dynamic-init.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/polymorph-matrix */ "./lib/utils/polymorph-matrix.ts"));
function extendDynamicInit({ observation, dynamic }) {
    if (!dynamic.init) {
        const huge = 1e6;
        const dynamicDimension = dynamic.dimension;
        const meanArray = new Array(dynamicDimension).fill(0);
        const covarianceArray = new Array(dynamicDimension).fill(huge);
        const withInitOptions = {
            observation,
            dynamic: Object.assign({}, dynamic, {
                init: {
                    mean: meanArray.map(element => [element]),
                    covariance: (0, simple_linalg_1.diag)(covarianceArray),
                    index: -1,
                },
            }),
        };
        return withInitOptions;
    }
    if (dynamic.init && !dynamic.init.mean) {
        throw (new Error('dynamic.init should have a mean key'));
    }
    dynamic.init = Object.assign({}, dynamic.init, {
        covariance: (0, polymorph_matrix_1.default)(dynamic.init.covariance, { dimension: dynamic.dimension }),
    });
    return { observation, dynamic };
}
exports["default"] = extendDynamicInit;
;


/***/ }),

/***/ "./lib/setup/set-dimensions.ts":
/*!*************************************!*\
  !*** ./lib/setup/set-dimensions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function setDimensions({ observation, dynamic }) {
    const { stateProjection } = observation;
    const { transition } = dynamic;
    const dynamicDimension = dynamic.dimension;
    const observationDimension = observation.dimension;
    if (dynamicDimension && observationDimension && Array.isArray(stateProjection) && (dynamicDimension !== stateProjection[0].length || observationDimension !== stateProjection.length)) {
        throw (new TypeError('stateProjection dimensions not matching with observation and dynamic dimensions'));
    }
    if (dynamicDimension && Array.isArray(transition) && dynamicDimension !== transition.length) {
        throw (new TypeError('transition dimension not matching with dynamic dimension'));
    }
    if (Array.isArray(stateProjection)) {
        return {
            observation: Object.assign({}, observation, {
                dimension: stateProjection.length,
            }),
            dynamic: Object.assign({}, dynamic, {
                dimension: stateProjection[0].length,
            }),
        };
    }
    if (Array.isArray(transition)) {
        return {
            observation,
            dynamic: Object.assign({}, dynamic, {
                dimension: transition.length,
            }),
        };
    }
    return { observation, dynamic };
}
exports["default"] = setDimensions;
;


/***/ }),

/***/ "./lib/state.ts":
/*!**********************!*\
  !*** ./lib/state.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const array_to_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/array-to-matrix */ "./lib/utils/array-to-matrix.ts"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/check-matrix */ "./lib/utils/check-matrix.ts"));
const check_covariance_1 = __importDefault(__webpack_require__(/*! ./utils/check-covariance */ "./lib/utils/check-covariance.ts"));
class State {
    mean;
    covariance;
    index;
    constructor(args) {
        this.mean = args.mean;
        this.covariance = args.covariance;
        this.index = args.index || undefined;
    }
    check(options) {
        State.check(this, options);
    }
    static check(state, args = {}) {
        const { dimension, title, eigen } = args;
        if (!(state instanceof State)) {
            throw (new TypeError('The argument is not a state \n'
                + 'Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree'));
        }
        const { mean, covariance } = state;
        const meanDimension = mean.length;
        if (typeof (dimension) === 'number' && meanDimension !== dimension) {
            throw (new Error(`[${title}] State.mean ${mean} with dimension ${meanDimension} does not match expected dimension (${dimension})`));
        }
        (0, check_matrix_1.default)(mean, [meanDimension, 1], title ? title + '.mean' : 'mean');
        (0, check_matrix_1.default)(covariance, [meanDimension, meanDimension], title ? title + '.covariance' : 'covariance');
        (0, check_covariance_1.default)({ covariance, eigen }, title ? title + '.covariance' : 'covariance');
    }
    static matMul({ state, matrix }) {
        const covariance = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(matrix, state.covariance), (0, simple_linalg_1.transpose)(matrix));
        const mean = (0, simple_linalg_1.matMul)(matrix, state.mean);
        return new State({
            mean,
            covariance,
            index: state.index,
        });
    }
    subState(obsIndexes) {
        const state = new State({
            mean: obsIndexes.map(i => this.mean[i]),
            covariance: (0, simple_linalg_1.subSquareMatrix)(this.covariance, obsIndexes),
            index: this.index,
        });
        return state;
    }
    rawDetailedMahalanobis(point) {
        const diff = (0, simple_linalg_1.subtract)(this.mean, point);
        this.check();
        const covarianceInvert = (0, simple_linalg_1.invert)(this.covariance);
        if (covarianceInvert === null) {
            this.check({ eigen: true });
            throw (new Error(`Cannot invert covariance ${JSON.stringify(this.covariance)}`));
        }
        const diffTransposed = (0, simple_linalg_1.transpose)(diff);
        const valueMatrix = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(diffTransposed, covarianceInvert), diff);
        const value = Math.sqrt(valueMatrix[0][0]);
        if (Number.isNaN(value)) {
            console.log({ diff, covarianceInvert, this: this, point }, (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(diffTransposed, covarianceInvert), diff));
            throw (new Error('mahalanobis is NaN'));
        }
        return {
            diff,
            covarianceInvert,
            value,
        };
    }
    detailedMahalanobis({ kf, observation, obsIndexes }) {
        if (observation.length !== kf.observation.dimension) {
            throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
        }
        let correctlySizedObservation = (0, array_to_matrix_1.default)({ observation, dimension: observation.length });
        const stateProjection = kf.getValue(kf.observation.stateProjection, {});
        let projectedState = State.matMul({ state: this, matrix: stateProjection });
        if (Array.isArray(obsIndexes)) {
            projectedState = projectedState.subState(obsIndexes);
            correctlySizedObservation = obsIndexes.map(i => correctlySizedObservation[i]);
        }
        return projectedState.rawDetailedMahalanobis(correctlySizedObservation);
    }
    mahalanobis(options) {
        const result = this.detailedMahalanobis(options).value;
        if (Number.isNaN(result)) {
            throw (new TypeError('mahalanobis is NaN'));
        }
        return result;
    }
    obsBhattacharyya({ kf, state, obsIndexes }) {
        const stateProjection = kf.getValue(kf.observation.stateProjection, {});
        let projectedSelfState = State.matMul({ state: this, matrix: stateProjection });
        let projectedOtherState = State.matMul({ state, matrix: stateProjection });
        if (Array.isArray(obsIndexes)) {
            projectedSelfState = projectedSelfState.subState(obsIndexes);
            projectedOtherState = projectedOtherState.subState(obsIndexes);
        }
        return projectedSelfState.bhattacharyya(projectedOtherState);
    }
    bhattacharyya(otherState) {
        const { covariance, mean } = this;
        const average = (0, simple_linalg_1.elemWise)([covariance, otherState.covariance], ([a, b]) => (a + b) / 2);
        let covarInverted;
        try {
            covarInverted = (0, simple_linalg_1.invert)(average);
        }
        catch (error) {
            console.log('Cannot invert', average);
            throw error;
        }
        const diff = (0, simple_linalg_1.subtract)(mean, otherState.mean);
        return (0, simple_linalg_1.matMul)((0, simple_linalg_1.transpose)(diff), (0, simple_linalg_1.matMul)(covarInverted, diff))[0][0];
    }
}
exports["default"] = State;


/***/ }),

/***/ "./lib/utils/array-to-matrix.ts":
/*!**************************************!*\
  !*** ./lib/utils/array-to-matrix.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function arrayToMatrix({ observation, dimension }) {
    if (!Array.isArray(observation)) {
        if (dimension === 1 && typeof (observation) === 'number') {
            return [[observation]];
        }
        throw (new TypeError(`The observation (${observation}) should be an array (dimension: ${dimension})`));
    }
    if (observation.length !== dimension) {
        throw (new TypeError(`Observation (${observation.length}) and dimension (${dimension}) not matching`));
    }
    if (typeof (observation[0]) === 'number' || observation[0] === null) {
        return observation.map(element => [element]);
    }
    return observation;
}
exports["default"] = arrayToMatrix;
;


/***/ }),

/***/ "./lib/utils/check-covariance.ts":
/*!***************************************!*\
  !*** ./lib/utils/check-covariance.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const matrix_1 = __importDefault(__webpack_require__(/*! @rayyamhk/matrix */ "./node_modules/.pnpm/@rayyamhk+matrix@1.0.8/node_modules/@rayyamhk/matrix/lib/index.js"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./check-matrix */ "./lib/utils/check-matrix.ts"));
const tolerance = 0.1;
const checkDefinitePositive = function (covariance, tolerance = 1e-10) {
    const covarianceMatrix = new matrix_1.default(covariance);
    const eigenvalues = covarianceMatrix.eigenvalues();
    for (const eigenvalue of eigenvalues) {
        if (eigenvalue <= -tolerance) {
            console.log(covariance, eigenvalue);
            throw new Error(`Eigenvalue should be positive (actual: ${eigenvalue})`);
        }
    }
    console.log('is definite positive', covariance);
};
const checkSymetric = function (covariance, title = 'checkSymetric') {
    for (const [rowId, row] of covariance.entries()) {
        for (const [colId, item] of row.entries()) {
            if (rowId === colId && item < 0) {
                throw new Error(`[${title}] Variance[${colId}] should be positive (actual: ${item})`);
            }
            else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
                console.log(covariance);
                throw new Error(`[${title}] Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality `
                    + `(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})`
                    + ` actual: ${item})`);
            }
            else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
                throw new Error(`[${title}] Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] `
                    + ` (actual diff: ${Math.abs(item - covariance[colId][rowId])})  = ${item} - ${covariance[colId][rowId]}\n`
                    + `${covariance.join('\n')} is invalid`);
            }
        }
    }
};
function checkCovariance(args, _title) {
    const { covariance, eigen = false } = args;
    (0, check_matrix_1.default)(covariance);
    checkSymetric(covariance);
    if (eigen) {
        checkDefinitePositive(covariance);
    }
}
exports["default"] = checkCovariance;
;


/***/ }),

/***/ "./lib/utils/check-matrix.ts":
/*!***********************************!*\
  !*** ./lib/utils/check-matrix.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_shape_1 = __importDefault(__webpack_require__(/*! ./check-shape */ "./lib/utils/check-shape.ts"));
function checkMatrix(matrix, shape, title = 'checkMatrix') {
    if (!Array.isArray(matrix)) {
        throw (new TypeError(`[${title}] should be a 2-level array matrix and is ${matrix}`));
    }
    for (const row of matrix) {
        if (!Array.isArray(row)) {
            throw (new TypeError(`[${title}] 1-level array should be a matrix ${JSON.stringify(matrix)}`));
        }
    }
    if (matrix.reduce((a, b) => a.concat(b)).some(a => Number.isNaN(a))) {
        throw (new Error(`[${title}] Matrix should not have a NaN\nIn : \n`
            + matrix.join('\n')));
    }
    if (shape) {
        (0, check_shape_1.default)(matrix, shape, title);
    }
}
exports["default"] = checkMatrix;
;


/***/ }),

/***/ "./lib/utils/check-shape.ts":
/*!**********************************!*\
  !*** ./lib/utils/check-shape.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function checkShape(matrix, shape, title = 'checkShape') {
    if (matrix.length !== shape[0]) {
        throw (new Error(`[${title}] expected size (${shape[0]}) and length (${matrix.length}) does not match`));
    }
    if (shape.length > 1) {
        return matrix.forEach(m => checkShape(m, shape.slice(1), title));
    }
}
exports["default"] = checkShape;
;


/***/ }),

/***/ "./lib/utils/correlation-to-covariance.ts":
/*!************************************************!*\
  !*** ./lib/utils/correlation-to-covariance.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_covariance_1 = __importDefault(__webpack_require__(/*! ./check-covariance */ "./lib/utils/check-covariance.ts"));
function correlationToCovariance({ correlation, variance }) {
    (0, check_covariance_1.default)({ covariance: correlation });
    return correlation.map((c, rowIndex) => c.map((a, colIndex) => a * Math.sqrt(variance[colIndex] * variance[rowIndex])));
}
exports["default"] = correlationToCovariance;
;


/***/ }),

/***/ "./lib/utils/covariance-to-correlation.ts":
/*!************************************************!*\
  !*** ./lib/utils/covariance-to-correlation.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_covariance_1 = __importDefault(__webpack_require__(/*! ./check-covariance */ "./lib/utils/check-covariance.ts"));
function covarianceToCorrelation(covariance) {
    (0, check_covariance_1.default)({ covariance });
    const variance = covariance.map((_, i) => covariance[i][i]);
    return {
        variance,
        correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex]))),
    };
}
exports["default"] = covarianceToCorrelation;
;


/***/ }),

/***/ "./lib/utils/deep-assign.ts":
/*!**********************************!*\
  !*** ./lib/utils/deep-assign.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const uniq_1 = __importDefault(__webpack_require__(/*! ./uniq */ "./lib/utils/uniq.ts"));
const limit = 100;
function deepAssignInternal(args, step) {
    if (step > limit) {
        throw (new Error(`In deepAssign, number of recursive call (${step}) reached limit (${limit}), deepAssign is not working on  self-referencing objects`));
    }
    const filterArguments = args.filter(arg => (arg) !== undefined && arg !== null);
    const lastArgument = filterArguments[filterArguments.length - 1];
    if (filterArguments.length === 1) {
        return filterArguments[0];
    }
    if (typeof (lastArgument) !== 'object' || Array.isArray(lastArgument)) {
        return lastArgument;
    }
    if (filterArguments.length === 0) {
        return null;
    }
    const objectsArguments = filterArguments.filter(arg => typeof (arg) === 'object');
    let keys = [];
    for (const arg of objectsArguments) {
        keys = keys.concat(Object.keys(arg));
    }
    const uniqKeys = (0, uniq_1.default)(keys);
    const result = {};
    for (const key of uniqKeys) {
        const values = objectsArguments.map(arg => arg[key]);
        result[key] = deepAssignInternal(values, step + 1);
    }
    return result;
}
;
function deepAssign(...args) { return deepAssignInternal(args, 0); }
exports["default"] = deepAssign;


/***/ }),

/***/ "./lib/utils/get-covariance.ts":
/*!*************************************!*\
  !*** ./lib/utils/get-covariance.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getCovariance({ measures, averages }) {
    const l = measures.length;
    const n = measures[0].length;
    if (l === 0) {
        throw (new Error('Cannot find covariance for empty sample'));
    }
    return (new Array(n).fill(1)).map((_, rowIndex) => (new Array(n).fill(1)).map((_, colIndex) => {
        const stds = measures.map((m, i) => (m[rowIndex] - averages[i][rowIndex]) * (m[colIndex] - averages[i][colIndex]));
        const result = stds.reduce((a, b) => a + b) / l;
        if (Number.isNaN(result)) {
            throw (new TypeError('result is NaN'));
        }
        return result;
    }));
}
exports["default"] = getCovariance;
;


/***/ }),

/***/ "./lib/utils/polymorph-matrix.ts":
/*!***************************************!*\
  !*** ./lib/utils/polymorph-matrix.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./check-matrix */ "./lib/utils/check-matrix.ts"));
function polymorphMatrix(cov, opts = {}) {
    const { dimension, title = 'polymorph' } = opts;
    if (typeof (cov) === 'number' || Array.isArray(cov)) {
        if (typeof (cov) === 'number' && typeof (dimension) === 'number') {
            return (0, simple_linalg_1.diag)(new Array(dimension).fill(cov));
        }
        if ((Array.isArray(cov)) && (Array.isArray(cov[0]))) {
            let shape;
            if (typeof (dimension) === 'number') {
                shape = [dimension, dimension];
            }
            (0, check_matrix_1.default)(cov, shape, title);
            return cov;
        }
        if ((Array.isArray(cov)) && (typeof (cov[0]) === 'number')) {
            return (0, simple_linalg_1.diag)(cov);
        }
    }
    return cov;
}
exports["default"] = polymorphMatrix;
;


/***/ }),

/***/ "./lib/utils/project-observation.ts":
/*!******************************************!*\
  !*** ./lib/utils/project-observation.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/.pnpm/simple-linalg@1.5.0/node_modules/simple-linalg/index.js");
function projectObservation({ observation, obsIndexes, selectedStateProjection, invertSelectedStateProjection }) {
    if (!observation) {
        return null;
    }
    const value = observation.observation || observation;
    const vec = obsIndexes.map(i => {
        if ((value[i]) === undefined) {
            throw (new TypeError(`obsIndexes (${obsIndexes}) is not matching with observation (${observation})`));
        }
        return [value[i]];
    });
    const inverse = invertSelectedStateProjection || (0, simple_linalg_1.invert)(selectedStateProjection);
    if (inverse === null) {
        throw (new Error('selectedStateProjection is not invertible, please provide invertSelectedStateProjection'));
    }
    const out = (0, simple_linalg_1.matMul)(inverse, vec);
    return out
        .map(v => v[0])
        .map(v => {
        if (Number.isNaN(v)) {
            throw (new TypeError('NaN in projection'));
        }
        return v;
    });
}
exports["default"] = projectObservation;
;


/***/ }),

/***/ "./lib/utils/to-function.ts":
/*!**********************************!*\
  !*** ./lib/utils/to-function.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function toFunction(array, { label = "" } = {}) {
    if (typeof (array) === 'function') {
        return array;
    }
    if (Array.isArray(array)) {
        return array;
    }
    throw (new Error(`${label === null ? '' : label + ' : '}Only arrays and functions are authorized (got: "${array}")`));
}
exports["default"] = toFunction;
;


/***/ }),

/***/ "./lib/utils/uniq.ts":
/*!***************************!*\
  !*** ./lib/utils/uniq.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function uniq(array) {
    return array.filter((value, index) => array.indexOf(value) === index);
}
exports["default"] = uniq;
;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	kalmanFilter = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWEsRUFBQztBQUM3RCw2QkFBNkIsYUFBYSxJQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQ0FBb0Msa0RBQWtELE1BQU07QUFDcEg7QUFDQSxrQkFBZTtBQUNmOzs7Ozs7Ozs7Ozs7QUNaYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxrQkFBZTtBQUNmOzs7Ozs7O1VDTkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Fjb3MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYWNvdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hY3NjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hc2VjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2FzaW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYXRhbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9jb25qdWdhdGUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvY29zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2NvdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9jc2MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZGl2aWRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2V4cC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9nZXRBcmd1bWVudC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9nZXRJbWFnaW5hcnkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0TW9kdWx1cy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9nZXRSZWFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2ludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pc05hTi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9sb2cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvbXVsdGlwbHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvcG93LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3NlYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zaW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3VidHJhY3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvdGFuLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvRXJyb3IuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvZGVjb21wb3NpdGlvbnMvTFUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvZGVjb21wb3NpdGlvbnMvUVIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9iYWNrd2FyZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9saW5lYXItZXF1YXRpb25zL2ZvcndhcmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9zb2x2ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL2ludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9tdWx0aXBseS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3Bvdy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvdHJhbnNwb3NlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvY29uZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2RldC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2VpZ2VudmFsdWVzLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvbm9ybS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL251bGxpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9yYW5rLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvc2l6ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL3RyYWNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc0RpYWdvbmFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc0xvd2VyVHJpYW5ndWxhci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNPcnRob2dvbmFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1NrZXdTeW1tZXRyaWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzU3F1YXJlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1N5bW1ldHJpYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNVcHBlclRyaWFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvY29sdW1uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2RpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZWxlbWVudHdpc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZW50cnkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZmxhdHRlbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9mcm9tQXJyYXkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2V0RGlhZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9nZXRSYW5kb21NYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9yb3cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvc3VibWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3plcm8uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi91dGlsL2VtcHR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi91dGlsL2lzTWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi91dGlsL2lzTnVtYmVyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9tYXRyaXgtaW52ZXJzZUAyLjAuMC9ub2RlX21vZHVsZXMvbWF0cml4LWludmVyc2UvbWF0cml4LWludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvY29zLXNpbWlsYXJpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2RpYWctYmxvY2suanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2RpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2RvdC1wcm9kdWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9lbGVtLXdpc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2V1Y2xpZGVhbi1kaXN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9mcm9iZW5pdXMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2lkZW50aXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvaW52ZXJ0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9tYXAtbWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9tYXQtbXVsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9tYXQtcGVybXV0YXRpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL25vcm0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3BhZC13aXRoLXplcm8tY29scy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3ViLXNxdWFyZS1tYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdW0tdmVjdG9yLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdW0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3RyYWNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi90cmFuc3Bvc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3plcm9zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2luZGV4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9jb3JlLWthbG1hbi1maWx0ZXIudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29tcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtYWNjZWxlcmF0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXBvc2l0aW9uLXdpdGgtbnVsbC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC1keW5hbWljLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXNwZWVkLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2luZGV4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL3Nob3J0dGVybS1jb25zdGFudC1zcGVlZC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIva2FsbWFuLWZpbHRlci50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvbW9kZWwtY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL3NlbnNvci1sb2NhbC12YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vc2Vuc29yLXByb2plY3RlZC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vc2Vuc29yLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9idWlsZC1zdGF0ZS1wcm9qZWN0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9jaGVjay1kaW1lbnNpb25zLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9leHRlbmQtZHluYW1pYy1pbml0LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9zZXQtZGltZW5zaW9ucy50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc3RhdGUudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2FycmF5LXRvLW1hdHJpeC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY2hlY2stY292YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY2hlY2stbWF0cml4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jaGVjay1zaGFwZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY29ycmVsYXRpb24tdG8tY292YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY292YXJpYW5jZS10by1jb3JyZWxhdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvZGVlcC1hc3NpZ24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2dldC1jb3ZhcmlhbmNlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9wb2x5bW9ycGgtbWF0cml4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9wcm9qZWN0LW9ic2VydmF0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy90by1mdW5jdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvdW5pcS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIGNvc2luZSBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIENcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhY29zKG51bSkge1xuICByZXR1cm4gdGhpcy5zdWJ0cmFjdChuZXcgdGhpcyhNYXRoLlBJIC8gMiksIHRoaXMuYXNpbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY29zOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIGNvdGFuZ2VudCBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGksIC1pLCAwIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFjb3QobnVtKSB7XG4gIHJldHVybiB0aGlzLmF0YW4odGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjb3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2UgY29zZWNhbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAwIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvc2VjYW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYWNzYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuYXNpbih0aGlzLmludmVyc2UobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNzYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN1bSBvZiB0d28gY29tcGxleCBudW1iZXJzXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0xIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIGxlZnQgb2YgJysnIHNpZ25cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTIgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgcmlnaHQgb2YgJysnIHNpZ25cclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFN1bSBvZiB0d28gbnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIGFkZChudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0xLnJlICsgbnVtMi5yZSwgbnVtMS5pbSArIG51bTIuaW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBzZWNhbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAwIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFzZWMobnVtKSB7XG4gIHJldHVybiB0aGlzLmFjb3ModGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzZWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2Ugc2luZSBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIENcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhc2luKG51bSkge1xuICByZXR1cm4gdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAtMSksIHRoaXMubG9nKHRoaXMuYWRkKHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSksIHRoaXMucG93KHRoaXMuc3VidHJhY3QodGhpcy5PTkUsIHRoaXMucG93KG51bSwgMikpLCAwLjUpKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2UgdGFuZ2VudCBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGksIC1pIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhdGFuKG51bSkge1xuICByZXR1cm4gdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxIC8gMiksIHRoaXMuc3VidHJhY3QodGhpcy5sb2codGhpcy5zdWJ0cmFjdCh0aGlzLk9ORSwgdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxKSwgbnVtKSkpLCB0aGlzLmxvZyh0aGlzLmFkZCh0aGlzLk9ORSwgdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxKSwgbnVtKSkpKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXRhbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgY29tcGxleCBjb25qdWdhdGUgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIGNvbXBsZXggY29uanVnYXRlXHJcbiAqL1xuZnVuY3Rpb24gY29uanVnYXRlKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0uZ2V0UmVhbCgpLCBudW0uZ2V0SW1hZ2luYXJ5KCkgKiAtMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uanVnYXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBjb3NpbmUgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBjb3NpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjb3MobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGEgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgYiA9IG51bS5nZXRJbWFnaW5hcnkoKTtcbiAgcmV0dXJuIG5ldyB0aGlzKE1hdGguY29zKGEpICogTWF0aC5jb3NoKGIpLCBNYXRoLnNpbihhKSAqIE1hdGguc2luaChiKSAqIC0xKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGNvdGFuZ2VudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGsgKiBQSSAvIDIgOiBrIGlzIGFueSBpbnRlZ2VyIH1cclxuICogTm90ZSB0aGF0IGNvdChQSSAvIDIpIHNob3VsZCBnaXZlcyBOYU4gaW5zdGVhZCBvZiAwXHJcbiAqIGJlY2F1c2Ugd2Ugd29uJ3QgaW50cm9kdWNlIHRoZSBjb25jZXB0IG9mIEluZmluaXR5IGluIHRoaXMgY2xhc3NcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBjb21wbGV4IGNvdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGNvdChudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLnRhbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGNvc2VjYW50IG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgayAqIFBJIDogayBpcyBhbnkgaW50ZWdlciB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBjb3NlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGNzYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLnNpbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBxdW90aWVudCBvZiB0d28gY29tcGxleCBudW1iZXJzLlxyXG4gKiBJZiB0aGUgZGVub21pbmF0b3IgaXMgY29uc2lkZXJlZCBhcyAwLFxyXG4gKiByZXR1cm4gTmFOIGluc3RlYWQgb2YgSW5maW5pdHlcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTEgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgbGVmdCBvZiAnLycgc2lnblxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMiAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSByaWdodCBvZiAnLycgc2lnblxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUXVvdGllbnQgb2YgdHdvIG51bWJlcnNcclxuICovXG5mdW5jdGlvbiBkaXZpZGUobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bTEucmU7XG4gIHZhciBiID0gbnVtMS5pbTtcbiAgdmFyIGMgPSBudW0yLnJlO1xuICB2YXIgZCA9IG51bTIuaW07XG5cbiAgaWYgKE1hdGguYWJzKGMpIDwgdGhpcy5FUFNJTE9OICYmIE1hdGguYWJzKGQpIDwgdGhpcy5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGRlbm9taW5hdG9yID0gTWF0aC5wb3coYywgMikgKyBNYXRoLnBvdyhkLCAyKTtcbiAgcmV0dXJuIG5ldyB0aGlzKChhICogYyArIGIgKiBkKSAvIGRlbm9taW5hdG9yLCAoYiAqIGMgLSBhICogZCkgLyBkZW5vbWluYXRvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGl2aWRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudGlhbCBmdW5jdGlvbiB3aXRoIGJhc2UgRVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gRXhwb25lbnRcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgZSB0byB0aGUgcG93ZXIgb2YgbnVtXHJcbiAqL1xuZnVuY3Rpb24gZXhwKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciByZSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciB0aGV0YSA9IG51bS5nZXRJbWFnaW5hcnkoKTtcbiAgdmFyIHIgPSBNYXRoLmV4cChyZSk7XG4gIHJldHVybiBuZXcgdGhpcyhyICogTWF0aC5jb3ModGhldGEpLCByICogTWF0aC5zaW4odGhldGEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHA7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBOb3RlIHRoYXQgdGhlIGFyZ3VtZW50IGlzIHJlc3RyaWN0ZWQgdG8gdGhlIGludGVydmFsIFsgMCwgMiAqIFBJIClcclxuICogSWYgdGhlIGdpdmVuIG51bWJlciBpcyBjb25zaWRlcmVkIGFzIDAsIHJldHVybiB1bmRlZmluZWRcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSBhcmd1bWVudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldEFyZ3VtZW50KCkge1xuICB2YXIgeCA9IHRoaXMucmU7XG4gIHZhciB5ID0gdGhpcy5pbTtcbiAgdmFyIGVwc2lsb24gPSAxIC8gKE1hdGgucG93KDEwLCAxNSkgKiAyKTtcblxuICBpZiAoTWF0aC5hYnMoeCkgPCBlcHNpbG9uICYmIE1hdGguYWJzKHkpIDwgZXBzaWxvbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoeCA9PT0gMCkge1xuICAgIGlmICh5ID4gMCkge1xuICAgICAgcmV0dXJuIE1hdGguUEkgKiAwLjU7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguUEkgKiAxLjU7XG4gIH1cblxuICBpZiAoeSA9PT0gMCkge1xuICAgIGlmICh4ID4gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguUEk7XG4gIH1cblxuICBpZiAoeCA+IDAgJiYgeSA+IDApIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuKHkgLyB4KTtcbiAgfVxuXG4gIGlmICh4IDwgMCAmJiB5ID4gMCkge1xuICAgIHJldHVybiBNYXRoLlBJIC0gTWF0aC5hdGFuKHkgLyAoeCAqIC0xKSk7XG4gIH1cblxuICBpZiAoeCA8IDAgJiYgeSA8IDApIHtcbiAgICByZXR1cm4gTWF0aC5QSSArIE1hdGguYXRhbih5ICogLTEgLyAoeCAqIC0xKSk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5QSSAqIDIgLSBNYXRoLmF0YW4oeSAqIC0xIC8geCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXJndW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgTnVtYmVyIH0gLSBSZXR1cm4gdGhlIGltYWdpbmFyeSBwYXJ0IG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gZ2V0SW1hZ2luYXJ5KCkge1xuICByZXR1cm4gdGhpcy5pbTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJbWFnaW5hcnk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgTnVtYmVyIH0gLSBSZXR1cm4gdGhlIG1vZHVsdXMgKGxlbmd0aCkgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRNb2R1bHVzKCkge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMucmUsIDIpICsgTWF0aC5wb3codGhpcy5pbSwgMikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1vZHVsdXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgTnVtYmVyIH0gLSBSZXR1cm4gdGhlIHJlYWwgcGFydCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldFJlYWwoKSB7XG4gIHJldHVybiB0aGlzLnJlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJlYWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2Ugb2YgZ2l2ZW4gY29tcGxleCBudW1iZXIsIGkuZS4gMS96XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSBpbnZlcnNlXHJcbiAqL1xuZnVuY3Rpb24gaW52ZXJzZShudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5PTkUsIG51bSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52ZXJzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHR3byBjb21wbGV4IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgYXMgaWRlbnRpY2FsLlxyXG4gKiBFaXRoZXIgYm90aCBhcmUgTmFOIG9yIGJvdGggcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzIGFyZSBleHRyZW1lbHkgY2xvc2VkLlxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXJcclxuICogQHBhcmFtIHsgSW50ZWdlciB9IGRpZ2l0IC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJuIHsgQm9vbGVhbiB9IC0gUmV0dXJuIHRydWUgaWYgdHdvIGNvbXBsZXggbnVtYmVycyBhcmUgY29uc2lkZXJlZCBhcyBpZGVudGljYWxcclxuICovXG5mdW5jdGlvbiBpc0VxdWFsKG51bTEsIG51bTIpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAxNTtcblxuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoZGlnaXQpIHx8IGRpZ2l0IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBub24tbmVnYXRpdmUgaW50ZWdlciBkaWdpdCcpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIGEgPSBudW0xLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0xLmdldEltYWdpbmFyeSgpO1xuICB2YXIgYyA9IG51bTIuZ2V0UmVhbCgpO1xuICB2YXIgZCA9IG51bTIuZ2V0SW1hZ2luYXJ5KCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYikgJiYgTnVtYmVyLmlzTmFOKGMpICYmIE51bWJlci5pc05hTihkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBjKSA8IEVQU0lMT04gJiYgTWF0aC5hYnMoYiAtIGQpIDwgRVBTSUxPTjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGdpdmVuIGNvbXBsZXggbnVtYmVyIGlzIE5hTiBvciBub3RcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBCb29sZWFuIH0gLSBSZXR1cm4gdHJ1ZSBpZiBvbmUgb2YgcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnQgYXJlIE5hTlxyXG4gKi9cbmZ1bmN0aW9uIGlzTmFOKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciByZSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciBpbSA9IG51bS5nZXRJbWFnaW5hcnkoKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKHJlKSB8fCBOdW1iZXIuaXNOYU4oaW0pKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYU47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIG5hdHVyYWwgbG9nIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIE5vdGUgdGhhdCBjb21wbGV4IGxvZyBpcyBhIG11bHRpdmFsdWVkIGZ1bmN0aW9uLFxyXG4gKiBCdXQgdGhpcyBmdW5jdGlvbiBvbmx5IHByb3ZpZGVzIHRoZSBwcmluY2lwYWwgdmFsdWUgYnlcclxuICogcmVzdHJpY3RpbmcgdGhlIGltYWdpbmFyeSBwYXJ0IHRvIHRoZSBpbnRlcnZhbCBbMCwgMiAqIFBpKS5cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBhZnRlciB0YWtpbmcgbmF0dXJhbCBsb2dcclxuICovXG5mdW5jdGlvbiBsb2cobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIHIgPSBudW0uZ2V0TW9kdWx1cygpO1xuICB2YXIgdGhldGEgPSBudW0uZ2V0QXJndW1lbnQoKTtcblxuICBpZiAociA8IHRoaXMuRVBTSUxPTiB8fCB0aGV0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKE1hdGgubG9nKHIpLCB0aGV0YSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgcHJvZHVjdCBvZiB0d28gY29tcGxleCBudW1iZXJzXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0xIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIGxlZnQgb2YgJ3gnIHNpZ25cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTIgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgcmlnaHQgb2YgJ3gnIHNpZ25cclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFByb2R1Y3Qgb2YgdHdvIG51bWJlcnNcclxuICovXG5mdW5jdGlvbiBtdWx0aXBseShudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtMS5yZTtcbiAgdmFyIGIgPSBudW0xLmltO1xuICB2YXIgYyA9IG51bTIucmU7XG4gIHZhciBkID0gbnVtMi5pbTtcbiAgcmV0dXJuIG5ldyB0aGlzKGEgKiBjIC0gYiAqIGQsIGEgKiBkICsgYiAqIGMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBwb3dlciBvZiBjb21wbGV4IG51bWJlcixcclxuICogVGhlIGV4cG9uZW50IGNhbiBiZSBhbnkgcmVhbCBudW1iZXJcclxuICogSWYgeW91IHdhbnQgdG8gY2FsY3VsYXRlIHRoZSBrLXRoIHJvb3QsXHJcbiAqIFlvdSBzaG91bGQga25vdyB0aGF0IGl0IG9ubHkgcmV0dXJucyBvbmUgb3V0IG9mIGsgc29sdXRpb25zLFxyXG4gKiBBbHRob3VnaCB0aGVyZSBhcmUgdG90YWwgayBwb3NzaWJsZSBzb2x1dGlvbnMgZm9yIGstdGggcm9vdCBwcm9ibGVtLlxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQmFzZVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IHwgTnVtYmVyIH0gbiAtIEV4cG9uZW50XHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZXhwb25lbnRpYXRpb25cclxuICovXG5mdW5jdGlvbiBwb3cobnVtLCBuKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpIHx8IHR5cGVvZiBuICE9PSAnbnVtYmVyJyAmJiAhKG4gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbiA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShuKSB8fCBOdW1iZXIuaXNOYU4obikpIHtcbiAgICAgIHJldHVybiB0aGlzLk5hTjtcbiAgICB9XG5cbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuT05FO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRXF1YWwobnVtLCB0aGlzLlpFUk8pKSB7XG4gICAgICByZXR1cm4gdGhpcy5aRVJPO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmV4cCh0aGlzLm11bHRpcGx5KG5ldyB0aGlzKG4sIDApLCB0aGlzLmxvZyhudW0pKSk7XG4gIH1cblxuICBpZiAobiBpbnN0YW5jZW9mIHRoaXMpIHtcbiAgICByZXR1cm4gdGhpcy5leHAodGhpcy5tdWx0aXBseShuLCB0aGlzLmxvZyhudW0pKSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5OYU47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG93OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBzZWNhbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAoIDJrICsgMSkgKiBQSSAvIDIgOiBrIGlzIGFueSBpbnRlZ2VyIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBjb21wbGV4IHNlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHNlYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLmNvcyhudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIHNpbmUgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gc2luKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLnNpbihhKSAqIE1hdGguY29zaChiKSwgTWF0aC5jb3MoYSkgKiBNYXRoLnNpbmgoYikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIGNvbXBsZXggbnVtYmVyc1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSBsZWZ0IG9mICctJyBzaWduXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIHJpZ2h0IG9mICctJyBzaWduXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBEaWZmZXJlbmNlIG9mIHR3byBudW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3QobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtMS5yZSAtIG51bTIucmUsIG51bTEuaW0gLSBudW0yLmltKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJ0cmFjdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgdGFuZ2VudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7ICggMmsgKyAxKSAqIFBJIC8gMiA6IGsgaXMgYW55IGludGVnZXIgfVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHRhbihudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuc2luKG51bSksIHRoaXMuY29zKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEByZXR1cm4geyBTdHJpbmcgfSAtIFJldHVybiB0aGUgc3RyaW5naWZpZWQgYW5kIGZvcm1hdHRlZCBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICB2YXIgcmUgPSB0aGlzLnJlLFxuICAgICAgaW0gPSB0aGlzLmltO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4ocmUpIHx8IE51bWJlci5pc05hTihpbSkpIHtcbiAgICByZXR1cm4gJ05hTic7XG4gIH1cblxuICBpZiAocmUgPT09IDAgJiYgaW0gPT09IDApIHtcbiAgICByZXR1cm4gJzAnO1xuICB9XG5cbiAgaWYgKHJlID09PSAwKSB7XG4gICAgaWYgKGltID09PSAxKSB7XG4gICAgICByZXR1cm4gJ2knO1xuICAgIH1cblxuICAgIGlmIChpbSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAnLWknO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChpbSwgXCJpXCIpO1xuICB9XG5cbiAgaWYgKGltID09PSAwKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlKTtcbiAgfVxuXG4gIGlmIChpbSA+IDApIHtcbiAgICBpZiAoaW0gPT09IDEpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgKyBpXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgKyBcIikuY29uY2F0KGltLCBcImlcIik7XG4gIH1cblxuICBpZiAoaW0gPT09IC0xKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiAtIGlcIik7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiIC0gXCIpLmNvbmNhdChNYXRoLmFicyhpbSksIFwiaVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG4vKipcclxuICogUmV0dXJucyBhIENvbXBsZXggTnVtYmVyXHJcbiAqIEBwYXJhbSB7IE51bWJlciB9IGFyZzEgLSByZWFsIHBhcnQgb2YgdGhlIGNvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IE51bWJlciB9IGFyZzIgLSBpbWFnaW5hcnkgcGFydCBvZiB0aGUgY29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gQ29tcGxleChhcmcxLCBhcmcyKSB7XG4gIHZhciB0eXBlMSA9IF90eXBlb2YoYXJnMSk7XG5cbiAgdmFyIHR5cGUyID0gX3R5cGVvZihhcmcyKTtcblxuICBpZiAodHlwZTEgPT09ICdudW1iZXInICYmIHR5cGUyID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYXJnMSkgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcxKSkge1xuICAgICAgdGhpcy5yZSA9IE5hTjtcbiAgICAgIHRoaXMuaW0gPSBOYU47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnJlID0gYXJnMTtcbiAgICB0aGlzLmltID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh0eXBlMSA9PT0gJ251bWJlcicgJiYgdHlwZTIgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKE51bWJlci5pc05hTihhcmcxKSB8fCBOdW1iZXIuaXNOYU4oYXJnMikgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcxKSB8fCAhTnVtYmVyLmlzRmluaXRlKGFyZzIpKSB7XG4gICAgICB0aGlzLnJlID0gTmFOO1xuICAgICAgdGhpcy5pbSA9IE5hTjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMucmUgPSBhcmcxO1xuICAgIHRoaXMuaW0gPSBhcmcyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5yZSA9IE5hTjtcbiAgdGhpcy5pbSA9IE5hTjtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbkNvbXBsZXgucHJvdG90eXBlLmdldFJlYWwgPSByZXF1aXJlKCcuL2NvcmUvZ2V0UmVhbCcpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0SW1hZ2luYXJ5ID0gcmVxdWlyZSgnLi9jb3JlL2dldEltYWdpbmFyeScpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0TW9kdWx1cyA9IHJlcXVpcmUoJy4vY29yZS9nZXRNb2R1bHVzJyk7XG5Db21wbGV4LnByb3RvdHlwZS5nZXRBcmd1bWVudCA9IHJlcXVpcmUoJy4vY29yZS9nZXRBcmd1bWVudCcpO1xuQ29tcGxleC5wcm90b3R5cGUudG9TdHJpbmcgPSByZXF1aXJlKCcuL2NvcmUvdG9TdHJpbmcnKTtcbkNvbXBsZXguaXNOYU4gPSByZXF1aXJlKCcuL2NvcmUvaXNOYU4nKTtcbkNvbXBsZXguaXNFcXVhbCA9IHJlcXVpcmUoJy4vY29yZS9pc0VxdWFsJyk7XG5Db21wbGV4LmNvbmp1Z2F0ZSA9IHJlcXVpcmUoJy4vY29yZS9jb25qdWdhdGUnKTtcbkNvbXBsZXguaW52ZXJzZSA9IHJlcXVpcmUoJy4vY29yZS9pbnZlcnNlJyk7XG5Db21wbGV4LmFkZCA9IHJlcXVpcmUoJy4vY29yZS9hZGQnKTtcbkNvbXBsZXguc3VidHJhY3QgPSByZXF1aXJlKCcuL2NvcmUvc3VidHJhY3QnKTtcbkNvbXBsZXgubXVsdGlwbHkgPSByZXF1aXJlKCcuL2NvcmUvbXVsdGlwbHknKTtcbkNvbXBsZXguZGl2aWRlID0gcmVxdWlyZSgnLi9jb3JlL2RpdmlkZScpO1xuQ29tcGxleC5leHAgPSByZXF1aXJlKCcuL2NvcmUvZXhwJyk7XG5Db21wbGV4LmxvZyA9IHJlcXVpcmUoJy4vY29yZS9sb2cnKTtcbkNvbXBsZXgucG93ID0gcmVxdWlyZSgnLi9jb3JlL3BvdycpO1xuQ29tcGxleC5zaW4gPSByZXF1aXJlKCcuL2NvcmUvc2luJyk7XG5Db21wbGV4LmNvcyA9IHJlcXVpcmUoJy4vY29yZS9jb3MnKTtcbkNvbXBsZXgudGFuID0gcmVxdWlyZSgnLi9jb3JlL3RhbicpO1xuQ29tcGxleC5jc2MgPSByZXF1aXJlKCcuL2NvcmUvY3NjJyk7XG5Db21wbGV4LnNlYyA9IHJlcXVpcmUoJy4vY29yZS9zZWMnKTtcbkNvbXBsZXguY290ID0gcmVxdWlyZSgnLi9jb3JlL2NvdCcpO1xuQ29tcGxleC5hc2luID0gcmVxdWlyZSgnLi9jb3JlL2FzaW4nKTtcbkNvbXBsZXguYWNvcyA9IHJlcXVpcmUoJy4vY29yZS9hY29zJyk7XG5Db21wbGV4LmF0YW4gPSByZXF1aXJlKCcuL2NvcmUvYXRhbicpO1xuQ29tcGxleC5hY3NjID0gcmVxdWlyZSgnLi9jb3JlL2Fjc2MnKTtcbkNvbXBsZXguYXNlYyA9IHJlcXVpcmUoJy4vY29yZS9hc2VjJyk7XG5Db21wbGV4LmFjb3QgPSByZXF1aXJlKCcuL2NvcmUvYWNvdCcpO1xuQ29tcGxleC5OYU4gPSBuZXcgQ29tcGxleChOYU4pO1xuQ29tcGxleC5PTkUgPSBuZXcgQ29tcGxleCgxKTtcbkNvbXBsZXguWkVSTyA9IG5ldyBDb21wbGV4KDApO1xuQ29tcGxleC5QSSA9IG5ldyBDb21wbGV4KE1hdGguUEkpO1xuQ29tcGxleC5FID0gbmV3IENvbXBsZXgoTWF0aC5FKTtcbkNvbXBsZXguRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIDE1KSAqIDIpO1xubW9kdWxlLmV4cG9ydHMgPSBDb21wbGV4OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSU5WQUxJRF9BUlJBWTogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uLWFycmF5IGFyZ3VtZW50JyxcbiAgSU5WQUxJRF9NQVRSSVg6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhbiBpbnZhbGlkIG1hdHJpeCcsXG4gIElOVkFMSURfU1FVQVJFX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uLXNxdWFyZSBtYXRyaXgnLFxuICBJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYSBub24gdXBwZXItdHJpYW5ndWxhciBtYXRyaXgnLFxuICBJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYSBub24gbG93ZXItdHJpYW5ndWxhciBtYXRyaXgnLFxuICBJTlZBTElEX0VYUE9ORU5UOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBub24tbmVnYXRpdmUgaW50ZWdlciBleHBvbmVudCcsXG4gIElOVkFMSURfUk9XX0NPTDogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIHJvdyBhbmQgY29sdW1uJyxcbiAgSU5WQUxJRF9ST1c6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciByb3cnLFxuICBJTlZBTElEX0NPTFVNTjogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIGNvbHVtbicsXG4gIElOVkFMSURfUk9XU19FWFBSRVNTSU9OOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgaW52YWxpZCByb3dzIGV4cHJlc3Npb24nLFxuICBJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTjogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGludmFsaWQgY29sdW1ucyBleHByZXNzaW9uJyxcbiAgSU5WQUxJRF9QX05PUk06ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBpbnZhbGlkIHAtbm9ybScsXG4gIE9WRVJGTE9XX0lOREVYOiAnSW52YWxpZCBhcmd1bWVudDogTWF0cml4IGluZGV4IG92ZXJmbG93JyxcbiAgT1ZFUkZMT1dfQ09MVU1OOiAnSW52YWxpZCBhcmd1bWVudDogQ29sdW1uIGluZGV4IG92ZXJmbG93JyxcbiAgT1ZFUkZMT1dfUk9XOiAnSW52YWxpZCBhcmd1bWVudDogUm93IGluZGV4IG92ZXJmbG93JyxcbiAgTk9fVU5JUVVFX1NPTFVUSU9OOiAnQXJpdGhtZXRpYyBFeGNlcHRpb246IFRoZSBzeXN0ZW0gaGFzIG5vIHVuaXF1ZSBzb2x1dGlvbicsXG4gIFNJWkVfSU5DT01QQVRJQkxFOiAnSW52YWxpZCBhcmd1bWVudDogTWF0cml4IHNpemUtaW5jb21wYXRpYmxlJyxcbiAgU0lOR1VMQVJfTUFUUklYOiAnQXJpdGhtZXRpYyBFeGNlcHRpb246IFRoZSBtYXRyaXggaXMgbm90IGludmVydGlibGUnLFxuICBFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzI6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBhIHN0cmluZyBvciBhIG51bWJlciBhdCBhcmd1bWVudHNbMV0gYW5kIGFyZ3VtZW50c1syXScsXG4gIEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVM6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBlaXRoZXIgYW4gYXJyYXkgb2YgbnVtYmVycyBvciBhbiBhcnJheSBvZiBzcXVhcmUgbWF0cmljZXMnXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBMVVAgZGVjb21wb3NpdGlvbiBvZiB0aGUgTWF0cml4LFxyXG4gKiB3aGVyZSBMIGlzIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4IHdoaWNoIGRpYWdvbmFsIGVudHJpZXMgYXJlIGFsd2F5cyAxLFxyXG4gKiBVIGlzIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4LCBhbmQgUCBpcyBwZXJtdXRhdGlvbiBtYXRyaXguPGJyPjxicj5cclxuICogXHJcbiAqIEl0IGlzIGltcGxlbWVudGVkIHVzaW5nIEdhdXNzaWFuIEVsaW1pbmF0aW9uIHdpdGggUGFydGlhbCBQaXZvdGluZyBpbiBvcmRlciB0b1xyXG4gKiByZWR1Y2UgdGhlIGVycm9yIGNhdXNlZCBieSBmbG9hdGluZy1wb2ludCBhcml0aG1ldGljLjxicj48YnI+XHJcbiAqIFxyXG4gKiBOb3RlIHRoYXQgaWYgb3B0aW1pemVkIGlzIHRydWUsIFAgaXMgYSBQZXJtdXRhdGlvbiBBcnJheSBhbmQgYm90aCBMIGFuZCBVIGFyZSBtZXJnZWRcclxuICogaW50byBvbmUgbWF0cml4IGluIG9yZGVyIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBtYXRyaXhcclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW1pemVkPWZhbHNlXSAtIFJldHVybnMgW1AsIExVXSBpZiBpdCBpcyB0cnVlLCBbUCwgTCwgVV0gaWYgaXQgaXMgZmFsc2VcclxuICogQHJldHVybnMge01hdHJpeFtdfSBUaGUgTFVQIGRlY29tcG9zaXRpb24gb2YgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIExVKEEpIHtcbiAgdmFyIG9wdGltaXplZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgc2l6ZSA9IE1hdGgubWluKHJvdywgY29sKTtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcbiAgdmFyIHBlcm11dGF0aW9uID0gaW5pdFBlcm11dGF0aW9uKHJvdyk7XG5cbiAgdmFyIGNvcHkgPSB0aGlzLmNsb25lKEEpLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3cgLSAxOyBpKyspIHtcbiAgICB2YXIgY3VycmVudENvbCA9IE1hdGgubWluKGksIGNvbCk7IC8vIGFwcGx5IFBhcnRpYWwgUGl2b3RpbmdcblxuICAgIFBhcnRpYWxQaXZvdGluZyhjb3B5LCBwZXJtdXRhdGlvbiwgY3VycmVudENvbCwgcm93LCBjb2wpO1xuICAgIHZhciBpdGggPSBwZXJtdXRhdGlvbltpXTtcbiAgICB2YXIgcGl2b3QgPSBjb3B5W2l0aF1bY3VycmVudENvbF07XG5cbiAgICBpZiAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgcm93OyBqKyspIHtcbiAgICAgIHZhciBqdGggPSBwZXJtdXRhdGlvbltqXTtcbiAgICAgIHZhciBlbnRyeSA9IGNvcHlbanRoXVtjdXJyZW50Q29sXTtcblxuICAgICAgaWYgKE1hdGguYWJzKGVudHJ5KSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHZhciBmYWN0b3IgPSBlbnRyeSAvIHBpdm90O1xuXG4gICAgICAgIGZvciAodmFyIGsgPSBjdXJyZW50Q29sOyBrIDwgY29sOyBrKyspIHtcbiAgICAgICAgICBjb3B5W2p0aF1ba10gLT0gZmFjdG9yICogY29weVtpdGhdW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29weVtqdGhdW2N1cnJlbnRDb2xdID0gZmFjdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkocm93KTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCByb3c7IF9pMisrKSB7XG4gICAgcmVzdWx0W19pMl0gPSBjb3B5W3Blcm11dGF0aW9uW19pMl1dO1xuICB9XG5cbiAgaWYgKG9wdGltaXplZCkge1xuICAgIHJldHVybiBbcGVybXV0YXRpb24sIG5ldyB0aGlzKHJlc3VsdCldO1xuICB9XG5cbiAgdmFyIFAgPSB0aGlzLmdlbmVyYXRlKHJvdywgcm93LCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHZhciBpZHggPSBwZXJtdXRhdGlvbltpXTtcblxuICAgIGlmIChqID09PSBpZHgpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbiAgdmFyIEwgPSB0aGlzLmdlbmVyYXRlKHJvdywgc2l6ZSwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSA9PT0gaikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgaWYgKGkgPCBqKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0W2ldW2pdO1xuICB9KTtcbiAgdmFyIFUgPSB0aGlzLmdlbmVyYXRlKHNpemUsIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSA+IGopIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRbaV1bal07XG4gIH0pO1xuICByZXR1cm4gW1AsIEwsIFVdO1xufVxuXG47XG5cbmZ1bmN0aW9uIGluaXRQZXJtdXRhdGlvbihzaXplKSB7XG4gIHZhciBwZXJtdXRhdGlvbiA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHBlcm11dGF0aW9uW2ldID0gaTtcbiAgfVxuXG4gIHJldHVybiBwZXJtdXRhdGlvbjtcbn1cblxuZnVuY3Rpb24gUGFydGlhbFBpdm90aW5nKG1hdHJpeCwgcGVybXV0YXRpb24sIHBvcywgcm93LCBjb2wpIHtcbiAgdmFyIGN1cnJlbnRDb2wgPSBNYXRoLm1pbihwb3MsIGNvbCk7XG4gIHZhciBtYXhJZHggPSBwb3M7XG4gIHZhciBtYXggPSBNYXRoLmFicyhtYXRyaXhbcGVybXV0YXRpb25bcG9zXV1bY3VycmVudENvbF0pO1xuXG4gIGZvciAodmFyIGkgPSBwb3MgKyAxOyBpIDwgcm93OyBpKyspIHtcbiAgICB2YXIgdmFsdWUgPSBNYXRoLmFicyhtYXRyaXhbcGVybXV0YXRpb25baV1dW2N1cnJlbnRDb2xdKTtcblxuICAgIGlmICh2YWx1ZSA+IG1heCkge1xuICAgICAgbWF4SWR4ID0gaTtcbiAgICAgIG1heCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0ID0gcGVybXV0YXRpb25bcG9zXTtcbiAgcGVybXV0YXRpb25bcG9zXSA9IHBlcm11dGF0aW9uW21heElkeF07XG4gIHBlcm11dGF0aW9uW21heElkeF0gPSB0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExVOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBRUiBkZWNvbXBvc2l0aW9uIG9mIHRoZSBNYXRyaXhcclxuICogd2hlcmUgUSBpcyBvcnRob2dvbmFsIG1hdHJpeCwgUiBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGFsZ29yaXRobSBpcyBpbXBsZW1lbnRlZCB1c2luZyBIb3VzZWhvbGRlciBUcmFuc2Zvcm0gaW5zdGVhZCBvZiBHcmFt4oCTU2NobWlkdCBwcm9jZXNzXHJcbiAqIGJlY2F1c2UgdGhlIEhvdXNlaG9sZGVyIFRyYW5zZm9ybSBpcyBtb3JlIG51bWVyaWNhbGx5IHN0YWJsZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4W119IFRoZSBRUiBkZWNvbXBvc2l0aW9uIG9mIG1hdHJpeCBpbiB0aGUgZm9ybSBvZiBbUSwgUl1cclxuICovXG5cblxuZnVuY3Rpb24gUVIoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBzaXplID0gTWF0aC5taW4ocm93LCBjb2wpO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBtYXRyaXhSID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIHZhciBtYXRyaXhRID0gdGhpcy5pZGVudGl0eShyb3cpLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAvLyBpZiBhbGwgZW50cmllcyBiZWxvdyBtYWluIGRpYWdvbmFsIGFyZSBjb25zaWRlcmVkIGFzIHplcm8sIHNraXAgdGhpcyByb3VuZFxuICAgIHZhciBza2lwID0gdHJ1ZTtcblxuICAgIGZvciAodmFyIGkgPSBqICsgMTsgaSA8IHJvdzsgaSsrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobWF0cml4UltpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICBza2lwID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcCkge1xuICAgICAgLy8gQXBwbHkgSG91c2Vob2xkZXIgdHJhbnNmb3JtXG4gICAgICB2YXIgbm9ybSA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9pMiA9IGo7IF9pMiA8IHJvdzsgX2kyKyspIHtcbiAgICAgICAgbm9ybSArPSBNYXRoLnBvdyhtYXRyaXhSW19pMl1bal0sIDIpO1xuICAgICAgfVxuXG4gICAgICBub3JtID0gTWF0aC5zcXJ0KG5vcm0pOyAvLyByZWR1Y2UgZmxvYXRpbmcgcG9pbnQgYXJpdGhtYXRpYyBlcnJvclxuXG4gICAgICB2YXIgcyA9IC0xO1xuXG4gICAgICBpZiAobWF0cml4UltqXVtqXSA8IDApIHtcbiAgICAgICAgcyA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciB1MSA9IG1hdHJpeFJbal1bal0gLSBzICogbm9ybTtcbiAgICAgIHZhciB3ID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCByb3cgLSBqOyBfaTMrKykge1xuICAgICAgICB3W19pM10gPSBtYXRyaXhSW19pMyArIGpdW2pdIC8gdTE7XG4gICAgICB9XG5cbiAgICAgIHdbMF0gPSAxO1xuICAgICAgdmFyIHRhdSA9IC0xICogcyAqIHUxIC8gbm9ybTtcbiAgICAgIHZhciBzdWJSID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCByb3cgLSBqOyBfaTQrKykge1xuICAgICAgICB2YXIgbmV3Um93ID0gbmV3IEFycmF5KGNvbCk7XG5cbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjb2w7IGsrKykge1xuICAgICAgICAgIG5ld1Jvd1trXSA9IG1hdHJpeFJbaiArIF9pNF1ba107XG4gICAgICAgIH1cblxuICAgICAgICBzdWJSW19pNF0gPSBuZXdSb3c7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNSA9IGo7IF9pNSA8IHJvdzsgX2k1KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IGNvbDsgX2srKykge1xuICAgICAgICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCByb3cgLSBqOyBtKyspIHtcbiAgICAgICAgICAgIHN1bW1hdGlvbiArPSBzdWJSW21dW19rXSAqIHdbbV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWF0cml4UltfaTVdW19rXSA9IHN1YlJbX2k1IC0gal1bX2tdIC0gdGF1ICogd1tfaTUgLSBqXSAqIHN1bW1hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3ViUSA9IG5ldyBBcnJheShyb3cpO1xuXG4gICAgICBmb3IgKHZhciBfaTYgPSAwOyBfaTYgPCByb3c7IF9pNisrKSB7XG4gICAgICAgIHZhciBfbmV3Um93ID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICAgIGZvciAodmFyIF9rMiA9IDA7IF9rMiA8IHJvdyAtIGo7IF9rMisrKSB7XG4gICAgICAgICAgX25ld1Jvd1tfazJdID0gbWF0cml4UVtfaTZdW2ogKyBfazJdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViUVtfaTZdID0gX25ld1JvdztcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2k3ID0gMDsgX2k3IDwgcm93OyBfaTcrKykge1xuICAgICAgICBmb3IgKHZhciBfazMgPSBqOyBfazMgPCByb3c7IF9rMysrKSB7XG4gICAgICAgICAgdmFyIF9zdW1tYXRpb24gPSAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgX20gPSAwOyBfbSA8IHJvdyAtIGo7IF9tKyspIHtcbiAgICAgICAgICAgIF9zdW1tYXRpb24gKz0gc3ViUVtfaTddW19tXSAqIHdbX21dO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hdHJpeFFbX2k3XVtfazNdID0gc3ViUVtfaTddW19rMyAtIGpdIC0gdGF1ICogd1tfazMgLSBqXSAqIF9zdW1tYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfaTggPSAwOyBfaTggPCByb3c7IF9pOCsrKSB7XG4gICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IGNvbDsgX2orKykge1xuICAgICAgaWYgKF9pOCA+IF9qKSB7XG4gICAgICAgIG1hdHJpeFJbX2k4XVtfal0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbbmV3IHRoaXMobWF0cml4USksIG5ldyB0aGlzKG1hdHJpeFIpXTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBRUjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT047XG4vKipcclxuKiBTb2x2ZSBzeXN0ZW0gb2YgbGluZWFyIGVxdWF0aW9ucyBVeCA9IHkgdXNpbmcgYmFja3dhcmQgc3Vic3RpdHV0aW9uLFxyXG4qIHdoZXJlIFUgaXMgYW4gdXBwZXIgdHJpYW5ndWxhciBtYXRyaXguXHJcbiogSWYgdGhlcmUgaXMgbm8gdW5pcXVlIHNvbHV0aW9ucywgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4qIEBtZW1iZXJvZiBNYXRyaXhcclxuKiBAc3RhdGljXHJcbiogQHBhcmFtIHtNYXRyaXh9IFUgLSBBbnkgbiB4IG4gdXBwZXIgdHJpYW5ndWxhciBNYXRyaXhcclxuKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIFV4ID0geVxyXG4qL1xuXG5cbmZ1bmN0aW9uIGJhY2t3YXJkKFUsIHkpIHtcbiAgaWYgKCEoVSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoeSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghVS5pc1VwcGVyVHJpYW5ndWxhcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVBQRVJfVFJJQU5HVUxBUl9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFVLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gVS5zaXplKClbMF07XG5cbiAgdmFyIF95JHNpemUgPSB5LnNpemUoKSxcbiAgICAgIF95JHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3kkc2l6ZSwgMiksXG4gICAgICB5cm93ID0gX3kkc2l6ZTJbMF0sXG4gICAgICB5Y29sID0gX3kkc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeFUgPSBVLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhZID0geS5fbWF0cml4O1xuXG4gIGlmICh5cm93ICE9PSBzaXplIHx8IHljb2wgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBVLl9kaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhVW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2VmZmljaWVudHMgPSBlbXB0eShzaXplLCAxKTtcblxuICBmb3IgKHZhciBfaTIgPSBzaXplIC0gMTsgX2kyID49IDA7IF9pMi0tKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gX2kyICsgMTsgaiA8IHNpemU7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXVswXSAqIG1hdHJpeFVbX2kyXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kyXVswXSA9IChtYXRyaXhZW19pMl1bMF0gLSBzdW1tYXRpb24pIC8gbWF0cml4VVtfaTJdW19pMl07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBiYWNrd2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT047XG4vKipcclxuICogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgTHggPSB5IHVzaW5nIGZvcndhcmQgc3Vic3RpdHV0aW9uLFxyXG4gKiB3aGVyZSBMIGlzIGEgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXguXHJcbiAqIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBMIC0gQW55IG4geCBuIGxvd2VyIHRyaWFuZ3VsYXIgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSB5IC0gQW55IG4geCAxIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIEx4ID0geVxyXG4gKi9cblxuXG5mdW5jdGlvbiBmb3J3YXJkKEwsIHkpIHtcbiAgaWYgKCEoTCBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoeSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTC5pc0xvd2VyVHJpYW5ndWxhcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTE9XRVJfVFJJQU5HVUxBUl9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFMLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gTC5zaXplKClbMF07XG5cbiAgdmFyIF95JHNpemUgPSB5LnNpemUoKSxcbiAgICAgIF95JHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3kkc2l6ZSwgMiksXG4gICAgICB5cm93ID0gX3kkc2l6ZTJbMF0sXG4gICAgICB5Y29sID0gX3kkc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeEwgPSBMLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhZID0geS5fbWF0cml4O1xuXG4gIGlmIChzaXplICE9PSB5cm93IHx8IHljb2wgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBMLl9kaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhMW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2VmZmljaWVudHMgPSBlbXB0eShzaXplLCAxKTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzaXplOyBfaTIrKykge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBfaTI7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXVswXSAqIG1hdHJpeExbX2kyXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kyXVswXSA9IChtYXRyaXhZW19pMl1bMF0gLSBzdW1tYXRpb24pIC8gbWF0cml4TFtfaTJdW19pMl07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBmb3J3YXJkOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT04sXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgQXggPSB5IHVzaW5nIExVIGRlY29tcG9zaXRpb24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBMIC0gQW55IG4geCBuIHNxdWFyZSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IG4geCAxIE1hdHJpeCB3aGljaCBpcyB0aGUgc29sdXRpb24gb2YgQXggPSB5XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHNvbHZlKEEsIGIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoYiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghQS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIGFSb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGFDb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX2Ikc2l6ZSA9IGIuc2l6ZSgpLFxuICAgICAgX2Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfYiRzaXplLCAyKSxcbiAgICAgIGJSb3cgPSBfYiRzaXplMlswXSxcbiAgICAgIGJDb2wgPSBfYiRzaXplMlsxXTtcblxuICBpZiAoYUNvbCAhPT0gYlJvdyB8fCBiQ29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG5cbiAgdmFyIF90aGlzJExVID0gdGhpcy5MVShBLCB0cnVlKSxcbiAgICAgIF90aGlzJExVMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJExVLCAyKSxcbiAgICAgIFAgPSBfdGhpcyRMVTJbMF0sXG4gICAgICBMVSA9IF90aGlzJExVMlsxXTtcblxuICB2YXIgbWF0cml4TFUgPSBMVS5fbWF0cml4O1xuICB2YXIgbWF0cml4QiA9IGIuX21hdHJpeDtcblxuICBmb3IgKHZhciBpID0gYVJvdyAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKE1hdGguYWJzKG1hdHJpeExVW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjbG9uZWRWZWN0b3IgPSBuZXcgQXJyYXkoYlJvdyk7XG4gIHZhciBjb2VmZmljaWVudHMgPSBuZXcgQXJyYXkoYlJvdyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYlJvdzsgX2kyKyspIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICBjbG9uZWRWZWN0b3JbX2kyXSA9IG1hdHJpeEJbUFtfaTJdXVswXTtcbiAgfVxuXG4gIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IGFSb3c7IF9pMysrKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9pMzsgaisrKSB7XG4gICAgICBzdW1tYXRpb24gKz0gY29lZmZpY2llbnRzW2pdICogbWF0cml4TFVbX2kzXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kzXSA9IGNsb25lZFZlY3RvcltfaTNdIC0gc3VtbWF0aW9uO1xuICB9XG5cbiAgZm9yICh2YXIgX2k0ID0gYVJvdyAtIDE7IF9pNCA+PSAwOyBfaTQtLSkge1xuICAgIHZhciBfc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIF9qID0gX2k0ICsgMTsgX2ogPCBhUm93OyBfaisrKSB7XG4gICAgICBfc3VtbWF0aW9uICs9IG1hdHJpeExVW19pNF1bX2pdICogY2xvbmVkVmVjdG9yW19qXTtcbiAgICB9XG5cbiAgICBjbG9uZWRWZWN0b3JbX2k0XSA9IChjb2VmZmljaWVudHNbX2k0XSAtIF9zdW1tYXRpb24pIC8gbWF0cml4TFVbX2k0XVtfaTRdO1xuICB9XG5cbiAgZm9yICh2YXIgX2k1ID0gMDsgX2k1IDwgYlJvdzsgX2k1KyspIHtcbiAgICBjb2VmZmljaWVudHNbX2k1XSA9IFtjbG9uZWRWZWN0b3JbX2k1XV07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzb2x2ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzdW0gb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGhhcyBzYW1lIHNpemUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBzdW0gb2YgdHdvIE1hdHJpY2VzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGFkZChBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICByb3cyID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBjb2wyID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyAhPT0gcm93MiB8fCBjb2wgIT09IGNvbDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeDEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXgyID0gQi5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4MVtpXVtqXSArIG1hdHJpeDJbaV1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBTSU5HVUxBUl9NQVRSSVggPSBfcmVxdWlyZS5TSU5HVUxBUl9NQVRSSVg7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuLyoqXHJcbiAqIEZpbmQgdGhlIGludmVyc2Ugb2Ygbm9uLXNpbmd1bGFyIG1hdHJpeCB1c2luZyBFbGVtZW50YXJ5IFJvdyBPcGVyYXRpb25zLlxyXG4gKiBJZiB0aGUgbWF0cml4IGlzIHNpbmd1bGFyLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBzcXVhcmUgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBpbnZlcnNlIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gaW52ZXJzZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSBBLnNpemUoKVswXTtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIC8vIGludmVyc2Ugb2YgMHgwIG1hdHJpeCBpcyBpdHNlbGZcbiAgICByZXR1cm4gbmV3IE1hdHJpeChbXSk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBpbnYgPSB0aGlzLmlkZW50aXR5KHNpemUpLl9tYXRyaXg7XG5cbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIHZhciBwZXJtdXRhdGlvbiA9IGluaXRQZXJtdXRhdGlvbihzaXplKTsgLy8gaXRlcmF0ZSBlYWNoIGNvbHVtblxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgdmFyIHBpdm90SWR4ID0gajtcbiAgICB2YXIgcGl2b3QgPSBjbG9uZVtwZXJtdXRhdGlvbltqXV1bal07XG5cbiAgICB3aGlsZSAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTiAmJiBwaXZvdElkeCA8IHNpemUgLSAxKSB7XG4gICAgICBwaXZvdElkeCsrO1xuICAgICAgcGl2b3QgPSBjbG9uZVtwZXJtdXRhdGlvbltwaXZvdElkeF1dW2pdO1xuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhwaXZvdCkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoU0lOR1VMQVJfTUFUUklYKTtcbiAgICB9XG5cbiAgICBpZiAoaiAhPT0gcGl2b3RJZHgpIHtcbiAgICAgIHZhciB0ZW1wID0gcGVybXV0YXRpb25bal07XG4gICAgICBwZXJtdXRhdGlvbltqXSA9IHBlcm11dGF0aW9uW3Bpdm90SWR4XTtcbiAgICAgIHBlcm11dGF0aW9uW3Bpdm90SWR4XSA9IHRlbXA7XG4gICAgfVxuXG4gICAgdmFyIHBpdm90Um93ID0gcGVybXV0YXRpb25bal07IC8vIHRoZSBwaXZvdCBpcyBndWFyYW50ZWVkIHRvIGJlIG5vbi16ZXJvXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgdmFyIGl0aCA9IHBlcm11dGF0aW9uW2ldO1xuXG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHNpemU7IGsrKykge1xuICAgICAgICAgIGlmIChrID09PSBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW2tdID0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoayA+IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1ba10gLz0gcGl2b3Q7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW52W2l0aF1ba10gLz0gcGl2b3Q7XG4gICAgICAgIH1cblxuICAgICAgICBwaXZvdCA9IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKGNsb25lW2l0aF1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdmFyIGZhY3RvciA9IGNsb25lW2l0aF1bal0gLyBwaXZvdDtcblxuICAgICAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgc2l6ZTsgX2srKykge1xuICAgICAgICAgIGlmIChfayA9PT0gaikge1xuICAgICAgICAgICAgY2xvbmVbaXRoXVtfa10gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfayA+IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1bX2tdIC09IGZhY3RvciAqIGNsb25lW3Bpdm90Um93XVtfa107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW52W2l0aF1bX2tdIC09IGZhY3RvciAqIGludltwaXZvdFJvd11bX2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHNpemU7IF9pKyspIHtcbiAgICBjbG9uZVtfaV0gPSBpbnZbcGVybXV0YXRpb25bX2ldXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhjbG9uZSk7XG59XG5cbjtcblxuZnVuY3Rpb24gaW5pdFBlcm11dGF0aW9uKHNpemUpIHtcbiAgdmFyIHBlcm11dGF0aW9uID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgcGVybXV0YXRpb25baV0gPSBpO1xuICB9XG5cbiAgcmV0dXJuIHBlcm11dGF0aW9uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmVyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBwcm9kdWN0IG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBpcyBzaXplLWNvbXBhdGlibGUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBwcm9kdWN0IG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5mdW5jdGlvbiBtdWx0aXBseShBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIEFyb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIEFjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIEJyb3cgPSBfQiRzaXplMlswXSxcbiAgICAgIEJjb2wgPSBfQiRzaXplMlsxXTtcblxuICBpZiAoQWNvbCAhPT0gQnJvdykge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgbWF0cml4QSA9IEEuX21hdHJpeDtcbiAgdmFyIG1hdHJpeEIgPSBCLl9tYXRyaXg7XG4gIHZhciByZXN1bHQgPSBlbXB0eShBcm93LCBCY29sKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IEFyb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgQmNvbDsgaisrKSB7XG4gICAgICByZXN1bHRbaV1bal0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IEJyb3c7IGsrKykge1xuICAgICAgICByZXN1bHRbaV1bal0gKz0gbWF0cml4QVtpXVtrXSAqIG1hdHJpeEJba11bal07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKHJlc3VsdCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgSU5WQUxJRF9FWFBPTkVOVCA9IF9yZXF1aXJlLklOVkFMSURfRVhQT05FTlQ7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcG93ZXIgb2YgYW55IHNxdWFyZSBtYXRyaXguXHJcbiAqIFRoZSBhbGdvcml0aG0gaXMgaW1wbGVtZW50ZWQgcmVjdXJzaXZlbHkuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBzcXVhcmUgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBleHBvbmVudCAtIEFueSBOb24tbmVnYXRpdmUgaW50ZWdlclxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgcG93ZXIgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBwb3coQSwgZXhwb25lbnQpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghQS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoZXhwb25lbnQpIHx8IGV4cG9uZW50IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0VYUE9ORU5UKTtcbiAgfVxuXG4gIHZhciBzaXplID0gQS5zaXplKClbMF07XG5cbiAgaWYgKGV4cG9uZW50ID09PSAwKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoc2l6ZSk7XG4gIH1cblxuICBpZiAoZXhwb25lbnQgPT09IDEpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShBKTtcbiAgfVxuXG4gIGlmIChleHBvbmVudCAlIDIgPT09IDApIHtcbiAgICB2YXIgX3RlbXAgPSB0aGlzLnBvdyhBLCBleHBvbmVudCAvIDIpO1xuXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkoX3RlbXAsIF90ZW1wKTtcbiAgfVxuXG4gIHZhciB0ZW1wID0gdGhpcy5wb3coQSwgKGV4cG9uZW50IC0gMSkgLyAyKTtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkodGhpcy5tdWx0aXBseSh0ZW1wLCB0ZW1wKSwgQSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcG93OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGhhcyBzYW1lIHNpemUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBkaWZmZXJlbmNlIG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YnRyYWN0KEEsIEIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIHJvdzIgPSBfQiRzaXplMlswXSxcbiAgICAgIGNvbDIgPSBfQiRzaXplMlsxXTtcblxuICBpZiAocm93ICE9PSByb3cyIHx8IGNvbCAhPT0gY29sMikge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgbWF0cml4MSA9IEEuX21hdHJpeDtcbiAgdmFyIG1hdHJpeDIgPSBCLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBtYXRyaXgxW2ldW2pdIC0gbWF0cml4MltpXVtqXTtcbiAgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBGaW5kIHRoZSB0cmFuc3Bvc2Ugb2YgYSBtYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0geyBNYXRyaXggfSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7IE1hdHJpeCB9IFJldHVybnMgdHJhbnNwb3NlIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gdHJhbnNwb3NlKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShjb2wsIHJvdywgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4W2pdW2ldO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUF9OT1JNID0gX3JlcXVpcmUuSU5WQUxJRF9QX05PUk0sXG4gICAgU0lOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuU0lOR1VMQVJfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGlvbnMgdGhlIGNvbmRpdGlvbiBudW1iZXIgb2Ygc3F1YXJlIE1hdHJpeFxyXG4gKiB3aXRoIHJlc3BlY3QgdG8gdGhlIGNob2ljZSBvZiBNYXRyaXggbm9ybS4gXHJcbiAqIElmIHRoZSBNYXRyaXggaXMgc2luZ3VsYXIsIHJldHVybnMgSW5maW5pdHkuPGJyPjxicj5cclxuICogVGhlIGNvbmRpdGlvbiBudW1iZXIgaXMgbm90IGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHsoMXwyfEluZmluaXR5fCdGJyl9IHAgLSBUeXBlIG9mIE1hdHJpeCBub3JtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb25kaXRpb24gbnVtYmVyIG9mIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBjb25kKCkge1xuICB2YXIgcCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMjtcblxuICBpZiAocCAhPT0gMSAmJiBwICE9PSAyICYmIHAgIT09IEluZmluaXR5ICYmIHAgIT09ICdGJykge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1BfTk9STSk7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIgaW52ZXJzZSA9IE1hdHJpeC5pbnZlcnNlKHRoaXMpO1xuICAgIHJldHVybiBpbnZlcnNlLm5vcm0ocCkgKiB0aGlzLm5vcm0ocCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFNJTkdVTEFSX01BVFJJWCkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY29uZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIHNxdWFyZSBNYXRyaXguXHJcbiAqIElmIHRoZSBNYXRyaXggc2l6ZSBpcyBsYXJnZXIgdGhhbiAzLCBpdCBjYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCB1c2luZ1xyXG4gKiBMVSBkZWNvbXBvc2l0aW9uLCBvdGhlcndpc2UsIHVzaW5nIExlaWJuaXogRm9ybXVsYS48YnI+PGJyPlxyXG4gKiBUaGUgZGV0ZXJtaW5hbnQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBkZXRlcm1pbmFudCBvZiBzcXVhcmUgbWF0cmlyeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBkZXQoKSB7XG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fZGV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIHNpemUgPSBtYXRyaXgubGVuZ3RoO1xuXG4gIGlmIChzaXplID09PSAwKSB7XG4gICAgdGhpcy5fZGV0ID0gMTtcbiAgICByZXR1cm4gMTsgLy8gdGhlIGRldGVybWluYW50IG9mIDB4MCBtYXRyaXggbXVzdCBiZSAxXG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gMSkge1xuICAgIHRoaXMuX2RldCA9IG1hdHJpeFswXVswXTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgaWYgKHNpemUgPT09IDIpIHtcbiAgICB0aGlzLl9kZXQgPSBtYXRyaXhbMF1bMF0gKiBtYXRyaXhbMV1bMV0gLSBtYXRyaXhbMF1bMV0gKiBtYXRyaXhbMV1bMF07XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIGlmIChzaXplID09PSAzKSB7XG4gICAgdGhpcy5fZGV0ID0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzFdICogbWF0cml4WzJdWzJdICsgbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzJdICogbWF0cml4WzJdWzBdICsgbWF0cml4WzBdWzJdICogbWF0cml4WzFdWzBdICogbWF0cml4WzJdWzFdIC0gbWF0cml4WzBdWzJdICogbWF0cml4WzFdWzFdICogbWF0cml4WzJdWzBdIC0gbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzBdICogbWF0cml4WzJdWzJdIC0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzJdICogbWF0cml4WzJdWzFdO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICB2YXIgX01hdHJpeCRMVSA9IE1hdHJpeC5MVSh0aGlzLCB0cnVlKSxcbiAgICAgIF9NYXRyaXgkTFUyID0gX3NsaWNlZFRvQXJyYXkoX01hdHJpeCRMVSwgMiksXG4gICAgICBQID0gX01hdHJpeCRMVTJbMF0sXG4gICAgICBMVSA9IF9NYXRyaXgkTFUyWzFdO1xuXG4gIHZhciBtYXRyaXhMVSA9IExVLl9tYXRyaXg7IC8vIGNvdW50IHdoZXRoZXIgdGhlIG51bWJlciBvZiBwZXJtdXRhdGlvbnMgPHN3YXA+IGlzIG9kZCBvciBldmVuXG4gIC8vIE8obl4yKVxuXG4gIHZhciBzd2FwID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChQW2ldID09PSBpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB3aGlsZSAoUFtpXSAhPT0gaSkge1xuICAgICAgdmFyIHRhcmdldCA9IFBbaV07XG4gICAgICBQW2ldID0gUFt0YXJnZXRdO1xuICAgICAgUFt0YXJnZXRdID0gdGFyZ2V0O1xuICAgICAgc3dhcCsrO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSAxO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHNpemU7IF9pMisrKSB7XG4gICAgcmVzdWx0ICo9IG1hdHJpeExVW19pMl1bX2kyXTtcbiAgfVxuXG4gIGlmIChzd2FwICUgMiA9PT0gMSkge1xuICAgIHRoaXMuX2RldCA9IHJlc3VsdCAqIC0xO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICB0aGlzLl9kZXQgPSByZXN1bHQ7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZGV0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vLyByZWZlcmVuY2U6IGh0dHBzOi8vcGVvcGxlLmluZi5ldGh6LmNoL2FyYmVuei9ld3AvTG5vdGVzL2NoYXB0ZXI0LnBkZlxudmFyIENvbXBsZXggPSByZXF1aXJlKCdAcmF5eWFtaGsvY29tcGxleCcpO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZWlnZW52YWx1ZXMgb2YgYW55IHNxdWFyZSBNYXRyaXggdXNpbmcgUVIgQWxnb3JpdGhtLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgZWlnZW52YWx1ZXMgY2FuIGJlIGVpdGhlciByZWFsIG51bWJlciBvciBjb21wbGV4IG51bWJlci5cclxuICogTm90ZSB0aGF0IGFsbCBlaWdlbnZhbHVlcyBhcmUgaW5zdGFuY2Ugb2YgQ29tcGxleCxcclxuICogZm9yIG1vcmUgZGV0YWlscyBwbGVhc2UgdmlzaXQgW0NvbXBsZXguanNde0BsaW5rIGh0dHBzOi8vcmF5eWFtaGsuZ2l0aHViLmlvL0NvbXBsZXguanN9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgZWlnZW52YWx1ZXMgYXJlIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge0NvbXBsZXhbXX0gQXJyYXkgb2YgZWlnZW52YWx1ZXNcclxuICovXG5cblxuZnVuY3Rpb24gZWlnZW52YWx1ZXMoKSB7XG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fZWlnZW52YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9laWdlbnZhbHVlcztcbiAgfVxuXG4gIHZhciBzaXplID0gdGhpcy5zaXplKClbMF07XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgdmFyIGRpZ2l0ID0gdGhpcy5fZGlnaXQ7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG5cbiAgdmFyIGNsb25lID0gTWF0cml4LmNsb25lKHRoaXMpLl9tYXRyaXg7XG5cbiAgdmFyIGlzQ29udmVyZ2VudCA9IHRydWU7IC8vIGZsYWdcblxuICB2YXIgc2tpcCA9IGZhbHNlOyAvLyBUcmFuc2Zvcm0gbWF0cml4IHRvIEhlc3NlbmJlcmcgbWF0cml4XG5cbiAgSG91c2Vob2xkZXJUcmFuc2Zvcm0oY2xvbmUsIGRpZ2l0KTtcblxuICBmb3IgKHZhciBpID0gc2l6ZSAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICB2YXIgZGl2ZXJnZW5jZUNvdW50ID0gMDtcbiAgICB2YXIgcHJldiA9IHZvaWQgMDsgLy8gdXNlZCB0byBkZXRlcm1pbmUgY29udmVyZ2VuY2VcbiAgICAvLyBpZiBvYnRhaW5zIGNvbXBsZXggZWlnZW52YWx1ZXMgcGFpciBpbiBwcmV2aW91cyBpdGVyYXRpb24sIHNraXAgY3VycmVudCByb3VuZFxuXG4gICAgaWYgKHNraXApIHtcbiAgICAgIHNraXAgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBzaGlmdCA9IGNsb25lW3NpemUgLSAxXVtzaXplIC0gMV07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoIWlzQ29udmVyZ2VudCkge1xuICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBlaWdlbnZhbHVlIGlzIG5vdCByZWFsXG4gICAgICAgIHByZXYgPSBzaXplMkVpZ2VudmFsdWVzKGNsb25lW2kgLSAxXVtpIC0gMV0sIGNsb25lW2kgLSAxXVtpXSwgY2xvbmVbaV1baSAtIDFdLCBjbG9uZVtpXVtpXSkubWV0cmljO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZSBpcyByZWFsXG4gICAgICAgIHByZXYgPSBNYXRoLmFicyhjbG9uZVtpXVtpIC0gMV0pO1xuICAgICAgfSAvLyBhcHBseSBzaW5nbGUgc2hpZnRcblxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBjbG9uZVtqXVtqXSAtPSBzaGlmdDtcbiAgICAgIH0gLy8gQXBwbHkgUVIgQWxnb3JpdGhtXG5cblxuICAgICAgSGVzc2VuYmVyZ1FSKGNsb25lLCBkaWdpdCk7XG5cbiAgICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCBzaXplOyBfaisrKSB7XG4gICAgICAgIGNsb25lW19qXVtfal0gKz0gc2hpZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NvbnZlcmdlbnQgJiYgcHJldiA8IE1hdGguYWJzKGNsb25lW2ldW2kgLSAxXSkpIHtcbiAgICAgICAgZGl2ZXJnZW5jZUNvdW50Kys7XG4gICAgICB9IC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWUgaXMgcmVhbCBhbmQgdGhlIGVudHJ5IGlzIGFsbW9zdCBaRVJPID0+IGJyZWFrO1xuXG5cbiAgICAgIGlmIChpc0NvbnZlcmdlbnQgJiYgTWF0aC5hYnMoY2xvbmVbaV1baSAtIDFdKSA8IEVQU0lMT04pIHtcbiAgICAgICAgdmFsdWVzW2ldID0gbmV3IENvbXBsZXgoY2xvbmVbaV1baV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZXMgcGFpciBpcyBjb21wbGV4LCBpZiB0aGUgZGlmZmVyZW5jZSBvZiB0aGUgcHJldmlvdXMgZWlnYW52YWx1ZXMgYW5kIHRoZVxuICAgICAgLy8gZWlnZW52YWx1ZXMgb2Ygc3VibWF0cml4IGlzIGFsbW9zdCBaRVJPID0+IGJyZWFrXG5cblxuICAgICAgdmFyIF9zaXplMkVpZ2VudmFsdWVzID0gc2l6ZTJFaWdlbnZhbHVlcyhjbG9uZVtpIC0gMV1baSAtIDFdLCBjbG9uZVtpIC0gMV1baV0sIGNsb25lW2ldW2kgLSAxXSwgY2xvbmVbaV1baV0pLFxuICAgICAgICAgIG1ldHJpYyA9IF9zaXplMkVpZ2VudmFsdWVzLm1ldHJpYyxcbiAgICAgICAgICBlaWdlbjEgPSBfc2l6ZTJFaWdlbnZhbHVlcy5laWdlbjEsXG4gICAgICAgICAgZWlnZW4yID0gX3NpemUyRWlnZW52YWx1ZXMuZWlnZW4yO1xuXG4gICAgICBpZiAoIWlzQ29udmVyZ2VudCAmJiBNYXRoLmFicyhwcmV2IC0gbWV0cmljKSA8IEVQU0lMT04pIHtcbiAgICAgICAgaXNDb252ZXJnZW50ID0gdHJ1ZTsgLy8gcmUtaW5pdGlhbGl6ZVxuXG4gICAgICAgIHNraXAgPSB0cnVlO1xuICAgICAgICB2YXIgcmUxID0gZWlnZW4xLnJlLFxuICAgICAgICAgICAgaW0xID0gZWlnZW4xLmltO1xuICAgICAgICB2YXIgcmUyID0gZWlnZW4yLnJlLFxuICAgICAgICAgICAgaW0yID0gZWlnZW4yLmltO1xuICAgICAgICB2YWx1ZXNbaV0gPSBuZXcgQ29tcGxleChyZTEsIGltMSk7XG4gICAgICAgIHZhbHVlc1tpIC0gMV0gPSBuZXcgQ29tcGxleChyZTIsIGltMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSAvLyBpZiB0aGUgZW50cnkgZG9lc24ndCBjb252ZXJnZSA9PiBjb21wbGV4IGVpZ2VudmFsdWVzIHBhaXJcblxuXG4gICAgICBpZiAoZGl2ZXJnZW5jZUNvdW50ID4gMykge1xuICAgICAgICBpc0NvbnZlcmdlbnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIXNraXApIHtcbiAgICB2YWx1ZXNbMF0gPSBuZXcgQ29tcGxleChjbG9uZVswXVswXSk7XG4gIH1cblxuICB0aGlzLl9laWdlbnZhbHVlcyA9IHZhbHVlcztcbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuO1xuXG5mdW5jdGlvbiBIb3VzZWhvbGRlclRyYW5zZm9ybShBLCBkaWdpdCkge1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZSAtIDI7IGorKykge1xuICAgIHZhciB4Tm9ybSA9IDA7XG4gICAgdmFyIHUgPSBuZXcgQXJyYXkoc2l6ZSAtIGogLSAxKTtcblxuICAgIGZvciAodmFyIGkgPSBqICsgMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgdmFyIGVudHJ5ID0gQVtpXVtqXTtcbiAgICAgIHhOb3JtICs9IE1hdGgucG93KGVudHJ5LCAyKTtcbiAgICAgIHVbaSAtIGogLSAxXSA9IGVudHJ5O1xuICAgIH1cblxuICAgIHhOb3JtID0gTWF0aC5zcXJ0KHhOb3JtKTtcblxuICAgIGlmIChNYXRoLmFicyh4Tm9ybSkgPCBFUFNJTE9OKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodVswXSA+PSAwKSB7XG4gICAgICB1WzBdICs9IHhOb3JtO1xuICAgIH0gZWxzZSB7XG4gICAgICB1WzBdIC09IHhOb3JtO1xuICAgIH0gLy8gTWFrZSAndScgdW5pdCB2ZWN0b3JcblxuXG4gICAgdmFyIHVOb3JtID0gMDtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB1Lmxlbmd0aDsgX2krKykge1xuICAgICAgdU5vcm0gKz0gTWF0aC5wb3codVtfaV0sIDIpO1xuICAgIH1cblxuICAgIHVOb3JtID0gTWF0aC5zcXJ0KHVOb3JtKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHUubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdVtfaTJdIC89IHVOb3JtO1xuICAgIH0gLy8gdXBkYXRlIHRoZSBtYXRyaXgsIG11bHRpcGx5IFAgZnJvbSBsZWZ0XG5cblxuICAgIGZvciAodmFyIG4gPSBqOyBuIDwgc2l6ZTsgbisrKSB7XG4gICAgICAvLyBjb2x1bW5cbiAgICAgIHZhciB2ID0gbmV3IEFycmF5KHNpemUgLSBqIC0gMSk7XG5cbiAgICAgIGZvciAodmFyIG0gPSBqICsgMTsgbSA8IHNpemU7IG0rKykge1xuICAgICAgICB2W20gLSBqIC0gMV0gPSBBW21dW25dO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2NhbGVyID0gMDtcblxuICAgICAgZm9yICh2YXIgX20gPSAwOyBfbSA8IHYubGVuZ3RoOyBfbSsrKSB7XG4gICAgICAgIHNjYWxlciArPSB2W19tXSAqIHVbX21dO1xuICAgICAgfVxuXG4gICAgICBzY2FsZXIgKj0gMjtcblxuICAgICAgZm9yICh2YXIgX20yID0gaiArIDE7IF9tMiA8IHNpemU7IF9tMisrKSB7XG4gICAgICAgIC8vIHJvd1xuICAgICAgICBpZiAobiA9PT0gaiAmJiBfbTIgIT09IGogKyAxKSB7XG4gICAgICAgICAgQVtfbTJdW25dID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW19tMl1bbl0gPSB2W19tMiAtIGogLSAxXSAtIHNjYWxlciAqIHVbX20yIC0gaiAtIDFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyB1cGRhdGUgdGhlIG1hdHJpeCwgbXVsdGlwbHkgUCBmcm9tIHJpZ2h0XG5cblxuICAgIGZvciAodmFyIF9tMyA9IDA7IF9tMyA8IHNpemU7IF9tMysrKSB7XG4gICAgICAvLyByb3dcbiAgICAgIHZhciBfdiA9IG5ldyBBcnJheShzaXplIC0gaiAtIDEpO1xuXG4gICAgICBmb3IgKHZhciBfbiA9IGogKyAxOyBfbiA8IHNpemU7IF9uKyspIHtcbiAgICAgICAgX3ZbX24gLSBqIC0gMV0gPSBBW19tM11bX25dO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3NjYWxlciA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9uMiA9IDA7IF9uMiA8IF92Lmxlbmd0aDsgX24yKyspIHtcbiAgICAgICAgX3NjYWxlciArPSBfdltfbjJdICogdVtfbjJdO1xuICAgICAgfVxuXG4gICAgICBfc2NhbGVyICo9IDI7XG5cbiAgICAgIGZvciAodmFyIF9uMyA9IGogKyAxOyBfbjMgPCBzaXplOyBfbjMrKykge1xuICAgICAgICAvLyBjb2x1bW5cbiAgICAgICAgQVtfbTNdW19uM10gPSBfdltfbjMgLSBqIC0gMV0gLSBfc2NhbGVyICogdVtfbjMgLSBqIC0gMV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEhlc3NlbmJlcmdRUihILCBkaWdpdCkge1xuICB2YXIgc2l6ZSA9IEgubGVuZ3RoO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2luY29zID0gbmV3IEFycmF5KHNpemUgLSAxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICB2YXIgYSA9IEhbaV1baV07XG4gICAgdmFyIGMgPSBIW2kgKyAxXVtpXTtcbiAgICB2YXIgbm9ybSA9IE1hdGguc3FydChNYXRoLnBvdyhhLCAyKSArIE1hdGgucG93KGMsIDIpKTtcblxuICAgIGlmIChub3JtIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGNvcyA9IGEgLyBub3JtO1xuICAgIHZhciBzaW4gPSBjICogLTEgLyBub3JtO1xuICAgIHNpbmNvc1tpXSA9IFtzaW4sIGNvc107XG4gICAgdmFyIHJvdzEgPSBuZXcgQXJyYXkoc2l6ZSAtIGkpO1xuICAgIHZhciByb3cyID0gbmV3IEFycmF5KHNpemUgLSBpKTtcblxuICAgIGZvciAodmFyIGogPSBpOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICByb3cxW2ogLSBpXSA9IEhbaV1bal07XG4gICAgICByb3cyW2ogLSBpXSA9IEhbaSArIDFdW2pdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9qMiA9IGk7IF9qMiA8IHNpemU7IF9qMisrKSB7XG4gICAgICBIW2ldW19qMl0gPSBjb3MgKiByb3cxW19qMiAtIGldICsgc2luICogLTEgKiByb3cyW19qMiAtIGldO1xuXG4gICAgICBpZiAoaSA9PT0gX2oyKSB7XG4gICAgICAgIEhbaSArIDFdW19qMl0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgSFtpICsgMV1bX2oyXSA9IHNpbiAqIHJvdzFbX2oyIC0gaV0gKyBjb3MgKiByb3cyW19qMiAtIGldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9qMyA9IDA7IF9qMyA8IHNpemUgLSAxOyBfajMrKykge1xuICAgIGlmICghc2luY29zW19qM10pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBfc2luY29zJF9qID0gX3NsaWNlZFRvQXJyYXkoc2luY29zW19qM10sIDIpLFxuICAgICAgICBfc2luID0gX3NpbmNvcyRfalswXSxcbiAgICAgICAgX2NvcyA9IF9zaW5jb3MkX2pbMV07XG5cbiAgICB2YXIgY29sMSA9IG5ldyBBcnJheShfajMgKyAyKTtcbiAgICB2YXIgY29sMiA9IG5ldyBBcnJheShfajMgKyAyKTtcblxuICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8PSBfajMgKyAxOyBfaTMrKykge1xuICAgICAgY29sMVtfaTNdID0gSFtfaTNdW19qM107XG4gICAgICBjb2wyW19pM10gPSBIW19pM11bX2ozICsgMV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDw9IF9qMyArIDE7IF9pNCsrKSB7XG4gICAgICBIW19pNF1bX2ozXSA9IGNvbDFbX2k0XSAqIF9jb3MgLSBjb2wyW19pNF0gKiBfc2luO1xuICAgICAgSFtfaTRdW19qMyArIDFdID0gY29sMVtfaTRdICogX3NpbiArIGNvbDJbX2k0XSAqIF9jb3M7XG4gICAgfVxuICB9XG59IC8vIGZpbmQgdGhlIGVpZ2VudmFsdWVzIG9mIDJ4MiBtYXRyaXhcblxuXG5mdW5jdGlvbiBzaXplMkVpZ2VudmFsdWVzKGUxMSwgZTEyLCBlMjEsIGUyMikge1xuICB2YXIgYiA9IChlMTEgKyBlMjIpICogLTE7XG4gIHZhciBjID0gZTExICogZTIyIC0gZTIxICogZTEyO1xuICB2YXIgZGVsdGEgPSBNYXRoLnBvdyhiLCAyKSAtIDQgKiBjO1xuICB2YXIgcmUxO1xuICB2YXIgaW0xO1xuICB2YXIgcmUyO1xuICB2YXIgaW0yO1xuXG4gIGlmIChkZWx0YSA+PSAwKSB7XG4gICAgaW0xID0gMDtcbiAgICBpbTIgPSAwO1xuXG4gICAgaWYgKGIgPj0gMCkge1xuICAgICAgcmUxID0gKGIgKiAtMSAtIE1hdGguc3FydChkZWx0YSkpIC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmUxID0gKGIgKiAtMSArIE1hdGguc3FydChkZWx0YSkpIC8gMjtcbiAgICB9XG5cbiAgICByZTIgPSBjIC8gcmUxO1xuICB9IGVsc2Uge1xuICAgIHJlMSA9IC1iIC8gMjtcbiAgICByZTIgPSByZTE7XG4gICAgaW0xID0gTWF0aC5zcXJ0KGRlbHRhICogLTEpIC8gMjtcbiAgICBpbTIgPSBpbTEgKiAtMTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWV0cmljOiBNYXRoLnNxcnQoTWF0aC5wb3cocmUxLCAyKSArIE1hdGgucG93KGltMSwgMikpLFxuICAgIGVpZ2VuMToge1xuICAgICAgcmU6IHJlMSxcbiAgICAgIGltOiBpbTFcbiAgICB9LFxuICAgIGVpZ2VuMjoge1xuICAgICAgcmU6IHJlMixcbiAgICAgIGltOiBpbTJcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZWlnZW52YWx1ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9QX05PUk0gPSBfcmVxdWlyZS5JTlZBTElEX1BfTk9STTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBNYXRyaXggbm9ybSBvZiBhbnkgTWF0cml4IHdpdGggcmVzcGVjdCB0byB0aGUgY2hvaWNlIG9mIG5vcm0uPGJyPjxicj5cclxuICogXHJcbiAqIDEtbm9ybTogTWF4aW11bSBhYnNvbHV0ZSBjb2x1bW4gc3VtIG9mIHRoZSBNYXRyaXguPGJyPlxyXG4gKiAyLW5vcm06IFRoZSBsYXJnZXN0IHNpbmd1bGFyIHZhbHVlIG9mIE1hdHJpeC48YnI+XHJcbiAqIEluZmluaXR5LW5vcm06IE1heGltdW0gYWJzb2x1dGUgcm93IHN1bSBvZiB0aGUgTWF0cml4Ljxicj5cclxuICogRnJvYmVuaXVzLW5vcm06IEV1Y2xpZGVhbiBub3JtIGludmxvdmluZyBhbGwgZW50cmllcy48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIG5vcm1zIGFyZSBub3QgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0geygxfDJ8SW5maW5pdHl8J0YnKX0gcCAtIFRoZSBjaG9pY2Ugb2YgTWF0cml4IG5vcm1cclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG5vcm0gb2YgdGhlIE1hdHJpeC5cclxuICovXG5cblxuZnVuY3Rpb24gbm9ybSgpIHtcbiAgdmFyIHAgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDI7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIGlmIChwICE9PSAxICYmIHAgIT09IDIgJiYgcCAhPT0gSW5maW5pdHkgJiYgcCAhPT0gJ0YnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUF9OT1JNKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gIHZhciByZXN1bHQgPSAwO1xuXG4gIGlmIChwID09PSAxKSB7XG4gICAgLy8gbWF4IG9mIGNvbHVtbiBzdW1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICB2YXIgY29sdW1uU3VtID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgICAgICBjb2x1bW5TdW0gKz0gTWF0aC5hYnMobWF0cml4W2ldW2pdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtblN1bSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSBjb2x1bW5TdW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSAvLyBsYXJnZXN0IHNpbmd1bGFyIHZhbHVlXG5cblxuICBpZiAocCA9PT0gMikge1xuICAgIHZhciB0cmFuc3Bvc2UgPSBNYXRyaXgudHJhbnNwb3NlKHRoaXMpO1xuICAgIHZhciBNID0gTWF0cml4Lm11bHRpcGx5KHRyYW5zcG9zZSwgdGhpcyk7XG4gICAgdmFyIGVpZ2VudmFsdWVzID0gTS5laWdlbnZhbHVlcygpO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgZWlnZW52YWx1ZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIHZhbHVlID0gZWlnZW52YWx1ZXNbX2kyXS5nZXRNb2R1bHVzKCk7XG5cbiAgICAgIGlmICh2YWx1ZSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KHJlc3VsdCk7XG4gIH1cblxuICBpZiAocCA9PT0gSW5maW5pdHkpIHtcbiAgICAvLyBtYXggb2Ygcm93IHN1bVxuICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IHJvdzsgX2kzKyspIHtcbiAgICAgIHZhciByb3dTdW0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgY29sOyBfaisrKSB7XG4gICAgICAgIHJvd1N1bSArPSBNYXRoLmFicyhtYXRyaXhbX2kzXVtfal0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocm93U3VtID4gcmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IHJvd1N1bTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IC8vIEZcblxuXG4gIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IHJvdzsgX2k0KyspIHtcbiAgICBmb3IgKHZhciBfajIgPSAwOyBfajIgPCBjb2w7IF9qMisrKSB7XG4gICAgICByZXN1bHQgKz0gTWF0aC5wb3cobWF0cml4W19pNF1bX2oyXSwgMik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG5vcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBudWxsaXR5IG9mIGFueSBNYXRyaXgsIHdoaWNoIGlzIHRoZSBkaW1lbnNpb25cclxuICogb2YgdGhlIG51bGxzcGFjZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIG51bGxpdHkgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVsbGl0eSBvZiB0aGUgbWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gbnVsbGl0eSgpIHtcbiAgaWYgKHRoaXMuX251bGxpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9udWxsaXR5O1xuICB9XG5cbiAgdmFyIGNvbCA9IHRoaXMuc2l6ZSgpWzFdO1xuICB2YXIgcmFuayA9IHRoaXMucmFuaygpO1xuICB0aGlzLl9udWxsaXR5ID0gY29sIC0gcmFuaztcbiAgcmV0dXJuIHRoaXMuX251bGxpdHk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gbnVsbGl0eTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSByYW5rIG9mIGFueSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIHRoZSBkaW1lbnNpb24gb2YgdGhlIHJvdyBzcGFjZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJhbmsgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmFuayBvZiB0aGUgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHJhbmsoKSB7XG4gIGlmICh0aGlzLl9yYW5rICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuaztcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgdGhpcy5fZGlnaXQpICogMik7XG4gIHZhciBSID0gTWF0cml4LlFSKHRoaXMpWzFdO1xuICB2YXIgbWF0cml4UiA9IFIuX21hdHJpeDtcblxuICB2YXIgX1Ikc2l6ZSA9IFIuc2l6ZSgpLFxuICAgICAgX1Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfUiRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9SJHNpemUyWzBdLFxuICAgICAgY29sID0gX1Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIHRoaXMuX3JhbmsgPSAxO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIHJrID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGk7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKG1hdHJpeFJbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgcmsrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fcmFuayA9IHJrO1xuICByZXR1cm4gcms7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcmFuazsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNpemUgb2YgYW55IE1hdHJpeCxcclxuICogd2hpY2ggaXMgaW4gdGhlIGZvcm0gb2YgW3JvdywgY29sdW1uXS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHNpemUgb2YgTWF0cml4IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcltdfSBUaGUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMgb2YgYSBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBzaXplKCkge1xuICBpZiAodGhpcy5fc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICBpZiAoQS5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLl9zaXplID0gWzAsIDBdO1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgdGhpcy5fc2l6ZSA9IFtBLmxlbmd0aCwgQVswXS5sZW5ndGhdO1xuICByZXR1cm4gdGhpcy5fc2l6ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzaXplOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSB0cmFjZSBvZiBhbnkgc3F1YXJlIE1hdHJpeCxcclxuICogd2hpY2ggaXMgdGhlIHN1bSBvZiBhbGwgZW50cmllcyBvbiB0aGUgbWFpbiBkaWFnb25hbC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRyYWNlIGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHRyYWNlIG9mIHRoZSBzcXVhcmUgTWF0cml4LlxyXG4gKi9cblxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgdmFyIGlzU3F1YXJlID0gdGhpcy5faXNTcXVhcmUgIT09IHVuZGVmaW5lZCA/IHRoaXMuX2lzU3F1YXJlIDogdGhpcy5pc1NxdWFyZSgpO1xuXG4gIGlmICghaXNTcXVhcmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIGlmICh0aGlzLl90cmFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYWNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG4gIHZhciB0ciA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICB0ciArPSBBW2ldW2ldO1xuICB9XG5cbiAgdGhpcy5fdHJhY2UgPSB0cjtcbiAgcmV0dXJuIHRyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHRyYWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgZGlhZ29uYWwgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBEaWFnb25hbCBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggdGhlIGVudHJpZXMgb3V0c2lkZSB0aGUgbWFpbiBkaWFnb25hbFxyXG4gKiBhcmUgYWxsIHplcm8uIE5vdGUgdGhhdCB0aGUgdGVybSBkaWFnb25hbCByZWZlcnMgdG8gcmVjdGFuZ3VsYXIgZGlhZ29uYWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBydWUgaWYgdGhlIE1hdHJpeCBpcyBkaWFnb25hbCBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBpc0RpYWdvbmFsKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc0RpYWdvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEaWFnb25hbDtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgdGhpcy5faXNEaWFnb25hbCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKGkgIT09IGogJiYgTWF0aC5hYnMoQVtpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLmlzRGlhZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzRGlhZ29uYWwgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc0RpYWdvbmFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgbG93ZXIgdHJpYW5ndWxhciBNYXRyaXggb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBMb3dlciB0cmlhbmd1bGFyIE1hdHJpeCBpcyBhIE1hdHJpeCBpbiB3aGljaCBhbGwgdGhlIGVudHJpZXNcclxuICogYWJvdmUgdGhlIG1haW4gZGlhZ29uYWwgYXJlIHplcm8uIE5vdGUgdGhhdCBpdCBjYW4gYmUgYXBwbGllZFxyXG4gKiB0byBhbnkgbm9uLXNxdWFyZSBNYXRyaXguPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgbG93ZXIgdHJpYW5ndWxhclxyXG4gKi9cbmZ1bmN0aW9uIGlzTG93ZXJUcmlhbmd1bGFyKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgPT09IDApIHtcbiAgICAvLyBbXVxuICAgIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKEFbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNMb3dlclRyaWFuZ3VsYXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzcXVhcmUgTWF0cml4IGlzIG9ydGhvZ29uYWwgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBPcnRob2dvbmFsIE1hdHJpeCBpcyBhIE1hdHJpeCBpbiB3aGljaCBhbGwgcm93cyBhbmQgY29sdW1ucyBhcmVcclxuICogb3J0aG9ub3JtYWwgdmVjdG9ycy48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNxdWFyZSBNYXRyaXggaXMgb3J0aG9nb25hbFxyXG4gKi9cbmZ1bmN0aW9uIGlzT3J0aG9nb25hbCgpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNPcnRob2dvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNPcnRob2dvbmFsO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGZvciAodmFyIGogPSBpOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICB2YXIgZW50cnkgPSAwO1xuXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHNpemU7IGsrKykge1xuICAgICAgICBlbnRyeSArPSBBW2ldW2tdICogQVtqXVtrXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IGogJiYgTWF0aC5hYnMoZW50cnkgLSAxKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzT3J0aG9nb25hbCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKGVudHJ5KSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzT3J0aG9nb25hbCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNPcnRob2dvbmFsID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNPcnRob2dvbmFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3F1YXJlIE1hdHJpeCBpcyBza2V3IHN5bW1ldHJpYyBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFNrZXcgc3ltbWV0cmljIE1hdHJpeCBpcyBhIHNxdWFyZSBNYXRyaXggd2hvc2UgdHJhbnNwb3NlIGVxdWFscyBpdHMgbmVnYXRpdmUuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzcXVhcmUgTWF0cml4IGlzIHNrZXcgc3ltbWV0cmljXHJcbiAqL1xuZnVuY3Rpb24gaXNTa2V3U3ltbWV0cmljKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc1NrZXdTeW1tZXRyaWMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NrZXdTeW1tZXRyaWM7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuXG4gIGlmIChzaXplID09PSAwKSB7XG4gICAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gW11cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdICsgQVtqXVtpXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzU2tld1N5bW1ldHJpYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIE1hdHJpeCBpcyBzcXVhcmUgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBTcXVhcmUgTWF0cml4IGlzIGEgTWF0cml4IHdpdGggc2FtZSBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1ucy48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIE1hdHJpeCBpcyBzcXVhcmVcclxuICovXG5mdW5jdGlvbiBpc1NxdWFyZSgpIHtcbiAgaWYgKHRoaXMuX2lzU3F1YXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTcXVhcmU7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICBpZiAoQS5sZW5ndGggPT09IDApIHtcbiAgICAvLyAweDAgbWF0cml4XG4gICAgdGhpcy5faXNTcXVhcmUgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdGhpcy5faXNTcXVhcmUgPSBBLmxlbmd0aCA9PT0gQVswXS5sZW5ndGg7XG4gIHJldHVybiB0aGlzLl9pc1NxdWFyZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1NxdWFyZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIHNxdWFyZSBNYXRyaXggaXMgc3ltbWV0cmljIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogU3ltbWV0cmljIE1hdHJpeCBpcyBhIHNxdWFyZSBNYXRyaXggdGhhdCBpcyBlcXVhbCB0byBpdHMgdHJhbnNwb3NlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgc3F1YXJlIE1hdHJpeCBpcyBzeW1tZXRyaWNcclxuICovXG5mdW5jdGlvbiBpc1N5bW1ldHJpYygpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNTeW1tZXRyaWMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc1N5bW1ldHJpYztcbiAgfVxuXG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBpOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdIC0gQVtqXVtpXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc1N5bW1ldHJpYyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNTeW1tZXRyaWMgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1N5bW1ldHJpYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIHVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4IG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogVXBwZXIgdHJpYW5ndWxhciBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHRoZSBlbnRyaWVzIGJlbG93IHRoZVxyXG4gKiBtYWluIGRpYWdvbmFsIGFyZSB6ZXJvLiBOb3RlIHRoYXQgaXQgY2FuIGJlIGFwcGxpZWQgdG8gYW55IG5vbi1zcXVhcmUgTWF0cml4Ljxicj48YnI+XHJcbiAqICBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIE1hdHJpeCBpcyB1cHBlciB0cmlhbmd1bGFyXHJcbiAqL1xuZnVuY3Rpb24gaXNVcHBlclRyaWFuZ3VsYXIoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNVcHBlclRyaWFuZ3VsYXI7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIC8vIFtdXG4gICAgdGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChpIDw9IGopIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzVXBwZXJUcmlhbmd1bGFyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDcmVhdGVzIGEgY29weSBvZiBNYXRyaXguIE5vdGUgdGhhdCBpdCByZXNldHMgdGhlIGNhY2hlZCBkYXRhLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IENvcHkgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpXVtqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfQ09MVU1OID0gX3JlcXVpcmUuT1ZFUkZMT1dfQ09MVU1OLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgY29sdW1uIG9mIGEgTWF0cml4IHdpdGggdmFsaWQgaW5kZXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQW55IHZhbGlkIGNvbHVtbiBpbmRleFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBDb2x1bW4gb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBjb2x1bW4oQSwgaW5kZXgpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgfHwgaW5kZXggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHIgPSBfQSRzaXplMlswXSxcbiAgICAgIGMgPSBfQSRzaXplMlsxXTtcblxuICBpZiAoaW5kZXggPj0gYykge1xuICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUociwgMSwgZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gbWF0cml4W2ldW2luZGV4XTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY29sdW1uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9pc051bWJlcicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfQVJSQVkgPSBfcmVxdWlyZS5JTlZBTElEX0FSUkFZLFxuICAgIEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVMgPSBfcmVxdWlyZS5FWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgZGlhZ29uYWwgTWF0cml4IGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSBvZiBudW1iZXJzLFxyXG4gKiBnZW5lcmF0ZXMgYmxvY2sgZGlhZ29uYWwgTWF0cml4IGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSBvZiBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7KG51bWJlcltdfE1hdHJpeFtdKX0gdmFsdWVzIC0gQXJyYXkgb2YgbnVtYmVycyBvciBNYXRyaWNlc1xyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBCbG9jayBkaWFnb25hbCBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gZGlhZyh2YWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9BUlJBWSk7XG4gIH1cblxuICB2YXIgYXJnc051bSA9IHZhbHVlcy5sZW5ndGg7XG4gIHZhciB2YXJpYW50O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc051bTsgaSsrKSB7XG4gICAgdmFyIGVudHJ5ID0gdmFsdWVzW2ldO1xuXG4gICAgaWYgKCFpc051bWJlcihlbnRyeSkgJiYgIShlbnRyeSBpbnN0YW5jZW9mIE1hdHJpeCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOdW1iZXIoZW50cnkpKSB7XG4gICAgICBpZiAoIXZhcmlhbnQpIHtcbiAgICAgICAgdmFyaWFudCA9ICdudW1iZXInO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhcmlhbnQgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbnRyeS5pc1NxdWFyZSgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXZhcmlhbnQpIHtcbiAgICAgICAgdmFyaWFudCA9ICdzcXVhcmUnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhcmlhbnQgIT09ICdzcXVhcmUnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gSEVSRTogdmFyaWFudCBzaG91bGQgYmUgZWl0aGVyICdudW1iZXInIG9yICdzcXVhcmUnXG5cblxuICBpZiAodmFyaWFudCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0cml4LmdlbmVyYXRlKGFyZ3NOdW0sIGFyZ3NOdW0sIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2ldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfSAvLyBHdWFyYW50ZWVkIHRoYXQgW3ZhbHVlc10gaXMgYSBsaXN0IG9mIHNxdWFyZSBtYXRyaWNlc1xuXG5cbiAgdmFyIHNpemUgPSAwO1xuICB2YXIgdGVtcCA9IG5ldyBBcnJheShhcmdzTnVtKTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJnc051bTsgX2krKykge1xuICAgIHZhciBfbGVuID0gdmFsdWVzW19pXS5zaXplKClbMF07XG5cbiAgICBzaXplICs9IF9sZW47XG4gICAgdGVtcFtfaV0gPSBfbGVuO1xuICB9XG5cbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBzdGFydCA9IDA7XG4gIHZhciBsZW4gPSB0ZW1wW2lkeF07XG4gIHJldHVybiBNYXRyaXguZ2VuZXJhdGUoc2l6ZSwgc2l6ZSwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSAtIHN0YXJ0ID09PSBsZW4gJiYgaiAtIHN0YXJ0ID09PSBsZW4pIHtcbiAgICAgIHN0YXJ0ICs9IGxlbjtcbiAgICAgIGlkeCsrO1xuICAgIH1cblxuICAgIHZhciBpdGggPSBpIC0gc3RhcnQ7IC8vIGl0aCA8IDAgaWYgYmVsb3cgbWFpbiBkaWFnb25hbFxuXG4gICAgdmFyIGp0aCA9IGogLSBzdGFydDsgLy8ganRoIDwgMCBpZiBhYm92ZSBtYWluIGRpYWdvbmFsXG4gICAgLy8gc2tpcCAweDAgbWF0cmljZXNcblxuICAgIGxlbiA9IHRlbXBbaWR4XTtcblxuICAgIHdoaWxlIChsZW4gPT09IDApIHtcbiAgICAgIGlkeCsrO1xuICAgICAgbGVuID0gdGVtcFtpZHhdO1xuICAgIH1cblxuICAgIGlmIChpdGggPCBsZW4gJiYgaXRoID49IDAgJiYganRoIDwgbGVuICYmIGp0aCA+PSAwKSB7XG4gICAgICByZXR1cm4gdmFsdWVzW2lkeF0uX21hdHJpeFtpdGhdW2p0aF07XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGRpYWc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgYXBwbGllcyBvbiBlYWNoIGVudHJ5IG9mIGEgTWF0cml4XHJcbiAqIEBjYWxsYmFjayBlbnRyeUNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbnRyeSAtIEVudHJ5IG9mIGEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE5ldyBlbnRyeSB2YWx1ZVxyXG4gKi9cblxuLyoqXHJcbiAqIEFwcGx5cyBhIGZ1bmN0aW9uIG92ZXIgZWFjaCBlbnRyeSBvZiBhIE1hdHJpeCBhbmQgcmV0dXJuc1xyXG4gKiBhIG5ldyBjb3B5IG9mIHRoZSBuZXcgTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7ZW50cnlDYWxsYmFja30gY2IgLSBDYWxsYmFjayBmdW5jdGlvbiB3aGljaCBhcHBsaWVzIG9uIGVhY2ggZW50cnkgb2YgQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBBIGNvcHkgb2YgbmV3IE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBlbGVtZW50d2lzZShBLCBjYikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBjYihtYXRyaXhbaV1bal0pO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBlbGVtZW50d2lzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTCxcbiAgICBPVkVSRkxPV19JTkRFWCA9IF9yZXF1aXJlLk9WRVJGTE9XX0lOREVYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGVudHJ5IG9mIGEgTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gQW55IHZhbGlkIHJvdyBpbmRleFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gQW55IHZhbGlkIGNvbHVtbiBpbmRleFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBFbnRyeSBvZiB0aGUgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVudHJ5KHJvdywgY29sKSB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3cpIHx8IHJvdyA8IDAgfHwgIU51bWJlci5pc0ludGVnZXIoY29sKSB8fCBjb2wgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHIgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGMgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID49IHIgfHwgY29sID49IGMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfSU5ERVgpO1xuICB9XG5cbiAgcmV0dXJuIEFbcm93XVtjb2xdO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBGbGF0dGVuIHRoZSBtYXRyaXggdG8gYW4gYXJyYXlcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge0FycmF5fSBBIGZsYXR0ZW4gYXJyYXlcclxuICovXG5mdW5jdGlvbiBmbGF0dGVuKCkge1xuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgdmFyIGxlbmd0aCA9IHJvdyAqIGNvbDtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShsZW5ndGgpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBhcnJbaSAqIGNvbCArIGpdID0gdGhpcy5fbWF0cml4W2ldW2pdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFO1xuLyoqXHJcbiAqIEdlbmVyYXRlIGEgbWF0cml4IGZyb20gYW4gYXJyYXkgd2l0aCBjb21wYXRpYmxlIGRpbWVuc2lvbnMgXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBTb3VyY2UgYXJyYXlcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFJvdyBvZiB0aGUgbWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBDb2x1bW4gb2YgdGhlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gZnJvbUFycmF5KGFyciwgcm93LCBjb2wpIHtcbiAgaWYgKHJvdyAqIGNvbCAhPT0gYXJyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gYXJyW2kgKiBjb2wgKyBqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZnJvbUFycmF5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG4vKipcclxuICogVGhpcyBjYWxsYmFjayBnZW5lcmF0ZXMgZWFjaCBlbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAY2FsbGJhY2sgZ2VuZXJhdGVDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaSAtIFRoZSBpLXRoIHJvdyBvZiBNYXRyaXggXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIC0gVGhlIGotdGggY29sdW1uIG9mIE1hdHJpeCBcclxuICogQHJldHVybnMge251bWJlcn0gRW50cnkgb2YgTWF0cml4XHJcbiAqL1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgTWF0cml4IHdoaWNoIGVudHJpZXMgYXJlIHRoZSByZXR1cm5lZCB2YWx1ZSBvZiBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIE51bWJlciBvZiBjb2x1bW5zIG9mIE1hdHJpeFxyXG4gKiBAcGFyYW0ge2dlbmVyYXRlQ2FsbGJhY2t9IGNiIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggdGFrZXMgcm93IGFuZCBjb2x1bW4gYXMgYXJndW1lbnRzXHJcbiAqIGFuZCBnZW5lcmF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgZW50cnlcclxuICogQHJldHVybnMge01hdHJpeH0gLSBHZW5lcmF0ZWQgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlKHJvdywgY29sLCBjYikge1xuICB2YXIgbWF0cml4ID0gZW1wdHkocm93LCBjb2wpO1xuXG4gIGlmIChyb3cgPT09IDAgfHwgY29sID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKFtdKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBtYXRyaXhbaV1bal0gPSBjYihpLCBqKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobWF0cml4KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgZW50cmllcyBvbiB0aGUgbWFpbiBkaWFnb25hbC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyW119IEFycmF5IG9mIGVudHJpZXMgb2YgQSBvbiB0aGUgbWFpbiBkaWFnb25hbFxyXG4gKi9cblxuXG5mdW5jdGlvbiBnZXREaWFnKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgc2l6ZSA9IE1hdGgubWluKHJvdywgY29sKTtcbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgdmFyIGRpYWdzID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZGlhZ3NbaV0gPSBtYXRyaXhbaV1baV07XG4gIH1cblxuICByZXR1cm4gZGlhZ3M7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2V0RGlhZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSBNYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgYSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIE51bWJlciBvZiBjb2x1bW5zIG9mIGEgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSBMb3dlciBib3VuZCBvZiBlYWNoIGVudHJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggLSBVcHBlciBib3VuZCBvZiBlYWNoIGVudHJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0ZpeGVkIC0gTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IEdlbmVyYXRlZCByYW5kb20gTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tTWF0cml4KHJvdywgY29sKSB7XG4gIHZhciBtaW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDA7XG4gIHZhciBtYXggPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IDE7XG4gIHZhciB0b0ZpeGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiAwO1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VGbG9hdCgoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKS50b0ZpeGVkKHRvRml4ZWQpKTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2V0UmFuZG9tTWF0cml4OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2VuZXJhdGVzIGlkZW50aXR5IE1hdHJpeCB3aXRoIGdpdmVuIHNpemUuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIFRoZSBzaXplIG9mIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBJZGVudGl0eSBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBpZGVudGl0eShzaXplKSB7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHNpemUsIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPT09IGopIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBNYXRyaWNlcyBhcmUgY29uc2lkZXJlZCBhcyBlcXVhbC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRlc3QgY3JpdGVyaW9uIGlzIE1hdGguYWJzKHggLSB5KSA8IDEgLyAoMTAgKiogZGlnaXQgKiAyKS5cclxuICogRm9yIGRlZmF1bHQgdmFsdWUgNSwgaXQgc2hvdWxkIGJlIDVlLTUuXHJcbiAqIFRoYXQgbWVhbnMgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIG51bWJlcnMgaXMgbGVzcyB0aGFuIDVlLTUsXHJcbiAqIHRoZXkgYXJlIGNvbnNpZGVyZWQgYXMgc2FtZSB2YWx1ZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGRpZ2l0IC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHR3byBNYXRyaWNlcyBhcmUgY29uc2lkZXJlZCBhcyBzYW1lXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRXF1YWwoQSwgQikge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDU7XG5cbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgQXJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgQWNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgQnJvdyA9IF9CJHNpemUyWzBdLFxuICAgICAgQmNvbCA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChBcm93ICE9PSBCcm93IHx8IEFjb2wgIT09IEJjb2wpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgRVBJU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIG1hdHJpeEEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gQi5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgQXJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBBY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhtYXRyaXhBW2ldW2pdIC0gbWF0cml4QltpXVtqXSkgPj0gRVBJU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfUk9XID0gX3JlcXVpcmUuT1ZFUkZMT1dfUk9XLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgcm93IG9mIGEgTWF0cml4IHdpdGggdmFsaWQgaW5kZXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQW55IHZhbGlkIHJvdyBpbmRleFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBSb3cgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiByb3coQSwgaW5kZXgpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgfHwgaW5kZXggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHIgPSBfQSRzaXplMlswXSxcbiAgICAgIGMgPSBfQSRzaXplMlsxXTtcblxuICBpZiAoaW5kZXggPj0gcikge1xuICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoMSwgYywgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4W2luZGV4XVtqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcm93OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIEVYUEVDVEVEX1NUUklOR19OVU1CRVJfQVRfUE9TXzFfMiA9IF9yZXF1aXJlLkVYUEVDVEVEX1NUUklOR19OVU1CRVJfQVRfUE9TXzFfMixcbiAgICBJTlZBTElEX1JPVyA9IF9yZXF1aXJlLklOVkFMSURfUk9XLFxuICAgIElOVkFMSURfQ09MVU1OID0gX3JlcXVpcmUuSU5WQUxJRF9DT0xVTU4sXG4gICAgT1ZFUkZMT1dfUk9XID0gX3JlcXVpcmUuT1ZFUkZMT1dfUk9XLFxuICAgIElOVkFMSURfUk9XU19FWFBSRVNTSU9OID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04sXG4gICAgSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04gPSBfcmVxdWlyZS5JTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTixcbiAgICBPVkVSRkxPV19DT0xVTU4gPSBfcmVxdWlyZS5PVkVSRkxPV19DT0xVTU47XG4vKipcclxuICogR2VuZXJhdGVzIGEgc3VibWF0cml4IG9mIGEgbWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgbWF0cml4XHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gcm93cyAtIFJvd3MgZXhwcmVzc2lvblxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGNvbHMgLSBDb2x1bW5zIGV4cHJlc3Npb25cclxuICogQHJldHVybnMge01hdHJpeH0gU3VibWF0cml4IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gc3VibWF0cml4KEEsIHJvd3MsIGNvbHMpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBhcmcxVHlwZSA9IF90eXBlb2Yocm93cyk7XG5cbiAgdmFyIGFyZzJUeXBlID0gX3R5cGVvZihjb2xzKTtcblxuICBpZiAoYXJnMVR5cGUgIT09ICdzdHJpbmcnICYmIGFyZzFUeXBlICE9PSAnbnVtYmVyJyB8fCBhcmcyVHlwZSAhPT0gJ3N0cmluZycgJiYgYXJnMlR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKEVYUEVDVEVEX1NUUklOR19OVU1CRVJfQVRfUE9TXzFfMik7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHJvd1N0YXJ0O1xuICB2YXIgcm93RW5kO1xuICB2YXIgY29sU3RhcnQ7XG4gIHZhciBjb2xFbmQ7XG5cbiAgaWYgKGFyZzFUeXBlID09PSAnbnVtYmVyJykge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3dzKSB8fCByb3dzIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICB9XG5cbiAgICBpZiAocm93cyA+PSByb3cpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgIH1cblxuICAgIHJvd1N0YXJ0ID0gcm93cztcbiAgICByb3dFbmQgPSByb3dzO1xuICB9IGVsc2Uge1xuICAgIC8vIHN0cmluZ1xuICAgIHZhciBhcmcgPSByb3dzLnNwbGl0KCc6Jyk7XG5cbiAgICBpZiAoYXJnLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XU19FWFBSRVNTSU9OKTtcbiAgICB9XG5cbiAgICB2YXIgX2FyZyA9IF9zbGljZWRUb0FycmF5KGFyZywgMiksXG4gICAgICAgIHIxID0gX2FyZ1swXSxcbiAgICAgICAgcjIgPSBfYXJnWzFdO1xuXG4gICAgaWYgKHIxID09PSAnJykge1xuICAgICAgcm93U3RhcnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgciA9IE51bWJlcihyMSk7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihyKSB8fCByIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1cpO1xuICAgICAgfVxuXG4gICAgICBpZiAociA+PSByb3cpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX1JPVyk7XG4gICAgICB9XG5cbiAgICAgIHJvd1N0YXJ0ID0gcjtcbiAgICB9XG5cbiAgICBpZiAocjIgPT09ICcnKSB7XG4gICAgICByb3dFbmQgPSByb3cgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3IgPSBOdW1iZXIocjIpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoX3IpIHx8IF9yIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1cpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3IgPj0gcm93KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgICAgfVxuXG4gICAgICByb3dFbmQgPSBfcjtcbiAgICB9XG5cbiAgICBpZiAocm93U3RhcnQgPiByb3dFbmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV1NfRVhQUkVTU0lPTik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFyZzJUeXBlID09PSAnbnVtYmVyJykge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb2xzKSB8fCBjb2xzIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICB9XG5cbiAgICBpZiAoY29scyA+PSBjb2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgIH1cblxuICAgIGNvbFN0YXJ0ID0gY29scztcbiAgICBjb2xFbmQgPSBjb2xzO1xuICB9IGVsc2Uge1xuICAgIC8vIHN0cmluZ1xuICAgIHZhciBfYXJnMiA9IGNvbHMuc3BsaXQoJzonKTtcblxuICAgIGlmIChfYXJnMi5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTik7XG4gICAgfVxuXG4gICAgdmFyIF9hcmczID0gX3NsaWNlZFRvQXJyYXkoX2FyZzIsIDIpLFxuICAgICAgICBjMSA9IF9hcmczWzBdLFxuICAgICAgICBjMiA9IF9hcmczWzFdO1xuXG4gICAgaWYgKGMxID09PSAnJykge1xuICAgICAgY29sU3RhcnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYyA9IE51bWJlcihjMSk7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjKSB8fCBjIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoYyA+PSBjb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0NPTFVNTik7XG4gICAgICB9XG5cbiAgICAgIGNvbFN0YXJ0ID0gYztcbiAgICB9XG5cbiAgICBpZiAoYzIgPT09ICcnKSB7XG4gICAgICBjb2xFbmQgPSBjb2wgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2MgPSBOdW1iZXIoYzIpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoX2MpIHx8IF9jIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2MgPj0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBjb2xFbmQgPSBfYztcbiAgICB9XG5cbiAgICBpZiAoY29sU3RhcnQgPiBjb2xFbmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTik7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgdmFyIHN1YlJvdyA9IHJvd0VuZCAtIHJvd1N0YXJ0ICsgMTtcbiAgdmFyIHN1YkNvbCA9IGNvbEVuZCAtIGNvbFN0YXJ0ICsgMTtcbiAgdmFyIHN1Yk1hdHJpeCA9IG5ldyBBcnJheShzdWJSb3cpO1xuXG4gIGZvciAodmFyIGkgPSByb3dTdGFydDsgaSA8PSByb3dFbmQ7IGkrKykge1xuICAgIHZhciBuZXdSb3cgPSBuZXcgQXJyYXkoc3ViQ29sKTtcblxuICAgIGZvciAodmFyIGogPSBjb2xTdGFydDsgaiA8PSBjb2xFbmQ7IGorKykge1xuICAgICAgbmV3Um93W2ogLSBjb2xTdGFydF0gPSBtYXRyaXhbaV1bal07XG4gICAgfVxuXG4gICAgc3ViTWF0cml4W2kgLSByb3dTdGFydF0gPSBuZXdSb3c7XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoc3ViTWF0cml4KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzdWJtYXRyaXg7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXHJcbiAqIEdldHMgdGhlIHN0cmluZ2lmaWVkIE1hdHJpeFxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmdpZmllZCBNYXRyaXhcclxuICovXG5mdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgdmFyIHN0ciA9ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBzdHIgKz0gbWF0cml4W2ldW2pdLnRvU3RyaW5nKCk7XG5cbiAgICAgIGlmIChqICE9PSBjb2wgLSAxKSB7XG4gICAgICAgIHN0ciArPSAnICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgIT09IHJvdyAtIDEpIHtcbiAgICAgIHN0ciArPSAnXFxuJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgemVybyBNYXRyaXhcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiB0aGUgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFplcm8gTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gemVybyhyb3csIGNvbCkge1xuICBpZiAoY29sID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIHJvdywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB6ZXJvOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNNYXRyaXggPSByZXF1aXJlKCcuL3V0aWwvaXNNYXRyaXgnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBNYXRyaXhcclxuICogQG5hbWVzcGFjZSBNYXRyaXhcclxuICogQGNsYXNzXHJcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gQSAtIFR3byBkaW1lbnNpb25hbCBhcnJheSB3aGVyZVxyXG4gKiBBW2ldW2pdIHJlcHJlc2VudHMgdGhlIGktdGggcm93IGFuZCBqLXRoIGNvbHVtbiBvZiBhIG1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBNYXRyaXgoQSkge1xuICBpZiAoIWlzTWF0cml4KEEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHRoaXMuX21hdHJpeCA9IEE7XG4gIHRoaXMuX2RpZ2l0ID0gODtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXRyaXg7IC8vIHN0cnVjdHVyZVxuXG5NYXRyaXgucHJvdG90eXBlLmlzRGlhZ29uYWwgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzRGlhZ29uYWwnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTa2V3U3ltbWV0cmljID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1NrZXdTeW1tZXRyaWMnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTcXVhcmUgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzU3F1YXJlJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU3ltbWV0cmljID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1N5bW1ldHJpYycpO1xuTWF0cml4LnByb3RvdHlwZS5pc0xvd2VyVHJpYW5ndWxhciA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNMb3dlclRyaWFuZ3VsYXInKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNVcHBlclRyaWFuZ3VsYXIgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzVXBwZXJUcmlhbmd1bGFyJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzT3J0aG9nb25hbCA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNPcnRob2dvbmFsJyk7IC8vIHByb3BlcnR5XG5cbk1hdHJpeC5wcm90b3R5cGUuY29uZCA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2NvbmQnKTtcbk1hdHJpeC5wcm90b3R5cGUuZGV0ID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvZGV0Jyk7XG5NYXRyaXgucHJvdG90eXBlLmVpZ2VudmFsdWVzID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvZWlnZW52YWx1ZXMnKTtcbk1hdHJpeC5wcm90b3R5cGUubnVsbGl0eSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL251bGxpdHknKTtcbk1hdHJpeC5wcm90b3R5cGUubm9ybSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL25vcm0nKTtcbk1hdHJpeC5wcm90b3R5cGUucmFuayA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3JhbmsnKTtcbk1hdHJpeC5wcm90b3R5cGUuc2l6ZSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3NpemUnKTtcbk1hdHJpeC5wcm90b3R5cGUudHJhY2UgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy90cmFjZScpOyAvLyBvcGVyYXRpb25zXG5cbk1hdHJpeC5hZGQgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9hZGQnKTtcbk1hdHJpeC5pbnZlcnNlID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvaW52ZXJzZScpO1xuTWF0cml4Lm11bHRpcGx5ID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvbXVsdGlwbHknKTtcbk1hdHJpeC5wb3cgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9wb3cnKTtcbk1hdHJpeC5zdWJ0cmFjdCA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL3N1YnRyYWN0Jyk7XG5NYXRyaXgudHJhbnNwb3NlID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvdHJhbnNwb3NlJyk7IC8vIExpbmVhci1lcXVhdGlvbnNcblxuTWF0cml4LmJhY2t3YXJkID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvYmFja3dhcmQnKTtcbk1hdHJpeC5mb3J3YXJkID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvZm9yd2FyZCcpO1xuTWF0cml4LnNvbHZlID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvc29sdmUnKTsgLy8gZGVjb21wb3NpdGlvbnNcblxuTWF0cml4LkxVID0gcmVxdWlyZSgnLi9jb3JlL2RlY29tcG9zaXRpb25zL0xVJyk7XG5NYXRyaXguUVIgPSByZXF1aXJlKCcuL2NvcmUvZGVjb21wb3NpdGlvbnMvUVInKTsgLy8gdXRpbHNcblxuTWF0cml4LmNsb25lID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2Nsb25lJyk7XG5NYXRyaXguY29sdW1uID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2NvbHVtbicpO1xuTWF0cml4LmRpYWcgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZGlhZycpO1xuTWF0cml4LmVsZW1lbnR3aXNlID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2VsZW1lbnR3aXNlJyk7XG5NYXRyaXguZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2VuZXJhdGUnKTtcbk1hdHJpeC5nZXREaWFnID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dldERpYWcnKTtcbk1hdHJpeC5nZXRSYW5kb21NYXRyaXggPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2V0UmFuZG9tTWF0cml4Jyk7XG5NYXRyaXguaWRlbnRpdHkgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvaWRlbnRpdHknKTtcbk1hdHJpeC5pc0VxdWFsID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2lzRXF1YWwnKTtcbk1hdHJpeC5yb3cgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvcm93Jyk7XG5NYXRyaXguc3VibWF0cml4ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3N1Ym1hdHJpeCcpO1xuTWF0cml4Lnplcm8gPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvemVybycpO1xuTWF0cml4LmZyb21BcnJheSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9mcm9tQXJyYXknKTtcbk1hdHJpeC5wcm90b3R5cGUuZmxhdHRlbiA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9mbGF0dGVuJyk7XG5NYXRyaXgucHJvdG90eXBlLmVudHJ5ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2VudHJ5Jyk7XG5NYXRyaXgucHJvdG90eXBlLnRvU3RyaW5nID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3RvU3RyaW5nJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtcHR5KHJvdywgY29sKSB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3cpIHx8IHJvdyA8IDAgfHwgIU51bWJlci5pc0ludGVnZXIoY29sKSB8fCBjb2wgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICBpZiAocm93ID09PSAwIHx8IGNvbCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBuZXcgQXJyYXkocm93KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgbWF0cml4W2ldID0gbmV3IEFycmF5KGNvbCk7XG4gIH1cblxuICByZXR1cm4gbWF0cml4O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnLi9pc051bWJlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTWF0cml4KG1hdHJpeCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobWF0cml4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBoZWlnaHQgPSBtYXRyaXgubGVuZ3RoO1xuXG4gIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gW10gcmVwcmVzZW50cyBlbXB0eSBtYXRyaXggKDAgeCAwIG1hdHJpeClcbiAgfVxuXG4gIHZhciBmaXJzdFJvdyA9IG1hdHJpeFswXTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZmlyc3RSb3cpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHdpZHRoID0gZmlyc3RSb3cubGVuZ3RoO1xuXG4gIGlmICh3aWR0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTsgLy8gWyBbXSBdIGlzIG5vdCBhbGxvd2VkXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgdmFyIHJvdyA9IG1hdHJpeFtpXTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb3cpIHx8IHJvdy5sZW5ndGggIT09IHdpZHRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICBpZiAoIWlzTnVtYmVyKHJvd1tqXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc051bWJlcihfaW50KSB7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoX2ludCk7XG59OyIsInZhciBTeWx2ZXN0ZXIgPSB7fVxuXG5TeWx2ZXN0ZXIuTWF0cml4ID0gZnVuY3Rpb24gKCkge31cblxuU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgdmFyIE0gPSBuZXcgU3lsdmVzdGVyLk1hdHJpeCgpXG4gIHJldHVybiBNLnNldEVsZW1lbnRzKGVsZW1lbnRzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LkkgPSBmdW5jdGlvbiAobikge1xuICB2YXIgZWxzID0gW10sXG4gICAgaSA9IG4sXG4gICAgalxuICB3aGlsZSAoaS0tKSB7XG4gICAgaiA9IG5cbiAgICBlbHNbaV0gPSBbXVxuICAgIHdoaWxlIChqLS0pIHtcbiAgICAgIGVsc1tpXVtqXSA9IGkgPT09IGogPyAxIDogMFxuICAgIH1cbiAgfVxuICByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LnByb3RvdHlwZSA9IHtcbiAgZHVwOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKHRoaXMuZWxlbWVudHMpXG4gIH0sXG5cbiAgaXNTcXVhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29scyA9IHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwID8gMCA6IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSBjb2xzXG4gIH0sXG5cbiAgdG9SaWdodFRyaWFuZ3VsYXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShbXSlcbiAgICB2YXIgTSA9IHRoaXMuZHVwKCksXG4gICAgICBlbHNcbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSxcbiAgICAgIGosXG4gICAgICBucCA9IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcFxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChNLmVsZW1lbnRzW2ldW2ldID09PSAwKSB7XG4gICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgaWYgKE0uZWxlbWVudHNbal1baV0gIT09IDApIHtcbiAgICAgICAgICAgIGVscyA9IFtdXG4gICAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgICBlbHMucHVzaChNLmVsZW1lbnRzW2ldW3BdICsgTS5lbGVtZW50c1tqXVtwXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSAhPT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gTS5lbGVtZW50c1tqXVtpXSAvIE0uZWxlbWVudHNbaV1baV1cbiAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgICAvLyBFbGVtZW50cyB3aXRoIGNvbHVtbiBudW1iZXJzIHVwIHRvIGFuIGluY2x1ZGluZyB0aGUgbnVtYmVyIG9mIHRoZVxuICAgICAgICAgICAgLy8gcm93IHRoYXQgd2UncmUgc3VidHJhY3RpbmcgY2FuIHNhZmVseSBiZSBzZXQgc3RyYWlnaHQgdG8gemVybyxcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQncyB0aGUgcG9pbnQgb2YgdGhpcyByb3V0aW5lIGFuZCBpdCBhdm9pZHMgaGF2aW5nIHRvXG4gICAgICAgICAgICAvLyBsb29wIG92ZXIgYW5kIGNvcnJlY3Qgcm91bmRpbmcgZXJyb3JzIGxhdGVyXG4gICAgICAgICAgICBlbHMucHVzaChcbiAgICAgICAgICAgICAgcCA8PSBpID8gMCA6IE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogbXVsdGlwbGllclxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE1cbiAgfSxcblxuICBkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHZhciBNID0gdGhpcy50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIGRldCA9IE0uZWxlbWVudHNbMF1bMF0sXG4gICAgICBuID0gTS5lbGVtZW50cy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgZGV0ID0gZGV0ICogTS5lbGVtZW50c1tpXVtpXVxuICAgIH1cbiAgICByZXR1cm4gZGV0XG4gIH0sXG5cbiAgaXNTaW5ndWxhcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmlzU3F1YXJlKCkgJiYgdGhpcy5kZXRlcm1pbmFudCgpID09PSAwXG4gIH0sXG5cbiAgYXVnbWVudDogZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHVwKClcbiAgICB9XG4gICAgdmFyIE0gPSBtYXRyaXguZWxlbWVudHMgfHwgbWF0cml4XG4gICAgaWYgKHR5cGVvZiBNWzBdWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgTSA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKE0pLmVsZW1lbnRzXG4gICAgfVxuICAgIHZhciBUID0gdGhpcy5kdXAoKSxcbiAgICAgIGNvbHMgPSBULmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHZhciBpID0gVC5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBuaiA9IE1bMF0ubGVuZ3RoLFxuICAgICAgalxuICAgIGlmIChpICE9PSBNLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaiA9IG5qXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIFQuZWxlbWVudHNbaV1bY29scyArIGpdID0gTVtpXVtqXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gVFxuICB9LFxuXG4gIGludmVyc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpIHx8IHRoaXMuaXNTaW5ndWxhcigpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSA9IG4sXG4gICAgICBqXG4gICAgdmFyIE0gPSB0aGlzLmF1Z21lbnQoU3lsdmVzdGVyLk1hdHJpeC5JKG4pKS50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIG5wID0gTS5lbGVtZW50c1swXS5sZW5ndGgsXG4gICAgICBwLFxuICAgICAgZWxzLFxuICAgICAgZGl2aXNvclxuICAgIHZhciBpbnZlcnNlX2VsZW1lbnRzID0gW10sXG4gICAgICBuZXdfZWxlbWVudFxuICAgIC8vIFN5bHZlc3Rlci5NYXRyaXggaXMgbm9uLXNpbmd1bGFyIHNvIHRoZXJlIHdpbGwgYmUgbm8gemVyb3Mgb24gdGhlXG4gICAgLy8gZGlhZ29uYWwuIEN5Y2xlIHRocm91Z2ggcm93cyBmcm9tIGxhc3QgdG8gZmlyc3QuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gRmlyc3QsIG5vcm1hbGlzZSBkaWFnb25hbCBlbGVtZW50cyB0byAxXG4gICAgICBlbHMgPSBbXVxuICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXSA9IFtdXG4gICAgICBkaXZpc29yID0gTS5lbGVtZW50c1tpXVtpXVxuICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgbmV3X2VsZW1lbnQgPSBNLmVsZW1lbnRzW2ldW3BdIC8gZGl2aXNvclxuICAgICAgICBlbHMucHVzaChuZXdfZWxlbWVudClcbiAgICAgICAgLy8gU2h1ZmZsZSBvZmYgdGhlIGN1cnJlbnQgcm93IG9mIHRoZSByaWdodCBoYW5kIHNpZGUgaW50byB0aGUgcmVzdWx0c1xuICAgICAgICAvLyBhcnJheSBhcyBpdCB3aWxsIG5vdCBiZSBtb2RpZmllZCBieSBsYXRlciBydW5zIHRocm91Z2ggdGhpcyBsb29wXG4gICAgICAgIGlmIChwID49IG4pIHtcbiAgICAgICAgICBpbnZlcnNlX2VsZW1lbnRzW2ldLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgIC8vIFRoZW4sIHN1YnRyYWN0IHRoaXMgcm93IGZyb20gdGhvc2UgYWJvdmUgaXQgdG8gZ2l2ZSB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAvLyBvbiB0aGUgbGVmdCBoYW5kIHNpZGVcbiAgICAgIGogPSBpXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIGVscyA9IFtdXG4gICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tqXVtwXSAtIE0uZWxlbWVudHNbaV1bcF0gKiBNLmVsZW1lbnRzW2pdW2ldKVxuICAgICAgICB9XG4gICAgICAgIE0uZWxlbWVudHNbal0gPSBlbHNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGludmVyc2VfZWxlbWVudHMpXG4gIH0sXG5cbiAgc2V0RWxlbWVudHM6IGZ1bmN0aW9uIChlbHMpIHtcbiAgICB2YXIgaSxcbiAgICAgIGosXG4gICAgICBlbGVtZW50cyA9IGVscy5lbGVtZW50cyB8fCBlbHNcbiAgICBpZiAoZWxlbWVudHNbMF0gJiYgdHlwZW9mIGVsZW1lbnRzWzBdWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaSA9IGVsZW1lbnRzLmxlbmd0aFxuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGogPSBlbGVtZW50c1tpXS5sZW5ndGhcbiAgICAgICAgdGhpcy5lbGVtZW50c1tpXSA9IFtdXG4gICAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldW2pdID0gZWxlbWVudHNbaV1bal1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgdmFyIG4gPSBlbGVtZW50cy5sZW5ndGhcbiAgICB0aGlzLmVsZW1lbnRzID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnB1c2goW2VsZW1lbnRzW2ldXSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgY29uc3QgbWF0ID0gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxlbWVudHMpLmludmVyc2UoKVxuICBpZiAobWF0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1hdC5lbGVtZW50c1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXguanMnKTtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcbi8qKlxuKiBBZGQgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHsuLi5BcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcmdzIGxpc3Qgb2YgbWF0cml4XG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBzdW1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZCguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCBhcmdzMiA9PiB7XG5cdFx0cmV0dXJuIGFyZ3MyLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0aWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGEgKyBiO1xuXHRcdH0sIDApO1xuXHR9KTtcbn07XG4iLCJjb25zdCBkb3RQcm9kdWN0ID0gcmVxdWlyZSgnLi9kb3QtcHJvZHVjdC5qcycpO1xuY29uc3Qgbm9ybSA9IHJlcXVpcmUoJy4vbm9ybS5qcycpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdHdvIHZlY3RvcnMuXG4gKiBAcGFyYW0ge251bWJlcltdfSB2ZWN0b3IxIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge251bWJlcltdfSB2ZWN0b3IyIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhlIHR3byB2ZWN0b3JzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsZW5ndGhzIG9mIHRoZSB2ZWN0b3JzIGRvIG5vdCBtYXRjaC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb3NTaW1pbGFyaXR5KHZlY3RvcjEsIHZlY3RvcjIpIHtcblx0aWYgKHZlY3RvcjEubGVuZ3RoICE9PSB2ZWN0b3IyLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ1RoZSBsZW5ndGhzIG9mIHRoZSB2ZWN0b3JzIGRvIG5vdCBtYXRjaCcpKTtcblx0fVxuXG5cdGNvbnN0IG5vcm1Qcm9kID0gKG5vcm0odmVjdG9yMSkgKiBub3JtKHZlY3RvcjIpKTtcblxuXHRpZiAobm9ybVByb2QgPT09IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHJldHVybiBkb3RQcm9kdWN0KHZlY3RvcjEsIHZlY3RvcjIpIC8gbm9ybVByb2Q7XG59O1xuIiwiY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5LmpzJyk7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIGJsb2NrIGRpYWdvbmFsIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBibG9ja3MuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcltdW11bXX0gb3B0aW9ucy5ibG9ja3MgVGhlIGJsb2NrcyB0byBmb3JtIHRoZSBkaWFnb25hbCBtYXRyaXguXG4gKiBAcGFyYW0ge251bWJlcltdfSBbb3B0aW9ucy5vcmRlcj1udWxsXSBPcHRpb25hbCBvcmRlciBmb3IgYXJyYW5naW5nIHRoZSBibG9ja3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyW11bXX0gVGhlIGJsb2NrIGRpYWdvbmFsIG1hdHJpeC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaWFnQmxvY2soe2Jsb2Nrcywgb3JkZXIgPSBudWxsfSkge1xuXHRjb25zdCBkaW1MID0gYmxvY2tzLm1hcChhID0+IGEubGVuZ3RoKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblx0Y29uc3QgcmVzdWx0ID0gaWRlbnRpdHkoZGltTCk7XG5cdGxldCBjdXJyZW50ID0gMDtcblx0Zm9yIChjb25zdCBtYXQgb2YgYmxvY2tzKSB7XG5cdFx0Zm9yIChjb25zdCBbaV0gb2YgbWF0LmVudHJpZXMoKSkge1xuXHRcdFx0Zm9yIChjb25zdCBbal0gb2YgbWF0LmVudHJpZXMoKSkge1xuXHRcdFx0XHRyZXN1bHRbaSArIGN1cnJlbnRdW2ogKyBjdXJyZW50XSA9IG1hdFtpXVtqXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjdXJyZW50ICs9IG1hdC5sZW5ndGg7XG5cdH1cblxuXHRpZiAob3JkZXIpIHtcblx0XHRyZXR1cm4gb3JkZXIubWFwKGkgPT4gb3JkZXIubWFwKGogPT4gcmVzdWx0W2ldW2pdKSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsImNvbnN0IHplcm9zID0gcmVxdWlyZSgnLi96ZXJvcycpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBkaWFnb25hbCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge251bWJlcltdfSBkaWFnb25hbCBUaGUgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBkaWFnb25hbCBlbGVtZW50cyBvZiB0aGUgbWF0cml4LlxuICogQHJldHVybnMge251bWJlcltdW119IFRoZSBkaWFnb25hbCBtYXRyaXguXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlhZyhkaWFnb25hbCkge1xuXHRjb25zdCByZXN1bHQgPSB6ZXJvcyhkaWFnb25hbC5sZW5ndGgsIGRpYWdvbmFsLmxlbmd0aCk7XG5cdGZvciAoY29uc3QgW2ksIGVsZW1lbnRdIG9mIGRpYWdvbmFsLmVudHJpZXMoKSkge1xuXHRcdHJlc3VsdFtpXVtpXSA9IGVsZW1lbnQ7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWN0b3JzLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgdHdvIHZlY3RvcnMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxlbmd0aHMgb2YgdGhlIHZlY3RvcnMgZG8gbm90IG1hdGNoLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRvdFByb2R1Y3QodmVjdG9yMSwgdmVjdG9yMikge1xuXHRpZiAodmVjdG9yMS5sZW5ndGggIT09IHZlY3RvcjIubGVuZ3RoKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignTGVuZ3RocyBub3QgbWFjaGluZycpKTtcblx0fVxuXG5cdGxldCByZXN1bHQgPSAwO1xuXHRmb3IgKGNvbnN0IFtpLCBlbGVtZW50XSBvZiB2ZWN0b3IxLmVudHJpZXMoKSkge1xuXHRcdHJlc3VsdCArPSBlbGVtZW50ICogdmVjdG9yMltpXTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4qIEBjYWxsYmFjayBlbGVtV2lzZUNiXG4qIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGFyclxuKiBAcGFyYW0ge051bWJlcn0gcm93SWRcbiogQHBhcmFtIHtOdW1iZXJ9IGNvbElkXG4qL1xuLyoqXG4qIFJ1biBhIGZ1bmN0aW9uIG9uIGNlbGwgcGVyIGNlbGwgZm9yIGVhY2ggTWF0cml4ZXNcbiogQHBhcmFtIHs8QXJyYXkuPEFycmF5LjxBcnJheS48TnVtYmVyPj4+fSBhcnJNYXRyaXhlcyBsaXN0IG9mIG1hdHJpeGVzXG4qIEBwYXJhbSB7ZWxlbVdpc2VDYn0gZm5cbiogQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHJlc3VsdGluZyBtYXRyaXhcbiogQGV4YW1wbGVcbi8vIHRoaXMgd2lsbCBkbyBtMSArIG0yICsgbTMgKyBtNCBvbiBtYXRyaXhlc1xuZWxlbVdpc2UoW20xLCBtMiwgbTMsIG00XSwgYXJnczIgPT4ge1xuXHRyZXR1cm4gYXJnczIucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59KTtcbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZWxlbVdpc2UoYXJyYXlNYXRyaXhlcywgZm4pIHtcblx0cmV0dXJuIGFycmF5TWF0cml4ZXNbMF0ubWFwKChyb3csIHJvd0lkKSA9PiB7XG5cdFx0cmV0dXJuIHJvdy5tYXAoKGNlbGwsIGNvbElkKSA9PiB7XG5cdFx0XHRjb25zdCBhcnJheSA9IGFycmF5TWF0cml4ZXMubWFwKG0gPT4gbVtyb3dJZF1bY29sSWRdKTtcblx0XHRcdHJldHVybiBmbihhcnJheSwgcm93SWQsIGNvbElkKTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4iLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIEV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkxIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge251bWJlcltdfSBhcnJheTIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgRXVjbGlkZWFuIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byB2ZWN0b3JzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBhcnJheXMgaGF2ZSBkaWZmZXJlbnQgbGVuZ3RocyBvciBpZiBlaXRoZXIgYXJyYXkgaXMgbm90IGFuIGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV1Y2xpZGVhbkRpc3QoYXJyYXkxLCBhcnJheTIpIHtcblx0aWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJyYXkgbGVuZ3RocycpO1xuXHR9XG5cblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5MSkpIHtcblx0XHRjb25zb2xlLmxvZyh7YXJyYXkxfSk7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFycmF5Jyk7XG5cdH1cblxuXHRjb25zdCBkaWZmID0gYXJyYXkxLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IGVsZW1lbnQgLSBhcnJheTJbaW5kZXhdKS5tYXAoZWxlbWVudCA9PiBlbGVtZW50ICogZWxlbWVudCk7XG5cdHJldHVybiBNYXRoLnNxcnQoZGlmZi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSk7XG59O1xuIiwiY29uc3QgdHJhY2UgPSByZXF1aXJlKCcuL3RyYWNlLmpzJyk7XG5jb25zdCB0cmFuc3Bvc2UgPSByZXF1aXJlKCcuL3RyYW5zcG9zZS5qcycpO1xuY29uc3QgbWF0U3ViID0gcmVxdWlyZSgnLi9zdWJ0cmFjdC5qcycpO1xuY29uc3QgbWF0TXVsID0gcmVxdWlyZSgnLi9tYXQtbXVsLmpzJyk7XG5jb25zdCBzdW0gPSByZXF1aXJlKCcuL3N1bS5qcycpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIEZyb2Jlbml1cyBub3JtIG9mIHRoZSBnaXZlbiBtYXRyaWNlcyBvciB2ZWN0b3JzLlxuICogW0Zyb2Jlbml1cyBub3JtXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXRyaXhfbm9ybSNGcm9iZW5pdXNfbm9ybSlcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gW2FycmF5MV0gVGhlIGZpcnN0IG1hdHJpeCBvciB2ZWN0b3IgKG9wdGlvbmFsKS5cbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gW2FycmF5Ml0gVGhlIHNlY29uZCBtYXRyaXggb3IgdmVjdG9yIChvcHRpb25hbCkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgRnJvYmVuaXVzIG5vcm0gb2YgdGhlIG1hdHJpY2VzIG9yIHZlY3RvcnMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvYmVuaXVzKGFycmF5MSwgYXJyYXkyKSB7XG5cdGlmIChhcnJheTEgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdW0oYXJyYXkyKTtcblx0fVxuXG5cdGlmIChhcnJheTIgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdW0oYXJyYXkxKTtcblx0fVxuXG5cdGNvbnN0IG0gPSBtYXRTdWIoYXJyYXkxLCBhcnJheTIpO1xuXHRjb25zdCBwID0gbWF0TXVsKHRyYW5zcG9zZShtKSwgbSk7XG5cdHJldHVybiBNYXRoLnNxcnQodHJhY2UocCkpO1xufTtcbiIsIi8qKlxuICogYnVpbGQgYW4gaWRlbnRpdHkgc3F1YXJlIG1hdHJpeFxuICogQHBhcmFtIHN0YXRlU2l6ZSBtYXRyaXggc2l6ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlkZW50aXR5KHN0YXRlU2l6ZSkge1xuICBjb25zdCBpZGVudGl0eUFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGVTaXplOyBpKyspIHtcbiAgICBjb25zdCByb3dJZGVudGl0eSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RhdGVTaXplOyBqKyspIHtcbiAgICAgIGlmIChpID09PSBqKSB7XG4gICAgICAgIHJvd0lkZW50aXR5LnB1c2goMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3dJZGVudGl0eS5wdXNoKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlkZW50aXR5QXJyYXkucHVzaChyb3dJZGVudGl0eSk7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpdHlBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0YWRkOiByZXF1aXJlKCcuL2FkZC5qcycpLFxuXHRjb3NTaW1pbGFyaXR5OiByZXF1aXJlKCcuL2Nvcy1zaW1pbGFyaXR5JyksXG5cdGV1Y2xpZGVhbkRpc3Q6IHJlcXVpcmUoJy4vZXVjbGlkZWFuLWRpc3QnKSxcblx0ZGlhZzogcmVxdWlyZSgnLi9kaWFnLmpzJyksXG5cdGRpYWdCbG9jazogcmVxdWlyZSgnLi9kaWFnLWJsb2NrJyksXG5cdGRvdFByb2R1Y3Q6IHJlcXVpcmUoJy4vZG90LXByb2R1Y3QnKSxcblx0ZWxlbVdpc2U6IHJlcXVpcmUoJy4vZWxlbS13aXNlLmpzJyksXG5cdGZyb2Jlbml1czogcmVxdWlyZSgnLi9mcm9iZW5pdXMuanMnKSxcblx0aWRlbnRpdHk6IHJlcXVpcmUoJy4vaWRlbnRpdHkuanMnKSxcblx0aW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydC5qcycpLFxuXHRtYXBNYXRyaXg6IHJlcXVpcmUoJy4vbWFwLW1hdHJpeC5qcycpLFxuXHRtYXRNdWw6IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpLFxuXHRtYXRQZXJtdXRhdGlvbjogcmVxdWlyZSgnLi9tYXQtcGVybXV0YXRpb24uanMnKSxcblx0cGFkV2l0aFplcm9Db2xzOiByZXF1aXJlKCcuL3BhZC13aXRoLXplcm8tY29scy5qcycpLFxuXHRzdWJ0cmFjdDogcmVxdWlyZSgnLi9zdWJ0cmFjdC5qcycpLFxuXHRzdWJTcXVhcmVNYXRyaXg6IHJlcXVpcmUoJy4vc3ViLXNxdWFyZS1tYXRyaXguanMnKSxcblx0c3VtOiByZXF1aXJlKCcuL3N1bS5qcycpLFxuXHR0cmFjZTogcmVxdWlyZSgnLi90cmFjZS5qcycpLFxuXHR0cmFuc3Bvc2U6IHJlcXVpcmUoJy4vdHJhbnNwb3NlLmpzJyksXG5cdHplcm9zOiByZXF1aXJlKCcuL3plcm9zLmpzJyksXG5cdG5vcm06IHJlcXVpcmUoJy4vbm9ybS5qcycpLFxuXHRzdW1WZWN0b3I6IHJlcXVpcmUoJy4vc3VtLXZlY3Rvci5qcycpLFxufTtcbiIsImNvbnN0IG1hdHJpeEludmVyc2UgPSByZXF1aXJlKCdtYXRyaXgtaW52ZXJzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGludmVydChtKSB7XG5cdHJldHVybiBtYXRyaXhJbnZlcnNlKG0pO1xufTtcbiIsIi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIG92ZXIgZWFjaCBlbGVtZW50IG9mIHRoZSBnaXZlbiBtYXRyaXguXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PGFueT4+fSBhIFRoZSBtYXRyaXggdG8gbWFwIG92ZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFueSwgbnVtYmVyLCBudW1iZXIpOiBhbnl9IGZuIFRoZSBtYXBwaW5nIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICogQHJldHVybnMge0FycmF5PEFycmF5PGFueT4+fSBUaGUgbWF0cml4IHdpdGggdGhlIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZWFjaCBlbGVtZW50LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcE1hdHJpeChhLCBmbikge1xuXHRyZXR1cm4gYS5tYXAoKHJvdywgcm93SWQpID0+IHJvdy5tYXAoKGNlbGwsIGNvbElkKSA9PiBmbihjZWxsLCByb3dJZCwgY29sSWQpKSk7XG59O1xuIiwiLyoqXG4qIE11bHRpcGx5IDIgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBtMVxuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG0yXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0TXVsKG0xLCBtMikge1xuXHQvLyBDb25zb2xlLmxvZyh7bTEsIG0yfSk7XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG0xLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0W2ldID0gW107XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBtMlswXS5sZW5ndGg7IGorKykge1xuXHRcdFx0bGV0IHN1bSA9IDA7XG5cdFx0XHRsZXQgaXNOdWxsID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IG0xWzBdLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdGlmICgobTFbaV1ba10gPT09IG51bGwgJiYgbTJba11bal0gIT09IDApIHx8IChtMltrXVtqXSA9PT0gbnVsbCAmJiBtMVtpXVtrXSAhPT0gMCkpIHtcblx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN1bSArPSBtMVtpXVtrXSAqIG0yW2tdW2pdO1xuXHRcdFx0fVxuXHRcdFx0cmVzdWx0W2ldW2pdID0gaXNOdWxsID8gbnVsbCA6IHN1bTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbWF0cml4XG4gKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IG91dHB1dFNpemVcbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IHJvd0luZGV4ZXMgdGhlIHBlcm11dGF0aW9uIGluZGV4ZXMsIHJlc3VsdFtqXVtrXSA9IG1hdHJpeFtyb3dJbmRleGVzLmluZGV4T2YoaildW2NvbEluZGV4ZXMuaW5kZXhPZihrKV1cbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGNvbEluZGV4ZXMgdGhlIHBlcm11dGF0aW9uIGluZGV4ZXMsIHJlc3VsdFtqXVtrXSA9IG1hdHJpeFtyb3dJbmRleGVzLmluZGV4T2YoaildW2NvbEluZGV4ZXMuaW5kZXhPZihrKV1cbiAqIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdFBlcm11dGF0aW9uKHtcblx0bWF0cml4LFxuXHRvdXRwdXRTaXplLFxuXHRyb3dJbmRleGVzLFxuXHRjb2xJbmRleGVzLFxufSkge1xuXHRjb25zdCBbblJvdywgbkNvbF0gPSBvdXRwdXRTaXplO1xuXG5cdGlmICghQXJyYXkuaXNBcnJheShyb3dJbmRleGVzKSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHJvd0luZGV4ZXMgJHtyb3dJbmRleGVzfWApKTtcblx0fVxuXG5cdGlmICghQXJyYXkuaXNBcnJheShjb2xJbmRleGVzKSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGNvbEluZGV4ZXMgJHtjb2xJbmRleGVzfWApKTtcblx0fVxuXG5cdHJldHVybiBuZXcgQXJyYXkoblJvdykuZmlsbCgwKS5tYXAoKF8sIGkpID0+IG5ldyBBcnJheShuQ29sKS5maWxsKDApLm1hcCgoXywgaikgPT4ge1xuXHRcdGlmIChjb2xJbmRleGVzLmluY2x1ZGVzKGopICYmIHJvd0luZGV4ZXMuaW5jbHVkZXMoaSkpIHtcblx0XHRcdHJldHVybiBtYXRyaXhbcm93SW5kZXhlcy5pbmRleE9mKGkpXVtjb2xJbmRleGVzLmluZGV4T2YoaildO1xuXHRcdH1cblxuXHRcdHJldHVybiAwO1xuXHR9KSk7XG59O1xuIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBFdWNsaWRlYW4gbm9ybSBvZiB0aGUgZ2l2ZW4gdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yIFRoZSB2ZWN0b3IgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgRXVjbGlkZWFuIG5vcm0uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgRXVjbGlkZWFuIG5vcm0gb2YgdGhlIHZlY3Rvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtKHZlY3Rvcikge1xuXHRsZXQgcmVzdWx0ID0gMDtcblx0Zm9yIChjb25zdCBlbGVtZW50IG9mIHZlY3Rvcikge1xuXHRcdHJlc3VsdCArPSAoZWxlbWVudCAqIGVsZW1lbnQpO1xuXHR9XG5cdHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbn07XG4iLCJjb25zdCBtYXRQZXJtdXRhdGlvbiA9IHJlcXVpcmUoJy4vbWF0LXBlcm11dGF0aW9uJyk7XG4vKipcbiogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBwYWRkZWQgbWF0cml4IHdpdGggemVyb3Mgd2l0aCByZXNwZWN0IHRvIGEgZ2l2ZW5cbiogdGFyZ2V0IGNvbHVtbnMgbnVtYmVyXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbWF0cml4IHRoZSBtYXRyaXggd2UgbmVlZCB0byBwYWRcbiogQHBhcmFtIHtOdW1iZXJ9IGNvbHVtbnMgaW4gb3VyIGNhc2UsIHRoZSBkeW5hbWljIGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gcGFkZGVkIG1hdHJpeFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1hdHJpeCwge2NvbHVtbnN9KSB7XG5cdGlmIChjb2x1bW5zIDwgbWF0cml4WzBdLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBPdXRwdXQgY29sdW1ucyAke2NvbHVtbnN9IGlzIGdyZWF0ZXIgdGhhbiBpbnB1dCBjb2x1bW5zICR7bWF0cml4WzBdLmxlbmd0aH1gKSk7XG5cdH1cblxuXHRyZXR1cm4gbWF0UGVybXV0YXRpb24oe1xuXHRcdG1hdHJpeCxcblx0XHRvdXRwdXRTaXplOiBbbWF0cml4Lmxlbmd0aCwgY29sdW1uc10sXG5cdFx0cm93SW5kZXhlczogbmV3IEFycmF5KG1hdHJpeC5sZW5ndGgpLmZpbGwoMCkubWFwKChfLCBpbmRleCkgPT4gaW5kZXgpLFxuXHRcdGNvbEluZGV4ZXM6IG5ldyBBcnJheShtYXRyaXhbMF0ubGVuZ3RoKS5maWxsKDApLm1hcCgoXywgaW5kZXgpID0+IGluZGV4KSxcblx0fSk7XG59O1xuIiwiLyoqXG4gKiBFeHRyYWN0cyBhIHN1Yi1zcXVhcmUgbWF0cml4IGZyb20gdGhlIHByb3ZpZGVkIG1hdHJpeCBiYXNlZCBvbiB0aGUgZ2l2ZW4gaW5kZXhlcy5cbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gbWF0IFRoZSBtYXRyaXggZnJvbSB3aGljaCB0byBleHRyYWN0IHRoZSBzdWItc3F1YXJlIG1hdHJpeC5cbiAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGluZGV4ZXMgdG8gc2VsZWN0IHJvd3MgYW5kIGNvbHVtbnMgZnJvbSB0aGUgbWF0cml4LlxuICogQHJldHVybnMge251bWJlcltdW119IFRoZSBzdWItc3F1YXJlIG1hdHJpeCBleHRyYWN0ZWQgZnJvbSB0aGUgb3JpZ2luYWwgbWF0cml4LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YlNxdWFyZU1hdHJpeChtYXQsIGluZGV4ZXMpIHtcblx0cmV0dXJuIGluZGV4ZXMubWFwKHMxID0+IGluZGV4ZXMubWFwKHMyID0+IG1hdFtzMV1bczJdKSk7XG59O1xuIiwiY29uc3QgZWxlbVdpc2UgPSByZXF1aXJlKCcuL2VsZW0td2lzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YnRyYWN0KC4uLmFyZ3MpIHtcblx0cmV0dXJuIGVsZW1XaXNlKGFyZ3MsIChbYSwgYl0pID0+IGEgLSBiKTtcbn07XG4iLCIvKipcbiAqIFN1bXMgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yIFRoZSB2ZWN0b3Igd2hvc2UgZWxlbWVudHMgYXJlIHRvIGJlIHN1bW1lZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBzdW0gb2YgYWxsIGVsZW1lbnRzIGluIHRoZSB2ZWN0b3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VtVmVjdG9yKHZlY3Rvcikge1xuXHRsZXQgcyA9IDA7XG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiB2ZWN0b3IpIHtcblx0XHRzICs9IGVsZW1lbnQ7XG5cdH1cblx0cmV0dXJuIHM7XG59O1xuIiwiY29uc3Qgc3VtVmVjdG9yID0gcmVxdWlyZSgnLi9zdW0tdmVjdG9yJyk7XG5cbi8vIFN1bSBhbGwgdGhlIHRlcm1zIG9mIGEgZ2l2ZW4gbWF0cml4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1bShhcnJheSkge1xuXHRsZXQgcyA9IDA7XG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiBhcnJheSkge1xuXHRcdHMgKz0gc3VtVmVjdG9yKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFjZShhcnJheSkge1xuXHRsZXQgZGlhZyA9IDA7XG5cdGZvciAoY29uc3QgW3JvdywgZWxlbWVudF0gb2YgYXJyYXkuZW50cmllcygpKSB7XG5cdFx0ZGlhZyArPSBlbGVtZW50W3Jvd107XG5cdH1cblx0cmV0dXJuIGRpYWc7XG59O1xuIiwiLyoqXG4gKiBUcmFuc3Bvc2VzIHRoZSBnaXZlbiAyRCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8YW55Pj59IGFycmF5IFRoZSAyRCBhcnJheSB0byB0cmFuc3Bvc2UuXG4gKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8YW55Pj59IFRoZSB0cmFuc3Bvc2VkIDJEIGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zcG9zZShhcnJheSkge1xuXHRyZXR1cm4gYXJyYXlbMF0ubWFwKChjb2wsIGkpID0+IGFycmF5Lm1hcChyb3cgPT4gcm93W2ldKSk7XG59O1xuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSAyRCBhcnJheSBmaWxsZWQgd2l0aCB6ZXJvcyB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gcm93cyBUaGUgbnVtYmVyIG9mIHJvd3MgZm9yIHRoZSAyRCBhcnJheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2xzIFRoZSBudW1iZXIgb2YgY29sdW1ucyBmb3IgdGhlIDJEIGFycmF5LlxuICogQHJldHVybnMge251bWJlcltdW119IEEgMkQgYXJyYXkgZmlsbGVkIHdpdGggemVyb3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gemVyb3Mocm93cywgY29scykge1xuXHRyZXR1cm4gbmV3IEFycmF5KHJvd3MpLmZpbGwoMSkubWFwKCgpID0+IG5ldyBBcnJheShjb2xzKS5maWxsKDApKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucHJvamVjdE9ic2VydmF0aW9uID0gZXhwb3J0cy5jb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbiA9IGV4cG9ydHMuY29ycmVsYXRpb25Ub0NvdmFyaWFuY2UgPSBleHBvcnRzLmNoZWNrQ292YXJpYW5jZSA9IGV4cG9ydHMuU3RhdGUgPSBleHBvcnRzLmdldENvdmFyaWFuY2UgPSBleHBvcnRzLkthbG1hbkZpbHRlciA9IHZvaWQgMDtcbmNvbnN0IG1vZGVsQ29sbGVjdGlvbiA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9saWIvbW9kZWwtY29sbGVjdGlvblwiKSk7XG5jb25zdCBkZWZhdWx0RHluYW1pY01vZGVscyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9saWIvZHluYW1pY1wiKSk7XG5jb25zdCBkZWZhdWx0T2JzZXJ2YXRpb25Nb2RlbHMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vbGliL29ic2VydmF0aW9uXCIpKTtcbmZ1bmN0aW9uIGNhbWVsVG9EYXNoKHN0cikge1xuICAgIGlmIChzdHIgPT09IHN0ci50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW0EtWl0vZywgbSA9PiBcIi1cIiArIG0udG9Mb3dlckNhc2UoKSk7XG59XG5PYmplY3Qua2V5cyhkZWZhdWx0RHluYW1pY01vZGVscykuZm9yRWFjaCgoaykgPT4ge1xuICAgIG1vZGVsQ29sbGVjdGlvbi5yZWdpc3RlckR5bmFtaWMoY2FtZWxUb0Rhc2goayksIGRlZmF1bHREeW5hbWljTW9kZWxzW2tdKTtcbn0pO1xuT2JqZWN0LmtleXMoZGVmYXVsdE9ic2VydmF0aW9uTW9kZWxzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgbW9kZWxDb2xsZWN0aW9uLnJlZ2lzdGVyT2JzZXJ2YXRpb24oY2FtZWxUb0Rhc2goayksIGRlZmF1bHRPYnNlcnZhdGlvbk1vZGVsc1trXSk7XG59KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9saWIvbW9kZWwtY29sbGVjdGlvblwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbGliL2R5bmFtaWNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2xpYi9vYnNlcnZhdGlvblwiKSwgZXhwb3J0cyk7XG52YXIga2FsbWFuX2ZpbHRlcl8xID0gcmVxdWlyZShcIi4vbGliL2thbG1hbi1maWx0ZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJLYWxtYW5GaWx0ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChrYWxtYW5fZmlsdGVyXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgZ2V0X2NvdmFyaWFuY2VfMSA9IHJlcXVpcmUoXCIuL2xpYi91dGlscy9nZXQtY292YXJpYW5jZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldENvdmFyaWFuY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChnZXRfY292YXJpYW5jZV8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIHN0YXRlXzEgPSByZXF1aXJlKFwiLi9saWIvc3RhdGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdGF0ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KHN0YXRlXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgY2hlY2tfY292YXJpYW5jZV8xID0gcmVxdWlyZShcIi4vbGliL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjaGVja0NvdmFyaWFuY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjaGVja19jb3ZhcmlhbmNlXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgY29ycmVsYXRpb25fdG9fY292YXJpYW5jZV8xID0gcmVxdWlyZShcIi4vbGliL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb3JyZWxhdGlvblRvQ292YXJpYW5jZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KGNvcnJlbGF0aW9uX3RvX2NvdmFyaWFuY2VfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjb3ZhcmlhbmNlX3RvX2NvcnJlbGF0aW9uXzEgPSByZXF1aXJlKFwiLi9saWIvdXRpbHMvY292YXJpYW5jZS10by1jb3JyZWxhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvdmFyaWFuY2VUb0NvcnJlbGF0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY292YXJpYW5jZV90b19jb3JyZWxhdGlvbl8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIHByb2plY3Rfb2JzZXJ2YXRpb25fMSA9IHJlcXVpcmUoXCIuL2xpYi91dGlscy9wcm9qZWN0LW9ic2VydmF0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicHJvamVjdE9ic2VydmF0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQocHJvamVjdF9vYnNlcnZhdGlvbl8xKS5kZWZhdWx0OyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IHN0YXRlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3RhdGVcIikpO1xuY29uc3QgY2hlY2tfbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvY2hlY2stbWF0cml4XCIpKTtcbmNvbnN0IGRlZmF1bHRMb2dnZXIgPSB7XG4gICAgaW5mbzogKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuICAgIGRlYnVnKCkgeyB9LFxuICAgIHdhcm46ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxufTtcbmNsYXNzIENvcmVLYWxtYW5GaWx0ZXIge1xuICAgIGR5bmFtaWM7XG4gICAgb2JzZXJ2YXRpb247XG4gICAgbG9nZ2VyO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBkeW5hbWljLCBvYnNlcnZhdGlvbiwgbG9nZ2VyID0gZGVmYXVsdExvZ2dlciB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5keW5hbWljID0gZHluYW1pYztcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbiA9IG9ic2VydmF0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgZ2V0VmFsdWUoZm4sIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZuKSA9PT0gJ2Z1bmN0aW9uJyA/IGZuKG9wdGlvbnMpIDogZm4pO1xuICAgIH1cbiAgICBnZXRJbml0U3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWVhbjogbWVhbkluaXQsIGNvdmFyaWFuY2U6IGNvdmFyaWFuY2VJbml0LCBpbmRleDogaW5kZXhJbml0IH0gPSB0aGlzLmR5bmFtaWMuaW5pdDtcbiAgICAgICAgY29uc3QgaW5pdFN0YXRlID0gbmV3IHN0YXRlXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZWFuOiBtZWFuSW5pdCxcbiAgICAgICAgICAgIGNvdmFyaWFuY2U6IGNvdmFyaWFuY2VJbml0LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4SW5pdCxcbiAgICAgICAgfSk7XG4gICAgICAgIHN0YXRlXzEuZGVmYXVsdC5jaGVjayhpbml0U3RhdGUsIHsgdGl0bGU6ICdkeW5hbWljLmluaXQnIH0pO1xuICAgICAgICByZXR1cm4gaW5pdFN0YXRlO1xuICAgIH1cbiAgICBnZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgeyBwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXggfSA9IG9wdGlvbnM7XG4gICAgICAgIHByZXZpb3VzQ29ycmVjdGVkID0gcHJldmlvdXNDb3JyZWN0ZWQgfHwgdGhpcy5nZXRJbml0U3RhdGUoKTtcbiAgICAgICAgY29uc3QgZ2V0VmFsdWVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgeyBwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXggfSwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMuZHluYW1pYy50cmFuc2l0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkodHJhbnNpdGlvbiwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIHRoaXMuZHluYW1pYy5kaW1lbnNpb25dLCAnZHluYW1pYy50cmFuc2l0aW9uJyk7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25UcmFuc3Bvc2VkID0gKDAsIHNpbXBsZV9saW5hbGdfMS50cmFuc3Bvc2UpKHRyYW5zaXRpb24pO1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlSW50ZXIgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkodHJhbnNpdGlvbiwgcHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG4gICAgICAgIGNvbnN0IGNvdmFyaWFuY2VQcmV2aW91cyA9ICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShjb3ZhcmlhbmNlSW50ZXIsIHRyYW5zaXRpb25UcmFuc3Bvc2VkKTtcbiAgICAgICAgY29uc3QgZHluQ292ID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMuY292YXJpYW5jZSwgZ2V0VmFsdWVPcHRpb25zKTtcbiAgICAgICAgY29uc3QgY292YXJpYW5jZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuYWRkKShkeW5Db3YsIGNvdmFyaWFuY2VQcmV2aW91cyk7XG4gICAgICAgICgwLCBjaGVja19tYXRyaXhfMS5kZWZhdWx0KShjb3ZhcmlhbmNlLCBbdGhpcy5keW5hbWljLmRpbWVuc2lvbiwgdGhpcy5keW5hbWljLmRpbWVuc2lvbl0sICdwcmVkaWN0ZWQuY292YXJpYW5jZScpO1xuICAgICAgICByZXR1cm4gY292YXJpYW5jZTtcbiAgICB9XG4gICAgcHJlZGljdE1lYW4obykge1xuICAgICAgICBjb25zdCBtZWFuID0gdGhpcy5wcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKG8pO1xuICAgICAgICBpZiAoIXRoaXMuZHluYW1pYy5jb25zdGFudCkge1xuICAgICAgICAgICAgcmV0dXJuIG1lYW47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBvcHRzIH0gPSBvO1xuICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5keW5hbWljLmNvbnN0YW50KG9wdHMpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoY29udHJvbCwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIDFdLCAnZHluYW1pYy5jb25zdGFudCcpO1xuICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5hZGQpKG1lYW4sIGNvbnRyb2wpO1xuICAgIH1cbiAgICBwcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKHsgb3B0cywgdHJhbnNpdGlvbiB9KSB7XG4gICAgICAgIGlmICh0aGlzLmR5bmFtaWMuZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmR5bmFtaWMuZm4ob3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBwcmV2aW91c0NvcnJlY3RlZCB9ID0gb3B0cztcbiAgICAgICAgcmV0dXJuICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKSh0cmFuc2l0aW9uLCBwcmV2aW91c0NvcnJlY3RlZC5tZWFuKTtcbiAgICB9XG4gICAgcHJlZGljdChvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IHsgcHJldmlvdXNDb3JyZWN0ZWQsIGluZGV4IH0gPSBvcHRpb25zO1xuICAgICAgICBwcmV2aW91c0NvcnJlY3RlZCA9IHByZXZpb3VzQ29ycmVjdGVkIHx8IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGluZGV4KSAhPT0gJ251bWJlcicgJiYgdHlwZW9mIChwcmV2aW91c0NvcnJlY3RlZC5pbmRleCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpbmRleCA9IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4ICsgMTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZV8xLmRlZmF1bHQuY2hlY2socHJldmlvdXNDb3JyZWN0ZWQsIHsgZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9uIH0pO1xuICAgICAgICBjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgICAgICBwcmV2aW91c0NvcnJlY3RlZCxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLnRyYW5zaXRpb24sIGdldFZhbHVlT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1lYW4gPSB0aGlzLnByZWRpY3RNZWFuKHsgdHJhbnNpdGlvbiwgb3B0czogZ2V0VmFsdWVPcHRpb25zIH0pO1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5nZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKGdldFZhbHVlT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHByZWRpY3RlZCA9IG5ldyBzdGF0ZV8xLmRlZmF1bHQoeyBtZWFuLCBjb3ZhcmlhbmNlLCBpbmRleCB9KTtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1ByZWRpY3Rpb24gZG9uZScsIHByZWRpY3RlZCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocHJlZGljdGVkLm1lYW5bMF1bMF0pKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVkaWN0ZWQ7XG4gICAgfVxuICAgIGdldEdhaW4ob3B0aW9ucykge1xuICAgICAgICBsZXQgeyBwcmVkaWN0ZWQsIHN0YXRlUHJvamVjdGlvbiB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgZ2V0VmFsdWVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgeyBpbmRleDogcHJlZGljdGVkLmluZGV4IH0sIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZVByb2plY3Rpb24gPSBzdGF0ZVByb2plY3Rpb24gfHwgdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcbiAgICAgICAgY29uc3Qgb2JzQ292YXJpYW5jZSA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5jb3ZhcmlhbmNlLCBnZXRWYWx1ZU9wdGlvbnMpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkob2JzQ292YXJpYW5jZSwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvalRyYW5zcG9zZWQgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLnRyYW5zcG9zZSkoc3RhdGVQcm9qZWN0aW9uKTtcbiAgICAgICAgKDAsIGNoZWNrX21hdHJpeF8xLmRlZmF1bHQpKHN0YXRlUHJvamVjdGlvbiwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ29ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbicpO1xuICAgICAgICBjb25zdCBub2lzZWxlc3NJbm5vdmF0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKCgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShzdGF0ZVByb2plY3Rpb24sIHByZWRpY3RlZC5jb3ZhcmlhbmNlKSwgc3RhdGVQcm9qVHJhbnNwb3NlZCk7XG4gICAgICAgIGNvbnN0IGlubm92YXRpb25Db3ZhcmlhbmNlID0gKDAsIHNpbXBsZV9saW5hbGdfMS5hZGQpKG5vaXNlbGVzc0lubm92YXRpb24sIG9ic0NvdmFyaWFuY2UpO1xuICAgICAgICBjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKSgoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkocHJlZGljdGVkLmNvdmFyaWFuY2UsIHN0YXRlUHJvalRyYW5zcG9zZWQpLCAoMCwgc2ltcGxlX2xpbmFsZ18xLmludmVydCkoaW5ub3ZhdGlvbkNvdmFyaWFuY2UpKTtcbiAgICAgICAgcmV0dXJuIG9wdGltYWxLYWxtYW5HYWluO1xuICAgIH1cbiAgICBnZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHsgcHJlZGljdGVkLCBvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9uIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBpZGVudGl0eSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKHByZWRpY3RlZC5jb3ZhcmlhbmNlLmxlbmd0aCk7XG4gICAgICAgIGlmICghc3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7IGluZGV4OiBwcmVkaWN0ZWQuaW5kZXggfSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzdGF0ZVByb2plY3Rpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW1hbEthbG1hbkdhaW4pIHtcbiAgICAgICAgICAgIG9wdGltYWxLYWxtYW5HYWluID0gdGhpcy5nZXRHYWluKE9iamVjdC5hc3NpZ24oeyBzdGF0ZVByb2plY3Rpb24gfSwgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoKDAsIHNpbXBsZV9saW5hbGdfMS5zdWJ0cmFjdCkoaWRlbnRpdHksICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9uKSksIHByZWRpY3RlZC5jb3ZhcmlhbmNlKTtcbiAgICB9XG4gICAgZ2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oYXJncykge1xuICAgICAgICBjb25zdCB7IG9wdHMsIHN0YXRlUHJvamVjdGlvbiB9ID0gYXJncztcbiAgICAgICAgaWYgKHRoaXMub2JzZXJ2YXRpb24uZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ic2VydmF0aW9uLmZuKG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgcHJlZGljdGVkIH0gPSBvcHRzO1xuICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKHN0YXRlUHJvamVjdGlvbiwgcHJlZGljdGVkLm1lYW4pO1xuICAgIH1cbiAgICBjb3JyZWN0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBwcmVkaWN0ZWQsIG9ic2VydmF0aW9uIH0gPSBvcHRpb25zO1xuICAgICAgICBzdGF0ZV8xLmRlZmF1bHQuY2hlY2socHJlZGljdGVkLCB7IGRpbWVuc2lvbjogdGhpcy5keW5hbWljLmRpbWVuc2lvbiB9KTtcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignbm8gbWVhc3VyZSBhdmFpbGFibGUnKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ2V0VmFsdWVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgeyBvYnNlcnZhdGlvbiwgcHJlZGljdGVkLCBpbmRleDogcHJlZGljdGVkLmluZGV4IH0sIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBzdGF0ZVByb2plY3Rpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuICAgICAgICBjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9IHRoaXMuZ2V0R2FpbihPYmplY3QuYXNzaWduKHsgcHJlZGljdGVkLCBzdGF0ZVByb2plY3Rpb24gfSwgb3B0aW9ucykpO1xuICAgICAgICBjb25zdCBpbm5vdmF0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5zdWJ0cmFjdCkob2JzZXJ2YXRpb24sIHRoaXMuZ2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oeyBzdGF0ZVByb2plY3Rpb24sIG9wdHM6IGdldFZhbHVlT3B0aW9ucyB9KSk7XG4gICAgICAgIGNvbnN0IG1lYW4gPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmFkZCkocHJlZGljdGVkLm1lYW4sICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShvcHRpbWFsS2FsbWFuR2FpbiwgaW5ub3ZhdGlvbikpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKG1lYW5bMF1bMF0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7IG9wdGltYWxLYWxtYW5HYWluLCBpbm5vdmF0aW9uLCBwcmVkaWN0ZWQgfSk7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignTWVhbiBpcyBOYU4gYWZ0ZXIgY29ycmVjdGlvbicpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKE9iamVjdC5hc3NpZ24oeyBwcmVkaWN0ZWQsIG9wdGltYWxLYWxtYW5HYWluLCBzdGF0ZVByb2plY3Rpb24gfSwgb3B0aW9ucykpO1xuICAgICAgICBjb25zdCBjb3JyZWN0ZWQgPSBuZXcgc3RhdGVfMS5kZWZhdWx0KHsgbWVhbiwgY292YXJpYW5jZSwgaW5kZXg6IHByZWRpY3RlZC5pbmRleCB9KTtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ0NvcnJlY3Rpb24gZG9uZScsIGNvcnJlY3RlZCk7XG4gICAgICAgIHJldHVybiBjb3JyZWN0ZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQ29yZUthbG1hbkZpbHRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbW9kZWxfY29sbGVjdGlvbl8xID0gcmVxdWlyZShcIi4uL21vZGVsLWNvbGxlY3Rpb25cIik7XG5mdW5jdGlvbiBjb21wb3NpdGlvbih7IHBlck5hbWUgfSwgb2JzZXJ2YXRpb24pIHtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3Qgb2JzZXJ2ZWREeW5hbURpbWVuc2lvbiA9IG9ic2VydmVkUHJvamVjdGlvblswXS5sZW5ndGg7XG4gICAgY29uc3QgZHluYW1pY05hbWVzID0gT2JqZWN0LmtleXMocGVyTmFtZSk7XG4gICAgY29uc3QgY29uZnMgPSB7fTtcbiAgICBsZXQgbmV4dER5bmFtaWNEaW1lbnNpb24gPSBvYnNlcnZlZER5bmFtRGltZW5zaW9uO1xuICAgIGxldCBuZXh0T2JzZXJ2ZWREaW1lbnNpb24gPSAwO1xuICAgIGR5bmFtaWNOYW1lcy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBjb25zdCBvYnNEeW5hSW5kZXhlcyA9IHBlck5hbWVba10ub2JzRHluYUluZGV4ZXM7XG4gICAgICAgIGlmICh0eXBlb2YgKHBlck5hbWVba10ubmFtZSkgPT09ICdzdHJpbmcnICYmIHBlck5hbWVba10ubmFtZSAhPT0gaykge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcihgJHtwZXJOYW1lW2tdLm5hbWV9IGFuZCBcIiR7a31cIiBzaG91bGQgbWF0Y2hgKSk7XG4gICAgICAgIH1cbiAgICAgICAgcGVyTmFtZVtrXS5uYW1lID0gaztcbiAgICAgICAgY29uc3QgeyBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsIGluaXQgfSA9ICgwLCBtb2RlbF9jb2xsZWN0aW9uXzEuYnVpbGREeW5hbWljKShwZXJOYW1lW2tdLCBvYnNlcnZhdGlvbik7XG4gICAgICAgIGNvbnN0IGR5bmFtaWNJbmRleGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGlzT2JzZXJ2ZWQgPSAoaSA8IG9ic0R5bmFJbmRleGVzLmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgbmV3SW5kZXg7XG4gICAgICAgICAgICBpZiAoaXNPYnNlcnZlZCkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV4dE9ic2VydmVkRGltZW5zaW9uO1xuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCAhPT0gb2JzRHluYUluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcigndGhzb2Ugc2hvdWxkIG1hdGNoJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0T2JzZXJ2ZWREaW1lbnNpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV4dER5bmFtaWNEaW1lbnNpb247XG4gICAgICAgICAgICAgICAgbmV4dER5bmFtaWNEaW1lbnNpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGR5bmFtaWNJbmRleGVzLnB1c2gobmV3SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZzW2tdID0ge1xuICAgICAgICAgICAgZHluYW1pY0luZGV4ZXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uLFxuICAgICAgICAgICAgZGltZW5zaW9uLFxuICAgICAgICAgICAgY292YXJpYW5jZSxcbiAgICAgICAgICAgIGluaXQsXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgdG90YWxEaW1lbnNpb24gPSBkeW5hbWljTmFtZXMubWFwKGsgPT4gY29uZnNba10uZGltZW5zaW9uKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICBpZiAobmV4dER5bmFtaWNEaW1lbnNpb24gIT09IHRvdGFsRGltZW5zaW9uKSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ21pc2NhbGN1bGF0aW9uIG9mIHRyYW5zaXRpb24nKSk7XG4gICAgfVxuICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgIGluZGV4OiAtMSxcbiAgICAgICAgbWVhbjogbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKSxcbiAgICAgICAgY292YXJpYW5jZTogbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoMCkpLFxuICAgIH07XG4gICAgZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGNvbnN0IHsgZHluYW1pY0luZGV4ZXMsIGluaXQ6IGxvY2FsSW5pdCwgfSA9IGNvbmZzW2tdO1xuICAgICAgICBpZiAodHlwZW9mIChsb2NhbEluaXQpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5pdCBpcyBtYW5kYXRvcnknKTtcbiAgICAgICAgfVxuICAgICAgICBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMSwgaTEpID0+IGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMyLCBpMikgPT4ge1xuICAgICAgICAgICAgaW5pdC5jb3ZhcmlhbmNlW2MxXVtjMl0gPSBsb2NhbEluaXQuY292YXJpYW5jZVtpMV1baTJdO1xuICAgICAgICB9KSk7XG4gICAgICAgIGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4ge1xuICAgICAgICAgICAgaW5pdC5tZWFuW2MxXSA9IGxvY2FsSW5pdC5tZWFuW2kxXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGltZW5zaW9uOiB0b3RhbERpbWVuc2lvbixcbiAgICAgICAgaW5pdCxcbiAgICAgICAgdHJhbnNpdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzQ29ycmVjdGVkIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0VHJhbnNpdGlvbiA9IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCh1bmRlZmluZWQpLm1hcCgoKSA9PiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoMCkpO1xuICAgICAgICAgICAgZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkeW5hbWljSW5kZXhlcywgdHJhbnNpdGlvbiwgfSA9IGNvbmZzW2tdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMyID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBwcmV2aW91c0NvcnJlY3RlZDogcHJldmlvdXNDb3JyZWN0ZWQuc3ViU3RhdGUoZHluYW1pY0luZGV4ZXMpIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNpdGlvbihvcHRpb25zMik7XG4gICAgICAgICAgICAgICAgZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0VHJhbnNpdGlvbltjMV1bYzJdID0gdHJhbnNbaTFdW2kyXTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRUcmFuc2l0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBjb3ZhcmlhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJldmlvdXNDb3JyZWN0ZWQgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRDb3ZhcmlhbmNlID0gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKHVuZGVmaW5lZCkubWFwKCgpID0+IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKSk7XG4gICAgICAgICAgICBkeW5hbWljTmFtZXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGR5bmFtaWNJbmRleGVzLCBjb3ZhcmlhbmNlLCB9ID0gY29uZnNba107XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uczIgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IHByZXZpb3VzQ29ycmVjdGVkOiBwcmV2aW91c0NvcnJlY3RlZC5zdWJTdGF0ZShkeW5hbWljSW5kZXhlcykgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY292ID0gY292YXJpYW5jZShvcHRpb25zMik7XG4gICAgICAgICAgICAgICAgZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q292YXJpYW5jZVtjMV1bYzJdID0gY292W2kxXVtpMl07XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Q292YXJpYW5jZTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gY29tcG9zaXRpb247XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuZnVuY3Rpb24gY29uc3RhbnRBY2NlbGVyYXRpb24oZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3QgeyBzdGF0ZVByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGxldCBkaW1lbnNpb247XG4gICAgaWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAzKSkge1xuICAgICAgICBkaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcbiAgICAgICAgZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDM7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgIGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ29ic2VydmVkUHJvamVjdGlvbiBvciBzdGF0ZVByb2plY3Rpb24gc2hvdWxkIGJlIGRlZmluZWQgaW4gb2JzZXJ2YXRpb24gaW4gb3JkZXIgdG8gdXNlIGNvbnN0YW50LXNwZWVkIGZpbHRlcicpKTtcbiAgICB9XG4gICAgY29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDM7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgdHJhbnNpdGlvbltpXVtpICsgYmFzZURpbWVuc2lvbl0gPSB0aW1lU3RlcDtcbiAgICAgICAgdHJhbnNpdGlvbltpXVtpICsgKDIgKiBiYXNlRGltZW5zaW9uKV0gPSAwLjUgKiAodGltZVN0ZXAgKiogMik7XG4gICAgICAgIHRyYW5zaXRpb25baSArIGJhc2VEaW1lbnNpb25dW2kgKyAoMiAqIGJhc2VEaW1lbnNpb24pXSA9IHRpbWVTdGVwO1xuICAgIH1cbiAgICBjb25zdCBhcnJheUNvdmFyaWFuY2UgPSBuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCgxKVxuICAgICAgICAuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKVxuICAgICAgICAuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICoqIDQpKTtcbiAgICBjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywgeyBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5jb25zdCBodWdlID0gMWU2O1xuZnVuY3Rpb24gY29uc3RhbnRQb3NpdGlvbldpdGhOdWxsKHsgc3RhdGljQ292YXJpYW5jZSwgb2JzRHluYUluZGV4ZXMsIGluaXQgfSkge1xuICAgIGNvbnN0IGRpbWVuc2lvbiA9IG9ic0R5bmFJbmRleGVzLmxlbmd0aDtcbiAgICBpZiAoIWluaXQpIHtcbiAgICAgICAgaW5pdCA9IHtcbiAgICAgICAgICAgIG1lYW46IG5ldyBBcnJheShvYnNEeW5hSW5kZXhlcy5sZW5ndGgpLmZpbGwoMCkubWFwKCgpID0+IFswXSksXG4gICAgICAgICAgICBjb3ZhcmlhbmNlOiAoMCwgc2ltcGxlX2xpbmFsZ18xLmRpYWcpKG5ldyBBcnJheShvYnNEeW5hSW5kZXhlcy5sZW5ndGgpLmZpbGwoaHVnZSkpLFxuICAgICAgICAgICAgaW5kZXg6IC0xLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoc3RhdGljQ292YXJpYW5jZSAmJiBzdGF0aWNDb3ZhcmlhbmNlLmxlbmd0aCAhPT0gZGltZW5zaW9uKSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ3N0YXRpY0NvdmFyaWFuY2UgaGFzIHdyb25nIHNpemUnKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGRpbWVuc2lvbixcbiAgICAgICAgdHJhbnNpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLmlkZW50aXR5KShkaW1lbnNpb24pO1xuICAgICAgICB9LFxuICAgICAgICBjb3ZhcmlhbmNlKHsgcHJldmlvdXNDb3JyZWN0ZWQsIGluZGV4IH0pIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmZCZXR3ZWVuSW5kZXhlcyA9IGluZGV4IC0gcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXg7XG4gICAgICAgICAgICBpZiAoc3RhdGljQ292YXJpYW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0aWNDb3ZhcmlhbmNlLm1hcChyb3cgPT4gcm93Lm1hcChlbGVtZW50ID0+IGVsZW1lbnQgKiBkaWZmQmV0d2VlbkluZGV4ZXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLmlkZW50aXR5KShkaW1lbnNpb24pO1xuICAgICAgICB9LFxuICAgICAgICBpbml0LFxuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb25zdGFudFBvc2l0aW9uV2l0aE51bGw7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuZnVuY3Rpb24gY29uc3RhbnRQb3NpdGlvbihkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuICAgIGxldCB7IGRpbWVuc2lvbiB9ID0gZHluYW1pYztcbiAgICBjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3QgeyBzdGF0ZVByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGxldCB7IGNvdmFyaWFuY2UgfSA9IGR5bmFtaWM7XG4gICAgaWYgKCFkeW5hbWljLmRpbWVuc2lvbikge1xuICAgICAgICBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9ic2VydmVkUHJvamVjdGlvbikge1xuICAgICAgICAgICAgZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZVByb2plY3Rpb24pIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbiA9IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgY292YXJpYW5jZSA9IGNvdmFyaWFuY2UgfHwgKDAsIHNpbXBsZV9saW5hbGdfMS5pZGVudGl0eSkoZGltZW5zaW9uKTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywgeyBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb25zdGFudFBvc2l0aW9uO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmZ1bmN0aW9uIGNvbnN0YW50U3BlZWREeW5hbWljKGFyZ3MsIG9ic2VydmF0aW9uKSB7XG4gICAgY29uc3QgeyBzdGF0aWNDb3ZhcmlhbmNlLCBhdlNwZWVkLCBjZW50ZXIgfSA9IGFyZ3M7XG4gICAgY29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5vYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgIGNvbnN0IGRpbWVuc2lvbiA9IDIgKiBvYnNlcnZhdGlvbkRpbWVuc2lvbjtcbiAgICBpZiAoKGNlbnRlcikgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignQ2VudGVyIG11c3QgYmUgZGVmaW5lZCcpKTtcbiAgICB9XG4gICAgaWYgKGNlbnRlci5sZW5ndGggIT09IG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBDZW50ZXIgc2l6ZSBzaG91bGQgYmUgJHtvYnNlcnZhdGlvbkRpbWVuc2lvbn1gKSk7XG4gICAgfVxuICAgIGlmIChhdlNwZWVkLmxlbmd0aCAhPT0gb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYGF2U3BlZWQgc2l6ZSBzaG91bGQgYmUgJHtvYnNlcnZhdGlvbkRpbWVuc2lvbn1gKSk7XG4gICAgfVxuICAgIGNvbnN0IGluaXRDb3YgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmRpYWcpKGNlbnRlci5tYXAoYyA9PiBjICogYyAvIDMpLmNvbmNhdChhdlNwZWVkLm1hcChjID0+IGMgKiBjIC8gMykpKTtcbiAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICBtZWFuOiBjZW50ZXIubWFwKGMgPT4gW2NdKS5jb25jYXQoY2VudGVyLm1hcCgoKSA9PiBbMF0pKSxcbiAgICAgICAgY292YXJpYW5jZTogaW5pdENvdixcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgIH07XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9IChhcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZ2V0VGltZSwgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkIH0gPSBhcmdzO1xuICAgICAgICBjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGRUKSAhPT0gJ251bWJlcicgfHwgTnVtYmVyLmlzTmFOKGRUKSkge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYGRUICgke2RUfSkgc2hvdWxkIGJlIGEgbnVtYmVyYCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdCA9ICgwLCBzaW1wbGVfbGluYWxnXzEuZGlhZykoY2VudGVyLm1hcCgoKSA9PiAxKS5jb25jYXQoY2VudGVyLm1hcCgoKSA9PiAxKSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic2VydmF0aW9uRGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgICAgIG1hdFtpXVtvYnNlcnZhdGlvbkRpbWVuc2lvbiArIGldID0gZFQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE51bWJlci5pc05hTihtYXRbMF1bMl0pKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuIG1hdCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH07XG4gICAgY29uc3QgY292YXJpYW5jZSA9IChhcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkLCBnZXRUaW1lIH0gPSBhcmdzO1xuICAgICAgICBjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGRUKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBkVCAoJHtkVH0pIHNob3VsZCBiZSBhIG51bWJlcmApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KGRUKTtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihzcXJ0KSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coeyBsYXN0UHJldmlvdXNJbmRleDogcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgsIGluZGV4IH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZFQsIHByZXZpb3VzQ29ycmVjdGVkLmluZGV4LCBpbmRleCwgZ2V0VGltZShpbmRleCksIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpKTtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1NxcnQoZFQpIGlzIE5hTicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShzdGF0aWNDb3ZhcmlhbmNlLm1hcCh2ID0+IHYgKiBzcXJ0KSk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0LFxuICAgICAgICBkaW1lbnNpb24sXG4gICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgIGNvdmFyaWFuY2UsXG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNvbnN0YW50U3BlZWREeW5hbWljO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmZ1bmN0aW9uIGNvbnN0YW50U3BlZWQoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3QgeyBzdGF0ZVByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGxldCBkaW1lbnNpb247XG4gICAgaWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAyKSkge1xuICAgICAgICBkaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcbiAgICAgICAgZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgIGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ29ic2VydmVkUHJvamVjdGlvbiBvciBzdGF0ZVByb2plY3Rpb24gc2hvdWxkIGJlIGRlZmluZWQgaW4gb2JzZXJ2YXRpb24gaW4gb3JkZXIgdG8gdXNlIGNvbnN0YW50LXNwZWVkIGZpbHRlcicpKTtcbiAgICB9XG4gICAgY29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDI7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgdHJhbnNpdGlvbltpXVtpICsgYmFzZURpbWVuc2lvbl0gPSB0aW1lU3RlcDtcbiAgICB9XG4gICAgY29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSkuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKTtcbiAgICBjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywgeyBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb25zdGFudFNwZWVkO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNob3J0dGVybUNvbnN0YW50U3BlZWQgPSBleHBvcnRzLmNvbnN0YW50U3BlZWREeW5hbWljID0gZXhwb3J0cy5jb25zdGFudFBvc2l0aW9uV2l0aE51bGwgPSBleHBvcnRzLmNvbXBvc2l0aW9uID0gZXhwb3J0cy5jb25zdGFudEFjY2VsZXJhdGlvbiA9IGV4cG9ydHMuY29uc3RhbnRTcGVlZCA9IGV4cG9ydHMuY29uc3RhbnRQb3NpdGlvbiA9IHZvaWQgMDtcbnZhciBjb25zdGFudF9wb3NpdGlvbl8xID0gcmVxdWlyZShcIi4vY29uc3RhbnQtcG9zaXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25zdGFudFBvc2l0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY29uc3RhbnRfcG9zaXRpb25fMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjb25zdGFudF9zcGVlZF8xID0gcmVxdWlyZShcIi4vY29uc3RhbnQtc3BlZWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25zdGFudFNwZWVkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY29uc3RhbnRfc3BlZWRfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjb25zdGFudF9hY2NlbGVyYXRpb25fMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50LWFjY2VsZXJhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbnN0YW50QWNjZWxlcmF0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY29uc3RhbnRfYWNjZWxlcmF0aW9uXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgY29tcG9zaXRpb25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvc2l0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29tcG9zaXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb21wb3NpdGlvbl8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIGNvbnN0YW50X3Bvc2l0aW9uX3dpdGhfbnVsbF8xID0gcmVxdWlyZShcIi4vY29uc3RhbnQtcG9zaXRpb24td2l0aC1udWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uc3RhbnRQb3NpdGlvbldpdGhOdWxsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY29uc3RhbnRfcG9zaXRpb25fd2l0aF9udWxsXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgY29uc3RhbnRfc3BlZWRfZHluYW1pY18xID0gcmVxdWlyZShcIi4vY29uc3RhbnQtc3BlZWQtZHluYW1pY1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbnN0YW50U3BlZWREeW5hbWljXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY29uc3RhbnRfc3BlZWRfZHluYW1pY18xKS5kZWZhdWx0OyB9IH0pO1xudmFyIHNob3J0dGVybV9jb25zdGFudF9zcGVlZF8xID0gcmVxdWlyZShcIi4vc2hvcnR0ZXJtLWNvbnN0YW50LXNwZWVkXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2hvcnR0ZXJtQ29uc3RhbnRTcGVlZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KHNob3J0dGVybV9jb25zdGFudF9zcGVlZF8xKS5kZWZhdWx0OyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IGNvbnN0YW50X3NwZWVkX2R5bmFtaWNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb25zdGFudC1zcGVlZC1keW5hbWljXCIpKTtcbmNvbnN0IHNhZmVEaXYgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIGlmIChhID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoYiA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcmV0dXJuIGEgLyBiO1xufTtcbmZ1bmN0aW9uIHNob3J0dGVybUNvbnN0YW50U3BlZWQob3B0aW9ucywgb2JzZXJ2YXRpb24pIHtcbiAgICBjb25zdCB7IHR5cGljYWxUaW1lcyB9ID0gb3B0aW9ucztcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodHlwaWNhbFRpbWVzKSkge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcigndHlwaWNhbFRpbWVzIG11c3QgYmUgZGVmaW5lZCcpKTtcbiAgICB9XG4gICAgY29uc3QgY29uc3RhbnRTcGVlZCA9ICgwLCBjb25zdGFudF9zcGVlZF9keW5hbWljXzEuZGVmYXVsdCkob3B0aW9ucywgb2JzZXJ2YXRpb24pO1xuICAgIGNvbnN0IHsgZGltZW5zaW9uLCBpbml0IH0gPSBjb25zdGFudFNwZWVkO1xuICAgIGlmICh0eXBpY2FsVGltZXMubGVuZ3RoICE9PSBkaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYHR5cGljYWxUaW1lcyAoJHt0eXBpY2FsVGltZXMubGVuZ3RofSkgbGVuZ3RoIGlzIG5vdCBhcyBleHBlY3RlZCAoJHtkaW1lbnNpb259KWApKTtcbiAgICB9XG4gICAgY29uc3QgbWl4TWF0cml4ID0gZnVuY3Rpb24gKHsgcmF0aW9zLCBhTWF0LCBiTWF0LCB9KSB7XG4gICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLmVsZW1XaXNlKShbYU1hdCwgYk1hdF0sIChbbSwgZF0sIHJvd0luZGV4LCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmF0aW8gPSByb3dJbmRleCA9PT0gY29sSW5kZXggPyByYXRpb3Nbcm93SW5kZXhdIDogKHJhdGlvc1tyb3dJbmRleF0gKyByYXRpb3NbY29sSW5kZXhdKSAvIDI7XG4gICAgICAgICAgICByZXR1cm4gKHJhdGlvICogbSkgKyAoKDEgLSByYXRpbykgKiBkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaW1lbnNpb24sXG4gICAgICAgIGluaXQsXG4gICAgICAgIHRyYW5zaXRpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgYU1hdCA9IGNvbnN0YW50U3BlZWQudHJhbnNpdGlvbihvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IHsgZ2V0VGltZSwgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgY29uc3QgZFQgPSBnZXRUaW1lKGluZGV4KSAtIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgcmF0aW9zID0gdHlwaWNhbFRpbWVzLm1hcCh0ID0+IE1hdGguZXhwKC0xICogZFQgLyB0KSk7XG4gICAgICAgICAgICBjb25zdCBiTWF0ID0gKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKSgoMCwgc2ltcGxlX2xpbmFsZ18xLmVsZW1XaXNlKShbaW5pdC5tZWFuLCBwcmV2aW91c0NvcnJlY3RlZC5tZWFuXSwgKFttLCBkXSkgPT4gc2FmZURpdihtLCBkKSlcbiAgICAgICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkpO1xuICAgICAgICAgICAgcmV0dXJuIG1peE1hdHJpeCh7IHJhdGlvcywgYU1hdCwgYk1hdCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY292YXJpYW5jZShvcHRpb25zLCBvYnNlcnZhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgeyBnZXRUaW1lLCBpbmRleCwgcHJldmlvdXNDb3JyZWN0ZWQgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCByYXRpb3MgPSB0eXBpY2FsVGltZXMubWFwKHQgPT4gTWF0aC5leHAoLTEgKiBkVCAvIHQpKTtcbiAgICAgICAgICAgIGNvbnN0IGFNYXQgPSBjb25zdGFudFNwZWVkLmNvdmFyaWFuY2Uob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gbWl4TWF0cml4KHsgcmF0aW9zLCBhTWF0LCBiTWF0OiBpbml0LmNvdmFyaWFuY2UgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHNob3J0dGVybUNvbnN0YW50U3BlZWQ7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5jb25zdCBhcnJheV90b19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbGliL3V0aWxzL2FycmF5LXRvLW1hdHJpeFwiKSk7XG5jb25zdCBzZXRfZGltZW5zaW9uc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9saWIvc2V0dXAvc2V0LWRpbWVuc2lvbnNcIikpO1xuY29uc3QgY2hlY2tfZGltZW5zaW9uc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9saWIvc2V0dXAvY2hlY2stZGltZW5zaW9uc1wiKSk7XG5jb25zdCBidWlsZF9zdGF0ZV9wcm9qZWN0aW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2xpYi9zZXR1cC9idWlsZC1zdGF0ZS1wcm9qZWN0aW9uXCIpKTtcbmNvbnN0IGV4dGVuZF9keW5hbWljX2luaXRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbGliL3NldHVwL2V4dGVuZC1keW5hbWljLWluaXRcIikpO1xuY29uc3QgdG9fZnVuY3Rpb25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbGliL3V0aWxzL3RvLWZ1bmN0aW9uXCIpKTtcbmNvbnN0IGRlZXBfYXNzaWduXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2xpYi91dGlscy9kZWVwLWFzc2lnblwiKSk7XG5jb25zdCBwb2x5bW9ycGhfbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2xpYi91dGlscy9wb2x5bW9ycGgtbWF0cml4XCIpKTtcbmNvbnN0IHN0YXRlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3RhdGVcIikpO1xuY29uc3QgbW9kZWxDb2xsZWN0aW9uID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL21vZGVsLWNvbGxlY3Rpb25cIikpO1xuY29uc3QgY29yZV9rYWxtYW5fZmlsdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29yZS1rYWxtYW4tZmlsdGVyXCIpKTtcbmNvbnN0IGJ1aWxkRGVmYXVsdER5bmFtaWMgPSBmdW5jdGlvbiAoZHluYW1pYykge1xuICAgIGlmICh0eXBlb2YgKGR5bmFtaWMpID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4geyBuYW1lOiBkeW5hbWljIH07XG4gICAgfVxuICAgIHJldHVybiB7IG5hbWU6ICdjb25zdGFudC1wb3NpdGlvbicgfTtcbn07XG5jb25zdCBidWlsZERlZmF1bHRPYnNlcnZhdGlvbiA9IGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xuICAgIGlmICh0eXBlb2YgKG9ic2VydmF0aW9uKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogJ3NlbnNvcicsIHNlbnNvckRpbWVuc2lvbjogb2JzZXJ2YXRpb24gfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAob2JzZXJ2YXRpb24pID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4geyBuYW1lOiBvYnNlcnZhdGlvbiB9O1xuICAgIH1cbiAgICByZXR1cm4geyBuYW1lOiAnc2Vuc29yJyB9O1xufTtcbmNvbnN0IHNldHVwTW9kZWxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgbGV0IHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfSA9IGFyZ3M7XG4gICAgaWYgKHR5cGVvZiAob2JzZXJ2YXRpb24pICE9PSAnb2JqZWN0JyB8fCBvYnNlcnZhdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICBvYnNlcnZhdGlvbiA9IGJ1aWxkRGVmYXVsdE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAoZHluYW1pYykgIT09ICdvYmplY3QnIHx8IGR5bmFtaWMgPT09IG51bGwpIHtcbiAgICAgICAgZHluYW1pYyA9IGJ1aWxkRGVmYXVsdER5bmFtaWMoZHluYW1pYyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgKG9ic2VydmF0aW9uLm5hbWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICBvYnNlcnZhdGlvbiA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAoZHluYW1pYy5uYW1lKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZHluYW1pYyA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pO1xuICAgIH1cbiAgICBjb25zdCB3aXRoRGltZW5zaW9uT3B0aW9ucyA9ICgwLCBzZXRfZGltZW5zaW9uc18xLmRlZmF1bHQpKHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfSk7XG4gICAgY29uc3QgY2hlY2tlZERpbWVuc2lvbk9wdGlvbnMgPSAoMCwgY2hlY2tfZGltZW5zaW9uc18xLmRlZmF1bHQpKHdpdGhEaW1lbnNpb25PcHRpb25zKTtcbiAgICBjb25zdCBidWlsZFN0YXRlUHJvamVjdGlvbk9wdGlvbnMgPSAoMCwgYnVpbGRfc3RhdGVfcHJvamVjdGlvbl8xLmRlZmF1bHQpKGNoZWNrZWREaW1lbnNpb25PcHRpb25zKTtcbiAgICByZXR1cm4gKDAsIGV4dGVuZF9keW5hbWljX2luaXRfMS5kZWZhdWx0KShidWlsZFN0YXRlUHJvamVjdGlvbk9wdGlvbnMpO1xufTtcbmNvbnN0IG1vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zID0gZnVuY3Rpb24gKG1vZGVsVG9CZUNoYW5nZWQpIHtcbiAgICBjb25zdCB7IG9ic2VydmF0aW9uLCBkeW5hbWljIH0gPSBtb2RlbFRvQmVDaGFuZ2VkO1xuICAgIHJldHVybiAoMCwgZGVlcF9hc3NpZ25fMS5kZWZhdWx0KShtb2RlbFRvQmVDaGFuZ2VkLCB7XG4gICAgICAgIG9ic2VydmF0aW9uOiB7XG4gICAgICAgICAgICBzdGF0ZVByb2plY3Rpb246ICgwLCB0b19mdW5jdGlvbl8xLmRlZmF1bHQpKCgwLCBwb2x5bW9ycGhfbWF0cml4XzEuZGVmYXVsdCkob2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uKSwgeyBsYWJlbDogJ29ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbicgfSksXG4gICAgICAgICAgICBjb3ZhcmlhbmNlOiAoMCwgdG9fZnVuY3Rpb25fMS5kZWZhdWx0KSgoMCwgcG9seW1vcnBoX21hdHJpeF8xLmRlZmF1bHQpKG9ic2VydmF0aW9uLmNvdmFyaWFuY2UsIHsgZGltZW5zaW9uOiBvYnNlcnZhdGlvbi5kaW1lbnNpb24gfSksIHsgbGFiZWw6ICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJyB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgZHluYW1pYzoge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogKDAsIHRvX2Z1bmN0aW9uXzEuZGVmYXVsdCkoKDAsIHBvbHltb3JwaF9tYXRyaXhfMS5kZWZhdWx0KShkeW5hbWljLnRyYW5zaXRpb24pLCB7IGxhYmVsOiAnZHluYW1pYy50cmFuc2l0aW9uJyB9KSxcbiAgICAgICAgICAgIGNvdmFyaWFuY2U6ICgwLCB0b19mdW5jdGlvbl8xLmRlZmF1bHQpKCgwLCBwb2x5bW9ycGhfbWF0cml4XzEuZGVmYXVsdCkoZHluYW1pYy5jb3ZhcmlhbmNlLCB7IGRpbWVuc2lvbjogZHluYW1pYy5kaW1lbnNpb24gfSksIHsgbGFiZWw6ICdkeW5hbWljLmNvdmFyaWFuY2UnIH0pLFxuICAgICAgICB9LFxuICAgIH0pO1xufTtcbmNsYXNzIEthbG1hbkZpbHRlciBleHRlbmRzIGNvcmVfa2FsbWFuX2ZpbHRlcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBtb2RlbHNQYXJhbWV0ZXJzID0gc2V0dXBNb2RlbHNQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb3JlT3B0aW9ucyA9IG1vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zKG1vZGVsc1BhcmFtZXRlcnMpO1xuICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCBjb3JlT3B0aW9ucykpO1xuICAgIH1cbiAgICBjb3JyZWN0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY29yZU9ic2VydmF0aW9uID0gKDAsIGFycmF5X3RvX21hdHJpeF8xLmRlZmF1bHQpKHsgb2JzZXJ2YXRpb246IG9wdGlvbnMub2JzZXJ2YXRpb24sIGRpbWVuc2lvbjogdGhpcy5vYnNlcnZhdGlvbi5kaW1lbnNpb24gfSk7XG4gICAgICAgIHJldHVybiBzdXBlci5jb3JyZWN0KE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgb2JzZXJ2YXRpb246IGNvcmVPYnNlcnZhdGlvbiB9KSk7XG4gICAgfVxuICAgIGZpbHRlcihvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHByZWRpY3RlZCA9IHN1cGVyLnByZWRpY3Qob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcnJlY3QoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBwcmVkaWN0ZWQgfSkpO1xuICAgIH1cbiAgICBmaWx0ZXJBbGwob2JzZXJ2YXRpb25zKSB7XG4gICAgICAgIGxldCBwcmV2aW91c0NvcnJlY3RlZCA9IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZhdGlvbiBvZiBvYnNlcnZhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRpY3RlZCA9IHRoaXMucHJlZGljdCh7IHByZXZpb3VzQ29ycmVjdGVkIH0pO1xuICAgICAgICAgICAgcHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmNvcnJlY3Qoe1xuICAgICAgICAgICAgICAgIHByZWRpY3RlZCxcbiAgICAgICAgICAgICAgICBvYnNlcnZhdGlvbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHByZXZpb3VzQ29ycmVjdGVkLm1lYW4ubWFwKG0gPT4gbVswXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBhc3ltcHRvdGljU3RhdGVDb3ZhcmlhbmNlKHsgbGltaXRJdGVyYXRpb25zID0gMWUyLCB0b2xlcmFuY2UgPSAxZS02IH0gPSB7fSkge1xuICAgICAgICBsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBzdXBlci5nZXRJbml0U3RhdGUoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbWl0SXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVkaWN0ZWQgPSBuZXcgc3RhdGVfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgICAgICBtZWFuOiBbXSxcbiAgICAgICAgICAgICAgICBjb3ZhcmlhbmNlOiBzdXBlci5nZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKHsgcHJldmlvdXNDb3JyZWN0ZWQgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByZXZpb3VzQ29ycmVjdGVkID0gbmV3IHN0YXRlXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICAgICAgbWVhbjogW10sXG4gICAgICAgICAgICAgICAgY292YXJpYW5jZTogc3VwZXIuZ2V0Q29ycmVjdGVkQ292YXJpYW5jZSh7IHByZWRpY3RlZCB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHByZXZpb3VzQ29ycmVjdGVkLmNvdmFyaWFuY2UpO1xuICAgICAgICAgICAgaWYgKCgwLCBzaW1wbGVfbGluYWxnXzEuZnJvYmVuaXVzKShwcmV2aW91c0NvcnJlY3RlZC5jb3ZhcmlhbmNlLCByZXN1bHRzW2kgLSAxXSkgPCB0b2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdUaGUgc3RhdGUgY292YXJpYW5jZSBkb2VzIG5vdCBjb252ZXJnZSBhc3ltcHRvdGljYWxseScpKTtcbiAgICB9XG4gICAgYXN5bXB0b3RpY0dhaW4oeyB0b2xlcmFuY2UgPSAxZS02IH0gPSB7fSkge1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5hc3ltcHRvdGljU3RhdGVDb3ZhcmlhbmNlKHsgdG9sZXJhbmNlIH0pO1xuICAgICAgICBjb25zdCBhc3ltcHRvdGljU3RhdGUgPSBuZXcgc3RhdGVfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1lYW46IEFycmF5LmZyb20oeyBsZW5ndGg6IGNvdmFyaWFuY2UubGVuZ3RoIH0pLmZpbGwoMCkubWFwKCgpID0+IFswXSksXG4gICAgICAgICAgICBjb3ZhcmlhbmNlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldEdhaW4oeyBwcmVkaWN0ZWQ6IGFzeW1wdG90aWNTdGF0ZSB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBLYWxtYW5GaWx0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYnVpbGREeW5hbWljID0gZXhwb3J0cy5idWlsZE9ic2VydmF0aW9uID0gZXhwb3J0cy5yZWdpc3RlckR5bmFtaWMgPSBleHBvcnRzLnJlZ2lzdGVyT2JzZXJ2YXRpb24gPSB2b2lkIDA7XG5jb25zdCByZWdpc3RlcmVkT2JzZXJ2YXRpb25Nb2RlbHMgPSB7fTtcbmNvbnN0IHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzID0ge307XG5mdW5jdGlvbiByZWdpc3Rlck9ic2VydmF0aW9uKG5hbWUsIGZuKSB7XG4gICAgcmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW25hbWVdID0gZm47XG59XG5leHBvcnRzLnJlZ2lzdGVyT2JzZXJ2YXRpb24gPSByZWdpc3Rlck9ic2VydmF0aW9uO1xuZnVuY3Rpb24gcmVnaXN0ZXJEeW5hbWljKG5hbWUsIGZuKSB7XG4gICAgcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbbmFtZV0gPSBmbjtcbn1cbmV4cG9ydHMucmVnaXN0ZXJEeW5hbWljID0gcmVnaXN0ZXJEeW5hbWljO1xuZnVuY3Rpb24gYnVpbGRPYnNlcnZhdGlvbihvYnNlcnZhdGlvbikge1xuICAgIGlmICh0eXBlb2YgKHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tvYnNlcnZhdGlvbi5uYW1lXSkgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgVGhlIHByb3ZpZGVkIG9ic2VydmF0aW9uIG1vZGVsIG5hbWUgKCR7b2JzZXJ2YXRpb24ubmFtZX0pIGlzIG5vdCByZWdpc3RlcmVkYCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKG9ic2VydmF0aW9uKTtcbn1cbmV4cG9ydHMuYnVpbGRPYnNlcnZhdGlvbiA9IGJ1aWxkT2JzZXJ2YXRpb247XG5mdW5jdGlvbiBidWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBpZiAodHlwZW9mIChyZWdpc3RlcmVkRHluYW1pY01vZGVsc1tkeW5hbWljLm5hbWVdKSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBUaGUgcHJvdmlkZWQgZHluYW1pYyBtb2RlbCAoJHtkeW5hbWljLm5hbWV9KSBuYW1lIGlzIG5vdCByZWdpc3RlcmVkYCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbZHluYW1pYy5uYW1lXShkeW5hbWljLCBvYnNlcnZhdGlvbik7XG59XG5leHBvcnRzLmJ1aWxkRHluYW1pYyA9IGJ1aWxkRHluYW1pYztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZW5zb3JQcm9qZWN0ZWQgPSBleHBvcnRzLnNlbnNvckxvY2FsVmFyaWFuY2UgPSBleHBvcnRzLnNlbnNvciA9IHZvaWQgMDtcbnZhciBzZW5zb3JfMSA9IHJlcXVpcmUoXCIuL3NlbnNvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNlbnNvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KHNlbnNvcl8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIHNlbnNvcl9sb2NhbF92YXJpYW5jZV8xID0gcmVxdWlyZShcIi4vc2Vuc29yLWxvY2FsLXZhcmlhbmNlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2Vuc29yTG9jYWxWYXJpYW5jZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KHNlbnNvcl9sb2NhbF92YXJpYW5jZV8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIHNlbnNvcl9wcm9qZWN0ZWRfMSA9IHJlcXVpcmUoXCIuL3NlbnNvci1wcm9qZWN0ZWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZW5zb3JQcm9qZWN0ZWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChzZW5zb3JfcHJvamVjdGVkXzEpLmRlZmF1bHQ7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuY29uc3QgbW9kZWxfY29sbGVjdGlvbl8xID0gcmVxdWlyZShcIi4uL21vZGVsLWNvbGxlY3Rpb25cIik7XG5mdW5jdGlvbiBudWxsYWJsZVNlbnNvcihvcHRpb25zKSB7XG4gICAgY29uc3QgeyBkaW1lbnNpb24sIG9ic2VydmVkUHJvamVjdGlvbiwgY292YXJpYW5jZTogYmFzZUNvdmFyaWFuY2UgfSA9ICgwLCBtb2RlbF9jb2xsZWN0aW9uXzEuYnVpbGRPYnNlcnZhdGlvbikoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBuYW1lOiAnc2Vuc29yJyB9KSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGltZW5zaW9uLFxuICAgICAgICBvYnNlcnZlZFByb2plY3Rpb24sXG4gICAgICAgIGNvdmFyaWFuY2Uobykge1xuICAgICAgICAgICAgY29uc3QgY292YXJpYW5jZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgICAgICAgICBjb25zdCB7IHZhcmlhbmNlIH0gPSBvO1xuICAgICAgICAgICAgdmFyaWFuY2UuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdmFyaWFuY2VbaV1baV0gPSB2ICogYmFzZUNvdmFyaWFuY2VbaV1baV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjb3ZhcmlhbmNlO1xuICAgICAgICB9LFxuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBudWxsYWJsZVNlbnNvcjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5jb25zdCBjb3JyZWxhdGlvbl90b19jb3ZhcmlhbmNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2VcIikpO1xuY29uc3QgY292YXJpYW5jZV90b19jb3JyZWxhdGlvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uXCIpKTtcbmZ1bmN0aW9uIHNlbnNvclByb2plY3RlZCh7IHNlbGVjdGVkQ292YXJpYW5jZSwgdG90YWxEaW1lbnNpb24sIG9ic0luZGV4ZXMsIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uIH0pIHtcbiAgICBpZiAoIXNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uID0gbmV3IEFycmF5KG9ic0luZGV4ZXMubGVuZ3RoKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkob2JzSW5kZXhlcy5sZW5ndGgpLmZpbGwoMCkpO1xuICAgICAgICBvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MSwgaTEpID0+IHtcbiAgICAgICAgICAgIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uW2kxXVtpMV0gPSAxO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RoICE9PSBvYnNJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBbU2Vuc29yLXByb2plY3RlZF0gU2hhcGUgbWlzbWF0Y2ggYmV0d2VlbiAke3NlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLmxlbmd0aH0gYW5kICR7b2JzSW5kZXhlcy5sZW5ndGh9YCkpO1xuICAgIH1cbiAgICBjb25zdCBiYXNlQ292YXJpYW5jZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKHRvdGFsRGltZW5zaW9uKTtcbiAgICBvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MSwgaTEpID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ292YXJpYW5jZSkge1xuICAgICAgICAgICAgb2JzSW5kZXhlcy5mb3JFYWNoKChpbmRleDIsIGkyKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFzZUNvdmFyaWFuY2VbaW5kZXgxXVtpbmRleDJdID0gc2VsZWN0ZWRDb3ZhcmlhbmNlW2kxXVtpMl07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHsgY29ycmVsYXRpb246IGJhc2VDb3JyZWxhdGlvbiwgdmFyaWFuY2U6IGJhc2VWYXJpYW5jZSB9ID0gKDAsIGNvdmFyaWFuY2VfdG9fY29ycmVsYXRpb25fMS5kZWZhdWx0KShiYXNlQ292YXJpYW5jZSk7XG4gICAgY29uc3QgZHluYURpbWVuc2lvbiA9IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcbiAgICBpZiAoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RoICE9PSBvYnNJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBzaGFwZSBtaXNtYXRjaCAoJHtzZWxlY3RlZFN0YXRlUHJvamVjdGlvbi5sZW5ndGh9IHZzICR7b2JzSW5kZXhlcy5sZW5ndGh9KWApKTtcbiAgICB9XG4gICAgY29uc3Qgb2JzZXJ2ZWRQcm9qZWN0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRQZXJtdXRhdGlvbikoe1xuICAgICAgICBvdXRwdXRTaXplOiBbdG90YWxEaW1lbnNpb24sIGR5bmFEaW1lbnNpb25dLFxuICAgICAgICBjb2xJbmRleGVzOiBzZWxlY3RlZFN0YXRlUHJvamVjdGlvblswXS5tYXAoKF8sIGkpID0+IGkpLFxuICAgICAgICByb3dJbmRleGVzOiBvYnNJbmRleGVzLFxuICAgICAgICBtYXRyaXg6IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpbWVuc2lvbjogdG90YWxEaW1lbnNpb24sXG4gICAgICAgIG9ic2VydmVkUHJvamVjdGlvbixcbiAgICAgICAgY292YXJpYW5jZShvKSB7XG4gICAgICAgICAgICBjb25zdCB7IHZhcmlhbmNlIH0gPSBvO1xuICAgICAgICAgICAgaWYgKCF2YXJpYW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQ292YXJpYW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YXJpYW5jZS5sZW5ndGggIT09IGJhc2VDb3ZhcmlhbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ3ZhcmlhbmNlIGlzIGRpZmZlcmVuY2Ugc2l6ZSBmcm9tIGJhc2VDb3ZhcmlhbmNlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gKDAsIGNvcnJlbGF0aW9uX3RvX2NvdmFyaWFuY2VfMS5kZWZhdWx0KSh7IGNvcnJlbGF0aW9uOiBiYXNlQ29ycmVsYXRpb24sIHZhcmlhbmNlOiBiYXNlVmFyaWFuY2UubWFwKChiLCBpKSA9PiB2YXJpYW5jZVtpXSAqIGIpIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc2Vuc29yUHJvamVjdGVkO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IHBvbHltb3JwaF9tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeFwiKSk7XG5jb25zdCBjaGVja19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbHMvY2hlY2stbWF0cml4XCIpKTtcbmNvbnN0IGNvcHkgPSBtYXQgPT4gbWF0Lm1hcChhID0+IGEuY29uY2F0KCkpO1xuZnVuY3Rpb24gc2Vuc29yKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHNlbnNvckRpbWVuc2lvbiA9IDEsIHNlbnNvckNvdmFyaWFuY2UgPSAxLCBuU2Vuc29ycyA9IDEgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qgc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZCA9ICgwLCBwb2x5bW9ycGhfbWF0cml4XzEuZGVmYXVsdCkoc2Vuc29yQ292YXJpYW5jZSwgeyBkaW1lbnNpb246IHNlbnNvckRpbWVuc2lvbiB9KTtcbiAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZCwgW3NlbnNvckRpbWVuc2lvbiwgc2Vuc29yRGltZW5zaW9uXSwgJ29ic2VydmF0aW9uLnNlbnNvckNvdmFyaWFuY2UnKTtcbiAgICBjb25zdCBvbmVTZW5zb3JPYnNlcnZlZFByb2plY3Rpb24gPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmlkZW50aXR5KShzZW5zb3JEaW1lbnNpb24pO1xuICAgIGxldCBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBbXTtcbiAgICBjb25zdCBkaW1lbnNpb24gPSBzZW5zb3JEaW1lbnNpb24gKiBuU2Vuc29ycztcbiAgICBjb25zdCBjb25jYXRlbmF0ZWRDb3ZhcmlhbmNlID0gKDAsIHNpbXBsZV9saW5hbGdfMS5pZGVudGl0eSkoZGltZW5zaW9uKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5TZW5zb3JzOyBpKyspIHtcbiAgICAgICAgY29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uID0gY29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uLmNvbmNhdChjb3B5KG9uZVNlbnNvck9ic2VydmVkUHJvamVjdGlvbikpO1xuICAgICAgICBmb3IgKGNvbnN0IFtySW5kZXgsIHJdIG9mIHNlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQuZW50cmllcygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtjSW5kZXgsIGNdIG9mIHIuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgY29uY2F0ZW5hdGVkQ292YXJpYW5jZVtySW5kZXggKyAoaSAqIHNlbnNvckRpbWVuc2lvbildW2NJbmRleCArIChpICogc2Vuc29yRGltZW5zaW9uKV0gPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgIGRpbWVuc2lvbixcbiAgICAgICAgb2JzZXJ2ZWRQcm9qZWN0aW9uOiBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24sXG4gICAgICAgIGNvdmFyaWFuY2U6IGNvbmNhdGVuYXRlZENvdmFyaWFuY2UsXG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBzZW5zb3I7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18yID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5mdW5jdGlvbiBidWlsZFN0YXRlUHJvamVjdGlvbih7IG9ic2VydmF0aW9uLCBkeW5hbWljIH0pIHtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiwgc3RhdGVQcm9qZWN0aW9uIH0gPSBvYnNlcnZhdGlvbjtcbiAgICBjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcbiAgICBjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG4gICAgaWYgKG9ic2VydmVkUHJvamVjdGlvbiAmJiBzdGF0ZVByb2plY3Rpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoJ1lvdSBjYW5ub3QgdXNlIGJvdGggb2JzZXJ2ZWRQcm9qZWN0aW9uIGFuZCBzdGF0ZVByb2plY3Rpb24nKSk7XG4gICAgfVxuICAgIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc3RhdGVQcm9qZWN0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5wYWRXaXRoWmVyb0NvbHMpKG9ic2VydmVkUHJvamVjdGlvbiwgeyBjb2x1bW5zOiBkeW5hbWljRGltZW5zaW9uIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb2JzZXJ2YXRpb246IE9iamVjdC5hc3NpZ24oe30sIG9ic2VydmF0aW9uLCB7XG4gICAgICAgICAgICAgICAgc3RhdGVQcm9qZWN0aW9uLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBkeW5hbWljLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24gJiYgZHluYW1pY0RpbWVuc2lvbiAmJiAhc3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmF0aW9uTWF0cml4ID0gKDAsIHNpbXBsZV9saW5hbGdfMi5pZGVudGl0eSkob2JzZXJ2YXRpb25EaW1lbnNpb24pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb2JzZXJ2YXRpb246IE9iamVjdC5hc3NpZ24oe30sIG9ic2VydmF0aW9uLCB7XG4gICAgICAgICAgICAgICAgc3RhdGVQcm9qZWN0aW9uOiAoMCwgc2ltcGxlX2xpbmFsZ18xLnBhZFdpdGhaZXJvQ29scykob2JzZXJ2YXRpb25NYXRyaXgsIHsgY29sdW1uczogZHluYW1pY0RpbWVuc2lvbiB9KSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZHluYW1pYyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGJ1aWxkU3RhdGVQcm9qZWN0aW9uO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjaGVja0RpbWVuc2lvbnMoeyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9KSB7XG4gICAgY29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGlmICghZHluYW1pY0RpbWVuc2lvbiB8fCAhb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoJ0RpbWVuc2lvbiBpcyBub3Qgc2V0JykpO1xuICAgIH1cbiAgICByZXR1cm4geyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tEaW1lbnNpb25zO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IHBvbHltb3JwaF9tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeFwiKSk7XG5mdW5jdGlvbiBleHRlbmREeW5hbWljSW5pdCh7IG9ic2VydmF0aW9uLCBkeW5hbWljIH0pIHtcbiAgICBpZiAoIWR5bmFtaWMuaW5pdCkge1xuICAgICAgICBjb25zdCBodWdlID0gMWU2O1xuICAgICAgICBjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG4gICAgICAgIGNvbnN0IG1lYW5BcnJheSA9IG5ldyBBcnJheShkeW5hbWljRGltZW5zaW9uKS5maWxsKDApO1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbChodWdlKTtcbiAgICAgICAgY29uc3Qgd2l0aEluaXRPcHRpb25zID0ge1xuICAgICAgICAgICAgb2JzZXJ2YXRpb24sXG4gICAgICAgICAgICBkeW5hbWljOiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7XG4gICAgICAgICAgICAgICAgaW5pdDoge1xuICAgICAgICAgICAgICAgICAgICBtZWFuOiBtZWFuQXJyYXkubWFwKGVsZW1lbnQgPT4gW2VsZW1lbnRdKSxcbiAgICAgICAgICAgICAgICAgICAgY292YXJpYW5jZTogKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShjb3ZhcmlhbmNlQXJyYXkpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gd2l0aEluaXRPcHRpb25zO1xuICAgIH1cbiAgICBpZiAoZHluYW1pYy5pbml0ICYmICFkeW5hbWljLmluaXQubWVhbikge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdkeW5hbWljLmluaXQgc2hvdWxkIGhhdmUgYSBtZWFuIGtleScpKTtcbiAgICB9XG4gICAgZHluYW1pYy5pbml0ID0gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYy5pbml0LCB7XG4gICAgICAgIGNvdmFyaWFuY2U6ICgwLCBwb2x5bW9ycGhfbWF0cml4XzEuZGVmYXVsdCkoZHluYW1pYy5pbml0LmNvdmFyaWFuY2UsIHsgZGltZW5zaW9uOiBkeW5hbWljLmRpbWVuc2lvbiB9KSxcbiAgICB9KTtcbiAgICByZXR1cm4geyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZXh0ZW5kRHluYW1pY0luaXQ7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHNldERpbWVuc2lvbnMoeyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9KSB7XG4gICAgY29uc3QgeyBzdGF0ZVByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IHsgdHJhbnNpdGlvbiB9ID0gZHluYW1pYztcbiAgICBjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG4gICAgY29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG4gICAgaWYgKGR5bmFtaWNEaW1lbnNpb24gJiYgb2JzZXJ2YXRpb25EaW1lbnNpb24gJiYgQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pICYmIChkeW5hbWljRGltZW5zaW9uICE9PSBzdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoIHx8IG9ic2VydmF0aW9uRGltZW5zaW9uICE9PSBzdGF0ZVByb2plY3Rpb24ubGVuZ3RoKSkge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignc3RhdGVQcm9qZWN0aW9uIGRpbWVuc2lvbnMgbm90IG1hdGNoaW5nIHdpdGggb2JzZXJ2YXRpb24gYW5kIGR5bmFtaWMgZGltZW5zaW9ucycpKTtcbiAgICB9XG4gICAgaWYgKGR5bmFtaWNEaW1lbnNpb24gJiYgQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uKSAmJiBkeW5hbWljRGltZW5zaW9uICE9PSB0cmFuc2l0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcigndHJhbnNpdGlvbiBkaW1lbnNpb24gbm90IG1hdGNoaW5nIHdpdGggZHluYW1pYyBkaW1lbnNpb24nKSk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0YXRlUHJvamVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9ic2VydmF0aW9uOiBPYmplY3QuYXNzaWduKHt9LCBvYnNlcnZhdGlvbiwge1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbjogc3RhdGVQcm9qZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZHluYW1pYzogT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbjogc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb2JzZXJ2YXRpb24sXG4gICAgICAgICAgICBkeW5hbWljOiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9uOiB0cmFuc2l0aW9uLmxlbmd0aCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc2V0RGltZW5zaW9ucztcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5jb25zdCBhcnJheV90b19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9hcnJheS10by1tYXRyaXhcIikpO1xuY29uc3QgY2hlY2tfbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvY2hlY2stbWF0cml4XCIpKTtcbmNvbnN0IGNoZWNrX2NvdmFyaWFuY2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9jaGVjay1jb3ZhcmlhbmNlXCIpKTtcbmNsYXNzIFN0YXRlIHtcbiAgICBtZWFuO1xuICAgIGNvdmFyaWFuY2U7XG4gICAgaW5kZXg7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICB0aGlzLm1lYW4gPSBhcmdzLm1lYW47XG4gICAgICAgIHRoaXMuY292YXJpYW5jZSA9IGFyZ3MuY292YXJpYW5jZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGFyZ3MuaW5kZXggfHwgdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjaGVjayhvcHRpb25zKSB7XG4gICAgICAgIFN0YXRlLmNoZWNrKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdGF0aWMgY2hlY2soc3RhdGUsIGFyZ3MgPSB7fSkge1xuICAgICAgICBjb25zdCB7IGRpbWVuc2lvbiwgdGl0bGUsIGVpZ2VuIH0gPSBhcmdzO1xuICAgICAgICBpZiAoIShzdGF0ZSBpbnN0YW5jZW9mIFN0YXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoJ1RoZSBhcmd1bWVudCBpcyBub3QgYSBzdGF0ZSBcXG4nXG4gICAgICAgICAgICAgICAgKyAnVGlwczogbWF5YmUgeW91IGFyZSB1c2luZyAyIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGthbG1hbi1maWx0ZXIgaW4geW91ciBucG0gZGVwcyB0cmVlJykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbWVhbiwgY292YXJpYW5jZSB9ID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IG1lYW5EaW1lbnNpb24gPSBtZWFuLmxlbmd0aDtcbiAgICAgICAgaWYgKHR5cGVvZiAoZGltZW5zaW9uKSA9PT0gJ251bWJlcicgJiYgbWVhbkRpbWVuc2lvbiAhPT0gZGltZW5zaW9uKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBbJHt0aXRsZX1dIFN0YXRlLm1lYW4gJHttZWFufSB3aXRoIGRpbWVuc2lvbiAke21lYW5EaW1lbnNpb259IGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGRpbWVuc2lvbiAoJHtkaW1lbnNpb259KWApKTtcbiAgICAgICAgfVxuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkobWVhbiwgW21lYW5EaW1lbnNpb24sIDFdLCB0aXRsZSA/IHRpdGxlICsgJy5tZWFuJyA6ICdtZWFuJyk7XG4gICAgICAgICgwLCBjaGVja19tYXRyaXhfMS5kZWZhdWx0KShjb3ZhcmlhbmNlLCBbbWVhbkRpbWVuc2lvbiwgbWVhbkRpbWVuc2lvbl0sIHRpdGxlID8gdGl0bGUgKyAnLmNvdmFyaWFuY2UnIDogJ2NvdmFyaWFuY2UnKTtcbiAgICAgICAgKDAsIGNoZWNrX2NvdmFyaWFuY2VfMS5kZWZhdWx0KSh7IGNvdmFyaWFuY2UsIGVpZ2VuIH0sIHRpdGxlID8gdGl0bGUgKyAnLmNvdmFyaWFuY2UnIDogJ2NvdmFyaWFuY2UnKTtcbiAgICB9XG4gICAgc3RhdGljIG1hdE11bCh7IHN0YXRlLCBtYXRyaXggfSkge1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlID0gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKCgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShtYXRyaXgsIHN0YXRlLmNvdmFyaWFuY2UpLCAoMCwgc2ltcGxlX2xpbmFsZ18xLnRyYW5zcG9zZSkobWF0cml4KSk7XG4gICAgICAgIGNvbnN0IG1lYW4gPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkobWF0cml4LCBzdGF0ZS5tZWFuKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZSh7XG4gICAgICAgICAgICBtZWFuLFxuICAgICAgICAgICAgY292YXJpYW5jZSxcbiAgICAgICAgICAgIGluZGV4OiBzdGF0ZS5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN1YlN0YXRlKG9ic0luZGV4ZXMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgU3RhdGUoe1xuICAgICAgICAgICAgbWVhbjogb2JzSW5kZXhlcy5tYXAoaSA9PiB0aGlzLm1lYW5baV0pLFxuICAgICAgICAgICAgY292YXJpYW5jZTogKDAsIHNpbXBsZV9saW5hbGdfMS5zdWJTcXVhcmVNYXRyaXgpKHRoaXMuY292YXJpYW5jZSwgb2JzSW5kZXhlcyksXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgcmF3RGV0YWlsZWRNYWhhbGFub2Jpcyhwb2ludCkge1xuICAgICAgICBjb25zdCBkaWZmID0gKDAsIHNpbXBsZV9saW5hbGdfMS5zdWJ0cmFjdCkodGhpcy5tZWFuLCBwb2ludCk7XG4gICAgICAgIHRoaXMuY2hlY2soKTtcbiAgICAgICAgY29uc3QgY292YXJpYW5jZUludmVydCA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaW52ZXJ0KSh0aGlzLmNvdmFyaWFuY2UpO1xuICAgICAgICBpZiAoY292YXJpYW5jZUludmVydCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jaGVjayh7IGVpZ2VuOiB0cnVlIH0pO1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcihgQ2Fubm90IGludmVydCBjb3ZhcmlhbmNlICR7SlNPTi5zdHJpbmdpZnkodGhpcy5jb3ZhcmlhbmNlKX1gKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlmZlRyYW5zcG9zZWQgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLnRyYW5zcG9zZSkoZGlmZik7XG4gICAgICAgIGNvbnN0IHZhbHVlTWF0cml4ID0gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKCgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShkaWZmVHJhbnNwb3NlZCwgY292YXJpYW5jZUludmVydCksIGRpZmYpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IE1hdGguc3FydCh2YWx1ZU1hdHJpeFswXVswXSk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7IGRpZmYsIGNvdmFyaWFuY2VJbnZlcnQsIHRoaXM6IHRoaXMsIHBvaW50IH0sICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKSgoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoZGlmZlRyYW5zcG9zZWQsIGNvdmFyaWFuY2VJbnZlcnQpLCBkaWZmKSk7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdtYWhhbGFub2JpcyBpcyBOYU4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpZmYsXG4gICAgICAgICAgICBjb3ZhcmlhbmNlSW52ZXJ0LFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGRldGFpbGVkTWFoYWxhbm9iaXMoeyBrZiwgb2JzZXJ2YXRpb24sIG9ic0luZGV4ZXMgfSkge1xuICAgICAgICBpZiAob2JzZXJ2YXRpb24ubGVuZ3RoICE9PSBrZi5vYnNlcnZhdGlvbi5kaW1lbnNpb24pIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoYE1haGFsYW5vYmlzIG9ic2VydmF0aW9uICR7b2JzZXJ2YXRpb259IChkaW1lbnNpb246ICR7b2JzZXJ2YXRpb24ubGVuZ3RofSkgZG9lcyBub3QgbWF0Y2ggd2l0aCBrZiBvYnNlcnZhdGlvbiBkaW1lbnNpb24gKCR7a2Yub2JzZXJ2YXRpb24uZGltZW5zaW9ufSlgKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvcnJlY3RseVNpemVkT2JzZXJ2YXRpb24gPSAoMCwgYXJyYXlfdG9fbWF0cml4XzEuZGVmYXVsdCkoeyBvYnNlcnZhdGlvbiwgZGltZW5zaW9uOiBvYnNlcnZhdGlvbi5sZW5ndGggfSk7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IGtmLmdldFZhbHVlKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwge30pO1xuICAgICAgICBsZXQgcHJvamVjdGVkU3RhdGUgPSBTdGF0ZS5tYXRNdWwoeyBzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb24gfSk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG4gICAgICAgICAgICBwcm9qZWN0ZWRTdGF0ZSA9IHByb2plY3RlZFN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuICAgICAgICAgICAgY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbiA9IG9ic0luZGV4ZXMubWFwKGkgPT4gY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2plY3RlZFN0YXRlLnJhd0RldGFpbGVkTWFoYWxhbm9iaXMoY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbik7XG4gICAgfVxuICAgIG1haGFsYW5vYmlzKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kZXRhaWxlZE1haGFsYW5vYmlzKG9wdGlvbnMpLnZhbHVlO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCdtYWhhbGFub2JpcyBpcyBOYU4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgb2JzQmhhdHRhY2hhcnl5YSh7IGtmLCBzdGF0ZSwgb2JzSW5kZXhlcyB9KSB7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IGtmLmdldFZhbHVlKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwge30pO1xuICAgICAgICBsZXQgcHJvamVjdGVkU2VsZlN0YXRlID0gU3RhdGUubWF0TXVsKHsgc3RhdGU6IHRoaXMsIG1hdHJpeDogc3RhdGVQcm9qZWN0aW9uIH0pO1xuICAgICAgICBsZXQgcHJvamVjdGVkT3RoZXJTdGF0ZSA9IFN0YXRlLm1hdE11bCh7IHN0YXRlLCBtYXRyaXg6IHN0YXRlUHJvamVjdGlvbiB9KTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JzSW5kZXhlcykpIHtcbiAgICAgICAgICAgIHByb2plY3RlZFNlbGZTdGF0ZSA9IHByb2plY3RlZFNlbGZTdGF0ZS5zdWJTdGF0ZShvYnNJbmRleGVzKTtcbiAgICAgICAgICAgIHByb2plY3RlZE90aGVyU3RhdGUgPSBwcm9qZWN0ZWRPdGhlclN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9qZWN0ZWRTZWxmU3RhdGUuYmhhdHRhY2hhcnl5YShwcm9qZWN0ZWRPdGhlclN0YXRlKTtcbiAgICB9XG4gICAgYmhhdHRhY2hhcnl5YShvdGhlclN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgY292YXJpYW5jZSwgbWVhbiB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgYXZlcmFnZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuZWxlbVdpc2UpKFtjb3ZhcmlhbmNlLCBvdGhlclN0YXRlLmNvdmFyaWFuY2VdLCAoW2EsIGJdKSA9PiAoYSArIGIpIC8gMik7XG4gICAgICAgIGxldCBjb3ZhckludmVydGVkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY292YXJJbnZlcnRlZCA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaW52ZXJ0KShhdmVyYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgaW52ZXJ0JywgYXZlcmFnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaWZmID0gKDAsIHNpbXBsZV9saW5hbGdfMS5zdWJ0cmFjdCkobWVhbiwgb3RoZXJTdGF0ZS5tZWFuKTtcbiAgICAgICAgcmV0dXJuICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKSgoMCwgc2ltcGxlX2xpbmFsZ18xLnRyYW5zcG9zZSkoZGlmZiksICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShjb3ZhckludmVydGVkLCBkaWZmKSlbMF1bMF07XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGFycmF5VG9NYXRyaXgoeyBvYnNlcnZhdGlvbiwgZGltZW5zaW9uIH0pIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JzZXJ2YXRpb24pKSB7XG4gICAgICAgIGlmIChkaW1lbnNpb24gPT09IDEgJiYgdHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gW1tvYnNlcnZhdGlvbl1dO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBUaGUgb2JzZXJ2YXRpb24gKCR7b2JzZXJ2YXRpb259KSBzaG91bGQgYmUgYW4gYXJyYXkgKGRpbWVuc2lvbjogJHtkaW1lbnNpb259KWApKTtcbiAgICB9XG4gICAgaWYgKG9ic2VydmF0aW9uLmxlbmd0aCAhPT0gZGltZW5zaW9uKSB7XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBPYnNlcnZhdGlvbiAoJHtvYnNlcnZhdGlvbi5sZW5ndGh9KSBhbmQgZGltZW5zaW9uICgke2RpbWVuc2lvbn0pIG5vdCBtYXRjaGluZ2ApKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAob2JzZXJ2YXRpb25bMF0pID09PSAnbnVtYmVyJyB8fCBvYnNlcnZhdGlvblswXSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YXRpb24ubWFwKGVsZW1lbnQgPT4gW2VsZW1lbnRdKTtcbiAgICB9XG4gICAgcmV0dXJuIG9ic2VydmF0aW9uO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gYXJyYXlUb01hdHJpeDtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkByYXl5YW1oay9tYXRyaXhcIikpO1xuY29uc3QgY2hlY2tfbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY2hlY2stbWF0cml4XCIpKTtcbmNvbnN0IHRvbGVyYW5jZSA9IDAuMTtcbmNvbnN0IGNoZWNrRGVmaW5pdGVQb3NpdGl2ZSA9IGZ1bmN0aW9uIChjb3ZhcmlhbmNlLCB0b2xlcmFuY2UgPSAxZS0xMCkge1xuICAgIGNvbnN0IGNvdmFyaWFuY2VNYXRyaXggPSBuZXcgbWF0cml4XzEuZGVmYXVsdChjb3ZhcmlhbmNlKTtcbiAgICBjb25zdCBlaWdlbnZhbHVlcyA9IGNvdmFyaWFuY2VNYXRyaXguZWlnZW52YWx1ZXMoKTtcbiAgICBmb3IgKGNvbnN0IGVpZ2VudmFsdWUgb2YgZWlnZW52YWx1ZXMpIHtcbiAgICAgICAgaWYgKGVpZ2VudmFsdWUgPD0gLXRvbGVyYW5jZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY292YXJpYW5jZSwgZWlnZW52YWx1ZSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVpZ2VudmFsdWUgc2hvdWxkIGJlIHBvc2l0aXZlIChhY3R1YWw6ICR7ZWlnZW52YWx1ZX0pYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2lzIGRlZmluaXRlIHBvc2l0aXZlJywgY292YXJpYW5jZSk7XG59O1xuY29uc3QgY2hlY2tTeW1ldHJpYyA9IGZ1bmN0aW9uIChjb3ZhcmlhbmNlLCB0aXRsZSA9ICdjaGVja1N5bWV0cmljJykge1xuICAgIGZvciAoY29uc3QgW3Jvd0lkLCByb3ddIG9mIGNvdmFyaWFuY2UuZW50cmllcygpKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2NvbElkLCBpdGVtXSBvZiByb3cuZW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAocm93SWQgPT09IGNvbElkICYmIGl0ZW0gPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIFZhcmlhbmNlWyR7Y29sSWR9XSBzaG91bGQgYmUgcG9zaXRpdmUgKGFjdHVhbDogJHtpdGVtfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKGl0ZW0pID4gTWF0aC5zcXJ0KGNvdmFyaWFuY2Vbcm93SWRdW3Jvd0lkXSAqIGNvdmFyaWFuY2VbY29sSWRdW2NvbElkXSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb3ZhcmlhbmNlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gQ292YXJpYW5jZVske3Jvd0lkfV1bJHtjb2xJZH1dIHNob3VsZCB2ZXJpZnkgQ2F1Y2h5IFNjaHdhcnogSW5lcXVhbGl0eSBgXG4gICAgICAgICAgICAgICAgICAgICsgYChleHBlY3RlZDogfHh8IDw9IHNxcnQoJHtjb3ZhcmlhbmNlW3Jvd0lkXVtyb3dJZF19ICogJHtjb3ZhcmlhbmNlW2NvbElkXVtjb2xJZF19KWBcbiAgICAgICAgICAgICAgICAgICAgKyBgIGFjdHVhbDogJHtpdGVtfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKGl0ZW0gLSBjb3ZhcmlhbmNlW2NvbElkXVtyb3dJZF0pID4gdG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIENvdmFyaWFuY2VbJHtyb3dJZH1dWyR7Y29sSWR9XSBzaG91bGQgZXF1YWwgQ292YXJpYW5jZVske2NvbElkfV1bJHtyb3dJZH1dIGBcbiAgICAgICAgICAgICAgICAgICAgKyBgIChhY3R1YWwgZGlmZjogJHtNYXRoLmFicyhpdGVtIC0gY292YXJpYW5jZVtjb2xJZF1bcm93SWRdKX0pICA9ICR7aXRlbX0gLSAke2NvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXX1cXG5gXG4gICAgICAgICAgICAgICAgICAgICsgYCR7Y292YXJpYW5jZS5qb2luKCdcXG4nKX0gaXMgaW52YWxpZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmZ1bmN0aW9uIGNoZWNrQ292YXJpYW5jZShhcmdzLCBfdGl0bGUpIHtcbiAgICBjb25zdCB7IGNvdmFyaWFuY2UsIGVpZ2VuID0gZmFsc2UgfSA9IGFyZ3M7XG4gICAgKDAsIGNoZWNrX21hdHJpeF8xLmRlZmF1bHQpKGNvdmFyaWFuY2UpO1xuICAgIGNoZWNrU3ltZXRyaWMoY292YXJpYW5jZSk7XG4gICAgaWYgKGVpZ2VuKSB7XG4gICAgICAgIGNoZWNrRGVmaW5pdGVQb3NpdGl2ZShjb3ZhcmlhbmNlKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjaGVja0NvdmFyaWFuY2U7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNoZWNrX3NoYXBlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY2hlY2stc2hhcGVcIikpO1xuZnVuY3Rpb24gY2hlY2tNYXRyaXgobWF0cml4LCBzaGFwZSwgdGl0bGUgPSAnY2hlY2tNYXRyaXgnKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG1hdHJpeCkpIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYFske3RpdGxlfV0gc2hvdWxkIGJlIGEgMi1sZXZlbCBhcnJheSBtYXRyaXggYW5kIGlzICR7bWF0cml4fWApKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByb3cgb2YgbWF0cml4KSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyb3cpKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgWyR7dGl0bGV9XSAxLWxldmVsIGFycmF5IHNob3VsZCBiZSBhIG1hdHJpeCAke0pTT04uc3RyaW5naWZ5KG1hdHJpeCl9YCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtYXRyaXgucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkuc29tZShhID0+IE51bWJlci5pc05hTihhKSkpIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBNYXRyaXggc2hvdWxkIG5vdCBoYXZlIGEgTmFOXFxuSW4gOiBcXG5gXG4gICAgICAgICAgICArIG1hdHJpeC5qb2luKCdcXG4nKSkpO1xuICAgIH1cbiAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgKDAsIGNoZWNrX3NoYXBlXzEuZGVmYXVsdCkobWF0cml4LCBzaGFwZSwgdGl0bGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNoZWNrTWF0cml4O1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjaGVja1NoYXBlKG1hdHJpeCwgc2hhcGUsIHRpdGxlID0gJ2NoZWNrU2hhcGUnKSB7XG4gICAgaWYgKG1hdHJpeC5sZW5ndGggIT09IHNoYXBlWzBdKSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoYFske3RpdGxlfV0gZXhwZWN0ZWQgc2l6ZSAoJHtzaGFwZVswXX0pIGFuZCBsZW5ndGggKCR7bWF0cml4Lmxlbmd0aH0pIGRvZXMgbm90IG1hdGNoYCkpO1xuICAgIH1cbiAgICBpZiAoc2hhcGUubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gbWF0cml4LmZvckVhY2gobSA9PiBjaGVja1NoYXBlKG0sIHNoYXBlLnNsaWNlKDEpLCB0aXRsZSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNoZWNrU2hhcGU7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNoZWNrX2NvdmFyaWFuY2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jaGVjay1jb3ZhcmlhbmNlXCIpKTtcbmZ1bmN0aW9uIGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlKHsgY29ycmVsYXRpb24sIHZhcmlhbmNlIH0pIHtcbiAgICAoMCwgY2hlY2tfY292YXJpYW5jZV8xLmRlZmF1bHQpKHsgY292YXJpYW5jZTogY29ycmVsYXRpb24gfSk7XG4gICAgcmV0dXJuIGNvcnJlbGF0aW9uLm1hcCgoYywgcm93SW5kZXgpID0+IGMubWFwKChhLCBjb2xJbmRleCkgPT4gYSAqIE1hdGguc3FydCh2YXJpYW5jZVtjb2xJbmRleF0gKiB2YXJpYW5jZVtyb3dJbmRleF0pKSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb3JyZWxhdGlvblRvQ292YXJpYW5jZTtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hlY2tfY292YXJpYW5jZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NoZWNrLWNvdmFyaWFuY2VcIikpO1xuZnVuY3Rpb24gY292YXJpYW5jZVRvQ29ycmVsYXRpb24oY292YXJpYW5jZSkge1xuICAgICgwLCBjaGVja19jb3ZhcmlhbmNlXzEuZGVmYXVsdCkoeyBjb3ZhcmlhbmNlIH0pO1xuICAgIGNvbnN0IHZhcmlhbmNlID0gY292YXJpYW5jZS5tYXAoKF8sIGkpID0+IGNvdmFyaWFuY2VbaV1baV0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHZhcmlhbmNlLFxuICAgICAgICBjb3JyZWxhdGlvbjogY292YXJpYW5jZS5tYXAoKGMsIHJvd0luZGV4KSA9PiBjLm1hcCgoYSwgY29sSW5kZXgpID0+IGEgLyBNYXRoLnNxcnQodmFyaWFuY2VbY29sSW5kZXhdICogdmFyaWFuY2Vbcm93SW5kZXhdKSkpLFxuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdW5pcV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3VuaXFcIikpO1xuY29uc3QgbGltaXQgPSAxMDA7XG5mdW5jdGlvbiBkZWVwQXNzaWduSW50ZXJuYWwoYXJncywgc3RlcCkge1xuICAgIGlmIChzdGVwID4gbGltaXQpIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcihgSW4gZGVlcEFzc2lnbiwgbnVtYmVyIG9mIHJlY3Vyc2l2ZSBjYWxsICgke3N0ZXB9KSByZWFjaGVkIGxpbWl0ICgke2xpbWl0fSksIGRlZXBBc3NpZ24gaXMgbm90IHdvcmtpbmcgb24gIHNlbGYtcmVmZXJlbmNpbmcgb2JqZWN0c2ApKTtcbiAgICB9XG4gICAgY29uc3QgZmlsdGVyQXJndW1lbnRzID0gYXJncy5maWx0ZXIoYXJnID0+IChhcmcpICE9PSB1bmRlZmluZWQgJiYgYXJnICE9PSBudWxsKTtcbiAgICBjb25zdCBsYXN0QXJndW1lbnQgPSBmaWx0ZXJBcmd1bWVudHNbZmlsdGVyQXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChmaWx0ZXJBcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJBcmd1bWVudHNbMF07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgKGxhc3RBcmd1bWVudCkgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkobGFzdEFyZ3VtZW50KSkge1xuICAgICAgICByZXR1cm4gbGFzdEFyZ3VtZW50O1xuICAgIH1cbiAgICBpZiAoZmlsdGVyQXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3Qgb2JqZWN0c0FyZ3VtZW50cyA9IGZpbHRlckFyZ3VtZW50cy5maWx0ZXIoYXJnID0+IHR5cGVvZiAoYXJnKSA9PT0gJ29iamVjdCcpO1xuICAgIGxldCBrZXlzID0gW107XG4gICAgZm9yIChjb25zdCBhcmcgb2Ygb2JqZWN0c0FyZ3VtZW50cykge1xuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmtleXMoYXJnKSk7XG4gICAgfVxuICAgIGNvbnN0IHVuaXFLZXlzID0gKDAsIHVuaXFfMS5kZWZhdWx0KShrZXlzKTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB1bmlxS2V5cykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBvYmplY3RzQXJndW1lbnRzLm1hcChhcmcgPT4gYXJnW2tleV0pO1xuICAgICAgICByZXN1bHRba2V5XSA9IGRlZXBBc3NpZ25JbnRlcm5hbCh2YWx1ZXMsIHN0ZXAgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbjtcbmZ1bmN0aW9uIGRlZXBBc3NpZ24oLi4uYXJncykgeyByZXR1cm4gZGVlcEFzc2lnbkludGVybmFsKGFyZ3MsIDApOyB9XG5leHBvcnRzLmRlZmF1bHQgPSBkZWVwQXNzaWduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBnZXRDb3ZhcmlhbmNlKHsgbWVhc3VyZXMsIGF2ZXJhZ2VzIH0pIHtcbiAgICBjb25zdCBsID0gbWVhc3VyZXMubGVuZ3RoO1xuICAgIGNvbnN0IG4gPSBtZWFzdXJlc1swXS5sZW5ndGg7XG4gICAgaWYgKGwgPT09IDApIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignQ2Fubm90IGZpbmQgY292YXJpYW5jZSBmb3IgZW1wdHkgc2FtcGxlJykpO1xuICAgIH1cbiAgICByZXR1cm4gKG5ldyBBcnJheShuKS5maWxsKDEpKS5tYXAoKF8sIHJvd0luZGV4KSA9PiAobmV3IEFycmF5KG4pLmZpbGwoMSkpLm1hcCgoXywgY29sSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RkcyA9IG1lYXN1cmVzLm1hcCgobSwgaSkgPT4gKG1bcm93SW5kZXhdIC0gYXZlcmFnZXNbaV1bcm93SW5kZXhdKSAqIChtW2NvbEluZGV4XSAtIGF2ZXJhZ2VzW2ldW2NvbEluZGV4XSkpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBzdGRzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpIC8gbDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcigncmVzdWx0IGlzIE5hTicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGdldENvdmFyaWFuY2U7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuY29uc3QgY2hlY2tfbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY2hlY2stbWF0cml4XCIpKTtcbmZ1bmN0aW9uIHBvbHltb3JwaE1hdHJpeChjb3YsIG9wdHMgPSB7fSkge1xuICAgIGNvbnN0IHsgZGltZW5zaW9uLCB0aXRsZSA9ICdwb2x5bW9ycGgnIH0gPSBvcHRzO1xuICAgIGlmICh0eXBlb2YgKGNvdikgPT09ICdudW1iZXInIHx8IEFycmF5LmlzQXJyYXkoY292KSkge1xuICAgICAgICBpZiAodHlwZW9mIChjb3YpID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShuZXcgQXJyYXkoZGltZW5zaW9uKS5maWxsKGNvdikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoQXJyYXkuaXNBcnJheShjb3YpKSAmJiAoQXJyYXkuaXNBcnJheShjb3ZbMF0pKSkge1xuICAgICAgICAgICAgbGV0IHNoYXBlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGltZW5zaW9uKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBzaGFwZSA9IFtkaW1lbnNpb24sIGRpbWVuc2lvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoY292LCBzaGFwZSwgdGl0bGUpO1xuICAgICAgICAgICAgcmV0dXJuIGNvdjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKEFycmF5LmlzQXJyYXkoY292KSkgJiYgKHR5cGVvZiAoY292WzBdKSA9PT0gJ251bWJlcicpKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShjb3YpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3Y7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBwb2x5bW9ycGhNYXRyaXg7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuZnVuY3Rpb24gcHJvamVjdE9ic2VydmF0aW9uKHsgb2JzZXJ2YXRpb24sIG9ic0luZGV4ZXMsIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLCBpbnZlcnRTZWxlY3RlZFN0YXRlUHJvamVjdGlvbiB9KSB7XG4gICAgaWYgKCFvYnNlcnZhdGlvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBvYnNlcnZhdGlvbi5vYnNlcnZhdGlvbiB8fCBvYnNlcnZhdGlvbjtcbiAgICBjb25zdCB2ZWMgPSBvYnNJbmRleGVzLm1hcChpID0+IHtcbiAgICAgICAgaWYgKCh2YWx1ZVtpXSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYG9ic0luZGV4ZXMgKCR7b2JzSW5kZXhlc30pIGlzIG5vdCBtYXRjaGluZyB3aXRoIG9ic2VydmF0aW9uICgke29ic2VydmF0aW9ufSlgKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt2YWx1ZVtpXV07XG4gICAgfSk7XG4gICAgY29uc3QgaW52ZXJzZSA9IGludmVydFNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uIHx8ICgwLCBzaW1wbGVfbGluYWxnXzEuaW52ZXJ0KShzZWxlY3RlZFN0YXRlUHJvamVjdGlvbik7XG4gICAgaWYgKGludmVyc2UgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24gaXMgbm90IGludmVydGlibGUsIHBsZWFzZSBwcm92aWRlIGludmVydFNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uJykpO1xuICAgIH1cbiAgICBjb25zdCBvdXQgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoaW52ZXJzZSwgdmVjKTtcbiAgICByZXR1cm4gb3V0XG4gICAgICAgIC5tYXAodiA9PiB2WzBdKVxuICAgICAgICAubWFwKHYgPT4ge1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHYpKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignTmFOIGluIHByb2plY3Rpb24nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBwcm9qZWN0T2JzZXJ2YXRpb247XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHRvRnVuY3Rpb24oYXJyYXksIHsgbGFiZWwgPSBcIlwiIH0gPSB7fSkge1xuICAgIGlmICh0eXBlb2YgKGFycmF5KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHRocm93IChuZXcgRXJyb3IoYCR7bGFiZWwgPT09IG51bGwgPyAnJyA6IGxhYmVsICsgJyA6ICd9T25seSBhcnJheXMgYW5kIGZ1bmN0aW9ucyBhcmUgYXV0aG9yaXplZCAoZ290OiBcIiR7YXJyYXl9XCIpYCkpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdG9GdW5jdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdW5pcShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHVuaXE7XG47XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==