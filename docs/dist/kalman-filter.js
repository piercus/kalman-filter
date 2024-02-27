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
    return str.replaceAll(/[A-Z]/g, m => '-' + m.toLowerCase());
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
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ "./lib/types/TypeAssert.ts"));
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
        previousCorrected ||= this.getInitState();
        const getValueOptions = { previousCorrected, index, ...options };
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
    predictMeanWithoutControl(args) {
        const { opts, transition } = args;
        if (this.dynamic.fn) {
            return this.dynamic.fn(opts);
        }
        const { previousCorrected } = opts;
        return (0, simple_linalg_1.matMul)(transition, previousCorrected.mean);
    }
    predict(options = {}) {
        let { previousCorrected, index } = options;
        previousCorrected ||= this.getInitState();
        if (typeof (index) !== 'number' && typeof (previousCorrected.index) === 'number') {
            index = previousCorrected.index + 1;
        }
        state_1.default.check(previousCorrected, { dimension: this.dynamic.dimension });
        const getValueOptions = {
            ...options,
            previousCorrected,
            index,
        };
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
        const getValueOptions = {
            index: predicted.index,
            ...options,
        };
        TypeAssert_1.default.assertIsArray2DOrFnc(this.observation.stateProjection, 'CoreKalmanFilter.getGain');
        stateProjection ||= this.getValue(this.observation.stateProjection, getValueOptions);
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
            TypeAssert_1.default.assertIsArray2D(this.observation.stateProjection, 'CoreKalmanFilter.getCorrectedCovariance');
            const getValueOptions = {
                index: predicted.index,
                ...options,
            };
            stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
        }
        optimalKalmanGain ||= this.getGain({ stateProjection, ...options });
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
        const getValueOptions = {
            observation,
            predicted,
            index: predicted.index,
            ...options,
        };
        TypeAssert_1.default.assertIsArray2DOrFnc(this.observation.stateProjection, 'CoreKalmanFilter.correct');
        const stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
        const optimalKalmanGain = this.getGain({
            predicted,
            stateProjection,
            ...options,
        });
        const innovation = (0, simple_linalg_1.subtract)(observation, this.getPredictedObservation({ stateProjection, opts: getValueOptions }));
        const mean = (0, simple_linalg_1.add)(predicted.mean, (0, simple_linalg_1.matMul)(optimalKalmanGain, innovation));
        if (Number.isNaN(mean[0][0])) {
            console.log({ optimalKalmanGain, innovation, predicted });
            throw (new TypeError('Mean is NaN after correction'));
        }
        const covariance = this.getCorrectedCovariance({
            predicted,
            optimalKalmanGain,
            stateProjection,
            ...options,
        });
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
                const options2 = {
                    ...options,
                    previousCorrected: previousCorrected.subState(dynamicIndexes),
                };
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
                const options2 = {
                    ...options,
                    previousCorrected: previousCorrected.subState(dynamicIndexes),
                };
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
    return {
        ...dynamic, dimension, transition, covariance,
    };
}
exports["default"] = constantAcceleration;


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
    init ||= {
        mean: new Array(obsDynaIndexes.length).fill(0).map(() => [0]),
        covariance: (0, simple_linalg_1.diag)(new Array(obsDynaIndexes.length).fill(huge)),
        index: -1,
    };
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
    covariance ||= (0, simple_linalg_1.identity)(dimension);
    return {
        ...dynamic, dimension, transition, covariance,
    };
}
exports["default"] = constantPosition;


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
    return {
        ...dynamic, dimension, transition, covariance,
    };
}
exports["default"] = constantSpeed;


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
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ "./lib/types/TypeAssert.ts"));
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
    TypeAssert_1.default.assertNotArray(observation, 'modelsParametersToCoreOptions: observation');
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
        super({ ...options, ...coreOptions });
    }
    correct(options) {
        const coreObservation = (0, array_to_matrix_1.default)({ observation: options.observation, dimension: this.observation.dimension });
        return super.correct({
            ...options,
            observation: coreObservation,
        });
    }
    filter(options) {
        const predicted = super.predict(options);
        return this.correct({
            ...options,
            predicted,
        });
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
    if (typeof (registeredObservationModels[observation.name]) !== 'function') {
        throw (new TypeError(`The provided observation model name (${observation.name}) is not registered`));
    }
    return registeredObservationModels[observation.name](observation);
}
exports.buildObservation = buildObservation;
function buildDynamic(dynamic, observation) {
    if (typeof (registeredDynamicModels[dynamic.name]) !== 'function') {
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
    const { dimension, observedProjection, covariance: baseCovariance } = (0, model_collection_1.buildObservation)({ ...options, name: 'sensor' });
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
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ "./lib/types/TypeAssert.ts"));
const copy = (mat) => mat.map(a => a.concat());
function sensor(options) {
    const { sensorDimension = 1, sensorCovariance = 1, nSensors = 1 } = options;
    const sensorCovarianceFormatted = (0, polymorph_matrix_1.default)(sensorCovariance, { dimension: sensorDimension });
    if (TypeAssert_1.default.isFunction(sensorCovarianceFormatted)) {
        throw new TypeError('sensorCovarianceFormatted can not be a function here');
    }
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
    return {
        ...options,
        dimension,
        observedProjection: concatenatedObservedProjection,
        covariance: concatenatedCovariance,
    };
}
exports["default"] = sensor;


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
function buildStateProjection(args) {
    const { observation, dynamic } = args;
    const { observedProjection, stateProjection } = observation;
    const observationDimension = observation.dimension;
    const dynamicDimension = dynamic.dimension;
    if (observedProjection && stateProjection) {
        throw (new TypeError('You cannot use both observedProjection and stateProjection'));
    }
    if (observedProjection) {
        const stateProjection = (0, simple_linalg_1.padWithZeroCols)(observedProjection, { columns: dynamicDimension });
        return {
            observation: {
                ...observation,
                stateProjection,
            },
            dynamic,
        };
    }
    if (observationDimension && dynamicDimension && !stateProjection) {
        const observationMatrix = (0, simple_linalg_2.identity)(observationDimension);
        return {
            observation: {
                ...observation,
                stateProjection: (0, simple_linalg_1.padWithZeroCols)(observationMatrix, { columns: dynamicDimension }),
            },
            dynamic,
        };
    }
    return { observation, dynamic };
}
exports["default"] = buildStateProjection;


/***/ }),

/***/ "./lib/setup/check-dimensions.ts":
/*!***************************************!*\
  !*** ./lib/setup/check-dimensions.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function checkDimensions(args) {
    const { observation, dynamic } = args;
    const dynamicDimension = dynamic.dimension;
    const observationDimension = observation.dimension;
    if (!dynamicDimension || !observationDimension) {
        throw (new TypeError('Dimension is not set'));
    }
    return { observation, dynamic };
}
exports["default"] = checkDimensions;


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
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ "./lib/types/TypeAssert.ts"));
function extendDynamicInit(args) {
    const { observation, dynamic } = args;
    if (!dynamic.init) {
        const huge = 1e6;
        const dynamicDimension = dynamic.dimension;
        const meanArray = new Array(dynamicDimension).fill(0);
        const covarianceArray = new Array(dynamicDimension).fill(huge);
        const withInitOptions = {
            observation,
            dynamic: {
                ...dynamic,
                init: {
                    mean: meanArray.map(element => [element]),
                    covariance: (0, simple_linalg_1.diag)(covarianceArray),
                    index: -1,
                },
            },
        };
        return withInitOptions;
    }
    if (dynamic.init && !dynamic.init.mean) {
        throw (new Error('dynamic.init should have a mean key'));
    }
    const covariance = (0, polymorph_matrix_1.default)(dynamic.init.covariance, { dimension: dynamic.dimension });
    if (TypeAssert_1.default.isFunction(covariance)) {
        throw new TypeError('covariance can not be a function');
    }
    dynamic.init = {
        ...dynamic.init,
        covariance,
    };
    return { observation, dynamic: dynamic };
}
exports["default"] = extendDynamicInit;


/***/ }),

/***/ "./lib/setup/set-dimensions.ts":
/*!*************************************!*\
  !*** ./lib/setup/set-dimensions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function setDimensions(args) {
    const { observation, dynamic } = args;
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
            observation: {
                ...observation,
                dimension: stateProjection.length,
            },
            dynamic: {
                ...dynamic,
                dimension: stateProjection[0].length,
            },
        };
    }
    if (Array.isArray(transition)) {
        return {
            observation,
            dynamic: {
                ...dynamic,
                dimension: transition.length,
            },
        };
    }
    return { observation, dynamic: dynamic };
}
exports["default"] = setDimensions;


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
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ "./lib/types/TypeAssert.ts"));
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
    static matMul(args) {
        const { state, matrix } = args;
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
            const debugValue = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(diffTransposed, covarianceInvert), diff);
            console.log({
                diff, covarianceInvert, this: this, point,
            }, debugValue);
            throw (new Error('mahalanobis is NaN'));
        }
        return {
            diff,
            covarianceInvert,
            value,
        };
    }
    detailedMahalanobis(args) {
        const { kf, observation, obsIndexes } = args;
        if (observation.length !== kf.observation.dimension) {
            throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
        }
        let correctlySizedObservation = (0, array_to_matrix_1.default)({ observation, dimension: observation.length });
        TypeAssert_1.default.assertIsArray2D(kf.observation.stateProjection, 'State.detailedMahalanobis');
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
    obsBhattacharyya(options) {
        const { kf, state, obsIndexes } = options;
        TypeAssert_1.default.assertIsArray2D(kf.observation.stateProjection, 'State.obsBhattacharyya');
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

/***/ "./lib/types/TypeAssert.ts":
/*!*********************************!*\
  !*** ./lib/types/TypeAssert.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function debugValue(value) {
    if (value === undefined) {
        return 'undefined';
    }
    let asStirng = '';
    asStirng = typeof (value) === 'function' ? value.toString() : JSON.stringify(value);
    if (asStirng.length < 100) {
        return asStirng;
    }
    return asStirng.slice(0, 97) + '...';
}
class TypeAssert {
    constructor() {
        throw new Error('do not constuct me');
    }
    dummy() { }
    static assertNotArray(arg, name = 'parameter') {
        if (Array.isArray(arg)) {
            throw new TypeError(`E001 ${name} cannot be an array. current value is ${debugValue(arg)}.`);
        }
    }
    static assertIsArray2D(arg, name = 'parameter') {
        if (!Array.isArray(arg)) {
            throw new TypeError(`E002 ${name} is not an array. current value is ${debugValue(arg)}.`);
        }
        if (arg.length === 0) {
            return;
        }
        if (!Array.isArray(arg[0])) {
            throw new TypeError(`E003 ${name} must be an array of array. current value is ${debugValue(arg)}.`);
        }
    }
    static assertIsArray2DOrFnc(arg, name = 'parameter') {
        if (typeof (arg) === 'function') {
            return;
        }
        TypeAssert.assertIsArray2D(arg, name);
    }
    static assertIsNumbersArray(arg, name = 'parameter') {
        if (typeof arg === 'number') {
            return;
        }
        if (!TypeAssert.isArray(arg)) {
            throw new TypeError(`E004 ${name} is not an array. current value is ${debugValue(arg)}.`);
        }
        if (arg.length === 0) {
            return;
        }
        if (typeof arg[0] === 'number') {
            return;
        }
        if (!TypeAssert.isArray(arg[0])) {
            throw new TypeError(`E005 ${name} is not an array of array. current value is ${debugValue(arg)}.`);
        }
        if (typeof (arg[0][0]) !== 'number') {
            throw new TypeError(`E006 ${name} is not an array of array of number. current value is ${debugValue(arg)}.`);
        }
    }
    static isArray2D(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        return (Array.isArray(obj[0]));
    }
    static isArray1D(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        return (typeof (obj[0]) === 'number');
    }
    static isArray(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        return true;
    }
    static isFunction(arg) {
        if (typeof (arg) === 'function') {
            return true;
        }
        return false;
    }
}
exports["default"] = TypeAssert;


/***/ }),

/***/ "./lib/utils/array-to-matrix.ts":
/*!**************************************!*\
  !*** ./lib/utils/array-to-matrix.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function arrayToMatrix(args) {
    const { observation, dimension } = args;
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
    const lastArgument = filterArguments.at(-1);
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
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ "./lib/types/TypeAssert.ts"));
function polymorphMatrix(cov, opts = {}) {
    const { dimension, title = 'polymorph' } = opts;
    if (typeof (cov) === 'number' || Array.isArray(cov)) {
        if (typeof (cov) === 'number' && typeof (dimension) === 'number') {
            return (0, simple_linalg_1.diag)(new Array(dimension).fill(cov));
        }
        if (TypeAssert_1.default.isArray2D(cov)) {
            let shape;
            if (typeof (dimension) === 'number') {
                shape = [dimension, dimension];
            }
            (0, check_matrix_1.default)(cov, shape, title);
            return cov;
        }
        if (TypeAssert_1.default.isArray1D(cov)) {
            return (0, simple_linalg_1.diag)(cov);
        }
    }
    return cov;
}
exports["default"] = polymorphMatrix;


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


/***/ }),

/***/ "./lib/utils/to-function.ts":
/*!**********************************!*\
  !*** ./lib/utils/to-function.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function toFunction(array, { label = '' } = {}) {
    if (typeof (array) === 'function') {
        return array;
    }
    if (Array.isArray(array)) {
        return array;
    }
    throw (new Error(`${label === null ? '' : label + ' : '}Only arrays and functions are authorized (got: "${array}")`));
}
exports["default"] = toFunction;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FsbWFuLWZpbHRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixZQUFZLFVBQVU7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1phOztBQUViO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYjtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ2hCYTs7QUFFYjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWI7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ2ZhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNsQmE7O0FBRWI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNkYTs7QUFFYjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDNUJhOztBQUViO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNsQmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQy9DYTs7QUFFYjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDZmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLFlBQVksVUFBVTtBQUN0QixZQUFZLFVBQVU7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDbENhOztBQUViO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUN0QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLFlBQVksVUFBVTtBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDcEJhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixZQUFZLG1CQUFtQjtBQUMvQixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDeENhOztBQUViO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDbEJhOztBQUViO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDaEJhOztBQUViO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ2hEYTs7QUFFYix3QkFBd0IsMkJBQTJCLDJFQUEyRSxrQ0FBa0Msd0JBQXdCLE9BQU8sa0NBQWtDLG1JQUFtSTs7QUFFcFc7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQixZQUFZLFNBQVM7QUFDckIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixtQkFBTyxDQUFDLHdIQUFnQjtBQUNwRCxpQ0FBaUMsbUJBQU8sQ0FBQyxrSUFBcUI7QUFDOUQsK0JBQStCLG1CQUFPLENBQUMsOEhBQW1CO0FBQzFELGdDQUFnQyxtQkFBTyxDQUFDLGdJQUFvQjtBQUM1RCw2QkFBNkIsbUJBQU8sQ0FBQywwSEFBaUI7QUFDdEQsZ0JBQWdCLG1CQUFPLENBQUMsb0hBQWM7QUFDdEMsa0JBQWtCLG1CQUFPLENBQUMsd0hBQWdCO0FBQzFDLG9CQUFvQixtQkFBTyxDQUFDLDRIQUFrQjtBQUM5QyxrQkFBa0IsbUJBQU8sQ0FBQyx3SEFBZ0I7QUFDMUMsY0FBYyxtQkFBTyxDQUFDLGdIQUFZO0FBQ2xDLG1CQUFtQixtQkFBTyxDQUFDLDBIQUFpQjtBQUM1QyxtQkFBbUIsbUJBQU8sQ0FBQywwSEFBaUI7QUFDNUMsaUJBQWlCLG1CQUFPLENBQUMsc0hBQWU7QUFDeEMsY0FBYyxtQkFBTyxDQUFDLGdIQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyxnSEFBWTtBQUNsQyxjQUFjLG1CQUFPLENBQUMsZ0hBQVk7QUFDbEMsY0FBYyxtQkFBTyxDQUFDLGdIQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyxnSEFBWTtBQUNsQyxjQUFjLG1CQUFPLENBQUMsZ0hBQVk7QUFDbEMsY0FBYyxtQkFBTyxDQUFDLGdIQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyxnSEFBWTtBQUNsQyxjQUFjLG1CQUFPLENBQUMsZ0hBQVk7QUFDbEMsZUFBZSxtQkFBTyxDQUFDLGtIQUFhO0FBQ3BDLGVBQWUsbUJBQU8sQ0FBQyxrSEFBYTtBQUNwQyxlQUFlLG1CQUFPLENBQUMsa0hBQWE7QUFDcEMsZUFBZSxtQkFBTyxDQUFDLGtIQUFhO0FBQ3BDLGVBQWUsbUJBQU8sQ0FBQyxrSEFBYTtBQUNwQyxlQUFlLG1CQUFPLENBQUMsa0hBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZCYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixhQUFhLFVBQVU7QUFDdkI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0IsYUFBYTtBQUMvQix1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFNBQVM7QUFDakM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlDQUFpQyxTQUFTO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFNBQVM7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUN0SmE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDLGVBQWUsbUJBQU8sQ0FBQywyR0FBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxVQUFVO0FBQ3ZCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7O0FBRUEsd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFdBQVc7QUFDbkM7QUFDQTs7QUFFQSw4QkFBOEI7O0FBRTlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixlQUFlO0FBQ3ZDOztBQUVBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3QkFBd0IsV0FBVztBQUNuQyx5QkFBeUIsVUFBVTtBQUNuQzs7QUFFQSwwQkFBMEIsYUFBYTtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IsV0FBVztBQUNuQzs7QUFFQSwwQkFBMEIsZUFBZTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0JBQXdCLFdBQVc7QUFDbkMsMEJBQTBCLFdBQVc7QUFDckM7O0FBRUEsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixXQUFXO0FBQy9CLHFCQUFxQixVQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ2hKYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsWUFBWSxtQkFBTyxDQUFDLHFIQUFrQjs7QUFFdEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIsVUFBVTtBQUNyQzs7QUFFQSwwQkFBMEIsVUFBVTtBQUNwQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3JGYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsWUFBWSxtQkFBTyxDQUFDLHFIQUFrQjs7QUFFdEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQzs7QUFFQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3JGYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLFlBQVk7QUFDaEM7O0FBRUEsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixVQUFVO0FBQ3JDOztBQUVBLDJCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN6R2E7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDLGVBQWUsbUJBQU8sQ0FBQywyR0FBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdERhOztBQUViLGVBQWUsbUJBQU8sQ0FBQywyR0FBYTtBQUNwQztBQUNBO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHFHQUFPO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsMkNBQTJDOztBQUUzQyxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQzs7QUFFbkMsb0JBQW9CLFVBQVU7QUFDOUI7O0FBRUE7QUFDQSx3QkFBd0IsVUFBVTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCQUF5QixXQUFXO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDdkhhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxZQUFZLG1CQUFPLENBQUMscUhBQWtCOztBQUV0QyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFVBQVU7QUFDNUIsb0JBQW9CLFVBQVU7QUFDOUI7O0FBRUEsc0JBQXNCLFVBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ2xFYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ25EYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7O0FDbkRhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQixjQUFjLFNBQVM7QUFDdkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzFDYTs7QUFFYixhQUFhLG1CQUFPLENBQUMscUdBQU87O0FBRTVCLGVBQWUsbUJBQU8sQ0FBQywyR0FBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNUNhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQztBQUNBLGFBQWEsbUJBQU8sQ0FBQyxxR0FBTzs7QUFFNUIsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCO0FBQzdCOztBQUVBOztBQUVBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3JHYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxvSEFBbUI7O0FBRXpDLGFBQWEsbUJBQU8sQ0FBQyxxR0FBTzs7QUFFNUIsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyw0Q0FBNEM7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkI7O0FBRTNCLG9CQUFvQjs7QUFFcEI7O0FBRUEseUJBQXlCLE9BQU87QUFDaEM7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTs7O0FBR1Isc0JBQXNCLFVBQVU7QUFDaEM7QUFDQSxRQUFROzs7QUFHUjs7QUFFQSx1QkFBdUIsV0FBVztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsY0FBYztBQUNoQztBQUNBOztBQUVBLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTs7O0FBR047O0FBRUEscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTs7QUFFQTs7QUFFQSxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0EsTUFBTTs7O0FBR04sb0JBQW9CLFVBQVU7QUFDOUI7QUFDQTs7QUFFQSwwQkFBMEIsVUFBVTtBQUNwQztBQUNBOztBQUVBOztBQUVBLHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07OztBQUdOLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7O0FBRUEsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsVUFBVTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLFlBQVk7QUFDbEM7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDMVVhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxhQUFhLG1CQUFPLENBQUMscUdBQU87O0FBRTVCLGVBQWUsbUJBQU8sQ0FBQywyR0FBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsMEJBQTBCO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDOztBQUVBLHVCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOzs7QUFHSixvQkFBb0IsV0FBVztBQUMvQixzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQy9HYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN2QmE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDLGFBQWEsbUJBQU8sQ0FBQyxxR0FBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUM3RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUM1QmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN2Q2E7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQix3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFVBQVU7QUFDNUIsb0JBQW9CLFVBQVU7QUFDOUI7O0FBRUEsc0JBQXNCLFVBQVU7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkRhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUEsa0JBQWtCLFVBQVU7QUFDNUIsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ2hEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUM5QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixVQUFVO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUMxQ2E7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFNBQVM7QUFDM0Isb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNqRWE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDLGVBQWUsbUJBQU8sQ0FBQywyR0FBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMUNhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNyRGE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLHFHQUFPOztBQUU1QixlQUFlLG1CQUFPLENBQUMsMkhBQXFCOztBQUU1QyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsYUFBYTtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJOzs7QUFHSjtBQUNBOztBQUVBLG1CQUFtQixjQUFjO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qjs7QUFFekIseUJBQXlCO0FBQ3pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ2hIYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsZUFBZTtBQUMxQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ25EYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQy9DYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLFNBQVM7QUFDM0Isb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN2Q2E7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLDJHQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUMxQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFIQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQSxhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDeENhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFVBQVU7QUFDdkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUMvQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEJhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFVBQVU7QUFDNUIsb0JBQW9CLFVBQVU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckVhOztBQUViLGtDQUFrQzs7QUFFbEMsOEJBQThCOztBQUU5QixrREFBa0QsZ0JBQWdCLGdFQUFnRSx3REFBd0QsNkRBQTZELHNEQUFzRDs7QUFFN1MsdUNBQXVDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLG9CQUFvQjs7QUFFeksseUNBQXlDLDBHQUEwRyx3QkFBd0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLE1BQU0sd0JBQXdCLCtCQUErQixhQUFhLHFCQUFxQix1Q0FBdUMsY0FBYyxXQUFXLFlBQVksVUFBVSxNQUFNLG1EQUFtRCxVQUFVLHNCQUFzQjs7QUFFbmYsZ0NBQWdDOztBQUVoQyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNyRGE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsMEdBQTBHLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUVuZixnQ0FBZ0M7O0FBRWhDLHdCQUF3QiwyQkFBMkIsMkVBQTJFLGtDQUFrQyx3QkFBd0IsT0FBTyxrQ0FBa0MsbUlBQW1JOztBQUVwVyxlQUFlLG1CQUFPLENBQUMsMkdBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsZUFBZTtBQUMxQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsYUFBYTtBQUN0Qzs7QUFFQSwyQkFBMkIsYUFBYTtBQUN4QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3RNYTs7QUFFYixrQ0FBa0M7O0FBRWxDLDhCQUE4Qjs7QUFFOUIsa0RBQWtELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Q7O0FBRTdTLHVDQUF1Qyx1REFBdUQsdUNBQXVDLFNBQVMsT0FBTyxvQkFBb0I7O0FBRXpLLHlDQUF5QywwR0FBMEcsd0JBQXdCLGVBQWUsZUFBZSxnQkFBZ0IsWUFBWSxNQUFNLHdCQUF3QiwrQkFBK0IsYUFBYSxxQkFBcUIsdUNBQXVDLGNBQWMsV0FBVyxZQUFZLFVBQVUsTUFBTSxtREFBbUQsVUFBVSxzQkFBc0I7O0FBRW5mLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCLG9CQUFvQixTQUFTO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNoRGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN2QmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLHVIQUFpQjs7QUFFeEMsZUFBZSxtQkFBTyxDQUFDLHVHQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qjs7QUFFekIsOEJBQThCLG1CQUFPLENBQUMsK0lBQTZCO0FBQ25FLG1DQUFtQyxtQkFBTyxDQUFDLHlKQUFrQztBQUM3RSw0QkFBNEIsbUJBQU8sQ0FBQywySUFBMkI7QUFDL0QsK0JBQStCLG1CQUFPLENBQUMsaUpBQThCO0FBQ3JFLHFDQUFxQyxtQkFBTyxDQUFDLDZKQUFvQztBQUNqRixxQ0FBcUMsbUJBQU8sQ0FBQyw2SkFBb0M7QUFDakYsZ0NBQWdDLG1CQUFPLENBQUMsbUpBQStCLEdBQUc7O0FBRTFFLHdCQUF3QixtQkFBTyxDQUFDLHFJQUF3QjtBQUN4RCx1QkFBdUIsbUJBQU8sQ0FBQyxtSUFBdUI7QUFDdEQsK0JBQStCLG1CQUFPLENBQUMsbUpBQStCO0FBQ3RFLDJCQUEyQixtQkFBTyxDQUFDLDJJQUEyQjtBQUM5RCx3QkFBd0IsbUJBQU8sQ0FBQyxxSUFBd0I7QUFDeEQsd0JBQXdCLG1CQUFPLENBQUMscUlBQXdCO0FBQ3hELHdCQUF3QixtQkFBTyxDQUFDLHFJQUF3QjtBQUN4RCx5QkFBeUIsbUJBQU8sQ0FBQyx1SUFBeUIsR0FBRzs7QUFFN0QsYUFBYSxtQkFBTyxDQUFDLG1JQUF1QjtBQUM1QyxpQkFBaUIsbUJBQU8sQ0FBQywySUFBMkI7QUFDcEQsa0JBQWtCLG1CQUFPLENBQUMsNklBQTRCO0FBQ3RELGFBQWEsbUJBQU8sQ0FBQyxtSUFBdUI7QUFDNUMsa0JBQWtCLG1CQUFPLENBQUMsNklBQTRCO0FBQ3RELG1CQUFtQixtQkFBTyxDQUFDLCtJQUE2QixHQUFHOztBQUUzRCxrQkFBa0IsbUJBQU8sQ0FBQyx5SkFBa0M7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsdUpBQWlDO0FBQzFELGVBQWUsbUJBQU8sQ0FBQyxtSkFBK0IsR0FBRzs7QUFFekQsWUFBWSxtQkFBTyxDQUFDLHlJQUEwQjtBQUM5QyxZQUFZLG1CQUFPLENBQUMseUlBQTBCLEdBQUc7O0FBRWpELGVBQWUsbUJBQU8sQ0FBQyw2SEFBb0I7QUFDM0MsZ0JBQWdCLG1CQUFPLENBQUMsK0hBQXFCO0FBQzdDLGNBQWMsbUJBQU8sQ0FBQywySEFBbUI7QUFDekMscUJBQXFCLG1CQUFPLENBQUMseUlBQTBCO0FBQ3ZELGtCQUFrQixtQkFBTyxDQUFDLG1JQUF1QjtBQUNqRCxpQkFBaUIsbUJBQU8sQ0FBQyxpSUFBc0I7QUFDL0MseUJBQXlCLG1CQUFPLENBQUMsaUpBQThCO0FBQy9ELGtCQUFrQixtQkFBTyxDQUFDLG1JQUF1QjtBQUNqRCxpQkFBaUIsbUJBQU8sQ0FBQyxpSUFBc0I7QUFDL0MsYUFBYSxtQkFBTyxDQUFDLHlIQUFrQjtBQUN2QyxtQkFBbUIsbUJBQU8sQ0FBQyxxSUFBd0I7QUFDbkQsY0FBYyxtQkFBTyxDQUFDLDJIQUFtQjtBQUN6QyxtQkFBbUIsbUJBQU8sQ0FBQyxxSUFBd0I7QUFDbkQsMkJBQTJCLG1CQUFPLENBQUMsaUlBQXNCO0FBQ3pELHlCQUF5QixtQkFBTyxDQUFDLDZIQUFvQjtBQUNyRCw0QkFBNEIsbUJBQU8sQ0FBQyxtSUFBdUI7Ozs7Ozs7Ozs7O0FDeEU5Qzs7QUFFYixlQUFlLG1CQUFPLENBQUMsd0dBQVU7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNyQmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLGtIQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUEsa0JBQWtCLFlBQVk7QUFDOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUMxQ2E7O0FBRWI7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDSkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3hNQSw4SUFBMEM7Ozs7Ozs7Ozs7O0FDQTFDLGlCQUFpQixtQkFBTyxDQUFDLHlHQUFhO0FBQ3RDO0FBQ0E7QUFDQSxVQUFVLDJCQUEyQjtBQUNyQyxZQUFZLHdCQUF3QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7O0FDaEJBLG1CQUFtQixtQkFBTyxDQUFDLGdIQUFrQjtBQUM3QyxhQUFhLG1CQUFPLENBQUMsa0dBQVc7O0FBRWhDO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN0QkEsaUJBQWlCLG1CQUFPLENBQUMsMEdBQWU7O0FBRXhDO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsVUFBVTtBQUNyQixhQUFhLFlBQVk7QUFDekI7QUFDQSxxQ0FBcUMscUJBQXFCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzVCQSxjQUFjLG1CQUFPLENBQUMsaUdBQVM7O0FBRS9CO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQjtBQUMxQixVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaUNBQWlDO0FBQzNDLFVBQVUsWUFBWTtBQUN0QixZQUFZLHdCQUF3QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuQkEsY0FBYyxtQkFBTyxDQUFDLG9HQUFZO0FBQ2xDLGtCQUFrQixtQkFBTyxDQUFDLDRHQUFnQjtBQUMxQyxlQUFlLG1CQUFPLENBQUMsMEdBQWU7QUFDdEMsZUFBZSxtQkFBTyxDQUFDLHdHQUFjO0FBQ3JDLFlBQVksbUJBQU8sQ0FBQyxnR0FBVTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsWUFBWTtBQUN2QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3BCQTtBQUNBLE1BQU0sbUJBQU8sQ0FBQyxnR0FBVTtBQUN4QixnQkFBZ0IsbUJBQU8sQ0FBQyxtSEFBa0I7QUFDMUMsZ0JBQWdCLG1CQUFPLENBQUMsbUhBQWtCO0FBQzFDLE9BQU8sbUJBQU8sQ0FBQyxrR0FBVztBQUMxQixZQUFZLG1CQUFPLENBQUMsMkdBQWM7QUFDbEMsYUFBYSxtQkFBTyxDQUFDLDZHQUFlO0FBQ3BDLFdBQVcsbUJBQU8sQ0FBQyw0R0FBZ0I7QUFDbkMsWUFBWSxtQkFBTyxDQUFDLDRHQUFnQjtBQUNwQyxXQUFXLG1CQUFPLENBQUMsMEdBQWU7QUFDbEMsU0FBUyxtQkFBTyxDQUFDLHNHQUFhO0FBQzlCLFlBQVksbUJBQU8sQ0FBQyw4R0FBaUI7QUFDckMsU0FBUyxtQkFBTyxDQUFDLHdHQUFjO0FBQy9CLGlCQUFpQixtQkFBTyxDQUFDLHdIQUFzQjtBQUMvQyxrQkFBa0IsbUJBQU8sQ0FBQyw4SEFBeUI7QUFDbkQsV0FBVyxtQkFBTyxDQUFDLDBHQUFlO0FBQ2xDLGtCQUFrQixtQkFBTyxDQUFDLDRIQUF3QjtBQUNsRCxNQUFNLG1CQUFPLENBQUMsZ0dBQVU7QUFDeEIsUUFBUSxtQkFBTyxDQUFDLG9HQUFZO0FBQzVCLFlBQVksbUJBQU8sQ0FBQyw0R0FBZ0I7QUFDcEMsUUFBUSxtQkFBTyxDQUFDLG9HQUFZO0FBQzVCLE9BQU8sbUJBQU8sQ0FBQyxrR0FBVztBQUMxQixZQUFZLG1CQUFPLENBQUMsOEdBQWlCO0FBQ3JDOzs7Ozs7Ozs7OztBQ3ZCQSxzQkFBc0IsbUJBQU8sQ0FBQywrR0FBZ0I7O0FBRTlDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxvQ0FBb0M7QUFDL0MsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBLFVBQVUsd0JBQXdCO0FBQ2xDLFVBQVUsd0JBQXdCO0FBQ2xDLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQztBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQSxXQUFXLHdCQUF3QjtBQUNuQyxXQUFXLGtCQUFrQjtBQUM3QixXQUFXLGdCQUFnQjtBQUMzQixXQUFXLGdCQUFnQjtBQUMzQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7O0FBRUE7QUFDQSw2Q0FBNkMsV0FBVztBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQSx1QkFBdUIsbUJBQU8sQ0FBQyxxSEFBbUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsVUFBVSx3QkFBd0I7QUFDbEMsVUFBVSxRQUFRO0FBQ2xCLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUM7QUFDQSx5Q0FBeUMsU0FBUyxnQ0FBZ0MsaUJBQWlCO0FBQ25HOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNSQSxpQkFBaUIsbUJBQU8sQ0FBQyx5R0FBYTs7QUFFdEM7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEEsa0JBQWtCLG1CQUFPLENBQUMsMkdBQWM7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDBCQUEwQixHQUFHLCtCQUErQixHQUFHLCtCQUErQixHQUFHLHVCQUF1QixHQUFHLGFBQWEsR0FBRyxxQkFBcUIsR0FBRyxvQkFBb0I7QUFDdkwscUNBQXFDLG1CQUFPLENBQUMseURBQXdCO0FBQ3JFLDBDQUEwQyxtQkFBTyxDQUFDLDZDQUFlO0FBQ2pFLDhDQUE4QyxtQkFBTyxDQUFDLHFEQUFtQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsYUFBYSxtQkFBTyxDQUFDLHlEQUF3QjtBQUM3QyxhQUFhLG1CQUFPLENBQUMsNkNBQWU7QUFDcEMsYUFBYSxtQkFBTyxDQUFDLHFEQUFtQjtBQUN4QyxzQkFBc0IsbUJBQU8sQ0FBQyxtREFBcUI7QUFDbkQsZ0RBQStDLEVBQUUscUNBQXFDLG9EQUFvRCxFQUFDO0FBQzNJLHVCQUF1QixtQkFBTyxDQUFDLGlFQUE0QjtBQUMzRCxpREFBZ0QsRUFBRSxxQ0FBcUMscURBQXFELEVBQUM7QUFDN0ksY0FBYyxtQkFBTyxDQUFDLG1DQUFhO0FBQ25DLHlDQUF3QyxFQUFFLHFDQUFxQyw0Q0FBNEMsRUFBQztBQUM1SCx5QkFBeUIsbUJBQU8sQ0FBQyxxRUFBOEI7QUFDL0QsbURBQWtELEVBQUUscUNBQXFDLHVEQUF1RCxFQUFDO0FBQ2pKLGtDQUFrQyxtQkFBTyxDQUFDLHVGQUF1QztBQUNqRiwyREFBMEQsRUFBRSxxQ0FBcUMsZ0VBQWdFLEVBQUM7QUFDbEssa0NBQWtDLG1CQUFPLENBQUMsdUZBQXVDO0FBQ2pGLDJEQUEwRCxFQUFFLHFDQUFxQyxnRUFBZ0UsRUFBQztBQUNsSyw0QkFBNEIsbUJBQU8sQ0FBQywyRUFBaUM7QUFDckUsc0RBQXFELEVBQUUscUNBQXFDLDBEQUEwRCxFQUFDOzs7Ozs7Ozs7Ozs7QUMvRDFJO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLG1CQUFPLENBQUMsbUdBQWU7QUFDL0MsZ0NBQWdDLG1CQUFPLENBQUMsK0JBQVM7QUFDakQsdUNBQXVDLG1CQUFPLENBQUMseURBQXNCO0FBQ3JFLHFDQUFxQyxtQkFBTyxDQUFDLHFEQUFvQjtBQUNqRTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0NBQStDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0RBQStEO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDJDQUEyQyx1QkFBdUI7QUFDbEU7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxjQUFjLDJCQUEyQjtBQUN6QztBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsY0FBYywyQkFBMkI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsbUNBQW1DO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxtQ0FBbUM7QUFDM0U7QUFDQSxnREFBZ0QseUJBQXlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2QkFBNkI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdEQUFnRDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsNkJBQTZCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlCQUF5QjtBQUN6QywyQ0FBMkMsbUNBQW1DO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxR0FBcUcsd0NBQXdDO0FBQzdJO0FBQ0E7QUFDQSwwQkFBMEIsMENBQTBDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGdEQUFnRCwwQ0FBMEM7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7O0FDdktGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDJCQUEyQixtQkFBTyxDQUFDLHNEQUFxQjtBQUN4RCx1QkFBdUIsU0FBUztBQUNoQyxZQUFZLHFCQUFxQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGlCQUFpQixPQUFPLEVBQUU7QUFDMUQ7QUFDQTtBQUNBLGdCQUFnQiwwQ0FBMEM7QUFDMUQ7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtQ0FBbUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBLHdCQUF3Qiw4QkFBOEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNwR0Y7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLG1CQUFPLENBQUMsbUdBQWU7QUFDL0M7QUFDQTtBQUNBLFlBQVkscUJBQXFCO0FBQ2pDLFlBQVksa0JBQWtCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7O0FDcENGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLG1HQUFlO0FBQy9DO0FBQ0Esb0NBQW9DLHdDQUF3QztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxQkFBcUIsMEJBQTBCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQzdCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBZTtBQUMvQztBQUNBLFVBQVUsWUFBWTtBQUN0QjtBQUNBLFlBQVkscUJBQXFCO0FBQ2pDLFlBQVksa0JBQWtCO0FBQzlCLFVBQVUsYUFBYTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQzFCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBZTtBQUMvQztBQUNBLFlBQVksb0NBQW9DO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBLHVEQUF1RCxxQkFBcUI7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixvQ0FBb0M7QUFDcEQ7QUFDQTtBQUNBLHdDQUF3QyxHQUFHO0FBQzNDO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isb0NBQW9DO0FBQ3BEO0FBQ0E7QUFDQSx3Q0FBd0MsR0FBRztBQUMzQztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbURBQW1EO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUMxREY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLG1CQUFPLENBQUMsbUdBQWU7QUFDL0M7QUFDQTtBQUNBLFlBQVkscUJBQXFCO0FBQ2pDLFlBQVksa0JBQWtCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ2hDRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDhCQUE4QixHQUFHLDRCQUE0QixHQUFHLGdDQUFnQyxHQUFHLG1CQUFtQixHQUFHLDRCQUE0QixHQUFHLHFCQUFxQixHQUFHLHdCQUF3QjtBQUN4TSwwQkFBMEIsbUJBQU8sQ0FBQywrREFBcUI7QUFDdkQsb0RBQW1ELEVBQUUscUNBQXFDLHdEQUF3RCxFQUFDO0FBQ25KLHVCQUF1QixtQkFBTyxDQUFDLHlEQUFrQjtBQUNqRCxpREFBZ0QsRUFBRSxxQ0FBcUMscURBQXFELEVBQUM7QUFDN0ksOEJBQThCLG1CQUFPLENBQUMsdUVBQXlCO0FBQy9ELHdEQUF1RCxFQUFFLHFDQUFxQyw0REFBNEQsRUFBQztBQUMzSixvQkFBb0IsbUJBQU8sQ0FBQyxtREFBZTtBQUMzQywrQ0FBOEMsRUFBRSxxQ0FBcUMsa0RBQWtELEVBQUM7QUFDeEksb0NBQW9DLG1CQUFPLENBQUMsbUZBQStCO0FBQzNFLDREQUEyRCxFQUFFLHFDQUFxQyxrRUFBa0UsRUFBQztBQUNySywrQkFBK0IsbUJBQU8sQ0FBQyx5RUFBMEI7QUFDakUsd0RBQXVELEVBQUUscUNBQXFDLDZEQUE2RCxFQUFDO0FBQzVKLGlDQUFpQyxtQkFBTyxDQUFDLDZFQUE0QjtBQUNyRSwwREFBeUQsRUFBRSxxQ0FBcUMsK0RBQStELEVBQUM7Ozs7Ozs7Ozs7OztBQ25Cbko7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBZTtBQUMvQyxpREFBaUQsbUJBQU8sQ0FBQyx5RUFBMEI7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGVBQWU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGtCQUFrQjtBQUM5QjtBQUNBLDhDQUE4QyxvQkFBb0IsK0JBQStCLFVBQVU7QUFDM0c7QUFDQSxrQ0FBa0MscUJBQXFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0NBQW9DO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRCxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0Isb0NBQW9DO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixxQ0FBcUM7QUFDcEUsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7O0FDckRGO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLG1HQUFlO0FBQy9DLDBDQUEwQyxtQkFBTyxDQUFDLG9FQUE4QjtBQUNoRix5Q0FBeUMsbUJBQU8sQ0FBQyxrRUFBNkI7QUFDOUUsMkNBQTJDLG1CQUFPLENBQUMsc0VBQStCO0FBQ2xGLGlEQUFpRCxtQkFBTyxDQUFDLGtGQUFxQztBQUM5Riw4Q0FBOEMsbUJBQU8sQ0FBQyw0RUFBa0M7QUFDeEYsc0NBQXNDLG1CQUFPLENBQUMsNERBQTBCO0FBQ3hFLHNDQUFzQyxtQkFBTyxDQUFDLDREQUEwQjtBQUN4RSwyQ0FBMkMsbUJBQU8sQ0FBQyxzRUFBK0I7QUFDbEYsZ0NBQWdDLG1CQUFPLENBQUMsK0JBQVM7QUFDakQscUNBQXFDLG1CQUFPLENBQUMscURBQW9CO0FBQ2pFLDZDQUE2QyxtQkFBTyxDQUFDLHlEQUFzQjtBQUMzRSxxQ0FBcUMsbUJBQU8sQ0FBQyxxREFBb0I7QUFDakU7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBVSx1QkFBdUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLHNCQUFzQjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0Esd0hBQXdILHNDQUFzQztBQUM5Siw2R0FBNkcsa0NBQWtDLEtBQUssaUNBQWlDO0FBQ3JMLFNBQVM7QUFDVDtBQUNBLDBHQUEwRyw2QkFBNkI7QUFDdkkseUdBQXlHLDhCQUE4QixLQUFLLDZCQUE2QjtBQUN6SyxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBLGdCQUFnQiw0QkFBNEI7QUFDNUM7QUFDQTtBQUNBLGlFQUFpRSx5RUFBeUU7QUFDMUk7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG1CQUFtQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMENBQTBDLElBQUk7QUFDOUU7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBLDJEQUEyRCxtQkFBbUI7QUFDOUUsYUFBYTtBQUNiO0FBQ0E7QUFDQSwyREFBMkQsV0FBVztBQUN0RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CLElBQUk7QUFDNUMsNERBQTRELFdBQVc7QUFDdkU7QUFDQSwrQkFBK0IsMkJBQTJCO0FBQzFEO0FBQ0EsU0FBUztBQUNULCtCQUErQiw0QkFBNEI7QUFDM0Q7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUN0SkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLEdBQUcsd0JBQXdCLEdBQUcsdUJBQXVCLEdBQUcsMkJBQTJCO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxxRUFBcUUsaUJBQWlCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsNERBQTRELGFBQWE7QUFDekU7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COzs7Ozs7Ozs7Ozs7QUMxQlA7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUIsR0FBRywyQkFBMkIsR0FBRyxjQUFjO0FBQ3RFLGVBQWUsbUJBQU8sQ0FBQyw2Q0FBVTtBQUNqQywwQ0FBeUMsRUFBRSxxQ0FBcUMsNkNBQTZDLEVBQUM7QUFDOUgsOEJBQThCLG1CQUFPLENBQUMsMkVBQXlCO0FBQy9ELHVEQUFzRCxFQUFFLHFDQUFxQyw0REFBNEQsRUFBQztBQUMxSix5QkFBeUIsbUJBQU8sQ0FBQyxpRUFBb0I7QUFDckQsbURBQWtELEVBQUUscUNBQXFDLHVEQUF1RCxFQUFDOzs7Ozs7Ozs7Ozs7QUNYcEk7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLG1CQUFPLENBQUMsbUdBQWU7QUFDL0MsMkJBQTJCLG1CQUFPLENBQUMsc0RBQXFCO0FBQ3hEO0FBQ0EsWUFBWSw0REFBNEQsNkNBQTZDLDRCQUE0QjtBQUNqSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ25CRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLG1HQUFlO0FBQy9DLG9EQUFvRCxtQkFBTyxDQUFDLG9GQUFvQztBQUNoRyxvREFBb0QsbUJBQU8sQ0FBQyxvRkFBb0M7QUFDaEcsMkJBQTJCLHlFQUF5RTtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esc0VBQXNFLGdDQUFnQyxNQUFNLGtCQUFrQjtBQUM5SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0wsWUFBWSx1REFBdUQ7QUFDbkU7QUFDQTtBQUNBLDRDQUE0QyxnQ0FBZ0MsS0FBSyxrQkFBa0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLHFGQUFxRjtBQUMzSjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ3JERjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLG1HQUFlO0FBQy9DLDJDQUEyQyxtQkFBTyxDQUFDLGtFQUEyQjtBQUM5RSx1Q0FBdUMsbUJBQU8sQ0FBQywwREFBdUI7QUFDdEUscUNBQXFDLG1CQUFPLENBQUMsc0RBQXFCO0FBQ2xFO0FBQ0E7QUFDQSxZQUFZLDBEQUEwRDtBQUN0RSwwRkFBMEYsNEJBQTRCO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ3BDRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBZTtBQUMvQyx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBZTtBQUMvQztBQUNBLFlBQVksdUJBQXVCO0FBQ25DLFlBQVksc0NBQXNDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRiwyQkFBMkI7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRiwyQkFBMkI7QUFDdEgsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNsQ0Y7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ1hGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLG1CQUFPLENBQUMsbUdBQWU7QUFDL0MsMkNBQTJDLG1CQUFPLENBQUMsa0VBQTJCO0FBQzlFLHFDQUFxQyxtQkFBTyxDQUFDLHNEQUFxQjtBQUNsRTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsOEJBQThCO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ3pDRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBLFlBQVksdUJBQXVCO0FBQ25DLFlBQVksa0JBQWtCO0FBQzlCLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ3JDRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLG1HQUFlO0FBQy9DLDBDQUEwQyxtQkFBTyxDQUFDLCtEQUF5QjtBQUMzRSx1Q0FBdUMsbUJBQU8sQ0FBQyx5REFBc0I7QUFDckUsMkNBQTJDLG1CQUFPLENBQUMsaUVBQTBCO0FBQzdFLHFDQUFxQyxtQkFBTyxDQUFDLHFEQUFvQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsZ0JBQWdCLDBCQUEwQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBLGlDQUFpQyxNQUFNLGVBQWUsTUFBTSxpQkFBaUIsZUFBZSxxQ0FBcUMsVUFBVTtBQUMzSTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUJBQW1CO0FBQzdEO0FBQ0E7QUFDQSxnQkFBZ0IsZ0JBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsYUFBYTtBQUN0Qyx5REFBeUQsZ0NBQWdDO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhCQUE4QjtBQUM5QztBQUNBLHdEQUF3RCxhQUFhLGNBQWMsbUJBQW1CLGtEQUFrRCx5QkFBeUI7QUFDakw7QUFDQSx5RUFBeUUsNENBQTRDO0FBQ3JIO0FBQ0EsOEVBQThFO0FBQzlFLDRDQUE0QyxzQ0FBc0M7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQSw4RUFBOEU7QUFDOUUsZ0RBQWdELHNDQUFzQztBQUN0RixpREFBaUQsZ0NBQWdDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNoSUY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU0sdUNBQXVDLGdCQUFnQjtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxNQUFNLG9DQUFvQyxnQkFBZ0I7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxNQUFNLDhDQUE4QyxnQkFBZ0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTSxvQ0FBb0MsZ0JBQWdCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTSw2Q0FBNkMsZ0JBQWdCO0FBQzNHO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTSx1REFBdUQsZ0JBQWdCO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNyRkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQSxZQUFZLHlCQUF5QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxZQUFZLG1DQUFtQyxVQUFVO0FBQzFHO0FBQ0E7QUFDQSw2Q0FBNkMsbUJBQW1CLG1CQUFtQixVQUFVO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNsQkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQ0FBaUMsbUJBQU8sQ0FBQyxnSEFBa0I7QUFDM0QsdUNBQXVDLG1CQUFPLENBQUMsbURBQWdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLFdBQVc7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNLGFBQWEsTUFBTSxnQ0FBZ0MsS0FBSztBQUNsRztBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTSxlQUFlLE1BQU0sSUFBSSxNQUFNO0FBQ3pFLGdEQUFnRCwwQkFBMEIsSUFBSSx5QkFBeUI7QUFDdkcsa0NBQWtDLEtBQUs7QUFDdkM7QUFDQTtBQUNBLG9DQUFvQyxNQUFNLGVBQWUsTUFBTSxJQUFJLE1BQU0sNEJBQTRCLE1BQU0sSUFBSSxNQUFNO0FBQ3JILHdDQUF3QywwQ0FBMEMsT0FBTyxNQUFNLElBQUkseUJBQXlCO0FBQzVILHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNEJBQTRCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUMvQ0Y7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQ0FBc0MsbUJBQU8sQ0FBQyxpREFBZTtBQUM3RDtBQUNBO0FBQ0EsaUNBQWlDLE1BQU0sNENBQTRDLE9BQU87QUFDMUY7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE1BQU0scUNBQXFDLHVCQUF1QjtBQUN2RztBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7O0FDdkJGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTSxtQkFBbUIsU0FBUyxnQkFBZ0IsY0FBYztBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ1ZGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkNBQTJDLG1CQUFPLENBQUMsMkRBQW9CO0FBQ3ZFLG1DQUFtQyx1QkFBdUI7QUFDMUQsc0NBQXNDLHlCQUF5QjtBQUMvRDtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ1ZGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkNBQTJDLG1CQUFPLENBQUMsMkRBQW9CO0FBQ3ZFO0FBQ0Esc0NBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7OztBQ2RGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsK0JBQStCLG1CQUFPLENBQUMsbUNBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLEtBQUssbUJBQW1CLE1BQU07QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0Isa0JBQWU7Ozs7Ozs7Ozs7OztBQ3BDRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUIsb0JBQW9CO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNqQkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBZTtBQUMvQyx1Q0FBdUMsbUJBQU8sQ0FBQyxtREFBZ0I7QUFDL0QscUNBQXFDLG1CQUFPLENBQUMsc0RBQXFCO0FBQ2xFLHVDQUF1QztBQUN2QyxZQUFZLGlDQUFpQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7O0FDNUJGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLG1HQUFlO0FBQy9DLDhCQUE4QixpRkFBaUY7QUFDL0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFdBQVcsc0NBQXNDLFlBQVk7QUFDN0c7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7O0FDNUJGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDZCQUE2QixhQUFhLElBQUk7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9DQUFvQyxrREFBa0QsTUFBTTtBQUNwSDtBQUNBLGtCQUFlOzs7Ozs7Ozs7Ozs7QUNYRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7OztVQ0xmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hY29zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Fjb3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYWNzYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYXNlYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hc2luLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2F0YW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvY29uanVnYXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Nvcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9jb3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvY3NjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2RpdmlkZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9leHAuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0QXJndW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0SW1hZ2luYXJ5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2dldE1vZHVsdXMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0UmVhbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pbnZlcnNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvaXNOYU4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvbG9nLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL211bHRpcGx5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3Bvdy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zZWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oaytjb21wbGV4QDEuMC4xMC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc2luLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrY29tcGxleEAxLjAuMTAvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3Rhbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK2NvbXBsZXhAMS4wLjEwL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL0Vycm9yLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2RlY29tcG9zaXRpb25zL0xVLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2RlY29tcG9zaXRpb25zL1FSLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvYmFja3dhcmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9mb3J3YXJkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvc29sdmUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9pbnZlcnNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvbXVsdGlwbHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9wb3cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2NvbmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9kZXQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9laWdlbnZhbHVlcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL25vcm0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9udWxsaXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvcmFuay5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL3NpemUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy90cmFjZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNEaWFnb25hbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNMb3dlclRyaWFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzT3J0aG9nb25hbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTa2V3U3ltbWV0cmljLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1NxdWFyZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTeW1tZXRyaWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzVXBwZXJUcmlhbmd1bGFyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2Nsb25lLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2NvbHVtbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9kaWFnLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2VsZW1lbnR3aXNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2VudHJ5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2ZsYXR0ZW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZnJvbUFycmF5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dlbmVyYXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dldERpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2V0UmFuZG9tTWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2lkZW50aXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYXl5YW1oayttYXRyaXhAMS4wLjgvbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvcm93LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3N1Ym1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy96ZXJvLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmF5eWFtaGsrbWF0cml4QDEuMC44L25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9lbXB0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9pc01hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJheXlhbWhrK21hdHJpeEAxLjAuOC9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9pc051bWJlci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vbWF0cml4LWludmVyc2VAMi4wLjAvbm9kZV9tb2R1bGVzL21hdHJpeC1pbnZlcnNlL21hdHJpeC1pbnZlcnNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2Nvcy1zaW1pbGFyaXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9kaWFnLWJsb2NrLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9kaWFnLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9kb3QtcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZWxlbS13aXNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9ldWNsaWRlYW4tZGlzdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZnJvYmVuaXVzLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2ludmVydC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbWFwLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbWF0LW11bC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbWF0LXBlcm11dGF0aW9uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9ub3JtLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9wYWQtd2l0aC16ZXJvLWNvbHMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NpbXBsZS1saW5hbGdAMS41LjAvbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3N1Yi1zcXVhcmUtbWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3VtLXZlY3Rvci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3VtLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi90cmFjZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vc2ltcGxlLWxpbmFsZ0AxLjUuMC9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvdHJhbnNwb3NlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaW1wbGUtbGluYWxnQDEuNS4wL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi96ZXJvcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9pbmRleC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvY29yZS1rYWxtYW4tZmlsdGVyLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbXBvc2l0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LWFjY2VsZXJhdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1wb3NpdGlvbi13aXRoLW51bGwudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtc3BlZWQtZHluYW1pYy50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9pbmRleC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9zaG9ydHRlcm0tY29uc3RhbnQtc3BlZWQudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2thbG1hbi1maWx0ZXIudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL21vZGVsLWNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL2luZGV4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9vYnNlcnZhdGlvbi9zZW5zb3ItbG9jYWwtdmFyaWFuY2UudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL3NlbnNvci1wcm9qZWN0ZWQudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL3NlbnNvci50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvYnVpbGQtc3RhdGUtcHJvamVjdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvY2hlY2stZGltZW5zaW9ucy50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvc2V0LWRpbWVuc2lvbnMudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3N0YXRlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi90eXBlcy9UeXBlQXNzZXJ0LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9hcnJheS10by1tYXRyaXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2UudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NoZWNrLW1hdHJpeC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY2hlY2stc2hhcGUudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2UudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NvdmFyaWFuY2UtdG8tY29ycmVsYXRpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2RlZXAtYXNzaWduLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9nZXQtY292YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvcG9seW1vcnBoLW1hdHJpeC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvcHJvamVjdC1vYnNlcnZhdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvdG8tZnVuY3Rpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3VuaXEudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbG1hbkZpbHRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2thbG1hbkZpbHRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBjb3NpbmUgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYWNvcyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuc3VidHJhY3QobmV3IHRoaXMoTWF0aC5QSSAvIDIpLCB0aGlzLmFzaW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNvczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBjb3RhbmdlbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyBpLCAtaSwgMCB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBjb3RhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhY290KG51bSkge1xuICByZXR1cm4gdGhpcy5hdGFuKHRoaXMuaW52ZXJzZShudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY290OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIGNvc2VjYW50IGZ1bmN0aW9uIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgMCB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBjb3NlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFjc2MobnVtKSB7XG4gIHJldHVybiB0aGlzLmFzaW4odGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzdW0gb2YgdHdvIGNvbXBsZXggbnVtYmVyc1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSBsZWZ0IG9mICcrJyBzaWduXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIHJpZ2h0IG9mICcrJyBzaWduXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBTdW0gb2YgdHdvIG51bWJlcnNcclxuICovXG5mdW5jdGlvbiBhZGQobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtMS5yZSArIG51bTIucmUsIG51bTEuaW0gKyBudW0yLmltKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2Ugc2VjYW50IGZ1bmN0aW9uIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgMCB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBzZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhc2VjKG51bSkge1xuICByZXR1cm4gdGhpcy5hY29zKHRoaXMuaW52ZXJzZShudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2VjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIHNpbmUgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYXNpbihudW0pIHtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgLTEpLCB0aGlzLmxvZyh0aGlzLmFkZCh0aGlzLm11bHRpcGx5KG5ldyB0aGlzKDAsIDEpLCBudW0pLCB0aGlzLnBvdyh0aGlzLnN1YnRyYWN0KHRoaXMuT05FLCB0aGlzLnBvdyhudW0sIDIpKSwgMC41KSkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2luOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyBpLCAtaSB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSB0YW5nZW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYXRhbihudW0pIHtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSAvIDIpLCB0aGlzLnN1YnRyYWN0KHRoaXMubG9nKHRoaXMuc3VidHJhY3QodGhpcy5PTkUsIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSkpKSwgdGhpcy5sb2codGhpcy5hZGQodGhpcy5PTkUsIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSkpKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF0YW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGNvbXBsZXggY29uanVnYXRlIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSBjb21wbGV4IGNvbmp1Z2F0ZVxyXG4gKi9cbmZ1bmN0aW9uIGNvbmp1Z2F0ZShudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtLmdldFJlYWwoKSwgbnVtLmdldEltYWdpbmFyeSgpICogLTEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmp1Z2F0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgY29zaW5lIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQ1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggY29zaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gY29zKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLmNvcyhhKSAqIE1hdGguY29zaChiKSwgTWF0aC5zaW4oYSkgKiBNYXRoLnNpbmgoYikgKiAtMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29zOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBjb3RhbmdlbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyBrICogUEkgLyAyIDogayBpcyBhbnkgaW50ZWdlciB9XHJcbiAqIE5vdGUgdGhhdCBjb3QoUEkgLyAyKSBzaG91bGQgZ2l2ZXMgTmFOIGluc3RlYWQgb2YgMFxyXG4gKiBiZWNhdXNlIHdlIHdvbid0IGludHJvZHVjZSB0aGUgY29uY2VwdCBvZiBJbmZpbml0eSBpbiB0aGlzIGNsYXNzXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBjb3RhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjb3QobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy50YW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY290OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBjb3NlY2FudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGsgKiBQSSA6IGsgaXMgYW55IGludGVnZXIgfVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggY29zZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjc2MobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy5zaW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3NjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgcXVvdGllbnQgb2YgdHdvIGNvbXBsZXggbnVtYmVycy5cclxuICogSWYgdGhlIGRlbm9taW5hdG9yIGlzIGNvbnNpZGVyZWQgYXMgMCxcclxuICogcmV0dXJuIE5hTiBpbnN0ZWFkIG9mIEluZmluaXR5XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0xIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIGxlZnQgb2YgJy8nIHNpZ25cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTIgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgcmlnaHQgb2YgJy8nIHNpZ25cclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFF1b3RpZW50IG9mIHR3byBudW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gZGl2aWRlKG51bTEsIG51bTIpIHtcbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGEgPSBudW0xLnJlO1xuICB2YXIgYiA9IG51bTEuaW07XG4gIHZhciBjID0gbnVtMi5yZTtcbiAgdmFyIGQgPSBudW0yLmltO1xuXG4gIGlmIChNYXRoLmFicyhjKSA8IHRoaXMuRVBTSUxPTiAmJiBNYXRoLmFicyhkKSA8IHRoaXMuRVBTSUxPTikge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBkZW5vbWluYXRvciA9IE1hdGgucG93KGMsIDIpICsgTWF0aC5wb3coZCwgMik7XG4gIHJldHVybiBuZXcgdGhpcygoYSAqIGMgKyBiICogZCkgLyBkZW5vbWluYXRvciwgKGIgKiBjIC0gYSAqIGQpIC8gZGVub21pbmF0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpdmlkZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgZnVuY3Rpb24gd2l0aCBiYXNlIEVcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIEV4cG9uZW50XHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIGUgdG8gdGhlIHBvd2VyIG9mIG51bVxyXG4gKi9cbmZ1bmN0aW9uIGV4cChudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgcmUgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgdGhldGEgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHZhciByID0gTWF0aC5leHAocmUpO1xuICByZXR1cm4gbmV3IHRoaXMociAqIE1hdGguY29zKHRoZXRhKSwgciAqIE1hdGguc2luKHRoZXRhKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogTm90ZSB0aGF0IHRoZSBhcmd1bWVudCBpcyByZXN0cmljdGVkIHRvIHRoZSBpbnRlcnZhbCBbIDAsIDIgKiBQSSApXHJcbiAqIElmIHRoZSBnaXZlbiBudW1iZXIgaXMgY29uc2lkZXJlZCBhcyAwLCByZXR1cm4gdW5kZWZpbmVkXHJcbiAqIEByZXR1cm4geyBOdW1iZXIgfSAtIFJldHVybiB0aGUgYXJndW1lbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRBcmd1bWVudCgpIHtcbiAgdmFyIHggPSB0aGlzLnJlO1xuICB2YXIgeSA9IHRoaXMuaW07XG4gIHZhciBlcHNpbG9uID0gMSAvIChNYXRoLnBvdygxMCwgMTUpICogMik7XG5cbiAgaWYgKE1hdGguYWJzKHgpIDwgZXBzaWxvbiAmJiBNYXRoLmFicyh5KSA8IGVwc2lsb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHggPT09IDApIHtcbiAgICBpZiAoeSA+IDApIHtcbiAgICAgIHJldHVybiBNYXRoLlBJICogMC41O1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLlBJICogMS41O1xuICB9XG5cbiAgaWYgKHkgPT09IDApIHtcbiAgICBpZiAoeCA+IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLlBJO1xuICB9XG5cbiAgaWYgKHggPiAwICYmIHkgPiAwKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbih5IC8geCk7XG4gIH1cblxuICBpZiAoeCA8IDAgJiYgeSA+IDApIHtcbiAgICByZXR1cm4gTWF0aC5QSSAtIE1hdGguYXRhbih5IC8gKHggKiAtMSkpO1xuICB9XG5cbiAgaWYgKHggPCAwICYmIHkgPCAwKSB7XG4gICAgcmV0dXJuIE1hdGguUEkgKyBNYXRoLmF0YW4oeSAqIC0xIC8gKHggKiAtMSkpO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguUEkgKiAyIC0gTWF0aC5hdGFuKHkgKiAtMSAvIHgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFyZ3VtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSBpbWFnaW5hcnkgcGFydCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldEltYWdpbmFyeSgpIHtcbiAgcmV0dXJuIHRoaXMuaW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SW1hZ2luYXJ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSBtb2R1bHVzIChsZW5ndGgpIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gZ2V0TW9kdWx1cygpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnJlLCAyKSArIE1hdGgucG93KHRoaXMuaW0sIDIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNb2R1bHVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSByZWFsIHBhcnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRSZWFsKCkge1xuICByZXR1cm4gdGhpcy5yZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSZWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyLCBpLmUuIDEvelxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgaW52ZXJzZVxyXG4gKi9cbmZ1bmN0aW9uIGludmVyc2UobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCBudW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmVyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0d28gY29tcGxleCBudW1iZXJzIGFyZSBjb25zaWRlcmVkIGFzIGlkZW50aWNhbC5cclxuICogRWl0aGVyIGJvdGggYXJlIE5hTiBvciBib3RoIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cyBhcmUgZXh0cmVtZWx5IGNsb3NlZC5cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTEgLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMiAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IEludGVnZXIgfSBkaWdpdCAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybiB7IEJvb2xlYW4gfSAtIFJldHVybiB0cnVlIGlmIHR3byBjb21wbGV4IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgYXMgaWRlbnRpY2FsXHJcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbChudW0xLCBudW0yKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogMTU7XG5cbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGRpZ2l0KSB8fCBkaWdpdCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgZGlnaXQnKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBhID0gbnVtMS5nZXRSZWFsKCk7XG4gIHZhciBiID0gbnVtMS5nZXRJbWFnaW5hcnkoKTtcbiAgdmFyIGMgPSBudW0yLmdldFJlYWwoKTtcbiAgdmFyIGQgPSBudW0yLmdldEltYWdpbmFyeSgpO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4oYSkgJiYgTnVtYmVyLmlzTmFOKGIpICYmIE51bWJlci5pc05hTihjKSAmJiBOdW1iZXIuaXNOYU4oZCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmFicyhhIC0gYykgPCBFUFNJTE9OICYmIE1hdGguYWJzKGIgLSBkKSA8IEVQU0lMT047XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBnaXZlbiBjb21wbGV4IG51bWJlciBpcyBOYU4gb3Igbm90XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQm9vbGVhbiB9IC0gUmV0dXJuIHRydWUgaWYgb25lIG9mIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0IGFyZSBOYU5cclxuICovXG5mdW5jdGlvbiBpc05hTihudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcmUgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgaW0gPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihyZSkgfHwgTnVtYmVyLmlzTmFOKGltKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmFOOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBuYXR1cmFsIGxvZyBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBOb3RlIHRoYXQgY29tcGxleCBsb2cgaXMgYSBtdWx0aXZhbHVlZCBmdW5jdGlvbixcclxuICogQnV0IHRoaXMgZnVuY3Rpb24gb25seSBwcm92aWRlcyB0aGUgcHJpbmNpcGFsIHZhbHVlIGJ5XHJcbiAqIHJlc3RyaWN0aW5nIHRoZSBpbWFnaW5hcnkgcGFydCB0byB0aGUgaW50ZXJ2YWwgWzAsIDIgKiBQaSkuXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgYWZ0ZXIgdGFraW5nIG5hdHVyYWwgbG9nXHJcbiAqL1xuZnVuY3Rpb24gbG9nKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciByID0gbnVtLmdldE1vZHVsdXMoKTtcbiAgdmFyIHRoZXRhID0gbnVtLmdldEFyZ3VtZW50KCk7XG5cbiAgaWYgKHIgPCB0aGlzLkVQU0lMT04gfHwgdGhldGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLmxvZyhyKSwgdGhldGEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHByb2R1Y3Qgb2YgdHdvIGNvbXBsZXggbnVtYmVyc1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSBsZWZ0IG9mICd4JyBzaWduXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIHJpZ2h0IG9mICd4JyBzaWduXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBQcm9kdWN0IG9mIHR3byBudW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gbXVsdGlwbHkobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bTEucmU7XG4gIHZhciBiID0gbnVtMS5pbTtcbiAgdmFyIGMgPSBudW0yLnJlO1xuICB2YXIgZCA9IG51bTIuaW07XG4gIHJldHVybiBuZXcgdGhpcyhhICogYyAtIGIgKiBkLCBhICogZCArIGIgKiBjKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgcG93ZXIgb2YgY29tcGxleCBudW1iZXIsXHJcbiAqIFRoZSBleHBvbmVudCBjYW4gYmUgYW55IHJlYWwgbnVtYmVyXHJcbiAqIElmIHlvdSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgay10aCByb290LFxyXG4gKiBZb3Ugc2hvdWxkIGtub3cgdGhhdCBpdCBvbmx5IHJldHVybnMgb25lIG91dCBvZiBrIHNvbHV0aW9ucyxcclxuICogQWx0aG91Z2ggdGhlcmUgYXJlIHRvdGFsIGsgcG9zc2libGUgc29sdXRpb25zIGZvciBrLXRoIHJvb3QgcHJvYmxlbS5cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIEJhc2VcclxuICogQHBhcmFtIHsgQ29tcGxleCB8IE51bWJlciB9IG4gLSBFeHBvbmVudFxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGV4cG9uZW50aWF0aW9uXHJcbiAqL1xuZnVuY3Rpb24gcG93KG51bSwgbikge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSB8fCB0eXBlb2YgbiAhPT0gJ251bWJlcicgJiYgIShuIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICBpZiAodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobikgfHwgTnVtYmVyLmlzTmFOKG4pKSB7XG4gICAgICByZXR1cm4gdGhpcy5OYU47XG4gICAgfVxuXG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLk9ORTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VxdWFsKG51bSwgdGhpcy5aRVJPKSkge1xuICAgICAgcmV0dXJuIHRoaXMuWkVSTztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5leHAodGhpcy5tdWx0aXBseShuZXcgdGhpcyhuLCAwKSwgdGhpcy5sb2cobnVtKSkpO1xuICB9XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiB0aGlzKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwKHRoaXMubXVsdGlwbHkobiwgdGhpcy5sb2cobnVtKSkpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuTmFOO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgc2VjYW50IG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgKCAyayArIDEpICogUEkgLyAyIDogayBpcyBhbnkgaW50ZWdlciB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBzZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBzZWMobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy5jb3MobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBzaW5lIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQ1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggc2luZSBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHNpbihudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciBiID0gbnVtLmdldEltYWdpbmFyeSgpO1xuICByZXR1cm4gbmV3IHRoaXMoTWF0aC5zaW4oYSkgKiBNYXRoLmNvc2goYiksIE1hdGguY29zKGEpICogTWF0aC5zaW5oKGIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBjb21wbGV4IG51bWJlcnNcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTEgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgbGVmdCBvZiAnLScgc2lnblxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMiAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSByaWdodCBvZiAnLScgc2lnblxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gRGlmZmVyZW5jZSBvZiB0d28gbnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0KG51bTEsIG51bTIpIHtcbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG51bTEucmUgLSBudW0yLnJlLCBudW0xLmltIC0gbnVtMi5pbSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VidHJhY3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIHRhbmdlbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAoIDJrICsgMSkgKiBQSSAvIDIgOiBrIGlzIGFueSBpbnRlZ2VyIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBjb21wbGV4IHRhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiB0YW4obnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLnNpbihudW0pLCB0aGlzLmNvcyhudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgU3RyaW5nIH0gLSBSZXR1cm4gdGhlIHN0cmluZ2lmaWVkIGFuZCBmb3JtYXR0ZWQgY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgdmFyIHJlID0gdGhpcy5yZSxcbiAgICAgIGltID0gdGhpcy5pbTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKHJlKSB8fCBOdW1iZXIuaXNOYU4oaW0pKSB7XG4gICAgcmV0dXJuICdOYU4nO1xuICB9XG5cbiAgaWYgKHJlID09PSAwICYmIGltID09PSAwKSB7XG4gICAgcmV0dXJuICcwJztcbiAgfVxuXG4gIGlmIChyZSA9PT0gMCkge1xuICAgIGlmIChpbSA9PT0gMSkge1xuICAgICAgcmV0dXJuICdpJztcbiAgICB9XG5cbiAgICBpZiAoaW0gPT09IC0xKSB7XG4gICAgICByZXR1cm4gJy1pJztcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIi5jb25jYXQoaW0sIFwiaVwiKTtcbiAgfVxuXG4gIGlmIChpbSA9PT0gMCkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSk7XG4gIH1cblxuICBpZiAoaW0gPiAwKSB7XG4gICAgaWYgKGltID09PSAxKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiICsgaVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiICsgXCIpLmNvbmNhdChpbSwgXCJpXCIpO1xuICB9XG5cbiAgaWYgKGltID09PSAtMSkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgLSBpXCIpO1xuICB9XG5cbiAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiAtIFwiKS5jb25jYXQoTWF0aC5hYnMoaW0pLCBcImlcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyoqXHJcbiAqIFJldHVybnMgYSBDb21wbGV4IE51bWJlclxyXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBhcmcxIC0gcmVhbCBwYXJ0IG9mIHRoZSBjb21wbGV4IG51bWJlclxyXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBhcmcyIC0gaW1hZ2luYXJ5IHBhcnQgb2YgdGhlIGNvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIENvbXBsZXgoYXJnMSwgYXJnMikge1xuICB2YXIgdHlwZTEgPSBfdHlwZW9mKGFyZzEpO1xuXG4gIHZhciB0eXBlMiA9IF90eXBlb2YoYXJnMik7XG5cbiAgaWYgKHR5cGUxID09PSAnbnVtYmVyJyAmJiB0eXBlMiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKGFyZzEpIHx8ICFOdW1iZXIuaXNGaW5pdGUoYXJnMSkpIHtcbiAgICAgIHRoaXMucmUgPSBOYU47XG4gICAgICB0aGlzLmltID0gTmFOO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5yZSA9IGFyZzE7XG4gICAgdGhpcy5pbSA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodHlwZTEgPT09ICdudW1iZXInICYmIHR5cGUyID09PSAnbnVtYmVyJykge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYXJnMSkgfHwgTnVtYmVyLmlzTmFOKGFyZzIpIHx8ICFOdW1iZXIuaXNGaW5pdGUoYXJnMSkgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcyKSkge1xuICAgICAgdGhpcy5yZSA9IE5hTjtcbiAgICAgIHRoaXMuaW0gPSBOYU47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnJlID0gYXJnMTtcbiAgICB0aGlzLmltID0gYXJnMjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMucmUgPSBOYU47XG4gIHRoaXMuaW0gPSBOYU47XG4gIHJldHVybiB0aGlzO1xufVxuXG5Db21wbGV4LnByb3RvdHlwZS5nZXRSZWFsID0gcmVxdWlyZSgnLi9jb3JlL2dldFJlYWwnKTtcbkNvbXBsZXgucHJvdG90eXBlLmdldEltYWdpbmFyeSA9IHJlcXVpcmUoJy4vY29yZS9nZXRJbWFnaW5hcnknKTtcbkNvbXBsZXgucHJvdG90eXBlLmdldE1vZHVsdXMgPSByZXF1aXJlKCcuL2NvcmUvZ2V0TW9kdWx1cycpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0QXJndW1lbnQgPSByZXF1aXJlKCcuL2NvcmUvZ2V0QXJndW1lbnQnKTtcbkNvbXBsZXgucHJvdG90eXBlLnRvU3RyaW5nID0gcmVxdWlyZSgnLi9jb3JlL3RvU3RyaW5nJyk7XG5Db21wbGV4LmlzTmFOID0gcmVxdWlyZSgnLi9jb3JlL2lzTmFOJyk7XG5Db21wbGV4LmlzRXF1YWwgPSByZXF1aXJlKCcuL2NvcmUvaXNFcXVhbCcpO1xuQ29tcGxleC5jb25qdWdhdGUgPSByZXF1aXJlKCcuL2NvcmUvY29uanVnYXRlJyk7XG5Db21wbGV4LmludmVyc2UgPSByZXF1aXJlKCcuL2NvcmUvaW52ZXJzZScpO1xuQ29tcGxleC5hZGQgPSByZXF1aXJlKCcuL2NvcmUvYWRkJyk7XG5Db21wbGV4LnN1YnRyYWN0ID0gcmVxdWlyZSgnLi9jb3JlL3N1YnRyYWN0Jyk7XG5Db21wbGV4Lm11bHRpcGx5ID0gcmVxdWlyZSgnLi9jb3JlL211bHRpcGx5Jyk7XG5Db21wbGV4LmRpdmlkZSA9IHJlcXVpcmUoJy4vY29yZS9kaXZpZGUnKTtcbkNvbXBsZXguZXhwID0gcmVxdWlyZSgnLi9jb3JlL2V4cCcpO1xuQ29tcGxleC5sb2cgPSByZXF1aXJlKCcuL2NvcmUvbG9nJyk7XG5Db21wbGV4LnBvdyA9IHJlcXVpcmUoJy4vY29yZS9wb3cnKTtcbkNvbXBsZXguc2luID0gcmVxdWlyZSgnLi9jb3JlL3NpbicpO1xuQ29tcGxleC5jb3MgPSByZXF1aXJlKCcuL2NvcmUvY29zJyk7XG5Db21wbGV4LnRhbiA9IHJlcXVpcmUoJy4vY29yZS90YW4nKTtcbkNvbXBsZXguY3NjID0gcmVxdWlyZSgnLi9jb3JlL2NzYycpO1xuQ29tcGxleC5zZWMgPSByZXF1aXJlKCcuL2NvcmUvc2VjJyk7XG5Db21wbGV4LmNvdCA9IHJlcXVpcmUoJy4vY29yZS9jb3QnKTtcbkNvbXBsZXguYXNpbiA9IHJlcXVpcmUoJy4vY29yZS9hc2luJyk7XG5Db21wbGV4LmFjb3MgPSByZXF1aXJlKCcuL2NvcmUvYWNvcycpO1xuQ29tcGxleC5hdGFuID0gcmVxdWlyZSgnLi9jb3JlL2F0YW4nKTtcbkNvbXBsZXguYWNzYyA9IHJlcXVpcmUoJy4vY29yZS9hY3NjJyk7XG5Db21wbGV4LmFzZWMgPSByZXF1aXJlKCcuL2NvcmUvYXNlYycpO1xuQ29tcGxleC5hY290ID0gcmVxdWlyZSgnLi9jb3JlL2Fjb3QnKTtcbkNvbXBsZXguTmFOID0gbmV3IENvbXBsZXgoTmFOKTtcbkNvbXBsZXguT05FID0gbmV3IENvbXBsZXgoMSk7XG5Db21wbGV4LlpFUk8gPSBuZXcgQ29tcGxleCgwKTtcbkNvbXBsZXguUEkgPSBuZXcgQ29tcGxleChNYXRoLlBJKTtcbkNvbXBsZXguRSA9IG5ldyBDb21wbGV4KE1hdGguRSk7XG5Db21wbGV4LkVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCAxNSkgKiAyKTtcbm1vZHVsZS5leHBvcnRzID0gQ29tcGxleDsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIElOVkFMSURfQVJSQVk6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhIG5vbi1hcnJheSBhcmd1bWVudCcsXG4gIElOVkFMSURfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYW4gaW52YWxpZCBtYXRyaXgnLFxuICBJTlZBTElEX1NRVUFSRV9NQVRSSVg6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhIG5vbi1zcXVhcmUgbWF0cml4JyxcbiAgSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uIHVwcGVyLXRyaWFuZ3VsYXIgbWF0cml4JyxcbiAgSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uIGxvd2VyLXRyaWFuZ3VsYXIgbWF0cml4JyxcbiAgSU5WQUxJRF9FWFBPTkVOVDogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgZXhwb25lbnQnLFxuICBJTlZBTElEX1JPV19DT0w6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciByb3cgYW5kIGNvbHVtbicsXG4gIElOVkFMSURfUk9XOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgbm9uLW5lZ2F0aXZlIGludGVnZXIgcm93JyxcbiAgSU5WQUxJRF9DT0xVTU46ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciBjb2x1bW4nLFxuICBJTlZBTElEX1JPV1NfRVhQUkVTU0lPTjogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGludmFsaWQgcm93cyBleHByZXNzaW9uJyxcbiAgSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT046ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBpbnZhbGlkIGNvbHVtbnMgZXhwcmVzc2lvbicsXG4gIElOVkFMSURfUF9OT1JNOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgaW52YWxpZCBwLW5vcm0nLFxuICBPVkVSRkxPV19JTkRFWDogJ0ludmFsaWQgYXJndW1lbnQ6IE1hdHJpeCBpbmRleCBvdmVyZmxvdycsXG4gIE9WRVJGTE9XX0NPTFVNTjogJ0ludmFsaWQgYXJndW1lbnQ6IENvbHVtbiBpbmRleCBvdmVyZmxvdycsXG4gIE9WRVJGTE9XX1JPVzogJ0ludmFsaWQgYXJndW1lbnQ6IFJvdyBpbmRleCBvdmVyZmxvdycsXG4gIE5PX1VOSVFVRV9TT0xVVElPTjogJ0FyaXRobWV0aWMgRXhjZXB0aW9uOiBUaGUgc3lzdGVtIGhhcyBubyB1bmlxdWUgc29sdXRpb24nLFxuICBTSVpFX0lOQ09NUEFUSUJMRTogJ0ludmFsaWQgYXJndW1lbnQ6IE1hdHJpeCBzaXplLWluY29tcGF0aWJsZScsXG4gIFNJTkdVTEFSX01BVFJJWDogJ0FyaXRobWV0aWMgRXhjZXB0aW9uOiBUaGUgbWF0cml4IGlzIG5vdCBpbnZlcnRpYmxlJyxcbiAgRVhQRUNURURfU1RSSU5HX05VTUJFUl9BVF9QT1NfMV8yOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYSBudW1iZXIgYXQgYXJndW1lbnRzWzFdIGFuZCBhcmd1bWVudHNbMl0nLFxuICBFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgZWl0aGVyIGFuIGFycmF5IG9mIG51bWJlcnMgb3IgYW4gYXJyYXkgb2Ygc3F1YXJlIG1hdHJpY2VzJ1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgTFVQIGRlY29tcG9zaXRpb24gb2YgdGhlIE1hdHJpeCxcclxuICogd2hlcmUgTCBpcyBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeCB3aGljaCBkaWFnb25hbCBlbnRyaWVzIGFyZSBhbHdheXMgMSxcclxuICogVSBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeCwgYW5kIFAgaXMgcGVybXV0YXRpb24gbWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJdCBpcyBpbXBsZW1lbnRlZCB1c2luZyBHYXVzc2lhbiBFbGltaW5hdGlvbiB3aXRoIFBhcnRpYWwgUGl2b3RpbmcgaW4gb3JkZXIgdG9cclxuICogcmVkdWNlIHRoZSBlcnJvciBjYXVzZWQgYnkgZmxvYXRpbmctcG9pbnQgYXJpdGhtZXRpYy48YnI+PGJyPlxyXG4gKiBcclxuICogTm90ZSB0aGF0IGlmIG9wdGltaXplZCBpcyB0cnVlLCBQIGlzIGEgUGVybXV0YXRpb24gQXJyYXkgYW5kIGJvdGggTCBhbmQgVSBhcmUgbWVyZ2VkXHJcbiAqIGludG8gb25lIG1hdHJpeCBpbiBvcmRlciB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgbWF0cml4XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGltaXplZD1mYWxzZV0gLSBSZXR1cm5zIFtQLCBMVV0gaWYgaXQgaXMgdHJ1ZSwgW1AsIEwsIFVdIGlmIGl0IGlzIGZhbHNlXHJcbiAqIEByZXR1cm5zIHtNYXRyaXhbXX0gVGhlIExVUCBkZWNvbXBvc2l0aW9uIG9mIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBMVShBKSB7XG4gIHZhciBvcHRpbWl6ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG4gIHZhciBwZXJtdXRhdGlvbiA9IGluaXRQZXJtdXRhdGlvbihyb3cpO1xuXG4gIHZhciBjb3B5ID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93IC0gMTsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRDb2wgPSBNYXRoLm1pbihpLCBjb2wpOyAvLyBhcHBseSBQYXJ0aWFsIFBpdm90aW5nXG5cbiAgICBQYXJ0aWFsUGl2b3RpbmcoY29weSwgcGVybXV0YXRpb24sIGN1cnJlbnRDb2wsIHJvdywgY29sKTtcbiAgICB2YXIgaXRoID0gcGVybXV0YXRpb25baV07XG4gICAgdmFyIHBpdm90ID0gY29weVtpdGhdW2N1cnJlbnRDb2xdO1xuXG4gICAgaWYgKE1hdGguYWJzKHBpdm90KSA8IEVQU0lMT04pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IHJvdzsgaisrKSB7XG4gICAgICB2YXIganRoID0gcGVybXV0YXRpb25bal07XG4gICAgICB2YXIgZW50cnkgPSBjb3B5W2p0aF1bY3VycmVudENvbF07XG5cbiAgICAgIGlmIChNYXRoLmFicyhlbnRyeSkgPj0gRVBTSUxPTikge1xuICAgICAgICB2YXIgZmFjdG9yID0gZW50cnkgLyBwaXZvdDtcblxuICAgICAgICBmb3IgKHZhciBrID0gY3VycmVudENvbDsgayA8IGNvbDsgaysrKSB7XG4gICAgICAgICAgY29weVtqdGhdW2tdIC09IGZhY3RvciAqIGNvcHlbaXRoXVtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHlbanRoXVtjdXJyZW50Q29sXSA9IGZhY3RvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgcm93OyBfaTIrKykge1xuICAgIHJlc3VsdFtfaTJdID0gY29weVtwZXJtdXRhdGlvbltfaTJdXTtcbiAgfVxuXG4gIGlmIChvcHRpbWl6ZWQpIHtcbiAgICByZXR1cm4gW3Blcm11dGF0aW9uLCBuZXcgdGhpcyhyZXN1bHQpXTtcbiAgfVxuXG4gIHZhciBQID0gdGhpcy5nZW5lcmF0ZShyb3csIHJvdywgZnVuY3Rpb24gKGksIGopIHtcbiAgICB2YXIgaWR4ID0gcGVybXV0YXRpb25baV07XG5cbiAgICBpZiAoaiA9PT0gaWR4KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIHZhciBMID0gdGhpcy5nZW5lcmF0ZShyb3csIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPT09IGopIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGlmIChpIDwgaikge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFtpXVtqXTtcbiAgfSk7XG4gIHZhciBVID0gdGhpcy5nZW5lcmF0ZShzaXplLCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPiBqKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0W2ldW2pdO1xuICB9KTtcbiAgcmV0dXJuIFtQLCBMLCBVXTtcbn1cblxuO1xuXG5mdW5jdGlvbiBpbml0UGVybXV0YXRpb24oc2l6ZSkge1xuICB2YXIgcGVybXV0YXRpb24gPSBuZXcgQXJyYXkoc2l6ZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBwZXJtdXRhdGlvbltpXSA9IGk7XG4gIH1cblxuICByZXR1cm4gcGVybXV0YXRpb247XG59XG5cbmZ1bmN0aW9uIFBhcnRpYWxQaXZvdGluZyhtYXRyaXgsIHBlcm11dGF0aW9uLCBwb3MsIHJvdywgY29sKSB7XG4gIHZhciBjdXJyZW50Q29sID0gTWF0aC5taW4ocG9zLCBjb2wpO1xuICB2YXIgbWF4SWR4ID0gcG9zO1xuICB2YXIgbWF4ID0gTWF0aC5hYnMobWF0cml4W3Blcm11dGF0aW9uW3Bvc11dW2N1cnJlbnRDb2xdKTtcblxuICBmb3IgKHZhciBpID0gcG9zICsgMTsgaSA8IHJvdzsgaSsrKSB7XG4gICAgdmFyIHZhbHVlID0gTWF0aC5hYnMobWF0cml4W3Blcm11dGF0aW9uW2ldXVtjdXJyZW50Q29sXSk7XG5cbiAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgIG1heElkeCA9IGk7XG4gICAgICBtYXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICB2YXIgdCA9IHBlcm11dGF0aW9uW3Bvc107XG4gIHBlcm11dGF0aW9uW3Bvc10gPSBwZXJtdXRhdGlvblttYXhJZHhdO1xuICBwZXJtdXRhdGlvblttYXhJZHhdID0gdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMVTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgUVIgZGVjb21wb3NpdGlvbiBvZiB0aGUgTWF0cml4XHJcbiAqIHdoZXJlIFEgaXMgb3J0aG9nb25hbCBtYXRyaXgsIFIgaXMgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXguPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBhbGdvcml0aG0gaXMgaW1wbGVtZW50ZWQgdXNpbmcgSG91c2Vob2xkZXIgVHJhbnNmb3JtIGluc3RlYWQgb2YgR3JhbeKAk1NjaG1pZHQgcHJvY2Vzc1xyXG4gKiBiZWNhdXNlIHRoZSBIb3VzZWhvbGRlciBUcmFuc2Zvcm0gaXMgbW9yZSBudW1lcmljYWxseSBzdGFibGUuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBtYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeFtdfSBUaGUgUVIgZGVjb21wb3NpdGlvbiBvZiBtYXRyaXggaW4gdGhlIGZvcm0gb2YgW1EsIFJdXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIFFSKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgc2l6ZSA9IE1hdGgubWluKHJvdywgY29sKTtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcblxuICB2YXIgbWF0cml4UiA9IHRoaXMuY2xvbmUoQSkuX21hdHJpeDtcblxuICB2YXIgbWF0cml4USA9IHRoaXMuaWRlbnRpdHkocm93KS5fbWF0cml4O1xuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgLy8gaWYgYWxsIGVudHJpZXMgYmVsb3cgbWFpbiBkaWFnb25hbCBhcmUgY29uc2lkZXJlZCBhcyB6ZXJvLCBza2lwIHRoaXMgcm91bmRcbiAgICB2YXIgc2tpcCA9IHRydWU7XG5cbiAgICBmb3IgKHZhciBpID0gaiArIDE7IGkgPCByb3c7IGkrKykge1xuICAgICAgaWYgKE1hdGguYWJzKG1hdHJpeFJbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgc2tpcCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNraXApIHtcbiAgICAgIC8vIEFwcGx5IEhvdXNlaG9sZGVyIHRyYW5zZm9ybVxuICAgICAgdmFyIG5vcm0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBfaTIgPSBqOyBfaTIgPCByb3c7IF9pMisrKSB7XG4gICAgICAgIG5vcm0gKz0gTWF0aC5wb3cobWF0cml4UltfaTJdW2pdLCAyKTtcbiAgICAgIH1cblxuICAgICAgbm9ybSA9IE1hdGguc3FydChub3JtKTsgLy8gcmVkdWNlIGZsb2F0aW5nIHBvaW50IGFyaXRobWF0aWMgZXJyb3JcblxuICAgICAgdmFyIHMgPSAtMTtcblxuICAgICAgaWYgKG1hdHJpeFJbal1bal0gPCAwKSB7XG4gICAgICAgIHMgPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgdTEgPSBtYXRyaXhSW2pdW2pdIC0gcyAqIG5vcm07XG4gICAgICB2YXIgdyA9IG5ldyBBcnJheShyb3cgLSBqKTtcblxuICAgICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgcm93IC0gajsgX2kzKyspIHtcbiAgICAgICAgd1tfaTNdID0gbWF0cml4UltfaTMgKyBqXVtqXSAvIHUxO1xuICAgICAgfVxuXG4gICAgICB3WzBdID0gMTtcbiAgICAgIHZhciB0YXUgPSAtMSAqIHMgKiB1MSAvIG5vcm07XG4gICAgICB2YXIgc3ViUiA9IG5ldyBBcnJheShyb3cgLSBqKTtcblxuICAgICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgcm93IC0gajsgX2k0KyspIHtcbiAgICAgICAgdmFyIG5ld1JvdyA9IG5ldyBBcnJheShjb2wpO1xuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY29sOyBrKyspIHtcbiAgICAgICAgICBuZXdSb3dba10gPSBtYXRyaXhSW2ogKyBfaTRdW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViUltfaTRdID0gbmV3Um93O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTUgPSBqOyBfaTUgPCByb3c7IF9pNSsrKSB7XG4gICAgICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBjb2w7IF9rKyspIHtcbiAgICAgICAgICB2YXIgc3VtbWF0aW9uID0gMDtcblxuICAgICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgcm93IC0gajsgbSsrKSB7XG4gICAgICAgICAgICBzdW1tYXRpb24gKz0gc3ViUlttXVtfa10gKiB3W21dO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hdHJpeFJbX2k1XVtfa10gPSBzdWJSW19pNSAtIGpdW19rXSAtIHRhdSAqIHdbX2k1IC0gal0gKiBzdW1tYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN1YlEgPSBuZXcgQXJyYXkocm93KTtcblxuICAgICAgZm9yICh2YXIgX2k2ID0gMDsgX2k2IDwgcm93OyBfaTYrKykge1xuICAgICAgICB2YXIgX25ld1JvdyA9IG5ldyBBcnJheShyb3cgLSBqKTtcblxuICAgICAgICBmb3IgKHZhciBfazIgPSAwOyBfazIgPCByb3cgLSBqOyBfazIrKykge1xuICAgICAgICAgIF9uZXdSb3dbX2syXSA9IG1hdHJpeFFbX2k2XVtqICsgX2syXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YlFbX2k2XSA9IF9uZXdSb3c7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNyA9IDA7IF9pNyA8IHJvdzsgX2k3KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2szID0gajsgX2szIDwgcm93OyBfazMrKykge1xuICAgICAgICAgIHZhciBfc3VtbWF0aW9uID0gMDtcblxuICAgICAgICAgIGZvciAodmFyIF9tID0gMDsgX20gPCByb3cgLSBqOyBfbSsrKSB7XG4gICAgICAgICAgICBfc3VtbWF0aW9uICs9IHN1YlFbX2k3XVtfbV0gKiB3W19tXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYXRyaXhRW19pN11bX2szXSA9IHN1YlFbX2k3XVtfazMgLSBqXSAtIHRhdSAqIHdbX2szIC0gal0gKiBfc3VtbWF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2k4ID0gMDsgX2k4IDwgcm93OyBfaTgrKykge1xuICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCBjb2w7IF9qKyspIHtcbiAgICAgIGlmIChfaTggPiBfaikge1xuICAgICAgICBtYXRyaXhSW19pOF1bX2pdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gW25ldyB0aGlzKG1hdHJpeFEpLCBuZXcgdGhpcyhtYXRyaXhSKV07XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gUVI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfVVBQRVJfVFJJQU5HVUxBUl9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OO1xuLyoqXHJcbiogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgVXggPSB5IHVzaW5nIGJhY2t3YXJkIHN1YnN0aXR1dGlvbixcclxuKiB3aGVyZSBVIGlzIGFuIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4LlxyXG4qIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuKiBAbWVtYmVyb2YgTWF0cml4XHJcbiogQHN0YXRpY1xyXG4qIEBwYXJhbSB7TWF0cml4fSBVIC0gQW55IG4geCBuIHVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4XHJcbiogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBVeCA9IHlcclxuKi9cblxuXG5mdW5jdGlvbiBiYWNrd2FyZChVLCB5KSB7XG4gIGlmICghKFUgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKHkgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIVUuaXNVcHBlclRyaWFuZ3VsYXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghVS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IFUuc2l6ZSgpWzBdO1xuXG4gIHZhciBfeSRzaXplID0geS5zaXplKCksXG4gICAgICBfeSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF95JHNpemUsIDIpLFxuICAgICAgeXJvdyA9IF95JHNpemUyWzBdLFxuICAgICAgeWNvbCA9IF95JHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXhVID0gVS5fbWF0cml4O1xuICB2YXIgbWF0cml4WSA9IHkuX21hdHJpeDtcblxuICBpZiAoeXJvdyAhPT0gc2l6ZSB8fCB5Y29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgVS5fZGlnaXQpICogMik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4VVtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29lZmZpY2llbnRzID0gZW1wdHkoc2l6ZSwgMSk7XG5cbiAgZm9yICh2YXIgX2kyID0gc2l6ZSAtIDE7IF9pMiA+PSAwOyBfaTItLSkge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IF9pMiArIDE7IGogPCBzaXplOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal1bMF0gKiBtYXRyaXhVW19pMl1bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pMl1bMF0gPSAobWF0cml4WVtfaTJdWzBdIC0gc3VtbWF0aW9uKSAvIG1hdHJpeFVbX2kyXVtfaTJdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gYmFja3dhcmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTE9XRVJfVFJJQU5HVUxBUl9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OO1xuLyoqXHJcbiAqIFNvbHZlIHN5c3RlbSBvZiBsaW5lYXIgZXF1YXRpb25zIEx4ID0geSB1c2luZyBmb3J3YXJkIHN1YnN0aXR1dGlvbixcclxuICogd2hlcmUgTCBpcyBhIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4LlxyXG4gKiBJZiB0aGVyZSBpcyBubyB1bmlxdWUgc29sdXRpb25zLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gTCAtIEFueSBuIHggbiBsb3dlciB0cmlhbmd1bGFyIE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBMeCA9IHlcclxuICovXG5cblxuZnVuY3Rpb24gZm9yd2FyZChMLCB5KSB7XG4gIGlmICghKEwgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKHkgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUwuaXNMb3dlclRyaWFuZ3VsYXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTC5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IEwuc2l6ZSgpWzBdO1xuXG4gIHZhciBfeSRzaXplID0geS5zaXplKCksXG4gICAgICBfeSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF95JHNpemUsIDIpLFxuICAgICAgeXJvdyA9IF95JHNpemUyWzBdLFxuICAgICAgeWNvbCA9IF95JHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXhMID0gTC5fbWF0cml4O1xuICB2YXIgbWF0cml4WSA9IHkuX21hdHJpeDtcblxuICBpZiAoc2l6ZSAhPT0geXJvdyB8fCB5Y29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgTC5fZGlnaXQpICogMik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4TFtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29lZmZpY2llbnRzID0gZW1wdHkoc2l6ZSwgMSk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgc2l6ZTsgX2kyKyspIHtcbiAgICB2YXIgc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2kyOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal1bMF0gKiBtYXRyaXhMW19pMl1bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pMl1bMF0gPSAobWF0cml4WVtfaTJdWzBdIC0gc3VtbWF0aW9uKSAvIG1hdHJpeExbX2kyXVtfaTJdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZm9yd2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFO1xuLyoqXHJcbiAqIFNvbHZlIHN5c3RlbSBvZiBsaW5lYXIgZXF1YXRpb25zIEF4ID0geSB1c2luZyBMVSBkZWNvbXBvc2l0aW9uLlxyXG4gKiBJZiB0aGVyZSBpcyBubyB1bmlxdWUgc29sdXRpb25zLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gTCAtIEFueSBuIHggbiBzcXVhcmUgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSB5IC0gQW55IG4geCAxIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIEF4ID0geVxyXG4gKi9cblxuXG5mdW5jdGlvbiBzb2x2ZShBLCBiKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKGIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICBhUm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBhQ29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9iJHNpemUgPSBiLnNpemUoKSxcbiAgICAgIF9iJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX2Ikc2l6ZSwgMiksXG4gICAgICBiUm93ID0gX2Ikc2l6ZTJbMF0sXG4gICAgICBiQ29sID0gX2Ikc2l6ZTJbMV07XG5cbiAgaWYgKGFDb2wgIT09IGJSb3cgfHwgYkNvbCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBfdGhpcyRMVSA9IHRoaXMuTFUoQSwgdHJ1ZSksXG4gICAgICBfdGhpcyRMVTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRMVSwgMiksXG4gICAgICBQID0gX3RoaXMkTFUyWzBdLFxuICAgICAgTFUgPSBfdGhpcyRMVTJbMV07XG5cbiAgdmFyIG1hdHJpeExVID0gTFUuX21hdHJpeDtcbiAgdmFyIG1hdHJpeEIgPSBiLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaSA9IGFSb3cgLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhMVVtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2xvbmVkVmVjdG9yID0gbmV3IEFycmF5KGJSb3cpO1xuICB2YXIgY29lZmZpY2llbnRzID0gbmV3IEFycmF5KGJSb3cpO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGJSb3c7IF9pMisrKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgY2xvbmVkVmVjdG9yW19pMl0gPSBtYXRyaXhCW1BbX2kyXV1bMF07XG4gIH1cblxuICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBhUm93OyBfaTMrKykge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBfaTM7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXSAqIG1hdHJpeExVW19pM11bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pM10gPSBjbG9uZWRWZWN0b3JbX2kzXSAtIHN1bW1hdGlvbjtcbiAgfVxuXG4gIGZvciAodmFyIF9pNCA9IGFSb3cgLSAxOyBfaTQgPj0gMDsgX2k0LS0pIHtcbiAgICB2YXIgX3N1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBfaiA9IF9pNCArIDE7IF9qIDwgYVJvdzsgX2orKykge1xuICAgICAgX3N1bW1hdGlvbiArPSBtYXRyaXhMVVtfaTRdW19qXSAqIGNsb25lZFZlY3Rvcltfal07XG4gICAgfVxuXG4gICAgY2xvbmVkVmVjdG9yW19pNF0gPSAoY29lZmZpY2llbnRzW19pNF0gLSBfc3VtbWF0aW9uKSAvIG1hdHJpeExVW19pNF1bX2k0XTtcbiAgfVxuXG4gIGZvciAodmFyIF9pNSA9IDA7IF9pNSA8IGJSb3c7IF9pNSsrKSB7XG4gICAgY29lZmZpY2llbnRzW19pNV0gPSBbY2xvbmVkVmVjdG9yW19pNV1dO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc29sdmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3VtIG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBoYXMgc2FtZSBzaXplIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgc3VtIG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5mdW5jdGlvbiBhZGQoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgcm93MiA9IF9CJHNpemUyWzBdLFxuICAgICAgY29sMiA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgIT09IHJvdzIgfHwgY29sICE9PSBjb2wyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBtYXRyaXgxID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4MiA9IEIuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeDFbaV1bal0gKyBtYXRyaXgyW2ldW2pdO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0lOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuU0lOR1VMQVJfTUFUUklYO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcbi8qKlxyXG4gKiBGaW5kIHRoZSBpbnZlcnNlIG9mIG5vbi1zaW5ndWxhciBtYXRyaXggdXNpbmcgRWxlbWVudGFyeSBSb3cgT3BlcmF0aW9ucy5cclxuICogSWYgdGhlIG1hdHJpeCBpcyBzaW5ndWxhciwgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgc3F1YXJlIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgaW52ZXJzZSBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGludmVyc2UoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFBLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gQS5zaXplKClbMF07XG5cbiAgaWYgKHNpemUgPT09IDApIHtcbiAgICAvLyBpbnZlcnNlIG9mIDB4MCBtYXRyaXggaXMgaXRzZWxmXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoW10pO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcblxuICB2YXIgaW52ID0gdGhpcy5pZGVudGl0eShzaXplKS5fbWF0cml4O1xuXG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmUoQSkuX21hdHJpeDtcblxuICB2YXIgcGVybXV0YXRpb24gPSBpbml0UGVybXV0YXRpb24oc2l6ZSk7IC8vIGl0ZXJhdGUgZWFjaCBjb2x1bW5cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgIHZhciBwaXZvdElkeCA9IGo7XG4gICAgdmFyIHBpdm90ID0gY2xvbmVbcGVybXV0YXRpb25bal1dW2pdO1xuXG4gICAgd2hpbGUgKE1hdGguYWJzKHBpdm90KSA8IEVQU0lMT04gJiYgcGl2b3RJZHggPCBzaXplIC0gMSkge1xuICAgICAgcGl2b3RJZHgrKztcbiAgICAgIHBpdm90ID0gY2xvbmVbcGVybXV0YXRpb25bcGl2b3RJZHhdXVtqXTtcbiAgICB9XG5cbiAgICBpZiAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFNJTkdVTEFSX01BVFJJWCk7XG4gICAgfVxuXG4gICAgaWYgKGogIT09IHBpdm90SWR4KSB7XG4gICAgICB2YXIgdGVtcCA9IHBlcm11dGF0aW9uW2pdO1xuICAgICAgcGVybXV0YXRpb25bal0gPSBwZXJtdXRhdGlvbltwaXZvdElkeF07XG4gICAgICBwZXJtdXRhdGlvbltwaXZvdElkeF0gPSB0ZW1wO1xuICAgIH1cblxuICAgIHZhciBwaXZvdFJvdyA9IHBlcm11dGF0aW9uW2pdOyAvLyB0aGUgcGl2b3QgaXMgZ3VhcmFudGVlZCB0byBiZSBub24temVyb1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHZhciBpdGggPSBwZXJtdXRhdGlvbltpXTtcblxuICAgICAgaWYgKGkgPT09IGopIHtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzaXplOyBrKyspIHtcbiAgICAgICAgICBpZiAoayA9PT0gaikge1xuICAgICAgICAgICAgY2xvbmVbaXRoXVtrXSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGsgPiBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW2tdIC89IHBpdm90O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGludltpdGhdW2tdIC89IHBpdm90O1xuICAgICAgICB9XG5cbiAgICAgICAgcGl2b3QgPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gaiAmJiBNYXRoLmFicyhjbG9uZVtpdGhdW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHZhciBmYWN0b3IgPSBjbG9uZVtpdGhdW2pdIC8gcGl2b3Q7XG5cbiAgICAgICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IHNpemU7IF9rKyspIHtcbiAgICAgICAgICBpZiAoX2sgPT09IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1bX2tdID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2sgPiBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW19rXSAtPSBmYWN0b3IgKiBjbG9uZVtwaXZvdFJvd11bX2tdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGludltpdGhdW19rXSAtPSBmYWN0b3IgKiBpbnZbcGl2b3RSb3ddW19rXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBzaXplOyBfaSsrKSB7XG4gICAgY2xvbmVbX2ldID0gaW52W3Blcm11dGF0aW9uW19pXV07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY2xvbmUpO1xufVxuXG47XG5cbmZ1bmN0aW9uIGluaXRQZXJtdXRhdGlvbihzaXplKSB7XG4gIHZhciBwZXJtdXRhdGlvbiA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHBlcm11dGF0aW9uW2ldID0gaTtcbiAgfVxuXG4gIHJldHVybiBwZXJtdXRhdGlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBlbXB0eSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZW1wdHknKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcHJvZHVjdCBvZiB0d28gTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IEIgLSBBbnkgTWF0cml4IHRoYXQgaXMgc2l6ZS1jb21wYXRpYmxlIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgcHJvZHVjdCBvZiB0d28gTWF0cmljZXNcclxuICovXG5cblxuZnVuY3Rpb24gbXVsdGlwbHkoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICBBcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBBY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICBCcm93ID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBCY29sID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKEFjb2wgIT09IEJyb3cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeEEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gQi5fbWF0cml4O1xuICB2YXIgcmVzdWx0ID0gZW1wdHkoQXJvdywgQmNvbCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBBcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IEJjb2w7IGorKykge1xuICAgICAgcmVzdWx0W2ldW2pdID0gMDtcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBCcm93OyBrKyspIHtcbiAgICAgICAgcmVzdWx0W2ldW2pdICs9IG1hdHJpeEFbaV1ba10gKiBtYXRyaXhCW2tdW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhyZXN1bHQpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIElOVkFMSURfRVhQT05FTlQgPSBfcmVxdWlyZS5JTlZBTElEX0VYUE9ORU5UO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHBvd2VyIG9mIGFueSBzcXVhcmUgbWF0cml4LlxyXG4gKiBUaGUgYWxnb3JpdGhtIGlzIGltcGxlbWVudGVkIHJlY3Vyc2l2ZWx5LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgc3F1YXJlIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnQgLSBBbnkgTm9uLW5lZ2F0aXZlIGludGVnZXJcclxuICogQHJldHVybnMge01hdHJpeH0gVGhlIHBvd2VyIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gcG93KEEsIGV4cG9uZW50KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGV4cG9uZW50KSB8fCBleHBvbmVudCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9FWFBPTkVOVCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IEEuc2l6ZSgpWzBdO1xuXG4gIGlmIChleHBvbmVudCA9PT0gMCkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5KHNpemUpO1xuICB9XG5cbiAgaWYgKGV4cG9uZW50ID09PSAxKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoQSk7XG4gIH1cblxuICBpZiAoZXhwb25lbnQgJSAyID09PSAwKSB7XG4gICAgdmFyIF90ZW1wID0gdGhpcy5wb3coQSwgZXhwb25lbnQgLyAyKTtcblxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KF90ZW1wLCBfdGVtcCk7XG4gIH1cblxuICB2YXIgdGVtcCA9IHRoaXMucG93KEEsIChleHBvbmVudCAtIDEpIC8gMik7XG4gIHJldHVybiB0aGlzLm11bHRpcGx5KHRoaXMubXVsdGlwbHkodGVtcCwgdGVtcCksIEEpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHBvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBoYXMgc2FtZSBzaXplIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgZGlmZmVyZW5jZSBvZiB0d28gTWF0cmljZXNcclxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdWJ0cmFjdChBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICByb3cyID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBjb2wyID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyAhPT0gcm93MiB8fCBjb2wgIT09IGNvbDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeDEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXgyID0gQi5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4MVtpXVtqXSAtIG1hdHJpeDJbaV1bal07XG4gIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogRmluZCB0aGUgdHJhbnNwb3NlIG9mIGEgbWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHsgTWF0cml4IH0gQSAtIEFueSBNYXRyaXhcclxuICogQHJldHVybnMgeyBNYXRyaXggfSBSZXR1cm5zIHRyYW5zcG9zZSBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyYW5zcG9zZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoY29sLCByb3csIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtqXVtpXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNwb3NlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1BfTk9STSA9IF9yZXF1aXJlLklOVkFMSURfUF9OT1JNLFxuICAgIFNJTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLlNJTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRpb25zIHRoZSBjb25kaXRpb24gbnVtYmVyIG9mIHNxdWFyZSBNYXRyaXhcclxuICogd2l0aCByZXNwZWN0IHRvIHRoZSBjaG9pY2Ugb2YgTWF0cml4IG5vcm0uIFxyXG4gKiBJZiB0aGUgTWF0cml4IGlzIHNpbmd1bGFyLCByZXR1cm5zIEluZmluaXR5Ljxicj48YnI+XHJcbiAqIFRoZSBjb25kaXRpb24gbnVtYmVyIGlzIG5vdCBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7KDF8MnxJbmZpbml0eXwnRicpfSBwIC0gVHlwZSBvZiBNYXRyaXggbm9ybVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29uZGl0aW9uIG51bWJlciBvZiBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gY29uZCgpIHtcbiAgdmFyIHAgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDI7XG5cbiAgaWYgKHAgIT09IDEgJiYgcCAhPT0gMiAmJiBwICE9PSBJbmZpbml0eSAmJiBwICE9PSAnRicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9QX05PUk0pO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdmFyIGludmVyc2UgPSBNYXRyaXguaW52ZXJzZSh0aGlzKTtcbiAgICByZXR1cm4gaW52ZXJzZS5ub3JtKHApICogdGhpcy5ub3JtKHApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSBTSU5HVUxBUl9NQVRSSVgpIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNvbmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBzcXVhcmUgTWF0cml4LlxyXG4gKiBJZiB0aGUgTWF0cml4IHNpemUgaXMgbGFyZ2VyIHRoYW4gMywgaXQgY2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgdXNpbmdcclxuICogTFUgZGVjb21wb3NpdGlvbiwgb3RoZXJ3aXNlLCB1c2luZyBMZWlibml6IEZvcm11bGEuPGJyPjxicj5cclxuICogVGhlIGRldGVybWluYW50IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgZGV0ZXJtaW5hbnQgb2Ygc3F1YXJlIG1hdHJpcnhcclxuICovXG5cblxuZnVuY3Rpb24gZGV0KCkge1xuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2RldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBzaXplID0gbWF0cml4Lmxlbmd0aDtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIHRoaXMuX2RldCA9IDE7XG4gICAgcmV0dXJuIDE7IC8vIHRoZSBkZXRlcm1pbmFudCBvZiAweDAgbWF0cml4IG11c3QgYmUgMVxuICB9XG5cbiAgaWYgKHNpemUgPT09IDEpIHtcbiAgICB0aGlzLl9kZXQgPSBtYXRyaXhbMF1bMF07XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIGlmIChzaXplID09PSAyKSB7XG4gICAgdGhpcy5fZGV0ID0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzFdIC0gbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzBdO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gMykge1xuICAgIHRoaXMuX2RldCA9IG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsxXSAqIG1hdHJpeFsyXVsyXSArIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVsyXSAqIG1hdHJpeFsyXVswXSArIG1hdHJpeFswXVsyXSAqIG1hdHJpeFsxXVswXSAqIG1hdHJpeFsyXVsxXSAtIG1hdHJpeFswXVsyXSAqIG1hdHJpeFsxXVsxXSAqIG1hdHJpeFsyXVswXSAtIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVswXSAqIG1hdHJpeFsyXVsyXSAtIG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsyXSAqIG1hdHJpeFsyXVsxXTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdmFyIF9NYXRyaXgkTFUgPSBNYXRyaXguTFUodGhpcywgdHJ1ZSksXG4gICAgICBfTWF0cml4JExVMiA9IF9zbGljZWRUb0FycmF5KF9NYXRyaXgkTFUsIDIpLFxuICAgICAgUCA9IF9NYXRyaXgkTFUyWzBdLFxuICAgICAgTFUgPSBfTWF0cml4JExVMlsxXTtcblxuICB2YXIgbWF0cml4TFUgPSBMVS5fbWF0cml4OyAvLyBjb3VudCB3aGV0aGVyIHRoZSBudW1iZXIgb2YgcGVybXV0YXRpb25zIDxzd2FwPiBpcyBvZGQgb3IgZXZlblxuICAvLyBPKG5eMilcblxuICB2YXIgc3dhcCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoUFtpXSA9PT0gaSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgd2hpbGUgKFBbaV0gIT09IGkpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBQW2ldO1xuICAgICAgUFtpXSA9IFBbdGFyZ2V0XTtcbiAgICAgIFBbdGFyZ2V0XSA9IHRhcmdldDtcbiAgICAgIHN3YXArKztcbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gMTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzaXplOyBfaTIrKykge1xuICAgIHJlc3VsdCAqPSBtYXRyaXhMVVtfaTJdW19pMl07XG4gIH1cblxuICBpZiAoc3dhcCAlIDIgPT09IDEpIHtcbiAgICB0aGlzLl9kZXQgPSByZXN1bHQgKiAtMTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdGhpcy5fZGV0ID0gcmVzdWx0O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGRldDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLy8gcmVmZXJlbmNlOiBodHRwczovL3Blb3BsZS5pbmYuZXRoei5jaC9hcmJlbnovZXdwL0xub3Rlcy9jaGFwdGVyNC5wZGZcbnZhciBDb21wbGV4ID0gcmVxdWlyZSgnQHJheXlhbWhrL2NvbXBsZXgnKTtcblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGVpZ2VudmFsdWVzIG9mIGFueSBzcXVhcmUgTWF0cml4IHVzaW5nIFFSIEFsZ29yaXRobS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGVpZ2VudmFsdWVzIGNhbiBiZSBlaXRoZXIgcmVhbCBudW1iZXIgb3IgY29tcGxleCBudW1iZXIuXHJcbiAqIE5vdGUgdGhhdCBhbGwgZWlnZW52YWx1ZXMgYXJlIGluc3RhbmNlIG9mIENvbXBsZXgsXHJcbiAqIGZvciBtb3JlIGRldGFpbHMgcGxlYXNlIHZpc2l0IFtDb21wbGV4LmpzXXtAbGluayBodHRwczovL3JheXlhbWhrLmdpdGh1Yi5pby9Db21wbGV4LmpzfS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGVpZ2VudmFsdWVzIGFyZSBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4W119IEFycmF5IG9mIGVpZ2VudmFsdWVzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVpZ2VudmFsdWVzKCkge1xuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2VpZ2VudmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZWlnZW52YWx1ZXM7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpWzBdO1xuICB2YXIgdmFsdWVzID0gW107XG4gIHZhciBkaWdpdCA9IHRoaXMuX2RpZ2l0O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuXG4gIHZhciBjbG9uZSA9IE1hdHJpeC5jbG9uZSh0aGlzKS5fbWF0cml4O1xuXG4gIHZhciBpc0NvbnZlcmdlbnQgPSB0cnVlOyAvLyBmbGFnXG5cbiAgdmFyIHNraXAgPSBmYWxzZTsgLy8gVHJhbnNmb3JtIG1hdHJpeCB0byBIZXNzZW5iZXJnIG1hdHJpeFxuXG4gIEhvdXNlaG9sZGVyVHJhbnNmb3JtKGNsb25lLCBkaWdpdCk7XG5cbiAgZm9yICh2YXIgaSA9IHNpemUgLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIGRpdmVyZ2VuY2VDb3VudCA9IDA7XG4gICAgdmFyIHByZXYgPSB2b2lkIDA7IC8vIHVzZWQgdG8gZGV0ZXJtaW5lIGNvbnZlcmdlbmNlXG4gICAgLy8gaWYgb2J0YWlucyBjb21wbGV4IGVpZ2VudmFsdWVzIHBhaXIgaW4gcHJldmlvdXMgaXRlcmF0aW9uLCBza2lwIGN1cnJlbnQgcm91bmRcblxuICAgIGlmIChza2lwKSB7XG4gICAgICBza2lwID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgc2hpZnQgPSBjbG9uZVtzaXplIC0gMV1bc2l6ZSAtIDFdOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKCFpc0NvbnZlcmdlbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZSBpcyBub3QgcmVhbFxuICAgICAgICBwcmV2ID0gc2l6ZTJFaWdlbnZhbHVlcyhjbG9uZVtpIC0gMV1baSAtIDFdLCBjbG9uZVtpIC0gMV1baV0sIGNsb25lW2ldW2kgLSAxXSwgY2xvbmVbaV1baV0pLm1ldHJpYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWUgaXMgcmVhbFxuICAgICAgICBwcmV2ID0gTWF0aC5hYnMoY2xvbmVbaV1baSAtIDFdKTtcbiAgICAgIH0gLy8gYXBwbHkgc2luZ2xlIHNoaWZ0XG5cblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgY2xvbmVbal1bal0gLT0gc2hpZnQ7XG4gICAgICB9IC8vIEFwcGx5IFFSIEFsZ29yaXRobVxuXG5cbiAgICAgIEhlc3NlbmJlcmdRUihjbG9uZSwgZGlnaXQpO1xuXG4gICAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgc2l6ZTsgX2orKykge1xuICAgICAgICBjbG9uZVtfal1bX2pdICs9IHNoaWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDb252ZXJnZW50ICYmIHByZXYgPCBNYXRoLmFicyhjbG9uZVtpXVtpIC0gMV0pKSB7XG4gICAgICAgIGRpdmVyZ2VuY2VDb3VudCsrO1xuICAgICAgfSAvLyBpZiB0aGUgY3VycmVudCBlaWdlbnZhbHVlIGlzIHJlYWwgYW5kIHRoZSBlbnRyeSBpcyBhbG1vc3QgWkVSTyA9PiBicmVhaztcblxuXG4gICAgICBpZiAoaXNDb252ZXJnZW50ICYmIE1hdGguYWJzKGNsb25lW2ldW2kgLSAxXSkgPCBFUFNJTE9OKSB7XG4gICAgICAgIHZhbHVlc1tpXSA9IG5ldyBDb21wbGV4KGNsb25lW2ldW2ldKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWVzIHBhaXIgaXMgY29tcGxleCwgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdGhlIHByZXZpb3VzIGVpZ2FudmFsdWVzIGFuZCB0aGVcbiAgICAgIC8vIGVpZ2VudmFsdWVzIG9mIHN1Ym1hdHJpeCBpcyBhbG1vc3QgWkVSTyA9PiBicmVha1xuXG5cbiAgICAgIHZhciBfc2l6ZTJFaWdlbnZhbHVlcyA9IHNpemUyRWlnZW52YWx1ZXMoY2xvbmVbaSAtIDFdW2kgLSAxXSwgY2xvbmVbaSAtIDFdW2ldLCBjbG9uZVtpXVtpIC0gMV0sIGNsb25lW2ldW2ldKSxcbiAgICAgICAgICBtZXRyaWMgPSBfc2l6ZTJFaWdlbnZhbHVlcy5tZXRyaWMsXG4gICAgICAgICAgZWlnZW4xID0gX3NpemUyRWlnZW52YWx1ZXMuZWlnZW4xLFxuICAgICAgICAgIGVpZ2VuMiA9IF9zaXplMkVpZ2VudmFsdWVzLmVpZ2VuMjtcblxuICAgICAgaWYgKCFpc0NvbnZlcmdlbnQgJiYgTWF0aC5hYnMocHJldiAtIG1ldHJpYykgPCBFUFNJTE9OKSB7XG4gICAgICAgIGlzQ29udmVyZ2VudCA9IHRydWU7IC8vIHJlLWluaXRpYWxpemVcblxuICAgICAgICBza2lwID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJlMSA9IGVpZ2VuMS5yZSxcbiAgICAgICAgICAgIGltMSA9IGVpZ2VuMS5pbTtcbiAgICAgICAgdmFyIHJlMiA9IGVpZ2VuMi5yZSxcbiAgICAgICAgICAgIGltMiA9IGVpZ2VuMi5pbTtcbiAgICAgICAgdmFsdWVzW2ldID0gbmV3IENvbXBsZXgocmUxLCBpbTEpO1xuICAgICAgICB2YWx1ZXNbaSAtIDFdID0gbmV3IENvbXBsZXgocmUyLCBpbTIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gLy8gaWYgdGhlIGVudHJ5IGRvZXNuJ3QgY29udmVyZ2UgPT4gY29tcGxleCBlaWdlbnZhbHVlcyBwYWlyXG5cblxuICAgICAgaWYgKGRpdmVyZ2VuY2VDb3VudCA+IDMpIHtcbiAgICAgICAgaXNDb252ZXJnZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFza2lwKSB7XG4gICAgdmFsdWVzWzBdID0gbmV3IENvbXBsZXgoY2xvbmVbMF1bMF0pO1xuICB9XG5cbiAgdGhpcy5fZWlnZW52YWx1ZXMgPSB2YWx1ZXM7XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbjtcblxuZnVuY3Rpb24gSG91c2Vob2xkZXJUcmFuc2Zvcm0oQSwgZGlnaXQpIHtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemUgLSAyOyBqKyspIHtcbiAgICB2YXIgeE5vcm0gPSAwO1xuICAgIHZhciB1ID0gbmV3IEFycmF5KHNpemUgLSBqIC0gMSk7XG5cbiAgICBmb3IgKHZhciBpID0gaiArIDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHZhciBlbnRyeSA9IEFbaV1bal07XG4gICAgICB4Tm9ybSArPSBNYXRoLnBvdyhlbnRyeSwgMik7XG4gICAgICB1W2kgLSBqIC0gMV0gPSBlbnRyeTtcbiAgICB9XG5cbiAgICB4Tm9ybSA9IE1hdGguc3FydCh4Tm9ybSk7XG5cbiAgICBpZiAoTWF0aC5hYnMoeE5vcm0pIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHVbMF0gPj0gMCkge1xuICAgICAgdVswXSArPSB4Tm9ybTtcbiAgICB9IGVsc2Uge1xuICAgICAgdVswXSAtPSB4Tm9ybTtcbiAgICB9IC8vIE1ha2UgJ3UnIHVuaXQgdmVjdG9yXG5cblxuICAgIHZhciB1Tm9ybSA9IDA7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgdS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHVOb3JtICs9IE1hdGgucG93KHVbX2ldLCAyKTtcbiAgICB9XG5cbiAgICB1Tm9ybSA9IE1hdGguc3FydCh1Tm9ybSk7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCB1Lmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHVbX2kyXSAvPSB1Tm9ybTtcbiAgICB9IC8vIHVwZGF0ZSB0aGUgbWF0cml4LCBtdWx0aXBseSBQIGZyb20gbGVmdFxuXG5cbiAgICBmb3IgKHZhciBuID0gajsgbiA8IHNpemU7IG4rKykge1xuICAgICAgLy8gY29sdW1uXG4gICAgICB2YXIgdiA9IG5ldyBBcnJheShzaXplIC0gaiAtIDEpO1xuXG4gICAgICBmb3IgKHZhciBtID0gaiArIDE7IG0gPCBzaXplOyBtKyspIHtcbiAgICAgICAgdlttIC0gaiAtIDFdID0gQVttXVtuXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjYWxlciA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9tID0gMDsgX20gPCB2Lmxlbmd0aDsgX20rKykge1xuICAgICAgICBzY2FsZXIgKz0gdltfbV0gKiB1W19tXTtcbiAgICAgIH1cblxuICAgICAgc2NhbGVyICo9IDI7XG5cbiAgICAgIGZvciAodmFyIF9tMiA9IGogKyAxOyBfbTIgPCBzaXplOyBfbTIrKykge1xuICAgICAgICAvLyByb3dcbiAgICAgICAgaWYgKG4gPT09IGogJiYgX20yICE9PSBqICsgMSkge1xuICAgICAgICAgIEFbX20yXVtuXSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQVtfbTJdW25dID0gdltfbTIgLSBqIC0gMV0gLSBzY2FsZXIgKiB1W19tMiAtIGogLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gdXBkYXRlIHRoZSBtYXRyaXgsIG11bHRpcGx5IFAgZnJvbSByaWdodFxuXG5cbiAgICBmb3IgKHZhciBfbTMgPSAwOyBfbTMgPCBzaXplOyBfbTMrKykge1xuICAgICAgLy8gcm93XG4gICAgICB2YXIgX3YgPSBuZXcgQXJyYXkoc2l6ZSAtIGogLSAxKTtcblxuICAgICAgZm9yICh2YXIgX24gPSBqICsgMTsgX24gPCBzaXplOyBfbisrKSB7XG4gICAgICAgIF92W19uIC0gaiAtIDFdID0gQVtfbTNdW19uXTtcbiAgICAgIH1cblxuICAgICAgdmFyIF9zY2FsZXIgPSAwO1xuXG4gICAgICBmb3IgKHZhciBfbjIgPSAwOyBfbjIgPCBfdi5sZW5ndGg7IF9uMisrKSB7XG4gICAgICAgIF9zY2FsZXIgKz0gX3ZbX24yXSAqIHVbX24yXTtcbiAgICAgIH1cblxuICAgICAgX3NjYWxlciAqPSAyO1xuXG4gICAgICBmb3IgKHZhciBfbjMgPSBqICsgMTsgX24zIDwgc2l6ZTsgX24zKyspIHtcbiAgICAgICAgLy8gY29sdW1uXG4gICAgICAgIEFbX20zXVtfbjNdID0gX3ZbX24zIC0gaiAtIDFdIC0gX3NjYWxlciAqIHVbX24zIC0gaiAtIDFdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBIZXNzZW5iZXJnUVIoSCwgZGlnaXQpIHtcbiAgdmFyIHNpemUgPSBILmxlbmd0aDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpbmNvcyA9IG5ldyBBcnJheShzaXplIC0gMSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgdmFyIGEgPSBIW2ldW2ldO1xuICAgIHZhciBjID0gSFtpICsgMV1baV07XG4gICAgdmFyIG5vcm0gPSBNYXRoLnNxcnQoTWF0aC5wb3coYSwgMikgKyBNYXRoLnBvdyhjLCAyKSk7XG5cbiAgICBpZiAobm9ybSA8IEVQU0lMT04pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBjb3MgPSBhIC8gbm9ybTtcbiAgICB2YXIgc2luID0gYyAqIC0xIC8gbm9ybTtcbiAgICBzaW5jb3NbaV0gPSBbc2luLCBjb3NdO1xuICAgIHZhciByb3cxID0gbmV3IEFycmF5KHNpemUgLSBpKTtcbiAgICB2YXIgcm93MiA9IG5ldyBBcnJheShzaXplIC0gaSk7XG5cbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IHNpemU7IGorKykge1xuICAgICAgcm93MVtqIC0gaV0gPSBIW2ldW2pdO1xuICAgICAgcm93MltqIC0gaV0gPSBIW2kgKyAxXVtqXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfajIgPSBpOyBfajIgPCBzaXplOyBfajIrKykge1xuICAgICAgSFtpXVtfajJdID0gY29zICogcm93MVtfajIgLSBpXSArIHNpbiAqIC0xICogcm93MltfajIgLSBpXTtcblxuICAgICAgaWYgKGkgPT09IF9qMikge1xuICAgICAgICBIW2kgKyAxXVtfajJdID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEhbaSArIDFdW19qMl0gPSBzaW4gKiByb3cxW19qMiAtIGldICsgY29zICogcm93MltfajIgLSBpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfajMgPSAwOyBfajMgPCBzaXplIC0gMTsgX2ozKyspIHtcbiAgICBpZiAoIXNpbmNvc1tfajNdKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgX3NpbmNvcyRfaiA9IF9zbGljZWRUb0FycmF5KHNpbmNvc1tfajNdLCAyKSxcbiAgICAgICAgX3NpbiA9IF9zaW5jb3MkX2pbMF0sXG4gICAgICAgIF9jb3MgPSBfc2luY29zJF9qWzFdO1xuXG4gICAgdmFyIGNvbDEgPSBuZXcgQXJyYXkoX2ozICsgMik7XG4gICAgdmFyIGNvbDIgPSBuZXcgQXJyYXkoX2ozICsgMik7XG5cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPD0gX2ozICsgMTsgX2kzKyspIHtcbiAgICAgIGNvbDFbX2kzXSA9IEhbX2kzXVtfajNdO1xuICAgICAgY29sMltfaTNdID0gSFtfaTNdW19qMyArIDFdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8PSBfajMgKyAxOyBfaTQrKykge1xuICAgICAgSFtfaTRdW19qM10gPSBjb2wxW19pNF0gKiBfY29zIC0gY29sMltfaTRdICogX3NpbjtcbiAgICAgIEhbX2k0XVtfajMgKyAxXSA9IGNvbDFbX2k0XSAqIF9zaW4gKyBjb2wyW19pNF0gKiBfY29zO1xuICAgIH1cbiAgfVxufSAvLyBmaW5kIHRoZSBlaWdlbnZhbHVlcyBvZiAyeDIgbWF0cml4XG5cblxuZnVuY3Rpb24gc2l6ZTJFaWdlbnZhbHVlcyhlMTEsIGUxMiwgZTIxLCBlMjIpIHtcbiAgdmFyIGIgPSAoZTExICsgZTIyKSAqIC0xO1xuICB2YXIgYyA9IGUxMSAqIGUyMiAtIGUyMSAqIGUxMjtcbiAgdmFyIGRlbHRhID0gTWF0aC5wb3coYiwgMikgLSA0ICogYztcbiAgdmFyIHJlMTtcbiAgdmFyIGltMTtcbiAgdmFyIHJlMjtcbiAgdmFyIGltMjtcblxuICBpZiAoZGVsdGEgPj0gMCkge1xuICAgIGltMSA9IDA7XG4gICAgaW0yID0gMDtcblxuICAgIGlmIChiID49IDApIHtcbiAgICAgIHJlMSA9IChiICogLTEgLSBNYXRoLnNxcnQoZGVsdGEpKSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlMSA9IChiICogLTEgKyBNYXRoLnNxcnQoZGVsdGEpKSAvIDI7XG4gICAgfVxuXG4gICAgcmUyID0gYyAvIHJlMTtcbiAgfSBlbHNlIHtcbiAgICByZTEgPSAtYiAvIDI7XG4gICAgcmUyID0gcmUxO1xuICAgIGltMSA9IE1hdGguc3FydChkZWx0YSAqIC0xKSAvIDI7XG4gICAgaW0yID0gaW0xICogLTE7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1ldHJpYzogTWF0aC5zcXJ0KE1hdGgucG93KHJlMSwgMikgKyBNYXRoLnBvdyhpbTEsIDIpKSxcbiAgICBlaWdlbjE6IHtcbiAgICAgIHJlOiByZTEsXG4gICAgICBpbTogaW0xXG4gICAgfSxcbiAgICBlaWdlbjI6IHtcbiAgICAgIHJlOiByZTIsXG4gICAgICBpbTogaW0yXG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVpZ2VudmFsdWVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUF9OT1JNID0gX3JlcXVpcmUuSU5WQUxJRF9QX05PUk07XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgTWF0cml4IG5vcm0gb2YgYW55IE1hdHJpeCB3aXRoIHJlc3BlY3QgdG8gdGhlIGNob2ljZSBvZiBub3JtLjxicj48YnI+XHJcbiAqIFxyXG4gKiAxLW5vcm06IE1heGltdW0gYWJzb2x1dGUgY29sdW1uIHN1bSBvZiB0aGUgTWF0cml4Ljxicj5cclxuICogMi1ub3JtOiBUaGUgbGFyZ2VzdCBzaW5ndWxhciB2YWx1ZSBvZiBNYXRyaXguPGJyPlxyXG4gKiBJbmZpbml0eS1ub3JtOiBNYXhpbXVtIGFic29sdXRlIHJvdyBzdW0gb2YgdGhlIE1hdHJpeC48YnI+XHJcbiAqIEZyb2Jlbml1cy1ub3JtOiBFdWNsaWRlYW4gbm9ybSBpbnZsb3ZpbmcgYWxsIGVudHJpZXMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBub3JtcyBhcmUgbm90IGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHsoMXwyfEluZmluaXR5fCdGJyl9IHAgLSBUaGUgY2hvaWNlIG9mIE1hdHJpeCBub3JtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBub3JtIG9mIHRoZSBNYXRyaXguXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIG5vcm0oKSB7XG4gIHZhciBwID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAyO1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocCAhPT0gMSAmJiBwICE9PSAyICYmIHAgIT09IEluZmluaXR5ICYmIHAgIT09ICdGJykge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1BfTk9STSk7XG4gIH1cblxuICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICB2YXIgcmVzdWx0ID0gMDtcblxuICBpZiAocCA9PT0gMSkge1xuICAgIC8vIG1heCBvZiBjb2x1bW4gc3VtXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgdmFyIGNvbHVtblN1bSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICAgICAgY29sdW1uU3VtICs9IE1hdGguYWJzKG1hdHJpeFtpXVtqXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW5TdW0gPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gY29sdW1uU3VtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gLy8gbGFyZ2VzdCBzaW5ndWxhciB2YWx1ZVxuXG5cbiAgaWYgKHAgPT09IDIpIHtcbiAgICB2YXIgdHJhbnNwb3NlID0gTWF0cml4LnRyYW5zcG9zZSh0aGlzKTtcbiAgICB2YXIgTSA9IE1hdHJpeC5tdWx0aXBseSh0cmFuc3Bvc2UsIHRoaXMpO1xuICAgIHZhciBlaWdlbnZhbHVlcyA9IE0uZWlnZW52YWx1ZXMoKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGVpZ2VudmFsdWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGVpZ2VudmFsdWVzW19pMl0uZ2V0TW9kdWx1cygpO1xuXG4gICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xuICB9XG5cbiAgaWYgKHAgPT09IEluZmluaXR5KSB7XG4gICAgLy8gbWF4IG9mIHJvdyBzdW1cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCByb3c7IF9pMysrKSB7XG4gICAgICB2YXIgcm93U3VtID0gMDtcblxuICAgICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IGNvbDsgX2orKykge1xuICAgICAgICByb3dTdW0gKz0gTWF0aC5hYnMobWF0cml4W19pM11bX2pdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvd1N1bSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSByb3dTdW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSAvLyBGXG5cblxuICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCByb3c7IF9pNCsrKSB7XG4gICAgZm9yICh2YXIgX2oyID0gMDsgX2oyIDwgY29sOyBfajIrKykge1xuICAgICAgcmVzdWx0ICs9IE1hdGgucG93KG1hdHJpeFtfaTRdW19qMl0sIDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBub3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbnVsbGl0eSBvZiBhbnkgTWF0cml4LCB3aGljaCBpcyB0aGUgZGltZW5zaW9uXHJcbiAqIG9mIHRoZSBudWxsc3BhY2UuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBudWxsaXR5IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG51bGxpdHkgb2YgdGhlIG1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIG51bGxpdHkoKSB7XG4gIGlmICh0aGlzLl9udWxsaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVsbGl0eTtcbiAgfVxuXG4gIHZhciBjb2wgPSB0aGlzLnNpemUoKVsxXTtcbiAgdmFyIHJhbmsgPSB0aGlzLnJhbmsoKTtcbiAgdGhpcy5fbnVsbGl0eSA9IGNvbCAtIHJhbms7XG4gIHJldHVybiB0aGlzLl9udWxsaXR5O1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG51bGxpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcmFuayBvZiBhbnkgTWF0cml4LFxyXG4gKiB3aGljaCBpcyB0aGUgZGltZW5zaW9uIG9mIHRoZSByb3cgc3BhY2UuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByYW5rIGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJhbmsgb2YgdGhlIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiByYW5rKCkge1xuICBpZiAodGhpcy5fcmFuayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhbms7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIHRoaXMuX2RpZ2l0KSAqIDIpO1xuICB2YXIgUiA9IE1hdHJpeC5RUih0aGlzKVsxXTtcbiAgdmFyIG1hdHJpeFIgPSBSLl9tYXRyaXg7XG5cbiAgdmFyIF9SJHNpemUgPSBSLnNpemUoKSxcbiAgICAgIF9SJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX1Ikc2l6ZSwgMiksXG4gICAgICByb3cgPSBfUiRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9SJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgPT09IDApIHtcbiAgICB0aGlzLl9yYW5rID0gMTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciByayA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSBpOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhtYXRyaXhSW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHJrKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX3JhbmsgPSByaztcbiAgcmV0dXJuIHJrO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHJhbms7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzaXplIG9mIGFueSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIGluIHRoZSBmb3JtIG9mIFtyb3csIGNvbHVtbl0uPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBzaXplIG9mIE1hdHJpeCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gVGhlIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zIG9mIGEgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gc2l6ZSgpIHtcbiAgaWYgKHRoaXMuX3NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgaWYgKEEubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fc2l6ZSA9IFswLCAwXTtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIHRoaXMuX3NpemUgPSBbQS5sZW5ndGgsIEFbMF0ubGVuZ3RoXTtcbiAgcmV0dXJuIHRoaXMuX3NpemU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc2l6ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgdHJhY2Ugb2YgYW55IHNxdWFyZSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIHRoZSBzdW0gb2YgYWxsIGVudHJpZXMgb24gdGhlIG1haW4gZGlhZ29uYWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSB0cmFjZSBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSB0cmFjZSBvZiB0aGUgc3F1YXJlIE1hdHJpeC5cclxuICovXG5cblxuZnVuY3Rpb24gdHJhY2UoKSB7XG4gIHZhciBpc1NxdWFyZSA9IHRoaXMuX2lzU3F1YXJlICE9PSB1bmRlZmluZWQgPyB0aGlzLl9pc1NxdWFyZSA6IHRoaXMuaXNTcXVhcmUoKTtcblxuICBpZiAoIWlzU3F1YXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fdHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl90cmFjZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICB2YXIgdHIgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgdHIgKz0gQVtpXVtpXTtcbiAgfVxuXG4gIHRoaXMuX3RyYWNlID0gdHI7XG4gIHJldHVybiB0cjtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFjZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIGRpYWdvbmFsIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogRGlhZ29uYWwgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIHRoZSBlbnRyaWVzIG91dHNpZGUgdGhlIG1haW4gZGlhZ29uYWxcclxuICogYXJlIGFsbCB6ZXJvLiBOb3RlIHRoYXQgdGhlIHRlcm0gZGlhZ29uYWwgcmVmZXJzIHRvIHJlY3Rhbmd1bGFyIGRpYWdvbmFsLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgcnVlIGlmIHRoZSBNYXRyaXggaXMgZGlhZ29uYWwgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gaXNEaWFnb25hbCgpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNEaWFnb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlhZ29uYWw7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIHRoaXMuX2lzRGlhZ29uYWwgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKEFbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5pc0RpYWdvbmFsID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc0RpYWdvbmFsID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNEaWFnb25hbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIGxvd2VyIHRyaWFuZ3VsYXIgTWF0cml4IG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogTG93ZXIgdHJpYW5ndWxhciBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHRoZSBlbnRyaWVzXHJcbiAqIGFib3ZlIHRoZSBtYWluIGRpYWdvbmFsIGFyZSB6ZXJvLiBOb3RlIHRoYXQgaXQgY2FuIGJlIGFwcGxpZWRcclxuICogdG8gYW55IG5vbi1zcXVhcmUgTWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgTWF0cml4IGlzIGxvd2VyIHRyaWFuZ3VsYXJcclxuICovXG5mdW5jdGlvbiBpc0xvd2VyVHJpYW5ndWxhcigpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhcjtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgLy8gW11cbiAgICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzTG93ZXJUcmlhbmd1bGFyOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3F1YXJlIE1hdHJpeCBpcyBvcnRob2dvbmFsIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogT3J0aG9nb25hbCBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHJvd3MgYW5kIGNvbHVtbnMgYXJlXHJcbiAqIG9ydGhvbm9ybWFsIHZlY3RvcnMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzcXVhcmUgTWF0cml4IGlzIG9ydGhvZ29uYWxcclxuICovXG5mdW5jdGlvbiBpc09ydGhvZ29uYWwoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzT3J0aG9nb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3J0aG9nb25hbDtcbiAgfVxuXG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhpcy5faXNPcnRob2dvbmFsID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IHNpemU7IGorKykge1xuICAgICAgdmFyIGVudHJ5ID0gMDtcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzaXplOyBrKyspIHtcbiAgICAgICAgZW50cnkgKz0gQVtpXVtrXSAqIEFbal1ba107XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSBqICYmIE1hdGguYWJzKGVudHJ5IC0gMSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gaiAmJiBNYXRoLmFicyhlbnRyeSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzT3J0aG9nb25hbCA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzT3J0aG9nb25hbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIHNxdWFyZSBNYXRyaXggaXMgc2tldyBzeW1tZXRyaWMgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBTa2V3IHN5bW1ldHJpYyBNYXRyaXggaXMgYSBzcXVhcmUgTWF0cml4IHdob3NlIHRyYW5zcG9zZSBlcXVhbHMgaXRzIG5lZ2F0aXZlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgc3F1YXJlIE1hdHJpeCBpcyBza2V3IHN5bW1ldHJpY1xyXG4gKi9cbmZ1bmN0aW9uIGlzU2tld1N5bW1ldHJpYygpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNTa2V3U3ltbWV0cmljICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTa2V3U3ltbWV0cmljO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7IC8vIFtdXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSArIEFbal1baV0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1NrZXdTeW1tZXRyaWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgc3F1YXJlIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogU3F1YXJlIE1hdHJpeCBpcyBhIE1hdHJpeCB3aXRoIHNhbWUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgc3F1YXJlXHJcbiAqL1xuZnVuY3Rpb24gaXNTcXVhcmUoKSB7XG4gIGlmICh0aGlzLl9pc1NxdWFyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgaWYgKEEubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gMHgwIG1hdHJpeFxuICAgIHRoaXMuX2lzU3F1YXJlID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuX2lzU3F1YXJlID0gQS5sZW5ndGggPT09IEFbMF0ubGVuZ3RoO1xuICByZXR1cm4gdGhpcy5faXNTcXVhcmU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTcXVhcmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzcXVhcmUgTWF0cml4IGlzIHN5bW1ldHJpYyBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFN5bW1ldHJpYyBNYXRyaXggaXMgYSBzcXVhcmUgTWF0cml4IHRoYXQgaXMgZXF1YWwgdG8gaXRzIHRyYW5zcG9zZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNxdWFyZSBNYXRyaXggaXMgc3ltbWV0cmljXHJcbiAqL1xuZnVuY3Rpb24gaXNTeW1tZXRyaWMoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzU3ltbWV0cmljICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTeW1tZXRyaWM7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gaTsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSAtIEFbal1baV0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzU3ltbWV0cmljID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTeW1tZXRyaWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIE1hdHJpeCBpcyB1cHBlciB0cmlhbmd1bGFyIE1hdHJpeCBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIGFsbCB0aGUgZW50cmllcyBiZWxvdyB0aGVcclxuICogbWFpbiBkaWFnb25hbCBhcmUgemVyby4gTm90ZSB0aGF0IGl0IGNhbiBiZSBhcHBsaWVkIHRvIGFueSBub24tc3F1YXJlIE1hdHJpeC48YnI+PGJyPlxyXG4gKiAgXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgdXBwZXIgdHJpYW5ndWxhclxyXG4gKi9cbmZ1bmN0aW9uIGlzVXBwZXJUcmlhbmd1bGFyKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgPT09IDApIHtcbiAgICAvLyBbXVxuICAgIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBpZiAoaSA8PSBqKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1VwcGVyVHJpYW5ndWxhcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ3JlYXRlcyBhIGNvcHkgb2YgTWF0cml4LiBOb3RlIHRoYXQgaXQgcmVzZXRzIHRoZSBjYWNoZWQgZGF0YS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBDb3B5IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gY2xvbmUoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBtYXRyaXhbaV1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MLFxuICAgIE9WRVJGTE9XX0NPTFVNTiA9IF9yZXF1aXJlLk9WRVJGTE9XX0NPTFVNTixcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGNvbHVtbiBvZiBhIE1hdHJpeCB3aXRoIHZhbGlkIGluZGV4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEFueSB2YWxpZCBjb2x1bW4gaW5kZXhcclxuICogQHJldHVybnMge01hdHJpeH0gQ29sdW1uIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gY29sdW1uKEEsIGluZGV4KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaW5kZXgpIHx8IGluZGV4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjID0gX0Ekc2l6ZTJbMV07XG5cbiAgaWYgKGluZGV4ID49IGMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHIsIDEsIGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpXVtpbmRleF07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNvbHVtbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvaXNOdW1iZXInKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX0FSUkFZID0gX3JlcXVpcmUuSU5WQUxJRF9BUlJBWSxcbiAgICBFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTID0gX3JlcXVpcmUuRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogR2VuZXJhdGVzIGRpYWdvbmFsIE1hdHJpeCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXkgb2YgbnVtYmVycyxcclxuICogZ2VuZXJhdGVzIGJsb2NrIGRpYWdvbmFsIE1hdHJpeCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXkgb2YgTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0geyhudW1iZXJbXXxNYXRyaXhbXSl9IHZhbHVlcyAtIEFycmF5IG9mIG51bWJlcnMgb3IgTWF0cmljZXNcclxuICogQHJldHVybnMge01hdHJpeH0gQmxvY2sgZGlhZ29uYWwgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGRpYWcodmFsdWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQVJSQVkpO1xuICB9XG5cbiAgdmFyIGFyZ3NOdW0gPSB2YWx1ZXMubGVuZ3RoO1xuICB2YXIgdmFyaWFudDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3NOdW07IGkrKykge1xuICAgIHZhciBlbnRyeSA9IHZhbHVlc1tpXTtcblxuICAgIGlmICghaXNOdW1iZXIoZW50cnkpICYmICEoZW50cnkgaW5zdGFuY2VvZiBNYXRyaXgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKGVudHJ5KSkge1xuICAgICAgaWYgKCF2YXJpYW50KSB7XG4gICAgICAgIHZhcmlhbnQgPSAnbnVtYmVyJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJpYW50ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZW50cnkuaXNTcXVhcmUoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF2YXJpYW50KSB7XG4gICAgICAgIHZhcmlhbnQgPSAnc3F1YXJlJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJpYW50ICE9PSAnc3F1YXJlJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIEhFUkU6IHZhcmlhbnQgc2hvdWxkIGJlIGVpdGhlciAnbnVtYmVyJyBvciAnc3F1YXJlJ1xuXG5cbiAgaWYgKHZhcmlhbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdHJpeC5nZW5lcmF0ZShhcmdzTnVtLCBhcmdzTnVtLCBmdW5jdGlvbiAoaSwgaikge1xuICAgICAgaWYgKGkgPT09IGopIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH0gLy8gR3VhcmFudGVlZCB0aGF0IFt2YWx1ZXNdIGlzIGEgbGlzdCBvZiBzcXVhcmUgbWF0cmljZXNcblxuXG4gIHZhciBzaXplID0gMDtcbiAgdmFyIHRlbXAgPSBuZXcgQXJyYXkoYXJnc051bSk7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3NOdW07IF9pKyspIHtcbiAgICB2YXIgX2xlbiA9IHZhbHVlc1tfaV0uc2l6ZSgpWzBdO1xuXG4gICAgc2l6ZSArPSBfbGVuO1xuICAgIHRlbXBbX2ldID0gX2xlbjtcbiAgfVxuXG4gIHZhciBpZHggPSAwO1xuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgbGVuID0gdGVtcFtpZHhdO1xuICByZXR1cm4gTWF0cml4LmdlbmVyYXRlKHNpemUsIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgLSBzdGFydCA9PT0gbGVuICYmIGogLSBzdGFydCA9PT0gbGVuKSB7XG4gICAgICBzdGFydCArPSBsZW47XG4gICAgICBpZHgrKztcbiAgICB9XG5cbiAgICB2YXIgaXRoID0gaSAtIHN0YXJ0OyAvLyBpdGggPCAwIGlmIGJlbG93IG1haW4gZGlhZ29uYWxcblxuICAgIHZhciBqdGggPSBqIC0gc3RhcnQ7IC8vIGp0aCA8IDAgaWYgYWJvdmUgbWFpbiBkaWFnb25hbFxuICAgIC8vIHNraXAgMHgwIG1hdHJpY2VzXG5cbiAgICBsZW4gPSB0ZW1wW2lkeF07XG5cbiAgICB3aGlsZSAobGVuID09PSAwKSB7XG4gICAgICBpZHgrKztcbiAgICAgIGxlbiA9IHRlbXBbaWR4XTtcbiAgICB9XG5cbiAgICBpZiAoaXRoIDwgbGVuICYmIGl0aCA+PSAwICYmIGp0aCA8IGxlbiAmJiBqdGggPj0gMCkge1xuICAgICAgcmV0dXJuIHZhbHVlc1tpZHhdLl9tYXRyaXhbaXRoXVtqdGhdO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBkaWFnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBUaGlzIGNhbGxiYWNrIGFwcGxpZXMgb24gZWFjaCBlbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAY2FsbGJhY2sgZW50cnlDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gZW50cnkgLSBFbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBOZXcgZW50cnkgdmFsdWVcclxuICovXG5cbi8qKlxyXG4gKiBBcHBseXMgYSBmdW5jdGlvbiBvdmVyIGVhY2ggZW50cnkgb2YgYSBNYXRyaXggYW5kIHJldHVybnNcclxuICogYSBuZXcgY29weSBvZiB0aGUgbmV3IE1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge2VudHJ5Q2FsbGJhY2t9IGNiIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggYXBwbGllcyBvbiBlYWNoIGVudHJ5IG9mIEFcclxuICogQHJldHVybnMge01hdHJpeH0gQSBjb3B5IG9mIG5ldyBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gZWxlbWVudHdpc2UoQSwgY2IpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gY2IobWF0cml4W2ldW2pdKTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZWxlbWVudHdpc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfSU5ERVggPSBfcmVxdWlyZS5PVkVSRkxPV19JTkRFWDtcbi8qKlxyXG4gKiBHZXRzIHRoZSBlbnRyeSBvZiBhIE1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIEFueSB2YWxpZCByb3cgaW5kZXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIEFueSB2YWxpZCBjb2x1bW4gaW5kZXhcclxuICogQHJldHVybnMge251bWJlcn0gRW50cnkgb2YgdGhlIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBlbnRyeShyb3csIGNvbCkge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93KSB8fCByb3cgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGNvbCkgfHwgY29sIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA+PSByIHx8IGNvbCA+PSBjKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0lOREVYKTtcbiAgfVxuXG4gIHJldHVybiBBW3Jvd11bY29sXTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBlbnRyeTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRmxhdHRlbiB0aGUgbWF0cml4IHRvIGFuIGFycmF5XHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gQSBmbGF0dGVuIGFycmF5XHJcbiAqL1xuZnVuY3Rpb24gZmxhdHRlbigpIHtcbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIHZhciBsZW5ndGggPSByb3cgKiBjb2w7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkobGVuZ3RoKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgYXJyW2kgKiBjb2wgKyBqXSA9IHRoaXMuX21hdHJpeFtpXVtqXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIG1hdHJpeCBmcm9tIGFuIGFycmF5IHdpdGggY29tcGF0aWJsZSBkaW1lbnNpb25zIFxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gU291cmNlIGFycmF5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBSb3cgb2YgdGhlIG1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gQ29sdW1uIG9mIHRoZSBtYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGZyb21BcnJheShhcnIsIHJvdywgY29sKSB7XG4gIGlmIChyb3cgKiBjb2wgIT09IGFyci5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIGFycltpICogY29sICsgal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGZyb21BcnJheTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgZ2VuZXJhdGVzIGVhY2ggZW50cnkgb2YgYSBNYXRyaXhcclxuICogQGNhbGxiYWNrIGdlbmVyYXRlQ2FsbGJhY2tcclxuICogQHBhcmFtIHtudW1iZXJ9IGkgLSBUaGUgaS10aCByb3cgb2YgTWF0cml4IFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiAtIFRoZSBqLXRoIGNvbHVtbiBvZiBNYXRyaXggXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEVudHJ5IG9mIE1hdHJpeFxyXG4gKi9cblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIE1hdHJpeCB3aGljaCBlbnRyaWVzIGFyZSB0aGUgcmV0dXJuZWQgdmFsdWUgb2YgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiBNYXRyaXhcclxuICogQHBhcmFtIHtnZW5lcmF0ZUNhbGxiYWNrfSBjYiAtIENhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIHRha2VzIHJvdyBhbmQgY29sdW1uIGFzIGFyZ3VtZW50c1xyXG4gKiBhbmQgZ2VuZXJhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGVudHJ5XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IC0gR2VuZXJhdGVkIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZShyb3csIGNvbCwgY2IpIHtcbiAgdmFyIG1hdHJpeCA9IGVtcHR5KHJvdywgY29sKTtcblxuICBpZiAocm93ID09PSAwIHx8IGNvbCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgdGhpcyhbXSk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgbWF0cml4W2ldW2pdID0gY2IoaSwgaik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG1hdHJpeCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGVudHJpZXMgb24gdGhlIG1haW4gZGlhZ29uYWwuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHJldHVybnMge251bWJlcltdfSBBcnJheSBvZiBlbnRyaWVzIG9mIEEgb24gdGhlIG1haW4gZGlhZ29uYWxcclxuICovXG5cblxuZnVuY3Rpb24gZ2V0RGlhZyhBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHZhciBkaWFncyA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGRpYWdzW2ldID0gbWF0cml4W2ldW2ldO1xuICB9XG5cbiAgcmV0dXJuIGRpYWdzO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGdldERpYWc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIE51bWJlciBvZiByb3dzIG9mIGEgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiBhIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIC0gTG93ZXIgYm91bmQgb2YgZWFjaCBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IC0gVXBwZXIgYm91bmQgb2YgZWFjaCBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gdG9GaXhlZCAtIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBHZW5lcmF0ZWQgcmFuZG9tIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbU1hdHJpeChyb3csIGNvbCkge1xuICB2YXIgbWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAwO1xuICB2YXIgbWF4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAxO1xuICB2YXIgdG9GaXhlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogMDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlRmxvYXQoKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbikudG9GaXhlZCh0b0ZpeGVkKSk7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhbmRvbU1hdHJpeDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBpZGVudGl0eSBNYXRyaXggd2l0aCBnaXZlbiBzaXplLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgLSBUaGUgc2l6ZSBvZiBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gSWRlbnRpdHkgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkoc2l6ZSkge1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShzaXplLCBzaXplLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIGlmIChpID09PSBqKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciB0d28gTWF0cmljZXMgYXJlIGNvbnNpZGVyZWQgYXMgZXF1YWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSB0ZXN0IGNyaXRlcmlvbiBpcyBNYXRoLmFicyh4IC0geSkgPCAxIC8gKDEwICoqIGRpZ2l0ICogMikuXHJcbiAqIEZvciBkZWZhdWx0IHZhbHVlIDUsIGl0IHNob3VsZCBiZSA1ZS01LlxyXG4gKiBUaGF0IG1lYW5zIGlmIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBudW1iZXJzIGlzIGxlc3MgdGhhbiA1ZS01LFxyXG4gKiB0aGV5IGFyZSBjb25zaWRlcmVkIGFzIHNhbWUgdmFsdWUuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IEIgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaWdpdCAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0d28gTWF0cmljZXMgYXJlIGNvbnNpZGVyZWQgYXMgc2FtZVxyXG4gKi9cblxuXG5mdW5jdGlvbiBpc0VxdWFsKEEsIEIpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiA1O1xuXG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIEFyb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIEFjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIEJyb3cgPSBfQiRzaXplMlswXSxcbiAgICAgIEJjb2wgPSBfQiRzaXplMlsxXTtcblxuICBpZiAoQXJvdyAhPT0gQnJvdyB8fCBBY29sICE9PSBCY29sKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEVQSVNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBtYXRyaXhBID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4QiA9IEIuX21hdHJpeDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IEFyb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgQWNvbDsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobWF0cml4QVtpXVtqXSAtIG1hdHJpeEJbaV1bal0pID49IEVQSVNJTE9OKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MLFxuICAgIE9WRVJGTE9XX1JPVyA9IF9yZXF1aXJlLk9WRVJGTE9XX1JPVyxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIHJvdyBvZiBhIE1hdHJpeCB3aXRoIHZhbGlkIGluZGV4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEFueSB2YWxpZCByb3cgaW5kZXhcclxuICogQHJldHVybnMge01hdHJpeH0gUm93IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gcm93KEEsIGluZGV4KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaW5kZXgpIHx8IGluZGV4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjID0gX0Ekc2l6ZTJbMV07XG5cbiAgaWYgKGluZGV4ID49IHIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKDEsIGMsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpbmRleF1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHJvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIgPSBfcmVxdWlyZS5FWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIsXG4gICAgSU5WQUxJRF9ST1cgPSBfcmVxdWlyZS5JTlZBTElEX1JPVyxcbiAgICBJTlZBTElEX0NPTFVNTiA9IF9yZXF1aXJlLklOVkFMSURfQ09MVU1OLFxuICAgIE9WRVJGTE9XX1JPVyA9IF9yZXF1aXJlLk9WRVJGTE9XX1JPVyxcbiAgICBJTlZBTElEX1JPV1NfRVhQUkVTU0lPTiA9IF9yZXF1aXJlLklOVkFMSURfUk9XU19FWFBSRVNTSU9OLFxuICAgIElOVkFMSURfQ09MVU1OU19FWFBSRVNTSU9OID0gX3JlcXVpcmUuSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04sXG4gICAgT1ZFUkZMT1dfQ09MVU1OID0gX3JlcXVpcmUuT1ZFUkZMT1dfQ09MVU1OO1xuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHN1Ym1hdHJpeCBvZiBhIG1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHJvd3MgLSBSb3dzIGV4cHJlc3Npb25cclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBjb2xzIC0gQ29sdW1ucyBleHByZXNzaW9uXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFN1Ym1hdHJpeCBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHN1Ym1hdHJpeChBLCByb3dzLCBjb2xzKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgYXJnMVR5cGUgPSBfdHlwZW9mKHJvd3MpO1xuXG4gIHZhciBhcmcyVHlwZSA9IF90eXBlb2YoY29scyk7XG5cbiAgaWYgKGFyZzFUeXBlICE9PSAnc3RyaW5nJyAmJiBhcmcxVHlwZSAhPT0gJ251bWJlcicgfHwgYXJnMlR5cGUgIT09ICdzdHJpbmcnICYmIGFyZzJUeXBlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciByb3dTdGFydDtcbiAgdmFyIHJvd0VuZDtcbiAgdmFyIGNvbFN0YXJ0O1xuICB2YXIgY29sRW5kO1xuXG4gIGlmIChhcmcxVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93cykgfHwgcm93cyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPVyk7XG4gICAgfVxuXG4gICAgaWYgKHJvd3MgPj0gcm93KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICB9XG5cbiAgICByb3dTdGFydCA9IHJvd3M7XG4gICAgcm93RW5kID0gcm93cztcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJpbmdcbiAgICB2YXIgYXJnID0gcm93cy5zcGxpdCgnOicpO1xuXG4gICAgaWYgKGFyZy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV1NfRVhQUkVTU0lPTik7XG4gICAgfVxuXG4gICAgdmFyIF9hcmcgPSBfc2xpY2VkVG9BcnJheShhcmcsIDIpLFxuICAgICAgICByMSA9IF9hcmdbMF0sXG4gICAgICAgIHIyID0gX2FyZ1sxXTtcblxuICAgIGlmIChyMSA9PT0gJycpIHtcbiAgICAgIHJvd1N0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHIgPSBOdW1iZXIocjEpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocikgfHwgciA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPj0gcm93KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgICAgfVxuXG4gICAgICByb3dTdGFydCA9IHI7XG4gICAgfVxuXG4gICAgaWYgKHIyID09PSAnJykge1xuICAgICAgcm93RW5kID0gcm93IC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9yID0gTnVtYmVyKHIyKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKF9yKSB8fCBfciA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9yID49IHJvdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICAgIH1cblxuICAgICAgcm93RW5kID0gX3I7XG4gICAgfVxuXG4gICAgaWYgKHJvd1N0YXJ0ID4gcm93RW5kKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmcyVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29scykgfHwgY29scyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTik7XG4gICAgfVxuXG4gICAgaWYgKGNvbHMgPj0gY29sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICB9XG5cbiAgICBjb2xTdGFydCA9IGNvbHM7XG4gICAgY29sRW5kID0gY29scztcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJpbmdcbiAgICB2YXIgX2FyZzIgPSBjb2xzLnNwbGl0KCc6Jyk7XG5cbiAgICBpZiAoX2FyZzIubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04pO1xuICAgIH1cblxuICAgIHZhciBfYXJnMyA9IF9zbGljZWRUb0FycmF5KF9hcmcyLCAyKSxcbiAgICAgICAgYzEgPSBfYXJnM1swXSxcbiAgICAgICAgYzIgPSBfYXJnM1sxXTtcblxuICAgIGlmIChjMSA9PT0gJycpIHtcbiAgICAgIGNvbFN0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGMgPSBOdW1iZXIoYzEpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoYykgfHwgYyA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGMgPj0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBjb2xTdGFydCA9IGM7XG4gICAgfVxuXG4gICAgaWYgKGMyID09PSAnJykge1xuICAgICAgY29sRW5kID0gY29sIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9jID0gTnVtYmVyKGMyKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKF9jKSB8fCBfYyA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jID49IGNvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgY29sRW5kID0gX2M7XG4gICAgfVxuXG4gICAgaWYgKGNvbFN0YXJ0ID4gY29sRW5kKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHZhciBzdWJSb3cgPSByb3dFbmQgLSByb3dTdGFydCArIDE7XG4gIHZhciBzdWJDb2wgPSBjb2xFbmQgLSBjb2xTdGFydCArIDE7XG4gIHZhciBzdWJNYXRyaXggPSBuZXcgQXJyYXkoc3ViUm93KTtcblxuICBmb3IgKHZhciBpID0gcm93U3RhcnQ7IGkgPD0gcm93RW5kOyBpKyspIHtcbiAgICB2YXIgbmV3Um93ID0gbmV3IEFycmF5KHN1YkNvbCk7XG5cbiAgICBmb3IgKHZhciBqID0gY29sU3RhcnQ7IGogPD0gY29sRW5kOyBqKyspIHtcbiAgICAgIG5ld1Jvd1tqIC0gY29sU3RhcnRdID0gbWF0cml4W2ldW2pdO1xuICAgIH1cblxuICAgIHN1Yk1hdHJpeFtpIC0gcm93U3RhcnRdID0gbmV3Um93O1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKHN1Yk1hdHJpeCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc3VibWF0cml4OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBHZXRzIHRoZSBzdHJpbmdpZmllZCBNYXRyaXhcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5naWZpZWQgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIHZhciBzdHIgPSAnJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgc3RyICs9IG1hdHJpeFtpXVtqXS50b1N0cmluZygpO1xuXG4gICAgICBpZiAoaiAhPT0gY29sIC0gMSkge1xuICAgICAgICBzdHIgKz0gJyAnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpICE9PSByb3cgLSAxKSB7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHplcm8gTWF0cml4XHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgdGhlIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gTnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBaZXJvIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIHplcm8ocm93LCBjb2wpIHtcbiAgaWYgKGNvbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCByb3csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gemVybzsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTWF0cml4ID0gcmVxdWlyZSgnLi91dGlsL2lzTWF0cml4Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgTWF0cml4XHJcbiAqIEBuYW1lc3BhY2UgTWF0cml4XHJcbiAqIEBjbGFzc1xyXG4gKiBAcGFyYW0ge251bWJlcltdW119IEEgLSBUd28gZGltZW5zaW9uYWwgYXJyYXkgd2hlcmVcclxuICogQVtpXVtqXSByZXByZXNlbnRzIHRoZSBpLXRoIHJvdyBhbmQgai10aCBjb2x1bW4gb2YgYSBtYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gTWF0cml4KEEpIHtcbiAgaWYgKCFpc01hdHJpeChBKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB0aGlzLl9tYXRyaXggPSBBO1xuICB0aGlzLl9kaWdpdCA9IDg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWF0cml4OyAvLyBzdHJ1Y3R1cmVcblxuTWF0cml4LnByb3RvdHlwZS5pc0RpYWdvbmFsID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc0RpYWdvbmFsJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU2tld1N5bW1ldHJpYyA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNTa2V3U3ltbWV0cmljJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU3F1YXJlID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1NxdWFyZScpO1xuTWF0cml4LnByb3RvdHlwZS5pc1N5bW1ldHJpYyA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNTeW1tZXRyaWMnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNMb3dlclRyaWFuZ3VsYXIgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzTG93ZXJUcmlhbmd1bGFyJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzVXBwZXJUcmlhbmd1bGFyID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1VwcGVyVHJpYW5ndWxhcicpO1xuTWF0cml4LnByb3RvdHlwZS5pc09ydGhvZ29uYWwgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzT3J0aG9nb25hbCcpOyAvLyBwcm9wZXJ0eVxuXG5NYXRyaXgucHJvdG90eXBlLmNvbmQgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9jb25kJyk7XG5NYXRyaXgucHJvdG90eXBlLmRldCA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2RldCcpO1xuTWF0cml4LnByb3RvdHlwZS5laWdlbnZhbHVlcyA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2VpZ2VudmFsdWVzJyk7XG5NYXRyaXgucHJvdG90eXBlLm51bGxpdHkgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9udWxsaXR5Jyk7XG5NYXRyaXgucHJvdG90eXBlLm5vcm0gPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9ub3JtJyk7XG5NYXRyaXgucHJvdG90eXBlLnJhbmsgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9yYW5rJyk7XG5NYXRyaXgucHJvdG90eXBlLnNpemUgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9zaXplJyk7XG5NYXRyaXgucHJvdG90eXBlLnRyYWNlID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvdHJhY2UnKTsgLy8gb3BlcmF0aW9uc1xuXG5NYXRyaXguYWRkID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvYWRkJyk7XG5NYXRyaXguaW52ZXJzZSA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL2ludmVyc2UnKTtcbk1hdHJpeC5tdWx0aXBseSA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL211bHRpcGx5Jyk7XG5NYXRyaXgucG93ID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvcG93Jyk7XG5NYXRyaXguc3VidHJhY3QgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9zdWJ0cmFjdCcpO1xuTWF0cml4LnRyYW5zcG9zZSA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL3RyYW5zcG9zZScpOyAvLyBMaW5lYXItZXF1YXRpb25zXG5cbk1hdHJpeC5iYWNrd2FyZCA9IHJlcXVpcmUoJy4vY29yZS9saW5lYXItZXF1YXRpb25zL2JhY2t3YXJkJyk7XG5NYXRyaXguZm9yd2FyZCA9IHJlcXVpcmUoJy4vY29yZS9saW5lYXItZXF1YXRpb25zL2ZvcndhcmQnKTtcbk1hdHJpeC5zb2x2ZSA9IHJlcXVpcmUoJy4vY29yZS9saW5lYXItZXF1YXRpb25zL3NvbHZlJyk7IC8vIGRlY29tcG9zaXRpb25zXG5cbk1hdHJpeC5MVSA9IHJlcXVpcmUoJy4vY29yZS9kZWNvbXBvc2l0aW9ucy9MVScpO1xuTWF0cml4LlFSID0gcmVxdWlyZSgnLi9jb3JlL2RlY29tcG9zaXRpb25zL1FSJyk7IC8vIHV0aWxzXG5cbk1hdHJpeC5jbG9uZSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9jbG9uZScpO1xuTWF0cml4LmNvbHVtbiA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9jb2x1bW4nKTtcbk1hdHJpeC5kaWFnID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2RpYWcnKTtcbk1hdHJpeC5lbGVtZW50d2lzZSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9lbGVtZW50d2lzZScpO1xuTWF0cml4LmdlbmVyYXRlID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dlbmVyYXRlJyk7XG5NYXRyaXguZ2V0RGlhZyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9nZXREaWFnJyk7XG5NYXRyaXguZ2V0UmFuZG9tTWF0cml4ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dldFJhbmRvbU1hdHJpeCcpO1xuTWF0cml4LmlkZW50aXR5ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2lkZW50aXR5Jyk7XG5NYXRyaXguaXNFcXVhbCA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9pc0VxdWFsJyk7XG5NYXRyaXgucm93ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3JvdycpO1xuTWF0cml4LnN1Ym1hdHJpeCA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9zdWJtYXRyaXgnKTtcbk1hdHJpeC56ZXJvID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3plcm8nKTtcbk1hdHJpeC5mcm9tQXJyYXkgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZnJvbUFycmF5Jyk7XG5NYXRyaXgucHJvdG90eXBlLmZsYXR0ZW4gPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZmxhdHRlbicpO1xuTWF0cml4LnByb3RvdHlwZS5lbnRyeSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9lbnRyeScpO1xuTWF0cml4LnByb3RvdHlwZS50b1N0cmluZyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy90b1N0cmluZycpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbXB0eShyb3csIGNvbCkge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93KSB8fCByb3cgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGNvbCkgfHwgY29sIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgaWYgKHJvdyA9PT0gMCB8fCBjb2wgPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgbWF0cml4ID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIG1hdHJpeFtpXSA9IG5ldyBBcnJheShjb2wpO1xuICB9XG5cbiAgcmV0dXJuIG1hdHJpeDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoJy4vaXNOdW1iZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc01hdHJpeChtYXRyaXgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG1hdHJpeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaGVpZ2h0ID0gbWF0cml4Lmxlbmd0aDtcblxuICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7IC8vIFtdIHJlcHJlc2VudHMgZW1wdHkgbWF0cml4ICgwIHggMCBtYXRyaXgpXG4gIH1cblxuICB2YXIgZmlyc3RSb3cgPSBtYXRyaXhbMF07XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpcnN0Um93KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB3aWR0aCA9IGZpcnN0Um93Lmxlbmd0aDtcblxuICBpZiAod2lkdGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7IC8vIFsgW10gXSBpcyBub3QgYWxsb3dlZFxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgIHZhciByb3cgPSBtYXRyaXhbaV07XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm93KSB8fCByb3cubGVuZ3RoICE9PSB3aWR0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgaWYgKCFpc051bWJlcihyb3dbal0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNOdW1iZXIoX2ludCkge1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKF9pbnQpO1xufTsiLCJ2YXIgU3lsdmVzdGVyID0ge31cblxuU3lsdmVzdGVyLk1hdHJpeCA9IGZ1bmN0aW9uICgpIHt9XG5cblN5bHZlc3Rlci5NYXRyaXguY3JlYXRlID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIHZhciBNID0gbmV3IFN5bHZlc3Rlci5NYXRyaXgoKVxuICByZXR1cm4gTS5zZXRFbGVtZW50cyhlbGVtZW50cylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5JID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVscyA9IFtdLFxuICAgIGkgPSBuLFxuICAgIGpcbiAgd2hpbGUgKGktLSkge1xuICAgIGogPSBuXG4gICAgZWxzW2ldID0gW11cbiAgICB3aGlsZSAoai0tKSB7XG4gICAgICBlbHNbaV1bal0gPSBpID09PSBqID8gMSA6IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVscylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5wcm90b3R5cGUgPSB7XG4gIGR1cDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZSh0aGlzLmVsZW1lbnRzKVxuICB9LFxuXG4gIGlzU3F1YXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IDAgOiB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gY29sc1xuICB9LFxuXG4gIHRvUmlnaHRUcmlhbmd1bGFyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoW10pXG4gICAgdmFyIE0gPSB0aGlzLmR1cCgpLFxuICAgICAgZWxzXG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgbnAgPSB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aCxcbiAgICAgIHBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSA9PT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIGlmIChNLmVsZW1lbnRzW2pdW2ldICE9PSAwKSB7XG4gICAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tpXVtwXSArIE0uZWxlbWVudHNbal1bcF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKE0uZWxlbWVudHNbaV1baV0gIT09IDApIHtcbiAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IE0uZWxlbWVudHNbal1baV0gLyBNLmVsZW1lbnRzW2ldW2ldXG4gICAgICAgICAgZWxzID0gW11cbiAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgLy8gRWxlbWVudHMgd2l0aCBjb2x1bW4gbnVtYmVycyB1cCB0byBhbiBpbmNsdWRpbmcgdGhlIG51bWJlciBvZiB0aGVcbiAgICAgICAgICAgIC8vIHJvdyB0aGF0IHdlJ3JlIHN1YnRyYWN0aW5nIGNhbiBzYWZlbHkgYmUgc2V0IHN0cmFpZ2h0IHRvIHplcm8sXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGF0J3MgdGhlIHBvaW50IG9mIHRoaXMgcm91dGluZSBhbmQgaXQgYXZvaWRzIGhhdmluZyB0b1xuICAgICAgICAgICAgLy8gbG9vcCBvdmVyIGFuZCBjb3JyZWN0IHJvdW5kaW5nIGVycm9ycyBsYXRlclxuICAgICAgICAgICAgZWxzLnB1c2goXG4gICAgICAgICAgICAgIHAgPD0gaSA/IDAgOiBNLmVsZW1lbnRzW2pdW3BdIC0gTS5lbGVtZW50c1tpXVtwXSAqIG11bHRpcGxpZXJcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgTS5lbGVtZW50c1tqXSA9IGVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBNXG4gIH0sXG5cbiAgZGV0ZXJtaW5hbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgTSA9IHRoaXMudG9SaWdodFRyaWFuZ3VsYXIoKVxuICAgIHZhciBkZXQgPSBNLmVsZW1lbnRzWzBdWzBdLFxuICAgICAgbiA9IE0uZWxlbWVudHMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgIGRldCA9IGRldCAqIE0uZWxlbWVudHNbaV1baV1cbiAgICB9XG4gICAgcmV0dXJuIGRldFxuICB9LFxuXG4gIGlzU2luZ3VsYXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NxdWFyZSgpICYmIHRoaXMuZGV0ZXJtaW5hbnQoKSA9PT0gMFxuICB9LFxuXG4gIGF1Z21lbnQ6IGZ1bmN0aW9uIChtYXRyaXgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmR1cCgpXG4gICAgfVxuICAgIHZhciBNID0gbWF0cml4LmVsZW1lbnRzIHx8IG1hdHJpeFxuICAgIGlmICh0eXBlb2YgTVswXVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIE0gPSBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShNKS5lbGVtZW50c1xuICAgIH1cbiAgICB2YXIgVCA9IHRoaXMuZHVwKCksXG4gICAgICBjb2xzID0gVC5lbGVtZW50c1swXS5sZW5ndGhcbiAgICB2YXIgaSA9IFQuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgbmogPSBNWzBdLmxlbmd0aCxcbiAgICAgIGpcbiAgICBpZiAoaSAhPT0gTS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGogPSBualxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBULmVsZW1lbnRzW2ldW2NvbHMgKyBqXSA9IE1baV1bal1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFRcbiAgfSxcblxuICBpbnZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNTcXVhcmUoKSB8fCB0aGlzLmlzU2luZ3VsYXIoKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGkgPSBuLFxuICAgICAgalxuICAgIHZhciBNID0gdGhpcy5hdWdtZW50KFN5bHZlc3Rlci5NYXRyaXguSShuKSkudG9SaWdodFRyaWFuZ3VsYXIoKVxuICAgIHZhciBucCA9IE0uZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcCxcbiAgICAgIGVscyxcbiAgICAgIGRpdmlzb3JcbiAgICB2YXIgaW52ZXJzZV9lbGVtZW50cyA9IFtdLFxuICAgICAgbmV3X2VsZW1lbnRcbiAgICAvLyBTeWx2ZXN0ZXIuTWF0cml4IGlzIG5vbi1zaW5ndWxhciBzbyB0aGVyZSB3aWxsIGJlIG5vIHplcm9zIG9uIHRoZVxuICAgIC8vIGRpYWdvbmFsLiBDeWNsZSB0aHJvdWdoIHJvd3MgZnJvbSBsYXN0IHRvIGZpcnN0LlxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIEZpcnN0LCBub3JtYWxpc2UgZGlhZ29uYWwgZWxlbWVudHMgdG8gMVxuICAgICAgZWxzID0gW11cbiAgICAgIGludmVyc2VfZWxlbWVudHNbaV0gPSBbXVxuICAgICAgZGl2aXNvciA9IE0uZWxlbWVudHNbaV1baV1cbiAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgIG5ld19lbGVtZW50ID0gTS5lbGVtZW50c1tpXVtwXSAvIGRpdmlzb3JcbiAgICAgICAgZWxzLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIC8vIFNodWZmbGUgb2ZmIHRoZSBjdXJyZW50IHJvdyBvZiB0aGUgcmlnaHQgaGFuZCBzaWRlIGludG8gdGhlIHJlc3VsdHNcbiAgICAgICAgLy8gYXJyYXkgYXMgaXQgd2lsbCBub3QgYmUgbW9kaWZpZWQgYnkgbGF0ZXIgcnVucyB0aHJvdWdoIHRoaXMgbG9vcFxuICAgICAgICBpZiAocCA+PSBuKSB7XG4gICAgICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXS5wdXNoKG5ld19lbGVtZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAvLyBUaGVuLCBzdWJ0cmFjdCB0aGlzIHJvdyBmcm9tIHRob3NlIGFib3ZlIGl0IHRvIGdpdmUgdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgICAgLy8gb24gdGhlIGxlZnQgaGFuZCBzaWRlXG4gICAgICBqID0gaVxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBlbHMgPSBbXVxuICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgIGVscy5wdXNoKE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogTS5lbGVtZW50c1tqXVtpXSlcbiAgICAgICAgfVxuICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShpbnZlcnNlX2VsZW1lbnRzKVxuICB9LFxuXG4gIHNldEVsZW1lbnRzOiBmdW5jdGlvbiAoZWxzKSB7XG4gICAgdmFyIGksXG4gICAgICBqLFxuICAgICAgZWxlbWVudHMgPSBlbHMuZWxlbWVudHMgfHwgZWxzXG4gICAgaWYgKGVsZW1lbnRzWzBdICYmIHR5cGVvZiBlbGVtZW50c1swXVswXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGkgPSBlbGVtZW50cy5sZW5ndGhcbiAgICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBqID0gZWxlbWVudHNbaV0ubGVuZ3RoXG4gICAgICAgIHRoaXMuZWxlbWVudHNbaV0gPSBbXVxuICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50c1tpXVtqXSA9IGVsZW1lbnRzW2ldW2pdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHZhciBuID0gZWxlbWVudHMubGVuZ3RoXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKFtlbGVtZW50c1tpXV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIGNvbnN0IG1hdCA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVsZW1lbnRzKS5pbnZlcnNlKClcbiAgaWYgKG1hdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtYXQuZWxlbWVudHNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4LmpzJyk7XG4iLCJjb25zdCBlbGVtV2lzZSA9IHJlcXVpcmUoJy4vZWxlbS13aXNlJyk7XG4vKipcbiogQWRkIG1hdHJpeGVzIHRvZ2V0aGVyXG4qIEBwYXJhbSB7Li4uQXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gYXJncyBsaXN0IG9mIG1hdHJpeFxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gc3VtXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGQoLi4uYXJncykge1xuXHRyZXR1cm4gZWxlbVdpc2UoYXJncywgYXJnczIgPT4ge1xuXHRcdHJldHVybiBhcmdzMi5yZWR1Y2UoKGEsIGIpID0+IHtcblx0XHRcdGlmIChhID09PSBudWxsIHx8IGIgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhICsgYjtcblx0XHR9LCAwKTtcblx0fSk7XG59O1xuIiwiY29uc3QgZG90UHJvZHVjdCA9IHJlcXVpcmUoJy4vZG90LXByb2R1Y3QuanMnKTtcbmNvbnN0IG5vcm0gPSByZXF1aXJlKCcuL25vcm0uanMnKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHR3byB2ZWN0b3JzLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoZSB0d28gdmVjdG9ycy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbGVuZ3RocyBvZiB0aGUgdmVjdG9ycyBkbyBub3QgbWF0Y2guXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29zU2ltaWxhcml0eSh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG5cdGlmICh2ZWN0b3IxLmxlbmd0aCAhPT0gdmVjdG9yMi5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgbGVuZ3RocyBvZiB0aGUgdmVjdG9ycyBkbyBub3QgbWF0Y2gnKSk7XG5cdH1cblxuXHRjb25zdCBub3JtUHJvZCA9IChub3JtKHZlY3RvcjEpICogbm9ybSh2ZWN0b3IyKSk7XG5cblx0aWYgKG5vcm1Qcm9kID09PSAwKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gZG90UHJvZHVjdCh2ZWN0b3IxLCB2ZWN0b3IyKSAvIG5vcm1Qcm9kO1xufTtcbiIsImNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eS5qcycpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBibG9jayBkaWFnb25hbCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYmxvY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJbXVtdW119IG9wdGlvbnMuYmxvY2tzIFRoZSBibG9ja3MgdG8gZm9ybSB0aGUgZGlhZ29uYWwgbWF0cml4LlxuICogQHBhcmFtIHtudW1iZXJbXX0gW29wdGlvbnMub3JkZXI9bnVsbF0gT3B0aW9uYWwgb3JkZXIgZm9yIGFycmFuZ2luZyB0aGUgYmxvY2tzLlxuICogQHJldHVybnMge251bWJlcltdW119IFRoZSBibG9jayBkaWFnb25hbCBtYXRyaXguXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlhZ0Jsb2NrKHtibG9ja3MsIG9yZGVyID0gbnVsbH0pIHtcblx0Y29uc3QgZGltTCA9IGJsb2Nrcy5tYXAoYSA9PiBhLmxlbmd0aCkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cdGNvbnN0IHJlc3VsdCA9IGlkZW50aXR5KGRpbUwpO1xuXHRsZXQgY3VycmVudCA9IDA7XG5cdGZvciAoY29uc3QgbWF0IG9mIGJsb2Nrcykge1xuXHRcdGZvciAoY29uc3QgW2ldIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRcdGZvciAoY29uc3QgW2pdIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRcdFx0cmVzdWx0W2kgKyBjdXJyZW50XVtqICsgY3VycmVudF0gPSBtYXRbaV1bal07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y3VycmVudCArPSBtYXQubGVuZ3RoO1xuXHR9XG5cblx0aWYgKG9yZGVyKSB7XG5cdFx0cmV0dXJuIG9yZGVyLm1hcChpID0+IG9yZGVyLm1hcChqID0+IHJlc3VsdFtpXVtqXSkpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJjb25zdCB6ZXJvcyA9IHJlcXVpcmUoJy4vemVyb3MnKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgZGlhZ29uYWwgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQHBhcmFtIHtudW1iZXJbXX0gZGlhZ29uYWwgVGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgZGlhZ29uYWwgZWxlbWVudHMgb2YgdGhlIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtudW1iZXJbXVtdfSBUaGUgZGlhZ29uYWwgbWF0cml4LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpYWcoZGlhZ29uYWwpIHtcblx0Y29uc3QgcmVzdWx0ID0gemVyb3MoZGlhZ29uYWwubGVuZ3RoLCBkaWFnb25hbC5sZW5ndGgpO1xuXHRmb3IgKGNvbnN0IFtpLCBlbGVtZW50XSBvZiBkaWFnb25hbC5lbnRyaWVzKCkpIHtcblx0XHRyZXN1bHRbaV1baV0gPSBlbGVtZW50O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9ycy5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvcjEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvcjIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZG90IHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsZW5ndGhzIG9mIHRoZSB2ZWN0b3JzIGRvIG5vdCBtYXRjaC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkb3RQcm9kdWN0KHZlY3RvcjEsIHZlY3RvcjIpIHtcblx0aWYgKHZlY3RvcjEubGVuZ3RoICE9PSB2ZWN0b3IyLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ0xlbmd0aHMgbm90IG1hY2hpbmcnKSk7XG5cdH1cblxuXHRsZXQgcmVzdWx0ID0gMDtcblx0Zm9yIChjb25zdCBbaSwgZWxlbWVudF0gb2YgdmVjdG9yMS5lbnRyaWVzKCkpIHtcblx0XHRyZXN1bHQgKz0gZWxlbWVudCAqIHZlY3RvcjJbaV07XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuKiBAY2FsbGJhY2sgZWxlbVdpc2VDYlxuKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBhcnJcbiogQHBhcmFtIHtOdW1iZXJ9IHJvd0lkXG4qIEBwYXJhbSB7TnVtYmVyfSBjb2xJZFxuKi9cbi8qKlxuKiBSdW4gYSBmdW5jdGlvbiBvbiBjZWxsIHBlciBjZWxsIGZvciBlYWNoIE1hdHJpeGVzXG4qIEBwYXJhbSB7PEFycmF5LjxBcnJheS48QXJyYXkuPE51bWJlcj4+Pn0gYXJyTWF0cml4ZXMgbGlzdCBvZiBtYXRyaXhlc1xuKiBAcGFyYW0ge2VsZW1XaXNlQ2J9IGZuXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSByZXN1bHRpbmcgbWF0cml4XG4qIEBleGFtcGxlXG4vLyB0aGlzIHdpbGwgZG8gbTEgKyBtMiArIG0zICsgbTQgb24gbWF0cml4ZXNcbmVsZW1XaXNlKFttMSwgbTIsIG0zLCBtNF0sIGFyZ3MyID0+IHtcblx0cmV0dXJuIGFyZ3MyLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xufSk7XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVsZW1XaXNlKGFycmF5TWF0cml4ZXMsIGZuKSB7XG5cdHJldHVybiBhcnJheU1hdHJpeGVzWzBdLm1hcCgocm93LCByb3dJZCkgPT4ge1xuXHRcdHJldHVybiByb3cubWFwKChjZWxsLCBjb2xJZCkgPT4ge1xuXHRcdFx0Y29uc3QgYXJyYXkgPSBhcnJheU1hdHJpeGVzLm1hcChtID0+IG1bcm93SWRdW2NvbElkXSk7XG5cdFx0XHRyZXR1cm4gZm4oYXJyYXksIHJvd0lkLCBjb2xJZCk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBFdWNsaWRlYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy5cbiAqIEBwYXJhbSB7bnVtYmVyW119IGFycmF5MSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkyIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIEV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gdmVjdG9ycy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgYXJyYXlzIGhhdmUgZGlmZmVyZW50IGxlbmd0aHMgb3IgaWYgZWl0aGVyIGFycmF5IGlzIG5vdCBhbiBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldWNsaWRlYW5EaXN0KGFycmF5MSwgYXJyYXkyKSB7XG5cdGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFycmF5IGxlbmd0aHMnKTtcblx0fVxuXG5cdGlmICghQXJyYXkuaXNBcnJheShhcnJheTEpKSB7XG5cdFx0Y29uc29sZS5sb2coe2FycmF5MX0pO1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcnJheScpO1xuXHR9XG5cblx0Y29uc3QgZGlmZiA9IGFycmF5MS5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBlbGVtZW50IC0gYXJyYXkyW2luZGV4XSkubWFwKGVsZW1lbnQgPT4gZWxlbWVudCAqIGVsZW1lbnQpO1xuXHRyZXR1cm4gTWF0aC5zcXJ0KGRpZmYucmVkdWNlKChhLCBiKSA9PiBhICsgYikpO1xufTtcbiIsImNvbnN0IHRyYWNlID0gcmVxdWlyZSgnLi90cmFjZS5qcycpO1xuY29uc3QgdHJhbnNwb3NlID0gcmVxdWlyZSgnLi90cmFuc3Bvc2UuanMnKTtcbmNvbnN0IG1hdFN1YiA9IHJlcXVpcmUoJy4vc3VidHJhY3QuanMnKTtcbmNvbnN0IG1hdE11bCA9IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpO1xuY29uc3Qgc3VtID0gcmVxdWlyZSgnLi9zdW0uanMnKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBGcm9iZW5pdXMgbm9ybSBvZiB0aGUgZ2l2ZW4gbWF0cmljZXMgb3IgdmVjdG9ycy5cbiAqIFtGcm9iZW5pdXMgbm9ybV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWF0cml4X25vcm0jRnJvYmVuaXVzX25vcm0pXG4gKiBAcGFyYW0ge251bWJlcltdW119IFthcnJheTFdIFRoZSBmaXJzdCBtYXRyaXggb3IgdmVjdG9yIChvcHRpb25hbCkuXG4gKiBAcGFyYW0ge251bWJlcltdW119IFthcnJheTJdIFRoZSBzZWNvbmQgbWF0cml4IG9yIHZlY3RvciAob3B0aW9uYWwpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIEZyb2Jlbml1cyBub3JtIG9mIHRoZSBtYXRyaWNlcyBvciB2ZWN0b3JzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb2Jlbml1cyhhcnJheTEsIGFycmF5Mikge1xuXHRpZiAoYXJyYXkxID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3VtKGFycmF5Mik7XG5cdH1cblxuXHRpZiAoYXJyYXkyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3VtKGFycmF5MSk7XG5cdH1cblxuXHRjb25zdCBtID0gbWF0U3ViKGFycmF5MSwgYXJyYXkyKTtcblx0Y29uc3QgcCA9IG1hdE11bCh0cmFuc3Bvc2UobSksIG0pO1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRyYWNlKHApKTtcbn07XG4iLCIvKipcbiAqIGJ1aWxkIGFuIGlkZW50aXR5IHNxdWFyZSBtYXRyaXhcbiAqIEBwYXJhbSBzdGF0ZVNpemUgbWF0cml4IHNpemVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZGVudGl0eShzdGF0ZVNpemUpIHtcbiAgY29uc3QgaWRlbnRpdHlBcnJheSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRlU2l6ZTsgaSsrKSB7XG4gICAgY29uc3Qgcm93SWRlbnRpdHkgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0YXRlU2l6ZTsgaisrKSB7XG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICByb3dJZGVudGl0eS5wdXNoKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93SWRlbnRpdHkucHVzaCgwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZGVudGl0eUFycmF5LnB1c2gocm93SWRlbnRpdHkpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aXR5QXJyYXk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdGFkZDogcmVxdWlyZSgnLi9hZGQuanMnKSxcblx0Y29zU2ltaWxhcml0eTogcmVxdWlyZSgnLi9jb3Mtc2ltaWxhcml0eScpLFxuXHRldWNsaWRlYW5EaXN0OiByZXF1aXJlKCcuL2V1Y2xpZGVhbi1kaXN0JyksXG5cdGRpYWc6IHJlcXVpcmUoJy4vZGlhZy5qcycpLFxuXHRkaWFnQmxvY2s6IHJlcXVpcmUoJy4vZGlhZy1ibG9jaycpLFxuXHRkb3RQcm9kdWN0OiByZXF1aXJlKCcuL2RvdC1wcm9kdWN0JyksXG5cdGVsZW1XaXNlOiByZXF1aXJlKCcuL2VsZW0td2lzZS5qcycpLFxuXHRmcm9iZW5pdXM6IHJlcXVpcmUoJy4vZnJvYmVuaXVzLmpzJyksXG5cdGlkZW50aXR5OiByZXF1aXJlKCcuL2lkZW50aXR5LmpzJyksXG5cdGludmVydDogcmVxdWlyZSgnLi9pbnZlcnQuanMnKSxcblx0bWFwTWF0cml4OiByZXF1aXJlKCcuL21hcC1tYXRyaXguanMnKSxcblx0bWF0TXVsOiByZXF1aXJlKCcuL21hdC1tdWwuanMnKSxcblx0bWF0UGVybXV0YXRpb246IHJlcXVpcmUoJy4vbWF0LXBlcm11dGF0aW9uLmpzJyksXG5cdHBhZFdpdGhaZXJvQ29sczogcmVxdWlyZSgnLi9wYWQtd2l0aC16ZXJvLWNvbHMuanMnKSxcblx0c3VidHJhY3Q6IHJlcXVpcmUoJy4vc3VidHJhY3QuanMnKSxcblx0c3ViU3F1YXJlTWF0cml4OiByZXF1aXJlKCcuL3N1Yi1zcXVhcmUtbWF0cml4LmpzJyksXG5cdHN1bTogcmVxdWlyZSgnLi9zdW0uanMnKSxcblx0dHJhY2U6IHJlcXVpcmUoJy4vdHJhY2UuanMnKSxcblx0dHJhbnNwb3NlOiByZXF1aXJlKCcuL3RyYW5zcG9zZS5qcycpLFxuXHR6ZXJvczogcmVxdWlyZSgnLi96ZXJvcy5qcycpLFxuXHRub3JtOiByZXF1aXJlKCcuL25vcm0uanMnKSxcblx0c3VtVmVjdG9yOiByZXF1aXJlKCcuL3N1bS12ZWN0b3IuanMnKSxcbn07XG4iLCJjb25zdCBtYXRyaXhJbnZlcnNlID0gcmVxdWlyZSgnbWF0cml4LWludmVyc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnZlcnQobSkge1xuXHRyZXR1cm4gbWF0cml4SW52ZXJzZShtKTtcbn07XG4iLCIvKipcbiAqIE1hcHMgYSBmdW5jdGlvbiBvdmVyIGVhY2ggZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbWF0cml4LlxuICogQHBhcmFtIHtBcnJheTxBcnJheTxhbnk+Pn0gYSBUaGUgbWF0cml4IHRvIG1hcCBvdmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbihhbnksIG51bWJlciwgbnVtYmVyKTogYW55fSBmbiBUaGUgbWFwcGluZyBmdW5jdGlvbiB0byBhcHBseS5cbiAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxhbnk+Pn0gVGhlIG1hdHJpeCB3aXRoIHRoZSBmdW5jdGlvbiBhcHBsaWVkIHRvIGVhY2ggZWxlbWVudC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXBNYXRyaXgoYSwgZm4pIHtcblx0cmV0dXJuIGEubWFwKChyb3csIHJvd0lkKSA9PiByb3cubWFwKChjZWxsLCBjb2xJZCkgPT4gZm4oY2VsbCwgcm93SWQsIGNvbElkKSkpO1xufTtcbiIsIi8qKlxuKiBNdWx0aXBseSAyIG1hdHJpeGVzIHRvZ2V0aGVyXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbTFcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBtMlxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdE11bChtMSwgbTIpIHtcblx0Ly8gQ29uc29sZS5sb2coe20xLCBtMn0pO1xuXHRjb25zdCByZXN1bHQgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtMS5sZW5ndGg7IGkrKykge1xuXHRcdHJlc3VsdFtpXSA9IFtdO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgbTJbMF0ubGVuZ3RoOyBqKyspIHtcblx0XHRcdGxldCBzdW0gPSAwO1xuXHRcdFx0bGV0IGlzTnVsbCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBtMVswXS5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRpZiAoKG0xW2ldW2tdID09PSBudWxsICYmIG0yW2tdW2pdICE9PSAwKSB8fCAobTJba11bal0gPT09IG51bGwgJiYgbTFbaV1ba10gIT09IDApKSB7XG5cdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRzdW0gKz0gbTFbaV1ba10gKiBtMltrXVtqXTtcblx0XHRcdH1cblx0XHRcdHJlc3VsdFtpXVtqXSA9IGlzTnVsbCA/IG51bGwgOiBzdW07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeFxuICogQHBhcmFtIHtbTnVtYmVyLCBOdW1iZXJdfSBvdXRwdXRTaXplXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSByb3dJbmRleGVzIHRoZSBwZXJtdXRhdGlvbiBpbmRleGVzLCByZXN1bHRbal1ba10gPSBtYXRyaXhbcm93SW5kZXhlcy5pbmRleE9mKGopXVtjb2xJbmRleGVzLmluZGV4T2YoayldXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBjb2xJbmRleGVzIHRoZSBwZXJtdXRhdGlvbiBpbmRleGVzLCByZXN1bHRbal1ba10gPSBtYXRyaXhbcm93SW5kZXhlcy5pbmRleE9mKGopXVtjb2xJbmRleGVzLmluZGV4T2YoayldXG4gKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRQZXJtdXRhdGlvbih7XG5cdG1hdHJpeCxcblx0b3V0cHV0U2l6ZSxcblx0cm93SW5kZXhlcyxcblx0Y29sSW5kZXhlcyxcbn0pIHtcblx0Y29uc3QgW25Sb3csIG5Db2xdID0gb3V0cHV0U2l6ZTtcblxuXHRpZiAoIUFycmF5LmlzQXJyYXkocm93SW5kZXhlcykpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgSW52YWxpZCByb3dJbmRleGVzICR7cm93SW5kZXhlc31gKSk7XG5cdH1cblxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29sSW5kZXhlcykpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgSW52YWxpZCBjb2xJbmRleGVzICR7Y29sSW5kZXhlc31gKSk7XG5cdH1cblxuXHRyZXR1cm4gbmV3IEFycmF5KG5Sb3cpLmZpbGwoMCkubWFwKChfLCBpKSA9PiBuZXcgQXJyYXkobkNvbCkuZmlsbCgwKS5tYXAoKF8sIGopID0+IHtcblx0XHRpZiAoY29sSW5kZXhlcy5pbmNsdWRlcyhqKSAmJiByb3dJbmRleGVzLmluY2x1ZGVzKGkpKSB7XG5cdFx0XHRyZXR1cm4gbWF0cml4W3Jvd0luZGV4ZXMuaW5kZXhPZihpKV1bY29sSW5kZXhlcy5pbmRleE9mKGopXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSkpO1xufTtcbiIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgRXVjbGlkZWFuIG5vcm0gb2YgdGhlIGdpdmVuIHZlY3Rvci5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvciBUaGUgdmVjdG9yIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIEV1Y2xpZGVhbiBub3JtLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIEV1Y2xpZGVhbiBub3JtIG9mIHRoZSB2ZWN0b3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybSh2ZWN0b3IpIHtcblx0bGV0IHJlc3VsdCA9IDA7XG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiB2ZWN0b3IpIHtcblx0XHRyZXN1bHQgKz0gKGVsZW1lbnQgKiBlbGVtZW50KTtcblx0fVxuXHRyZXR1cm4gTWF0aC5zcXJ0KHJlc3VsdCk7XG59O1xuIiwiY29uc3QgbWF0UGVybXV0YXRpb24gPSByZXF1aXJlKCcuL21hdC1wZXJtdXRhdGlvbicpO1xuLyoqXG4qIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcGFkZGVkIG1hdHJpeCB3aXRoIHplcm9zIHdpdGggcmVzcGVjdCB0byBhIGdpdmVuXG4qIHRhcmdldCBjb2x1bW5zIG51bWJlclxuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeCB0aGUgbWF0cml4IHdlIG5lZWQgdG8gcGFkXG4qIEBwYXJhbSB7TnVtYmVyfSBjb2x1bW5zIGluIG91ciBjYXNlLCB0aGUgZHluYW1pYyBkaW1lbnNpb25cbiogQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHBhZGRlZCBtYXRyaXhcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRyaXgsIHtjb2x1bW5zfSkge1xuXHRpZiAoY29sdW1ucyA8IG1hdHJpeFswXS5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgT3V0cHV0IGNvbHVtbnMgJHtjb2x1bW5zfSBpcyBncmVhdGVyIHRoYW4gaW5wdXQgY29sdW1ucyAke21hdHJpeFswXS5sZW5ndGh9YCkpO1xuXHR9XG5cblx0cmV0dXJuIG1hdFBlcm11dGF0aW9uKHtcblx0XHRtYXRyaXgsXG5cdFx0b3V0cHV0U2l6ZTogW21hdHJpeC5sZW5ndGgsIGNvbHVtbnNdLFxuXHRcdHJvd0luZGV4ZXM6IG5ldyBBcnJheShtYXRyaXgubGVuZ3RoKS5maWxsKDApLm1hcCgoXywgaW5kZXgpID0+IGluZGV4KSxcblx0XHRjb2xJbmRleGVzOiBuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbCgwKS5tYXAoKF8sIGluZGV4KSA9PiBpbmRleCksXG5cdH0pO1xufTtcbiIsIi8qKlxuICogRXh0cmFjdHMgYSBzdWItc3F1YXJlIG1hdHJpeCBmcm9tIHRoZSBwcm92aWRlZCBtYXRyaXggYmFzZWQgb24gdGhlIGdpdmVuIGluZGV4ZXMuXG4gKiBAcGFyYW0ge251bWJlcltdW119IG1hdCBUaGUgbWF0cml4IGZyb20gd2hpY2ggdG8gZXh0cmFjdCB0aGUgc3ViLXNxdWFyZSBtYXRyaXguXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRleGVzIFRoZSBpbmRleGVzIHRvIHNlbGVjdCByb3dzIGFuZCBjb2x1bW5zIGZyb20gdGhlIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtudW1iZXJbXVtdfSBUaGUgc3ViLXNxdWFyZSBtYXRyaXggZXh0cmFjdGVkIGZyb20gdGhlIG9yaWdpbmFsIG1hdHJpeC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdWJTcXVhcmVNYXRyaXgobWF0LCBpbmRleGVzKSB7XG5cdHJldHVybiBpbmRleGVzLm1hcChzMSA9PiBpbmRleGVzLm1hcChzMiA9PiBtYXRbczFdW3MyXSkpO1xufTtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdWJ0cmFjdCguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCAoW2EsIGJdKSA9PiBhIC0gYik7XG59O1xuIiwiLyoqXG4gKiBTdW1zIGFsbCB0aGUgZWxlbWVudHMgb2YgdGhlIGdpdmVuIHZlY3Rvci5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvciBUaGUgdmVjdG9yIHdob3NlIGVsZW1lbnRzIGFyZSB0byBiZSBzdW1tZWQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgc3VtIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgdmVjdG9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1bVZlY3Rvcih2ZWN0b3IpIHtcblx0bGV0IHMgPSAwO1xuXHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdmVjdG9yKSB7XG5cdFx0cyArPSBlbGVtZW50O1xuXHR9XG5cdHJldHVybiBzO1xufTtcbiIsImNvbnN0IHN1bVZlY3RvciA9IHJlcXVpcmUoJy4vc3VtLXZlY3RvcicpO1xuXG4vLyBTdW0gYWxsIHRoZSB0ZXJtcyBvZiBhIGdpdmVuIG1hdHJpeFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdW0oYXJyYXkpIHtcblx0bGV0IHMgPSAwO1xuXHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgYXJyYXkpIHtcblx0XHRzICs9IHN1bVZlY3RvcihlbGVtZW50KTtcblx0fVxuXG5cdHJldHVybiBzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhY2UoYXJyYXkpIHtcblx0bGV0IGRpYWcgPSAwO1xuXHRmb3IgKGNvbnN0IFtyb3csIGVsZW1lbnRdIG9mIGFycmF5LmVudHJpZXMoKSkge1xuXHRcdGRpYWcgKz0gZWxlbWVudFtyb3ddO1xuXHR9XG5cdHJldHVybiBkaWFnO1xufTtcbiIsIi8qKlxuICogVHJhbnNwb3NlcyB0aGUgZ2l2ZW4gMkQgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PGFueT4+fSBhcnJheSBUaGUgMkQgYXJyYXkgdG8gdHJhbnNwb3NlLlxuICogQHJldHVybnMge0FycmF5PEFycmF5PGFueT4+fSBUaGUgdHJhbnNwb3NlZCAyRCBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc3Bvc2UoYXJyYXkpIHtcblx0cmV0dXJuIGFycmF5WzBdLm1hcCgoY29sLCBpKSA9PiBhcnJheS5tYXAocm93ID0+IHJvd1tpXSkpO1xufTtcbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgMkQgYXJyYXkgZmlsbGVkIHdpdGggemVyb3Mgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zLlxuICogQHBhcmFtIHtudW1iZXJ9IHJvd3MgVGhlIG51bWJlciBvZiByb3dzIGZvciB0aGUgMkQgYXJyYXkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29scyBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgZm9yIHRoZSAyRCBhcnJheS5cbiAqIEByZXR1cm5zIHtudW1iZXJbXVtdfSBBIDJEIGFycmF5IGZpbGxlZCB3aXRoIHplcm9zLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHplcm9zKHJvd3MsIGNvbHMpIHtcblx0cmV0dXJuIG5ldyBBcnJheShyb3dzKS5maWxsKDEpLm1hcCgoKSA9PiBuZXcgQXJyYXkoY29scykuZmlsbCgwKSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnByb2plY3RPYnNlcnZhdGlvbiA9IGV4cG9ydHMuY292YXJpYW5jZVRvQ29ycmVsYXRpb24gPSBleHBvcnRzLmNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlID0gZXhwb3J0cy5jaGVja0NvdmFyaWFuY2UgPSBleHBvcnRzLlN0YXRlID0gZXhwb3J0cy5nZXRDb3ZhcmlhbmNlID0gZXhwb3J0cy5LYWxtYW5GaWx0ZXIgPSB2b2lkIDA7XG5jb25zdCBtb2RlbENvbGxlY3Rpb24gPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vbGliL21vZGVsLWNvbGxlY3Rpb25cIikpO1xuY29uc3QgZGVmYXVsdER5bmFtaWNNb2RlbHMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vbGliL2R5bmFtaWNcIikpO1xuY29uc3QgZGVmYXVsdE9ic2VydmF0aW9uTW9kZWxzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL2xpYi9vYnNlcnZhdGlvblwiKSk7XG5mdW5jdGlvbiBjYW1lbFRvRGFzaChzdHIpIHtcbiAgICBpZiAoc3RyID09PSBzdHIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2VBbGwoL1tBLVpdL2csIG0gPT4gJy0nICsgbS50b0xvd2VyQ2FzZSgpKTtcbn1cbk9iamVjdC5rZXlzKGRlZmF1bHREeW5hbWljTW9kZWxzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgbW9kZWxDb2xsZWN0aW9uLnJlZ2lzdGVyRHluYW1pYyhjYW1lbFRvRGFzaChrKSwgZGVmYXVsdER5bmFtaWNNb2RlbHNba10pO1xufSk7XG5PYmplY3Qua2V5cyhkZWZhdWx0T2JzZXJ2YXRpb25Nb2RlbHMpLmZvckVhY2goKGspID0+IHtcbiAgICBtb2RlbENvbGxlY3Rpb24ucmVnaXN0ZXJPYnNlcnZhdGlvbihjYW1lbFRvRGFzaChrKSwgZGVmYXVsdE9ic2VydmF0aW9uTW9kZWxzW2tdKTtcbn0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2xpYi9tb2RlbC1jb2xsZWN0aW9uXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9saWIvZHluYW1pY1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbGliL29ic2VydmF0aW9uXCIpLCBleHBvcnRzKTtcbnZhciBrYWxtYW5fZmlsdGVyXzEgPSByZXF1aXJlKFwiLi9saWIva2FsbWFuLWZpbHRlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkthbG1hbkZpbHRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KGthbG1hbl9maWx0ZXJfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBnZXRfY292YXJpYW5jZV8xID0gcmVxdWlyZShcIi4vbGliL3V0aWxzL2dldC1jb3ZhcmlhbmNlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0Q292YXJpYW5jZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KGdldF9jb3ZhcmlhbmNlXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL2xpYi9zdGF0ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN0YXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoc3RhdGVfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjaGVja19jb3ZhcmlhbmNlXzEgPSByZXF1aXJlKFwiLi9saWIvdXRpbHMvY2hlY2stY292YXJpYW5jZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNoZWNrQ292YXJpYW5jZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KGNoZWNrX2NvdmFyaWFuY2VfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjb3JyZWxhdGlvbl90b19jb3ZhcmlhbmNlXzEgPSByZXF1aXJlKFwiLi9saWIvdXRpbHMvY29ycmVsYXRpb24tdG8tY292YXJpYW5jZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoY29ycmVsYXRpb25fdG9fY292YXJpYW5jZV8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIGNvdmFyaWFuY2VfdG9fY29ycmVsYXRpb25fMSA9IHJlcXVpcmUoXCIuL2xpYi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY292YXJpYW5jZVRvQ29ycmVsYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb3ZhcmlhbmNlX3RvX2NvcnJlbGF0aW9uXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgcHJvamVjdF9vYnNlcnZhdGlvbl8xID0gcmVxdWlyZShcIi4vbGliL3V0aWxzL3Byb2plY3Qtb2JzZXJ2YXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwcm9qZWN0T2JzZXJ2YXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChwcm9qZWN0X29ic2VydmF0aW9uXzEpLmRlZmF1bHQ7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuY29uc3Qgc3RhdGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdGF0ZVwiKSk7XG5jb25zdCBjaGVja19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9jaGVjay1tYXRyaXhcIikpO1xuY29uc3QgVHlwZUFzc2VydF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVzL1R5cGVBc3NlcnRcIikpO1xuY29uc3QgZGVmYXVsdExvZ2dlciA9IHtcbiAgICBpbmZvOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG4gICAgZGVidWcoKSB7IH0sXG4gICAgd2FybjogKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuICAgIGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG59O1xuY2xhc3MgQ29yZUthbG1hbkZpbHRlciB7XG4gICAgZHluYW1pYztcbiAgICBvYnNlcnZhdGlvbjtcbiAgICBsb2dnZXI7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGR5bmFtaWMsIG9ic2VydmF0aW9uLCBsb2dnZXIgPSBkZWZhdWx0TG9nZ2VyIH0gPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmR5bmFtaWMgPSBkeW5hbWljO1xuICAgICAgICB0aGlzLm9ic2VydmF0aW9uID0gb2JzZXJ2YXRpb247XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBnZXRWYWx1ZShmbiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZm4pID09PSAnZnVuY3Rpb24nID8gZm4ob3B0aW9ucykgOiBmbik7XG4gICAgfVxuICAgIGdldEluaXRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtZWFuOiBtZWFuSW5pdCwgY292YXJpYW5jZTogY292YXJpYW5jZUluaXQsIGluZGV4OiBpbmRleEluaXQgfSA9IHRoaXMuZHluYW1pYy5pbml0O1xuICAgICAgICBjb25zdCBpbml0U3RhdGUgPSBuZXcgc3RhdGVfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1lYW46IG1lYW5Jbml0LFxuICAgICAgICAgICAgY292YXJpYW5jZTogY292YXJpYW5jZUluaXQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXhJbml0LFxuICAgICAgICB9KTtcbiAgICAgICAgc3RhdGVfMS5kZWZhdWx0LmNoZWNrKGluaXRTdGF0ZSwgeyB0aXRsZTogJ2R5bmFtaWMuaW5pdCcgfSk7XG4gICAgICAgIHJldHVybiBpbml0U3RhdGU7XG4gICAgfVxuICAgIGdldFByZWRpY3RlZENvdmFyaWFuY2Uob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCB7IHByZXZpb3VzQ29ycmVjdGVkLCBpbmRleCB9ID0gb3B0aW9ucztcbiAgICAgICAgcHJldmlvdXNDb3JyZWN0ZWQgfHw9IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XG4gICAgICAgIGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHsgcHJldmlvdXNDb3JyZWN0ZWQsIGluZGV4LCAuLi5vcHRpb25zIH07XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMuZHluYW1pYy50cmFuc2l0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkodHJhbnNpdGlvbiwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIHRoaXMuZHluYW1pYy5kaW1lbnNpb25dLCAnZHluYW1pYy50cmFuc2l0aW9uJyk7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25UcmFuc3Bvc2VkID0gKDAsIHNpbXBsZV9saW5hbGdfMS50cmFuc3Bvc2UpKHRyYW5zaXRpb24pO1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlSW50ZXIgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkodHJhbnNpdGlvbiwgcHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG4gICAgICAgIGNvbnN0IGNvdmFyaWFuY2VQcmV2aW91cyA9ICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShjb3ZhcmlhbmNlSW50ZXIsIHRyYW5zaXRpb25UcmFuc3Bvc2VkKTtcbiAgICAgICAgY29uc3QgZHluQ292ID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMuY292YXJpYW5jZSwgZ2V0VmFsdWVPcHRpb25zKTtcbiAgICAgICAgY29uc3QgY292YXJpYW5jZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuYWRkKShkeW5Db3YsIGNvdmFyaWFuY2VQcmV2aW91cyk7XG4gICAgICAgICgwLCBjaGVja19tYXRyaXhfMS5kZWZhdWx0KShjb3ZhcmlhbmNlLCBbdGhpcy5keW5hbWljLmRpbWVuc2lvbiwgdGhpcy5keW5hbWljLmRpbWVuc2lvbl0sICdwcmVkaWN0ZWQuY292YXJpYW5jZScpO1xuICAgICAgICByZXR1cm4gY292YXJpYW5jZTtcbiAgICB9XG4gICAgcHJlZGljdE1lYW4obykge1xuICAgICAgICBjb25zdCBtZWFuID0gdGhpcy5wcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKG8pO1xuICAgICAgICBpZiAoIXRoaXMuZHluYW1pYy5jb25zdGFudCkge1xuICAgICAgICAgICAgcmV0dXJuIG1lYW47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBvcHRzIH0gPSBvO1xuICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5keW5hbWljLmNvbnN0YW50KG9wdHMpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoY29udHJvbCwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIDFdLCAnZHluYW1pYy5jb25zdGFudCcpO1xuICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5hZGQpKG1lYW4sIGNvbnRyb2wpO1xuICAgIH1cbiAgICBwcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgeyBvcHRzLCB0cmFuc2l0aW9uIH0gPSBhcmdzO1xuICAgICAgICBpZiAodGhpcy5keW5hbWljLmZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5keW5hbWljLmZuKG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgcHJldmlvdXNDb3JyZWN0ZWQgfSA9IG9wdHM7XG4gICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkodHJhbnNpdGlvbiwgcHJldmlvdXNDb3JyZWN0ZWQubWVhbik7XG4gICAgfVxuICAgIHByZWRpY3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCB7IHByZXZpb3VzQ29ycmVjdGVkLCBpbmRleCB9ID0gb3B0aW9ucztcbiAgICAgICAgcHJldmlvdXNDb3JyZWN0ZWQgfHw9IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGluZGV4KSAhPT0gJ251bWJlcicgJiYgdHlwZW9mIChwcmV2aW91c0NvcnJlY3RlZC5pbmRleCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpbmRleCA9IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4ICsgMTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZV8xLmRlZmF1bHQuY2hlY2socHJldmlvdXNDb3JyZWN0ZWQsIHsgZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9uIH0pO1xuICAgICAgICBjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgcHJldmlvdXNDb3JyZWN0ZWQsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLnRyYW5zaXRpb24sIGdldFZhbHVlT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1lYW4gPSB0aGlzLnByZWRpY3RNZWFuKHsgdHJhbnNpdGlvbiwgb3B0czogZ2V0VmFsdWVPcHRpb25zIH0pO1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5nZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKGdldFZhbHVlT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHByZWRpY3RlZCA9IG5ldyBzdGF0ZV8xLmRlZmF1bHQoeyBtZWFuLCBjb3ZhcmlhbmNlLCBpbmRleCB9KTtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1ByZWRpY3Rpb24gZG9uZScsIHByZWRpY3RlZCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocHJlZGljdGVkLm1lYW5bMF1bMF0pKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVkaWN0ZWQ7XG4gICAgfVxuICAgIGdldEdhaW4ob3B0aW9ucykge1xuICAgICAgICBsZXQgeyBwcmVkaWN0ZWQsIHN0YXRlUHJvamVjdGlvbiB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge1xuICAgICAgICAgICAgaW5kZXg6IHByZWRpY3RlZC5pbmRleCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIFR5cGVBc3NlcnRfMS5kZWZhdWx0LmFzc2VydElzQXJyYXkyRE9yRm5jKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCAnQ29yZUthbG1hbkZpbHRlci5nZXRHYWluJyk7XG4gICAgICAgIHN0YXRlUHJvamVjdGlvbiB8fD0gdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcbiAgICAgICAgY29uc3Qgb2JzQ292YXJpYW5jZSA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5jb3ZhcmlhbmNlLCBnZXRWYWx1ZU9wdGlvbnMpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkob2JzQ292YXJpYW5jZSwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvalRyYW5zcG9zZWQgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLnRyYW5zcG9zZSkoc3RhdGVQcm9qZWN0aW9uKTtcbiAgICAgICAgKDAsIGNoZWNrX21hdHJpeF8xLmRlZmF1bHQpKHN0YXRlUHJvamVjdGlvbiwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ29ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbicpO1xuICAgICAgICBjb25zdCBub2lzZWxlc3NJbm5vdmF0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKCgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShzdGF0ZVByb2plY3Rpb24sIHByZWRpY3RlZC5jb3ZhcmlhbmNlKSwgc3RhdGVQcm9qVHJhbnNwb3NlZCk7XG4gICAgICAgIGNvbnN0IGlubm92YXRpb25Db3ZhcmlhbmNlID0gKDAsIHNpbXBsZV9saW5hbGdfMS5hZGQpKG5vaXNlbGVzc0lubm92YXRpb24sIG9ic0NvdmFyaWFuY2UpO1xuICAgICAgICBjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKSgoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkocHJlZGljdGVkLmNvdmFyaWFuY2UsIHN0YXRlUHJvalRyYW5zcG9zZWQpLCAoMCwgc2ltcGxlX2xpbmFsZ18xLmludmVydCkoaW5ub3ZhdGlvbkNvdmFyaWFuY2UpKTtcbiAgICAgICAgcmV0dXJuIG9wdGltYWxLYWxtYW5HYWluO1xuICAgIH1cbiAgICBnZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHsgcHJlZGljdGVkLCBvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9uIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBpZGVudGl0eSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKHByZWRpY3RlZC5jb3ZhcmlhbmNlLmxlbmd0aCk7XG4gICAgICAgIGlmICghc3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgICAgICBUeXBlQXNzZXJ0XzEuZGVmYXVsdC5hc3NlcnRJc0FycmF5MkQodGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdDb3JlS2FsbWFuRmlsdGVyLmdldENvcnJlY3RlZENvdmFyaWFuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBpbmRleDogcHJlZGljdGVkLmluZGV4LFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3RhdGVQcm9qZWN0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpbWFsS2FsbWFuR2FpbiB8fD0gdGhpcy5nZXRHYWluKHsgc3RhdGVQcm9qZWN0aW9uLCAuLi5vcHRpb25zIH0pO1xuICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKCgwLCBzaW1wbGVfbGluYWxnXzEuc3VidHJhY3QpKGlkZW50aXR5LCAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkob3B0aW1hbEthbG1hbkdhaW4sIHN0YXRlUHJvamVjdGlvbikpLCBwcmVkaWN0ZWQuY292YXJpYW5jZSk7XG4gICAgfVxuICAgIGdldFByZWRpY3RlZE9ic2VydmF0aW9uKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgeyBvcHRzLCBzdGF0ZVByb2plY3Rpb24gfSA9IGFyZ3M7XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmF0aW9uLmZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZhdGlvbi5mbihvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHByZWRpY3RlZCB9ID0gb3B0cztcbiAgICAgICAgcmV0dXJuICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShzdGF0ZVByb2plY3Rpb24sIHByZWRpY3RlZC5tZWFuKTtcbiAgICB9XG4gICAgY29ycmVjdChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgcHJlZGljdGVkLCBvYnNlcnZhdGlvbiB9ID0gb3B0aW9ucztcbiAgICAgICAgc3RhdGVfMS5kZWZhdWx0LmNoZWNrKHByZWRpY3RlZCwgeyBkaW1lbnNpb246IHRoaXMuZHluYW1pYy5kaW1lbnNpb24gfSk7XG4gICAgICAgIGlmICghb2JzZXJ2YXRpb24pIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ25vIG1lYXN1cmUgYXZhaWxhYmxlJykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG9ic2VydmF0aW9uLFxuICAgICAgICAgICAgcHJlZGljdGVkLFxuICAgICAgICAgICAgaW5kZXg6IHByZWRpY3RlZC5pbmRleCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIFR5cGVBc3NlcnRfMS5kZWZhdWx0LmFzc2VydElzQXJyYXkyRE9yRm5jKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCAnQ29yZUthbG1hbkZpbHRlci5jb3JyZWN0Jyk7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIGdldFZhbHVlT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG9wdGltYWxLYWxtYW5HYWluID0gdGhpcy5nZXRHYWluKHtcbiAgICAgICAgICAgIHByZWRpY3RlZCxcbiAgICAgICAgICAgIHN0YXRlUHJvamVjdGlvbixcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBpbm5vdmF0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5zdWJ0cmFjdCkob2JzZXJ2YXRpb24sIHRoaXMuZ2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oeyBzdGF0ZVByb2plY3Rpb24sIG9wdHM6IGdldFZhbHVlT3B0aW9ucyB9KSk7XG4gICAgICAgIGNvbnN0IG1lYW4gPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmFkZCkocHJlZGljdGVkLm1lYW4sICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShvcHRpbWFsS2FsbWFuR2FpbiwgaW5ub3ZhdGlvbikpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKG1lYW5bMF1bMF0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7IG9wdGltYWxLYWxtYW5HYWluLCBpbm5vdmF0aW9uLCBwcmVkaWN0ZWQgfSk7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignTWVhbiBpcyBOYU4gYWZ0ZXIgY29ycmVjdGlvbicpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKHtcbiAgICAgICAgICAgIHByZWRpY3RlZCxcbiAgICAgICAgICAgIG9wdGltYWxLYWxtYW5HYWluLFxuICAgICAgICAgICAgc3RhdGVQcm9qZWN0aW9uLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNvcnJlY3RlZCA9IG5ldyBzdGF0ZV8xLmRlZmF1bHQoeyBtZWFuLCBjb3ZhcmlhbmNlLCBpbmRleDogcHJlZGljdGVkLmluZGV4IH0pO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnQ29ycmVjdGlvbiBkb25lJywgY29ycmVjdGVkKTtcbiAgICAgICAgcmV0dXJuIGNvcnJlY3RlZDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBDb3JlS2FsbWFuRmlsdGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtb2RlbF9jb2xsZWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwtY29sbGVjdGlvblwiKTtcbmZ1bmN0aW9uIGNvbXBvc2l0aW9uKHsgcGVyTmFtZSB9LCBvYnNlcnZhdGlvbikge1xuICAgIGNvbnN0IHsgb2JzZXJ2ZWRQcm9qZWN0aW9uIH0gPSBvYnNlcnZhdGlvbjtcbiAgICBjb25zdCBvYnNlcnZlZER5bmFtRGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aDtcbiAgICBjb25zdCBkeW5hbWljTmFtZXMgPSBPYmplY3Qua2V5cyhwZXJOYW1lKTtcbiAgICBjb25zdCBjb25mcyA9IHt9O1xuICAgIGxldCBuZXh0RHluYW1pY0RpbWVuc2lvbiA9IG9ic2VydmVkRHluYW1EaW1lbnNpb247XG4gICAgbGV0IG5leHRPYnNlcnZlZERpbWVuc2lvbiA9IDA7XG4gICAgZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGNvbnN0IG9ic0R5bmFJbmRleGVzID0gcGVyTmFtZVtrXS5vYnNEeW5hSW5kZXhlcztcbiAgICAgICAgaWYgKHR5cGVvZiAocGVyTmFtZVtrXS5uYW1lKSA9PT0gJ3N0cmluZycgJiYgcGVyTmFtZVtrXS5uYW1lICE9PSBrKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKGAke3Blck5hbWVba10ubmFtZX0gYW5kIFwiJHtrfVwiIHNob3VsZCBtYXRjaGApKTtcbiAgICAgICAgfVxuICAgICAgICBwZXJOYW1lW2tdLm5hbWUgPSBrO1xuICAgICAgICBjb25zdCB7IGRpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZSwgaW5pdCB9ID0gKDAsIG1vZGVsX2NvbGxlY3Rpb25fMS5idWlsZER5bmFtaWMpKHBlck5hbWVba10sIG9ic2VydmF0aW9uKTtcbiAgICAgICAgY29uc3QgZHluYW1pY0luZGV4ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1lbnNpb247IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXNPYnNlcnZlZCA9IChpIDwgb2JzRHluYUluZGV4ZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCBuZXdJbmRleDtcbiAgICAgICAgICAgIGlmIChpc09ic2VydmVkKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBuZXh0T2JzZXJ2ZWREaW1lbnNpb247XG4gICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ICE9PSBvYnNEeW5hSW5kZXhlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCd0aHNvZSBzaG91bGQgbWF0Y2gnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHRPYnNlcnZlZERpbWVuc2lvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBuZXh0RHluYW1pY0RpbWVuc2lvbjtcbiAgICAgICAgICAgICAgICBuZXh0RHluYW1pY0RpbWVuc2lvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHluYW1pY0luZGV4ZXMucHVzaChuZXdJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uZnNba10gPSB7XG4gICAgICAgICAgICBkeW5hbWljSW5kZXhlcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgICAgICBkaW1lbnNpb24sXG4gICAgICAgICAgICBjb3ZhcmlhbmNlLFxuICAgICAgICAgICAgaW5pdCxcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCB0b3RhbERpbWVuc2lvbiA9IGR5bmFtaWNOYW1lcy5tYXAoayA9PiBjb25mc1trXS5kaW1lbnNpb24pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuICAgIGlmIChuZXh0RHluYW1pY0RpbWVuc2lvbiAhPT0gdG90YWxEaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignbWlzY2FsY3VsYXRpb24gb2YgdHJhbnNpdGlvbicpKTtcbiAgICB9XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgICAgICBtZWFuOiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLFxuICAgICAgICBjb3ZhcmlhbmNlOiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoMCkubWFwKCgpID0+IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKSksXG4gICAgfTtcbiAgICBkeW5hbWljTmFtZXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgY29uc3QgeyBkeW5hbWljSW5kZXhlcywgaW5pdDogbG9jYWxJbml0LCB9ID0gY29uZnNba107XG4gICAgICAgIGlmICh0eXBlb2YgKGxvY2FsSW5pdCkgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbml0IGlzIG1hbmRhdG9yeScpO1xuICAgICAgICB9XG4gICAgICAgIGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4gZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzIsIGkyKSA9PiB7XG4gICAgICAgICAgICBpbml0LmNvdmFyaWFuY2VbYzFdW2MyXSA9IGxvY2FsSW5pdC5jb3ZhcmlhbmNlW2kxXVtpMl07XG4gICAgICAgIH0pKTtcbiAgICAgICAgZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiB7XG4gICAgICAgICAgICBpbml0Lm1lYW5bYzFdID0gbG9jYWxJbml0Lm1lYW5baTFdO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaW1lbnNpb246IHRvdGFsRGltZW5zaW9uLFxuICAgICAgICBpbml0LFxuICAgICAgICB0cmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJldmlvdXNDb3JyZWN0ZWQgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRUcmFuc2l0aW9uID0gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKHVuZGVmaW5lZCkubWFwKCgpID0+IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKSk7XG4gICAgICAgICAgICBkeW5hbWljTmFtZXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGR5bmFtaWNJbmRleGVzLCB0cmFuc2l0aW9uLCB9ID0gY29uZnNba107XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uczIgPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ29ycmVjdGVkOiBwcmV2aW91c0NvcnJlY3RlZC5zdWJTdGF0ZShkeW5hbWljSW5kZXhlcyksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zaXRpb24ob3B0aW9uczIpO1xuICAgICAgICAgICAgICAgIGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4gZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzIsIGkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFRyYW5zaXRpb25bYzFdW2MyXSA9IHRyYW5zW2kxXVtpMl07XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0VHJhbnNpdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgY292YXJpYW5jZShvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzQ29ycmVjdGVkIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0Q292YXJpYW5jZSA9IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCh1bmRlZmluZWQpLm1hcCgoKSA9PiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoMCkpO1xuICAgICAgICAgICAgZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkeW5hbWljSW5kZXhlcywgY292YXJpYW5jZSwgfSA9IGNvbmZzW2tdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMyID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NvcnJlY3RlZDogcHJldmlvdXNDb3JyZWN0ZWQuc3ViU3RhdGUoZHluYW1pY0luZGV4ZXMpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgY292ID0gY292YXJpYW5jZShvcHRpb25zMik7XG4gICAgICAgICAgICAgICAgZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q292YXJpYW5jZVtjMV1bYzJdID0gY292W2kxXVtpMl07XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Q292YXJpYW5jZTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gY29tcG9zaXRpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuZnVuY3Rpb24gY29uc3RhbnRBY2NlbGVyYXRpb24oZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3QgeyBzdGF0ZVByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGxldCBkaW1lbnNpb247XG4gICAgaWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAzKSkge1xuICAgICAgICBkaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcbiAgICAgICAgZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDM7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgIGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ29ic2VydmVkUHJvamVjdGlvbiBvciBzdGF0ZVByb2plY3Rpb24gc2hvdWxkIGJlIGRlZmluZWQgaW4gb2JzZXJ2YXRpb24gaW4gb3JkZXIgdG8gdXNlIGNvbnN0YW50LXNwZWVkIGZpbHRlcicpKTtcbiAgICB9XG4gICAgY29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDM7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgdHJhbnNpdGlvbltpXVtpICsgYmFzZURpbWVuc2lvbl0gPSB0aW1lU3RlcDtcbiAgICAgICAgdHJhbnNpdGlvbltpXVtpICsgKDIgKiBiYXNlRGltZW5zaW9uKV0gPSAwLjUgKiAodGltZVN0ZXAgKiogMik7XG4gICAgICAgIHRyYW5zaXRpb25baSArIGJhc2VEaW1lbnNpb25dW2kgKyAoMiAqIGJhc2VEaW1lbnNpb24pXSA9IHRpbWVTdGVwO1xuICAgIH1cbiAgICBjb25zdCBhcnJheUNvdmFyaWFuY2UgPSBuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCgxKVxuICAgICAgICAuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKVxuICAgICAgICAuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICoqIDQpKTtcbiAgICBjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5keW5hbWljLCBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsXG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNvbnN0YW50QWNjZWxlcmF0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IGh1Z2UgPSAxZTY7XG5mdW5jdGlvbiBjb25zdGFudFBvc2l0aW9uV2l0aE51bGwoeyBzdGF0aWNDb3ZhcmlhbmNlLCBvYnNEeW5hSW5kZXhlcywgaW5pdCB9KSB7XG4gICAgY29uc3QgZGltZW5zaW9uID0gb2JzRHluYUluZGV4ZXMubGVuZ3RoO1xuICAgIGluaXQgfHw9IHtcbiAgICAgICAgbWVhbjogbmV3IEFycmF5KG9ic0R5bmFJbmRleGVzLmxlbmd0aCkuZmlsbCgwKS5tYXAoKCkgPT4gWzBdKSxcbiAgICAgICAgY292YXJpYW5jZTogKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShuZXcgQXJyYXkob2JzRHluYUluZGV4ZXMubGVuZ3RoKS5maWxsKGh1Z2UpKSxcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgIH07XG4gICAgaWYgKHN0YXRpY0NvdmFyaWFuY2UgJiYgc3RhdGljQ292YXJpYW5jZS5sZW5ndGggIT09IGRpbWVuc2lvbikge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdzdGF0aWNDb3ZhcmlhbmNlIGhhcyB3cm9uZyBzaXplJykpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBkaW1lbnNpb24sXG4gICAgICAgIHRyYW5zaXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5pZGVudGl0eSkoZGltZW5zaW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgY292YXJpYW5jZSh7IHByZXZpb3VzQ29ycmVjdGVkLCBpbmRleCB9KSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmQmV0d2VlbkluZGV4ZXMgPSBpbmRleCAtIHByZXZpb3VzQ29ycmVjdGVkLmluZGV4O1xuICAgICAgICAgICAgaWYgKHN0YXRpY0NvdmFyaWFuY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGljQ292YXJpYW5jZS5tYXAocm93ID0+IHJvdy5tYXAoZWxlbWVudCA9PiBlbGVtZW50ICogZGlmZkJldHdlZW5JbmRleGVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5pZGVudGl0eSkoZGltZW5zaW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdCxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gY29uc3RhbnRQb3NpdGlvbldpdGhOdWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmZ1bmN0aW9uIGNvbnN0YW50UG9zaXRpb24oZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBsZXQgeyBkaW1lbnNpb24gfSA9IGR5bmFtaWM7XG4gICAgY29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG4gICAgY29uc3QgeyBvYnNlcnZlZFByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IHsgc3RhdGVQcm9qZWN0aW9uIH0gPSBvYnNlcnZhdGlvbjtcbiAgICBsZXQgeyBjb3ZhcmlhbmNlIH0gPSBkeW5hbWljO1xuICAgIGlmICghZHluYW1pYy5kaW1lbnNpb24pIHtcbiAgICAgICAgaWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgICAgICBkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbiA9IG9ic2VydmVkUHJvamVjdGlvblswXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgICAgICBkaW1lbnNpb24gPSBzdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHRyYW5zaXRpb24gPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmlkZW50aXR5KShkaW1lbnNpb24pO1xuICAgIGNvdmFyaWFuY2UgfHw9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZHluYW1pYywgZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlLFxuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb25zdGFudFBvc2l0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmZ1bmN0aW9uIGNvbnN0YW50U3BlZWREeW5hbWljKGFyZ3MsIG9ic2VydmF0aW9uKSB7XG4gICAgY29uc3QgeyBzdGF0aWNDb3ZhcmlhbmNlLCBhdlNwZWVkLCBjZW50ZXIgfSA9IGFyZ3M7XG4gICAgY29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5vYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgIGNvbnN0IGRpbWVuc2lvbiA9IDIgKiBvYnNlcnZhdGlvbkRpbWVuc2lvbjtcbiAgICBpZiAoKGNlbnRlcikgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignQ2VudGVyIG11c3QgYmUgZGVmaW5lZCcpKTtcbiAgICB9XG4gICAgaWYgKGNlbnRlci5sZW5ndGggIT09IG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBDZW50ZXIgc2l6ZSBzaG91bGQgYmUgJHtvYnNlcnZhdGlvbkRpbWVuc2lvbn1gKSk7XG4gICAgfVxuICAgIGlmIChhdlNwZWVkLmxlbmd0aCAhPT0gb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYGF2U3BlZWQgc2l6ZSBzaG91bGQgYmUgJHtvYnNlcnZhdGlvbkRpbWVuc2lvbn1gKSk7XG4gICAgfVxuICAgIGNvbnN0IGluaXRDb3YgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmRpYWcpKGNlbnRlci5tYXAoYyA9PiBjICogYyAvIDMpLmNvbmNhdChhdlNwZWVkLm1hcChjID0+IGMgKiBjIC8gMykpKTtcbiAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICBtZWFuOiBjZW50ZXIubWFwKGMgPT4gW2NdKS5jb25jYXQoY2VudGVyLm1hcCgoKSA9PiBbMF0pKSxcbiAgICAgICAgY292YXJpYW5jZTogaW5pdENvdixcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgIH07XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9IChhcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZ2V0VGltZSwgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkIH0gPSBhcmdzO1xuICAgICAgICBjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGRUKSAhPT0gJ251bWJlcicgfHwgTnVtYmVyLmlzTmFOKGRUKSkge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYGRUICgke2RUfSkgc2hvdWxkIGJlIGEgbnVtYmVyYCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdCA9ICgwLCBzaW1wbGVfbGluYWxnXzEuZGlhZykoY2VudGVyLm1hcCgoKSA9PiAxKS5jb25jYXQoY2VudGVyLm1hcCgoKSA9PiAxKSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic2VydmF0aW9uRGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgICAgIG1hdFtpXVtvYnNlcnZhdGlvbkRpbWVuc2lvbiArIGldID0gZFQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE51bWJlci5pc05hTihtYXRbMF1bMl0pKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuIG1hdCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH07XG4gICAgY29uc3QgY292YXJpYW5jZSA9IChhcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkLCBnZXRUaW1lIH0gPSBhcmdzO1xuICAgICAgICBjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGRUKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBkVCAoJHtkVH0pIHNob3VsZCBiZSBhIG51bWJlcmApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KGRUKTtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihzcXJ0KSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coeyBsYXN0UHJldmlvdXNJbmRleDogcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgsIGluZGV4IH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZFQsIHByZXZpb3VzQ29ycmVjdGVkLmluZGV4LCBpbmRleCwgZ2V0VGltZShpbmRleCksIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpKTtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1NxcnQoZFQpIGlzIE5hTicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShzdGF0aWNDb3ZhcmlhbmNlLm1hcCh2ID0+IHYgKiBzcXJ0KSk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0LFxuICAgICAgICBkaW1lbnNpb24sXG4gICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgIGNvdmFyaWFuY2UsXG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNvbnN0YW50U3BlZWREeW5hbWljO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmZ1bmN0aW9uIGNvbnN0YW50U3BlZWQoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcbiAgICBjb25zdCB7IG9ic2VydmVkUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3QgeyBzdGF0ZVByb2plY3Rpb24gfSA9IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGxldCBkaW1lbnNpb247XG4gICAgaWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAyKSkge1xuICAgICAgICBkaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcbiAgICAgICAgZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG4gICAgICAgIGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ29ic2VydmVkUHJvamVjdGlvbiBvciBzdGF0ZVByb2plY3Rpb24gc2hvdWxkIGJlIGRlZmluZWQgaW4gb2JzZXJ2YXRpb24gaW4gb3JkZXIgdG8gdXNlIGNvbnN0YW50LXNwZWVkIGZpbHRlcicpKTtcbiAgICB9XG4gICAgY29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDI7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcbiAgICAgICAgdHJhbnNpdGlvbltpXVtpICsgYmFzZURpbWVuc2lvbl0gPSB0aW1lU3RlcDtcbiAgICB9XG4gICAgY29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSkuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKTtcbiAgICBjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5keW5hbWljLCBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsXG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNvbnN0YW50U3BlZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2hvcnR0ZXJtQ29uc3RhbnRTcGVlZCA9IGV4cG9ydHMuY29uc3RhbnRTcGVlZER5bmFtaWMgPSBleHBvcnRzLmNvbnN0YW50UG9zaXRpb25XaXRoTnVsbCA9IGV4cG9ydHMuY29tcG9zaXRpb24gPSBleHBvcnRzLmNvbnN0YW50QWNjZWxlcmF0aW9uID0gZXhwb3J0cy5jb25zdGFudFNwZWVkID0gZXhwb3J0cy5jb25zdGFudFBvc2l0aW9uID0gdm9pZCAwO1xudmFyIGNvbnN0YW50X3Bvc2l0aW9uXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudC1wb3NpdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbnN0YW50UG9zaXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb25zdGFudF9wb3NpdGlvbl8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIGNvbnN0YW50X3NwZWVkXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudC1zcGVlZFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbnN0YW50U3BlZWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb25zdGFudF9zcGVlZF8xKS5kZWZhdWx0OyB9IH0pO1xudmFyIGNvbnN0YW50X2FjY2VsZXJhdGlvbl8xID0gcmVxdWlyZShcIi4vY29uc3RhbnQtYWNjZWxlcmF0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uc3RhbnRBY2NlbGVyYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb25zdGFudF9hY2NlbGVyYXRpb25fMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjb21wb3NpdGlvbl8xID0gcmVxdWlyZShcIi4vY29tcG9zaXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb21wb3NpdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KGNvbXBvc2l0aW9uXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgY29uc3RhbnRfcG9zaXRpb25fd2l0aF9udWxsXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudC1wb3NpdGlvbi13aXRoLW51bGxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25zdGFudFBvc2l0aW9uV2l0aE51bGxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb25zdGFudF9wb3NpdGlvbl93aXRoX251bGxfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBjb25zdGFudF9zcGVlZF9keW5hbWljXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudC1zcGVlZC1keW5hbWljXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uc3RhbnRTcGVlZER5bmFtaWNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChjb25zdGFudF9zcGVlZF9keW5hbWljXzEpLmRlZmF1bHQ7IH0gfSk7XG52YXIgc2hvcnR0ZXJtX2NvbnN0YW50X3NwZWVkXzEgPSByZXF1aXJlKFwiLi9zaG9ydHRlcm0tY29uc3RhbnQtc3BlZWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaG9ydHRlcm1Db25zdGFudFNwZWVkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoc2hvcnR0ZXJtX2NvbnN0YW50X3NwZWVkXzEpLmRlZmF1bHQ7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuY29uc3QgY29uc3RhbnRfc3BlZWRfZHluYW1pY18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NvbnN0YW50LXNwZWVkLWR5bmFtaWNcIikpO1xuY29uc3Qgc2FmZURpdiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChiID09PSAwKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gYSAvIGI7XG59O1xuZnVuY3Rpb24gc2hvcnR0ZXJtQ29uc3RhbnRTcGVlZChvcHRpb25zLCBvYnNlcnZhdGlvbikge1xuICAgIGNvbnN0IHsgdHlwaWNhbFRpbWVzIH0gPSBvcHRpb25zO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0eXBpY2FsVGltZXMpKSB7XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCd0eXBpY2FsVGltZXMgbXVzdCBiZSBkZWZpbmVkJykpO1xuICAgIH1cbiAgICBjb25zdCBjb25zdGFudFNwZWVkID0gKDAsIGNvbnN0YW50X3NwZWVkX2R5bmFtaWNfMS5kZWZhdWx0KShvcHRpb25zLCBvYnNlcnZhdGlvbik7XG4gICAgY29uc3QgeyBkaW1lbnNpb24sIGluaXQgfSA9IGNvbnN0YW50U3BlZWQ7XG4gICAgaWYgKHR5cGljYWxUaW1lcy5sZW5ndGggIT09IGRpbWVuc2lvbikge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgdHlwaWNhbFRpbWVzICgke3R5cGljYWxUaW1lcy5sZW5ndGh9KSBsZW5ndGggaXMgbm90IGFzIGV4cGVjdGVkICgke2RpbWVuc2lvbn0pYCkpO1xuICAgIH1cbiAgICBjb25zdCBtaXhNYXRyaXggPSBmdW5jdGlvbiAoeyByYXRpb3MsIGFNYXQsIGJNYXQsIH0pIHtcbiAgICAgICAgcmV0dXJuICgwLCBzaW1wbGVfbGluYWxnXzEuZWxlbVdpc2UpKFthTWF0LCBiTWF0XSwgKFttLCBkXSwgcm93SW5kZXgsIGNvbEluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByYXRpbyA9IHJvd0luZGV4ID09PSBjb2xJbmRleCA/IHJhdGlvc1tyb3dJbmRleF0gOiAocmF0aW9zW3Jvd0luZGV4XSArIHJhdGlvc1tjb2xJbmRleF0pIC8gMjtcbiAgICAgICAgICAgIHJldHVybiAocmF0aW8gKiBtKSArICgoMSAtIHJhdGlvKSAqIGQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpbWVuc2lvbixcbiAgICAgICAgaW5pdCxcbiAgICAgICAgdHJhbnNpdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBhTWF0ID0gY29uc3RhbnRTcGVlZC50cmFuc2l0aW9uKG9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgeyBnZXRUaW1lLCBpbmRleCwgcHJldmlvdXNDb3JyZWN0ZWQgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCByYXRpb3MgPSB0eXBpY2FsVGltZXMubWFwKHQgPT4gTWF0aC5leHAoLTEgKiBkVCAvIHQpKTtcbiAgICAgICAgICAgIGNvbnN0IGJNYXQgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmRpYWcpKCgwLCBzaW1wbGVfbGluYWxnXzEuZWxlbVdpc2UpKFtpbml0Lm1lYW4sIHByZXZpb3VzQ29ycmVjdGVkLm1lYW5dLCAoW20sIGRdKSA9PiBzYWZlRGl2KG0sIGQpKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSk7XG4gICAgICAgICAgICByZXR1cm4gbWl4TWF0cml4KHsgcmF0aW9zLCBhTWF0LCBiTWF0IH0pO1xuICAgICAgICB9LFxuICAgICAgICBjb3ZhcmlhbmNlKG9wdGlvbnMsIG9ic2VydmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCB7IGdldFRpbWUsIGluZGV4LCBwcmV2aW91c0NvcnJlY3RlZCB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIGNvbnN0IGRUID0gZ2V0VGltZShpbmRleCkgLSBnZXRUaW1lKHByZXZpb3VzQ29ycmVjdGVkLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHJhdGlvcyA9IHR5cGljYWxUaW1lcy5tYXAodCA9PiBNYXRoLmV4cCgtMSAqIGRUIC8gdCkpO1xuICAgICAgICAgICAgY29uc3QgYU1hdCA9IGNvbnN0YW50U3BlZWQuY292YXJpYW5jZShvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBtaXhNYXRyaXgoeyByYXRpb3MsIGFNYXQsIGJNYXQ6IGluaXQuY292YXJpYW5jZSB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc2hvcnR0ZXJtQ29uc3RhbnRTcGVlZDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IGFycmF5X3RvX21hdHJpeF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9saWIvdXRpbHMvYXJyYXktdG8tbWF0cml4XCIpKTtcbmNvbnN0IHNldF9kaW1lbnNpb25zXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2xpYi9zZXR1cC9zZXQtZGltZW5zaW9uc1wiKSk7XG5jb25zdCBjaGVja19kaW1lbnNpb25zXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2xpYi9zZXR1cC9jaGVjay1kaW1lbnNpb25zXCIpKTtcbmNvbnN0IGJ1aWxkX3N0YXRlX3Byb2plY3Rpb25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbGliL3NldHVwL2J1aWxkLXN0YXRlLXByb2plY3Rpb25cIikpO1xuY29uc3QgZXh0ZW5kX2R5bmFtaWNfaW5pdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9saWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdFwiKSk7XG5jb25zdCB0b19mdW5jdGlvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9saWIvdXRpbHMvdG8tZnVuY3Rpb25cIikpO1xuY29uc3QgZGVlcF9hc3NpZ25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbGliL3V0aWxzL2RlZXAtYXNzaWduXCIpKTtcbmNvbnN0IHBvbHltb3JwaF9tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbGliL3V0aWxzL3BvbHltb3JwaC1tYXRyaXhcIikpO1xuY29uc3Qgc3RhdGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdGF0ZVwiKSk7XG5jb25zdCBtb2RlbENvbGxlY3Rpb24gPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vbW9kZWwtY29sbGVjdGlvblwiKSk7XG5jb25zdCBjb3JlX2thbG1hbl9maWx0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb3JlLWthbG1hbi1maWx0ZXJcIikpO1xuY29uc3QgVHlwZUFzc2VydF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVzL1R5cGVBc3NlcnRcIikpO1xuY29uc3QgYnVpbGREZWZhdWx0RHluYW1pYyA9IGZ1bmN0aW9uIChkeW5hbWljKSB7XG4gICAgaWYgKHR5cGVvZiAoZHluYW1pYykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB7IG5hbWU6IGR5bmFtaWMgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgbmFtZTogJ2NvbnN0YW50LXBvc2l0aW9uJyB9O1xufTtcbmNvbnN0IGJ1aWxkRGVmYXVsdE9ic2VydmF0aW9uID0gZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiAob2JzZXJ2YXRpb24pID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4geyBuYW1lOiAnc2Vuc29yJywgc2Vuc29yRGltZW5zaW9uOiBvYnNlcnZhdGlvbiB9O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB7IG5hbWU6IG9ic2VydmF0aW9uIH07XG4gICAgfVxuICAgIHJldHVybiB7IG5hbWU6ICdzZW5zb3InIH07XG59O1xuY29uc3Qgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBsZXQgeyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9ID0gYXJncztcbiAgICBpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgIT09ICdvYmplY3QnIHx8IG9ic2VydmF0aW9uID09PSBudWxsKSB7XG4gICAgICAgIG9ic2VydmF0aW9uID0gYnVpbGREZWZhdWx0T2JzZXJ2YXRpb24ob2JzZXJ2YXRpb24pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIChkeW5hbWljKSAhPT0gJ29iamVjdCcgfHwgZHluYW1pYyA9PT0gbnVsbCkge1xuICAgICAgICBkeW5hbWljID0gYnVpbGREZWZhdWx0RHluYW1pYyhkeW5hbWljKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAob2JzZXJ2YXRpb24ubmFtZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG9ic2VydmF0aW9uID0gbW9kZWxDb2xsZWN0aW9uLmJ1aWxkT2JzZXJ2YXRpb24ob2JzZXJ2YXRpb24pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIChkeW5hbWljLm5hbWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICBkeW5hbWljID0gbW9kZWxDb2xsZWN0aW9uLmJ1aWxkRHluYW1pYyhkeW5hbWljLCBvYnNlcnZhdGlvbik7XG4gICAgfVxuICAgIGNvbnN0IHdpdGhEaW1lbnNpb25PcHRpb25zID0gKDAsIHNldF9kaW1lbnNpb25zXzEuZGVmYXVsdCkoeyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9KTtcbiAgICBjb25zdCBjaGVja2VkRGltZW5zaW9uT3B0aW9ucyA9ICgwLCBjaGVja19kaW1lbnNpb25zXzEuZGVmYXVsdCkod2l0aERpbWVuc2lvbk9wdGlvbnMpO1xuICAgIGNvbnN0IGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyA9ICgwLCBidWlsZF9zdGF0ZV9wcm9qZWN0aW9uXzEuZGVmYXVsdCkoY2hlY2tlZERpbWVuc2lvbk9wdGlvbnMpO1xuICAgIHJldHVybiAoMCwgZXh0ZW5kX2R5bmFtaWNfaW5pdF8xLmRlZmF1bHQpKGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyk7XG59O1xuY29uc3QgbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnMgPSBmdW5jdGlvbiAobW9kZWxUb0JlQ2hhbmdlZCkge1xuICAgIGNvbnN0IHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfSA9IG1vZGVsVG9CZUNoYW5nZWQ7XG4gICAgVHlwZUFzc2VydF8xLmRlZmF1bHQuYXNzZXJ0Tm90QXJyYXkob2JzZXJ2YXRpb24sICdtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9uczogb2JzZXJ2YXRpb24nKTtcbiAgICByZXR1cm4gKDAsIGRlZXBfYXNzaWduXzEuZGVmYXVsdCkobW9kZWxUb0JlQ2hhbmdlZCwge1xuICAgICAgICBvYnNlcnZhdGlvbjoge1xuICAgICAgICAgICAgc3RhdGVQcm9qZWN0aW9uOiAoMCwgdG9fZnVuY3Rpb25fMS5kZWZhdWx0KSgoMCwgcG9seW1vcnBoX21hdHJpeF8xLmRlZmF1bHQpKG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiksIHsgbGFiZWw6ICdvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24nIH0pLFxuICAgICAgICAgICAgY292YXJpYW5jZTogKDAsIHRvX2Z1bmN0aW9uXzEuZGVmYXVsdCkoKDAsIHBvbHltb3JwaF9tYXRyaXhfMS5kZWZhdWx0KShvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlLCB7IGRpbWVuc2lvbjogb2JzZXJ2YXRpb24uZGltZW5zaW9uIH0pLCB7IGxhYmVsOiAnb2JzZXJ2YXRpb24uY292YXJpYW5jZScgfSksXG4gICAgICAgIH0sXG4gICAgICAgIGR5bmFtaWM6IHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICgwLCB0b19mdW5jdGlvbl8xLmRlZmF1bHQpKCgwLCBwb2x5bW9ycGhfbWF0cml4XzEuZGVmYXVsdCkoZHluYW1pYy50cmFuc2l0aW9uKSwgeyBsYWJlbDogJ2R5bmFtaWMudHJhbnNpdGlvbicgfSksXG4gICAgICAgICAgICBjb3ZhcmlhbmNlOiAoMCwgdG9fZnVuY3Rpb25fMS5kZWZhdWx0KSgoMCwgcG9seW1vcnBoX21hdHJpeF8xLmRlZmF1bHQpKGR5bmFtaWMuY292YXJpYW5jZSwgeyBkaW1lbnNpb246IGR5bmFtaWMuZGltZW5zaW9uIH0pLCB7IGxhYmVsOiAnZHluYW1pYy5jb3ZhcmlhbmNlJyB9KSxcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5jbGFzcyBLYWxtYW5GaWx0ZXIgZXh0ZW5kcyBjb3JlX2thbG1hbl9maWx0ZXJfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgbW9kZWxzUGFyYW1ldGVycyA9IHNldHVwTW9kZWxzUGFyYW1ldGVycyhvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY29yZU9wdGlvbnMgPSBtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9ucyhtb2RlbHNQYXJhbWV0ZXJzKTtcbiAgICAgICAgc3VwZXIoeyAuLi5vcHRpb25zLCAuLi5jb3JlT3B0aW9ucyB9KTtcbiAgICB9XG4gICAgY29ycmVjdChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGNvcmVPYnNlcnZhdGlvbiA9ICgwLCBhcnJheV90b19tYXRyaXhfMS5kZWZhdWx0KSh7IG9ic2VydmF0aW9uOiBvcHRpb25zLm9ic2VydmF0aW9uLCBkaW1lbnNpb246IHRoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uIH0pO1xuICAgICAgICByZXR1cm4gc3VwZXIuY29ycmVjdCh7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgb2JzZXJ2YXRpb246IGNvcmVPYnNlcnZhdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbHRlcihvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHByZWRpY3RlZCA9IHN1cGVyLnByZWRpY3Qob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcnJlY3Qoe1xuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIHByZWRpY3RlZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbHRlckFsbChvYnNlcnZhdGlvbnMpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzQ29ycmVjdGVkID0gdGhpcy5nZXRJbml0U3RhdGUoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG9ic2VydmF0aW9uIG9mIG9ic2VydmF0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgcHJlZGljdGVkID0gdGhpcy5wcmVkaWN0KHsgcHJldmlvdXNDb3JyZWN0ZWQgfSk7XG4gICAgICAgICAgICBwcmV2aW91c0NvcnJlY3RlZCA9IHRoaXMuY29ycmVjdCh7XG4gICAgICAgICAgICAgICAgcHJlZGljdGVkLFxuICAgICAgICAgICAgICAgIG9ic2VydmF0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQubWVhbi5tYXAobSA9PiBtWzBdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGFzeW1wdG90aWNTdGF0ZUNvdmFyaWFuY2UoeyBsaW1pdEl0ZXJhdGlvbnMgPSAxZTIsIHRvbGVyYW5jZSA9IDFlLTYgfSA9IHt9KSB7XG4gICAgICAgIGxldCBwcmV2aW91c0NvcnJlY3RlZCA9IHN1cGVyLmdldEluaXRTdGF0ZSgpO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGltaXRJdGVyYXRpb25zOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRpY3RlZCA9IG5ldyBzdGF0ZV8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgICAgIG1lYW46IFtdLFxuICAgICAgICAgICAgICAgIGNvdmFyaWFuY2U6IHN1cGVyLmdldFByZWRpY3RlZENvdmFyaWFuY2UoeyBwcmV2aW91c0NvcnJlY3RlZCB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJldmlvdXNDb3JyZWN0ZWQgPSBuZXcgc3RhdGVfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgICAgICBtZWFuOiBbXSxcbiAgICAgICAgICAgICAgICBjb3ZhcmlhbmNlOiBzdXBlci5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKHsgcHJlZGljdGVkIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG4gICAgICAgICAgICBpZiAoKDAsIHNpbXBsZV9saW5hbGdfMS5mcm9iZW5pdXMpKHByZXZpb3VzQ29ycmVjdGVkLmNvdmFyaWFuY2UsIHJlc3VsdHNbaSAtIDFdKSA8IHRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1RoZSBzdGF0ZSBjb3ZhcmlhbmNlIGRvZXMgbm90IGNvbnZlcmdlIGFzeW1wdG90aWNhbGx5JykpO1xuICAgIH1cbiAgICBhc3ltcHRvdGljR2Fpbih7IHRvbGVyYW5jZSA9IDFlLTYgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmFzeW1wdG90aWNTdGF0ZUNvdmFyaWFuY2UoeyB0b2xlcmFuY2UgfSk7XG4gICAgICAgIGNvbnN0IGFzeW1wdG90aWNTdGF0ZSA9IG5ldyBzdGF0ZV8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWVhbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogY292YXJpYW5jZS5sZW5ndGggfSkuZmlsbCgwKS5tYXAoKCkgPT4gWzBdKSxcbiAgICAgICAgICAgIGNvdmFyaWFuY2UsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0R2Fpbih7IHByZWRpY3RlZDogYXN5bXB0b3RpY1N0YXRlIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEthbG1hbkZpbHRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5idWlsZER5bmFtaWMgPSBleHBvcnRzLmJ1aWxkT2JzZXJ2YXRpb24gPSBleHBvcnRzLnJlZ2lzdGVyRHluYW1pYyA9IGV4cG9ydHMucmVnaXN0ZXJPYnNlcnZhdGlvbiA9IHZvaWQgMDtcbmNvbnN0IHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVscyA9IHt9O1xuY29uc3QgcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHMgPSB7fTtcbmZ1bmN0aW9uIHJlZ2lzdGVyT2JzZXJ2YXRpb24obmFtZSwgZm4pIHtcbiAgICByZWdpc3RlcmVkT2JzZXJ2YXRpb25Nb2RlbHNbbmFtZV0gPSBmbjtcbn1cbmV4cG9ydHMucmVnaXN0ZXJPYnNlcnZhdGlvbiA9IHJlZ2lzdGVyT2JzZXJ2YXRpb247XG5mdW5jdGlvbiByZWdpc3RlckR5bmFtaWMobmFtZSwgZm4pIHtcbiAgICByZWdpc3RlcmVkRHluYW1pY01vZGVsc1tuYW1lXSA9IGZuO1xufVxuZXhwb3J0cy5yZWdpc3RlckR5bmFtaWMgPSByZWdpc3RlckR5bmFtaWM7XG5mdW5jdGlvbiBidWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiAocmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgVGhlIHByb3ZpZGVkIG9ic2VydmF0aW9uIG1vZGVsIG5hbWUgKCR7b2JzZXJ2YXRpb24ubmFtZX0pIGlzIG5vdCByZWdpc3RlcmVkYCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKG9ic2VydmF0aW9uKTtcbn1cbmV4cG9ydHMuYnVpbGRPYnNlcnZhdGlvbiA9IGJ1aWxkT2JzZXJ2YXRpb247XG5mdW5jdGlvbiBidWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcbiAgICBpZiAodHlwZW9mIChyZWdpc3RlcmVkRHluYW1pY01vZGVsc1tkeW5hbWljLm5hbWVdKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgVGhlIHByb3ZpZGVkIGR5bmFtaWMgbW9kZWwgKCR7ZHluYW1pYy5uYW1lfSkgbmFtZSBpcyBub3QgcmVnaXN0ZXJlZGApKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzW2R5bmFtaWMubmFtZV0oZHluYW1pYywgb2JzZXJ2YXRpb24pO1xufVxuZXhwb3J0cy5idWlsZER5bmFtaWMgPSBidWlsZER5bmFtaWM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2Vuc29yUHJvamVjdGVkID0gZXhwb3J0cy5zZW5zb3JMb2NhbFZhcmlhbmNlID0gZXhwb3J0cy5zZW5zb3IgPSB2b2lkIDA7XG52YXIgc2Vuc29yXzEgPSByZXF1aXJlKFwiLi9zZW5zb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZW5zb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChzZW5zb3JfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBzZW5zb3JfbG9jYWxfdmFyaWFuY2VfMSA9IHJlcXVpcmUoXCIuL3NlbnNvci1sb2NhbC12YXJpYW5jZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNlbnNvckxvY2FsVmFyaWFuY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChzZW5zb3JfbG9jYWxfdmFyaWFuY2VfMSkuZGVmYXVsdDsgfSB9KTtcbnZhciBzZW5zb3JfcHJvamVjdGVkXzEgPSByZXF1aXJlKFwiLi9zZW5zb3ItcHJvamVjdGVkXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2Vuc29yUHJvamVjdGVkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoc2Vuc29yX3Byb2plY3RlZF8xKS5kZWZhdWx0OyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IG1vZGVsX2NvbGxlY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC1jb2xsZWN0aW9uXCIpO1xuZnVuY3Rpb24gbnVsbGFibGVTZW5zb3Iob3B0aW9ucykge1xuICAgIGNvbnN0IHsgZGltZW5zaW9uLCBvYnNlcnZlZFByb2plY3Rpb24sIGNvdmFyaWFuY2U6IGJhc2VDb3ZhcmlhbmNlIH0gPSAoMCwgbW9kZWxfY29sbGVjdGlvbl8xLmJ1aWxkT2JzZXJ2YXRpb24pKHsgLi4ub3B0aW9ucywgbmFtZTogJ3NlbnNvcicgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGltZW5zaW9uLFxuICAgICAgICBvYnNlcnZlZFByb2plY3Rpb24sXG4gICAgICAgIGNvdmFyaWFuY2Uobykge1xuICAgICAgICAgICAgY29uc3QgY292YXJpYW5jZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKGRpbWVuc2lvbik7XG4gICAgICAgICAgICBjb25zdCB7IHZhcmlhbmNlIH0gPSBvO1xuICAgICAgICAgICAgdmFyaWFuY2UuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdmFyaWFuY2VbaV1baV0gPSB2ICogYmFzZUNvdmFyaWFuY2VbaV1baV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjb3ZhcmlhbmNlO1xuICAgICAgICB9LFxuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBudWxsYWJsZVNlbnNvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5jb25zdCBjb3JyZWxhdGlvbl90b19jb3ZhcmlhbmNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2VcIikpO1xuY29uc3QgY292YXJpYW5jZV90b19jb3JyZWxhdGlvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uXCIpKTtcbmZ1bmN0aW9uIHNlbnNvclByb2plY3RlZCh7IHNlbGVjdGVkQ292YXJpYW5jZSwgdG90YWxEaW1lbnNpb24sIG9ic0luZGV4ZXMsIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uIH0pIHtcbiAgICBpZiAoIXNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uID0gbmV3IEFycmF5KG9ic0luZGV4ZXMubGVuZ3RoKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkob2JzSW5kZXhlcy5sZW5ndGgpLmZpbGwoMCkpO1xuICAgICAgICBvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MSwgaTEpID0+IHtcbiAgICAgICAgICAgIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uW2kxXVtpMV0gPSAxO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RoICE9PSBvYnNJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBbU2Vuc29yLXByb2plY3RlZF0gU2hhcGUgbWlzbWF0Y2ggYmV0d2VlbiAke3NlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLmxlbmd0aH0gYW5kICR7b2JzSW5kZXhlcy5sZW5ndGh9YCkpO1xuICAgIH1cbiAgICBjb25zdCBiYXNlQ292YXJpYW5jZSA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKHRvdGFsRGltZW5zaW9uKTtcbiAgICBvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MSwgaTEpID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ292YXJpYW5jZSkge1xuICAgICAgICAgICAgb2JzSW5kZXhlcy5mb3JFYWNoKChpbmRleDIsIGkyKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFzZUNvdmFyaWFuY2VbaW5kZXgxXVtpbmRleDJdID0gc2VsZWN0ZWRDb3ZhcmlhbmNlW2kxXVtpMl07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHsgY29ycmVsYXRpb246IGJhc2VDb3JyZWxhdGlvbiwgdmFyaWFuY2U6IGJhc2VWYXJpYW5jZSB9ID0gKDAsIGNvdmFyaWFuY2VfdG9fY29ycmVsYXRpb25fMS5kZWZhdWx0KShiYXNlQ292YXJpYW5jZSk7XG4gICAgY29uc3QgZHluYURpbWVuc2lvbiA9IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcbiAgICBpZiAoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RoICE9PSBvYnNJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBzaGFwZSBtaXNtYXRjaCAoJHtzZWxlY3RlZFN0YXRlUHJvamVjdGlvbi5sZW5ndGh9IHZzICR7b2JzSW5kZXhlcy5sZW5ndGh9KWApKTtcbiAgICB9XG4gICAgY29uc3Qgb2JzZXJ2ZWRQcm9qZWN0aW9uID0gKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRQZXJtdXRhdGlvbikoe1xuICAgICAgICBvdXRwdXRTaXplOiBbdG90YWxEaW1lbnNpb24sIGR5bmFEaW1lbnNpb25dLFxuICAgICAgICBjb2xJbmRleGVzOiBzZWxlY3RlZFN0YXRlUHJvamVjdGlvblswXS5tYXAoKF8sIGkpID0+IGkpLFxuICAgICAgICByb3dJbmRleGVzOiBvYnNJbmRleGVzLFxuICAgICAgICBtYXRyaXg6IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpbWVuc2lvbjogdG90YWxEaW1lbnNpb24sXG4gICAgICAgIG9ic2VydmVkUHJvamVjdGlvbixcbiAgICAgICAgY292YXJpYW5jZShvKSB7XG4gICAgICAgICAgICBjb25zdCB7IHZhcmlhbmNlIH0gPSBvO1xuICAgICAgICAgICAgaWYgKCF2YXJpYW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQ292YXJpYW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YXJpYW5jZS5sZW5ndGggIT09IGJhc2VDb3ZhcmlhbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ3ZhcmlhbmNlIGlzIGRpZmZlcmVuY2Ugc2l6ZSBmcm9tIGJhc2VDb3ZhcmlhbmNlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gKDAsIGNvcnJlbGF0aW9uX3RvX2NvdmFyaWFuY2VfMS5kZWZhdWx0KSh7IGNvcnJlbGF0aW9uOiBiYXNlQ29ycmVsYXRpb24sIHZhcmlhbmNlOiBiYXNlVmFyaWFuY2UubWFwKChiLCBpKSA9PiB2YXJpYW5jZVtpXSAqIGIpIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc2Vuc29yUHJvamVjdGVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IHBvbHltb3JwaF9tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeFwiKSk7XG5jb25zdCBjaGVja19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbHMvY2hlY2stbWF0cml4XCIpKTtcbmNvbnN0IFR5cGVBc3NlcnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdHlwZXMvVHlwZUFzc2VydFwiKSk7XG5jb25zdCBjb3B5ID0gKG1hdCkgPT4gbWF0Lm1hcChhID0+IGEuY29uY2F0KCkpO1xuZnVuY3Rpb24gc2Vuc29yKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHNlbnNvckRpbWVuc2lvbiA9IDEsIHNlbnNvckNvdmFyaWFuY2UgPSAxLCBuU2Vuc29ycyA9IDEgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qgc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZCA9ICgwLCBwb2x5bW9ycGhfbWF0cml4XzEuZGVmYXVsdCkoc2Vuc29yQ292YXJpYW5jZSwgeyBkaW1lbnNpb246IHNlbnNvckRpbWVuc2lvbiB9KTtcbiAgICBpZiAoVHlwZUFzc2VydF8xLmRlZmF1bHQuaXNGdW5jdGlvbihzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkIGNhbiBub3QgYmUgYSBmdW5jdGlvbiBoZXJlJyk7XG4gICAgfVxuICAgICgwLCBjaGVja19tYXRyaXhfMS5kZWZhdWx0KShzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkLCBbc2Vuc29yRGltZW5zaW9uLCBzZW5zb3JEaW1lbnNpb25dLCAnb2JzZXJ2YXRpb24uc2Vuc29yQ292YXJpYW5jZScpO1xuICAgIGNvbnN0IG9uZVNlbnNvck9ic2VydmVkUHJvamVjdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuaWRlbnRpdHkpKHNlbnNvckRpbWVuc2lvbik7XG4gICAgbGV0IGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbiA9IFtdO1xuICAgIGNvbnN0IGRpbWVuc2lvbiA9IHNlbnNvckRpbWVuc2lvbiAqIG5TZW5zb3JzO1xuICAgIGNvbnN0IGNvbmNhdGVuYXRlZENvdmFyaWFuY2UgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmlkZW50aXR5KShkaW1lbnNpb24pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgblNlbnNvcnM7IGkrKykge1xuICAgICAgICBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24uY29uY2F0KGNvcHkob25lU2Vuc29yT2JzZXJ2ZWRQcm9qZWN0aW9uKSk7XG4gICAgICAgIGZvciAoY29uc3QgW3JJbmRleCwgcl0gb2Ygc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2NJbmRleCwgY10gb2Ygci5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25jYXRlbmF0ZWRDb3ZhcmlhbmNlW3JJbmRleCArIChpICogc2Vuc29yRGltZW5zaW9uKV1bY0luZGV4ICsgKGkgKiBzZW5zb3JEaW1lbnNpb24pXSA9IGM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgZGltZW5zaW9uLFxuICAgICAgICBvYnNlcnZlZFByb2plY3Rpb246IGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbixcbiAgICAgICAgY292YXJpYW5jZTogY29uY2F0ZW5hdGVkQ292YXJpYW5jZSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc2Vuc29yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMiA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuZnVuY3Rpb24gYnVpbGRTdGF0ZVByb2plY3Rpb24oYXJncykge1xuICAgIGNvbnN0IHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfSA9IGFyZ3M7XG4gICAgY29uc3QgeyBvYnNlcnZlZFByb2plY3Rpb24sIHN0YXRlUHJvamVjdGlvbiB9ID0gb2JzZXJ2YXRpb247XG4gICAgY29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG4gICAgY29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuICAgIGlmIChvYnNlcnZlZFByb2plY3Rpb24gJiYgc3RhdGVQcm9qZWN0aW9uKSB7XG4gICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCdZb3UgY2Fubm90IHVzZSBib3RoIG9ic2VydmVkUHJvamVjdGlvbiBhbmQgc3RhdGVQcm9qZWN0aW9uJykpO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEucGFkV2l0aFplcm9Db2xzKShvYnNlcnZlZFByb2plY3Rpb24sIHsgY29sdW1uczogZHluYW1pY0RpbWVuc2lvbiB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9ic2VydmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgLi4ub2JzZXJ2YXRpb24sXG4gICAgICAgICAgICAgICAgc3RhdGVQcm9qZWN0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGR5bmFtaWMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbiAmJiBkeW5hbWljRGltZW5zaW9uICYmICFzdGF0ZVByb2plY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YXRpb25NYXRyaXggPSAoMCwgc2ltcGxlX2xpbmFsZ18yLmlkZW50aXR5KShvYnNlcnZhdGlvbkRpbWVuc2lvbik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvYnNlcnZhdGlvbjoge1xuICAgICAgICAgICAgICAgIC4uLm9ic2VydmF0aW9uLFxuICAgICAgICAgICAgICAgIHN0YXRlUHJvamVjdGlvbjogKDAsIHNpbXBsZV9saW5hbGdfMS5wYWRXaXRoWmVyb0NvbHMpKG9ic2VydmF0aW9uTWF0cml4LCB7IGNvbHVtbnM6IGR5bmFtaWNEaW1lbnNpb24gfSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHluYW1pYyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGJ1aWxkU3RhdGVQcm9qZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjaGVja0RpbWVuc2lvbnMoYXJncykge1xuICAgIGNvbnN0IHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfSA9IGFyZ3M7XG4gICAgY29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGlmICghZHluYW1pY0RpbWVuc2lvbiB8fCAhb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoJ0RpbWVuc2lvbiBpcyBub3Qgc2V0JykpO1xuICAgIH1cbiAgICByZXR1cm4geyBvYnNlcnZhdGlvbiwgZHluYW1pYyB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tEaW1lbnNpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaW1wbGVfbGluYWxnXzEgPSByZXF1aXJlKFwic2ltcGxlLWxpbmFsZ1wiKTtcbmNvbnN0IHBvbHltb3JwaF9tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeFwiKSk7XG5jb25zdCBUeXBlQXNzZXJ0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3R5cGVzL1R5cGVBc3NlcnRcIikpO1xuZnVuY3Rpb24gZXh0ZW5kRHluYW1pY0luaXQoYXJncykge1xuICAgIGNvbnN0IHsgb2JzZXJ2YXRpb24sIGR5bmFtaWMgfSA9IGFyZ3M7XG4gICAgaWYgKCFkeW5hbWljLmluaXQpIHtcbiAgICAgICAgY29uc3QgaHVnZSA9IDFlNjtcbiAgICAgICAgY29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuICAgICAgICBjb25zdCBtZWFuQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbCgwKTtcbiAgICAgICAgY29uc3QgY292YXJpYW5jZUFycmF5ID0gbmV3IEFycmF5KGR5bmFtaWNEaW1lbnNpb24pLmZpbGwoaHVnZSk7XG4gICAgICAgIGNvbnN0IHdpdGhJbml0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG9ic2VydmF0aW9uLFxuICAgICAgICAgICAgZHluYW1pYzoge1xuICAgICAgICAgICAgICAgIC4uLmR5bmFtaWMsXG4gICAgICAgICAgICAgICAgaW5pdDoge1xuICAgICAgICAgICAgICAgICAgICBtZWFuOiBtZWFuQXJyYXkubWFwKGVsZW1lbnQgPT4gW2VsZW1lbnRdKSxcbiAgICAgICAgICAgICAgICAgICAgY292YXJpYW5jZTogKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShjb3ZhcmlhbmNlQXJyYXkpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB3aXRoSW5pdE9wdGlvbnM7XG4gICAgfVxuICAgIGlmIChkeW5hbWljLmluaXQgJiYgIWR5bmFtaWMuaW5pdC5tZWFuKSB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ2R5bmFtaWMuaW5pdCBzaG91bGQgaGF2ZSBhIG1lYW4ga2V5JykpO1xuICAgIH1cbiAgICBjb25zdCBjb3ZhcmlhbmNlID0gKDAsIHBvbHltb3JwaF9tYXRyaXhfMS5kZWZhdWx0KShkeW5hbWljLmluaXQuY292YXJpYW5jZSwgeyBkaW1lbnNpb246IGR5bmFtaWMuZGltZW5zaW9uIH0pO1xuICAgIGlmIChUeXBlQXNzZXJ0XzEuZGVmYXVsdC5pc0Z1bmN0aW9uKGNvdmFyaWFuY2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvdmFyaWFuY2UgY2FuIG5vdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGR5bmFtaWMuaW5pdCA9IHtcbiAgICAgICAgLi4uZHluYW1pYy5pbml0LFxuICAgICAgICBjb3ZhcmlhbmNlLFxuICAgIH07XG4gICAgcmV0dXJuIHsgb2JzZXJ2YXRpb24sIGR5bmFtaWM6IGR5bmFtaWMgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGV4dGVuZER5bmFtaWNJbml0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBzZXREaW1lbnNpb25zKGFyZ3MpIHtcbiAgICBjb25zdCB7IG9ic2VydmF0aW9uLCBkeW5hbWljIH0gPSBhcmdzO1xuICAgIGNvbnN0IHsgc3RhdGVQcm9qZWN0aW9uIH0gPSBvYnNlcnZhdGlvbjtcbiAgICBjb25zdCB7IHRyYW5zaXRpb24gfSA9IGR5bmFtaWM7XG4gICAgY29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuICAgIGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuICAgIGlmIChkeW5hbWljRGltZW5zaW9uICYmIG9ic2VydmF0aW9uRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkoc3RhdGVQcm9qZWN0aW9uKSAmJiAoZHluYW1pY0RpbWVuc2lvbiAhPT0gc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCB8fCBvYnNlcnZhdGlvbkRpbWVuc2lvbiAhPT0gc3RhdGVQcm9qZWN0aW9uLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3N0YXRlUHJvamVjdGlvbiBkaW1lbnNpb25zIG5vdCBtYXRjaGluZyB3aXRoIG9ic2VydmF0aW9uIGFuZCBkeW5hbWljIGRpbWVuc2lvbnMnKSk7XG4gICAgfVxuICAgIGlmIChkeW5hbWljRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkodHJhbnNpdGlvbikgJiYgZHluYW1pY0RpbWVuc2lvbiAhPT0gdHJhbnNpdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3RyYW5zaXRpb24gZGltZW5zaW9uIG5vdCBtYXRjaGluZyB3aXRoIGR5bmFtaWMgZGltZW5zaW9uJykpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvYnNlcnZhdGlvbjoge1xuICAgICAgICAgICAgICAgIC4uLm9ic2VydmF0aW9uLFxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbjogc3RhdGVQcm9qZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkeW5hbWljOiB7XG4gICAgICAgICAgICAgICAgLi4uZHluYW1pYyxcbiAgICAgICAgICAgICAgICBkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGgsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb2JzZXJ2YXRpb24sXG4gICAgICAgICAgICBkeW5hbWljOiB7XG4gICAgICAgICAgICAgICAgLi4uZHluYW1pYyxcbiAgICAgICAgICAgICAgICBkaW1lbnNpb246IHRyYW5zaXRpb24ubGVuZ3RoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgb2JzZXJ2YXRpb24sIGR5bmFtaWM6IGR5bmFtaWMgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHNldERpbWVuc2lvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNpbXBsZV9saW5hbGdfMSA9IHJlcXVpcmUoXCJzaW1wbGUtbGluYWxnXCIpO1xuY29uc3QgYXJyYXlfdG9fbWF0cml4XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvYXJyYXktdG8tbWF0cml4XCIpKTtcbmNvbnN0IGNoZWNrX21hdHJpeF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWxzL2NoZWNrLW1hdHJpeFwiKSk7XG5jb25zdCBjaGVja19jb3ZhcmlhbmNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvY2hlY2stY292YXJpYW5jZVwiKSk7XG5jb25zdCBUeXBlQXNzZXJ0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdHlwZXMvVHlwZUFzc2VydFwiKSk7XG5jbGFzcyBTdGF0ZSB7XG4gICAgbWVhbjtcbiAgICBjb3ZhcmlhbmNlO1xuICAgIGluZGV4O1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5tZWFuID0gYXJncy5tZWFuO1xuICAgICAgICB0aGlzLmNvdmFyaWFuY2UgPSBhcmdzLmNvdmFyaWFuY2U7XG4gICAgICAgIHRoaXMuaW5kZXggPSBhcmdzLmluZGV4IHx8IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY2hlY2sob3B0aW9ucykge1xuICAgICAgICBTdGF0ZS5jaGVjayh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgc3RhdGljIGNoZWNrKHN0YXRlLCBhcmdzID0ge30pIHtcbiAgICAgICAgY29uc3QgeyBkaW1lbnNpb24sIHRpdGxlLCBlaWdlbiB9ID0gYXJncztcbiAgICAgICAgaWYgKCEoc3RhdGUgaW5zdGFuY2VvZiBTdGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCdUaGUgYXJndW1lbnQgaXMgbm90IGEgc3RhdGUgXFxuJ1xuICAgICAgICAgICAgICAgICsgJ1RpcHM6IG1heWJlIHlvdSBhcmUgdXNpbmcgMiBkaWZmZXJlbnQgdmVyc2lvbiBvZiBrYWxtYW4tZmlsdGVyIGluIHlvdXIgbnBtIGRlcHMgdHJlZScpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IG1lYW4sIGNvdmFyaWFuY2UgfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBtZWFuRGltZW5zaW9uID0gbWVhbi5sZW5ndGg7XG4gICAgICAgIGlmICh0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInICYmIG1lYW5EaW1lbnNpb24gIT09IGRpbWVuc2lvbikge1xuICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBTdGF0ZS5tZWFuICR7bWVhbn0gd2l0aCBkaW1lbnNpb24gJHttZWFuRGltZW5zaW9ufSBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBkaW1lbnNpb24gKCR7ZGltZW5zaW9ufSlgKSk7XG4gICAgICAgIH1cbiAgICAgICAgKDAsIGNoZWNrX21hdHJpeF8xLmRlZmF1bHQpKG1lYW4sIFttZWFuRGltZW5zaW9uLCAxXSwgdGl0bGUgPyB0aXRsZSArICcubWVhbicgOiAnbWVhbicpO1xuICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoY292YXJpYW5jZSwgW21lYW5EaW1lbnNpb24sIG1lYW5EaW1lbnNpb25dLCB0aXRsZSA/IHRpdGxlICsgJy5jb3ZhcmlhbmNlJyA6ICdjb3ZhcmlhbmNlJyk7XG4gICAgICAgICgwLCBjaGVja19jb3ZhcmlhbmNlXzEuZGVmYXVsdCkoeyBjb3ZhcmlhbmNlLCBlaWdlbiB9LCB0aXRsZSA/IHRpdGxlICsgJy5jb3ZhcmlhbmNlJyA6ICdjb3ZhcmlhbmNlJyk7XG4gICAgfVxuICAgIHN0YXRpYyBtYXRNdWwoYXJncykge1xuICAgICAgICBjb25zdCB7IHN0YXRlLCBtYXRyaXggfSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IGNvdmFyaWFuY2UgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKG1hdHJpeCwgc3RhdGUuY292YXJpYW5jZSksICgwLCBzaW1wbGVfbGluYWxnXzEudHJhbnNwb3NlKShtYXRyaXgpKTtcbiAgICAgICAgY29uc3QgbWVhbiA9ICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShtYXRyaXgsIHN0YXRlLm1lYW4pO1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRlKHtcbiAgICAgICAgICAgIG1lYW4sXG4gICAgICAgICAgICBjb3ZhcmlhbmNlLFxuICAgICAgICAgICAgaW5kZXg6IHN0YXRlLmluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3ViU3RhdGUob2JzSW5kZXhlcykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBTdGF0ZSh7XG4gICAgICAgICAgICBtZWFuOiBvYnNJbmRleGVzLm1hcChpID0+IHRoaXMubWVhbltpXSksXG4gICAgICAgICAgICBjb3ZhcmlhbmNlOiAoMCwgc2ltcGxlX2xpbmFsZ18xLnN1YlNxdWFyZU1hdHJpeCkodGhpcy5jb3ZhcmlhbmNlLCBvYnNJbmRleGVzKSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICByYXdEZXRhaWxlZE1haGFsYW5vYmlzKHBvaW50KSB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLnN1YnRyYWN0KSh0aGlzLm1lYW4sIHBvaW50KTtcbiAgICAgICAgdGhpcy5jaGVjaygpO1xuICAgICAgICBjb25zdCBjb3ZhcmlhbmNlSW52ZXJ0ID0gKDAsIHNpbXBsZV9saW5hbGdfMS5pbnZlcnQpKHRoaXMuY292YXJpYW5jZSk7XG4gICAgICAgIGlmIChjb3ZhcmlhbmNlSW52ZXJ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrKHsgZWlnZW46IHRydWUgfSk7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBDYW5ub3QgaW52ZXJ0IGNvdmFyaWFuY2UgJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvdmFyaWFuY2UpfWApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaWZmVHJhbnNwb3NlZCA9ICgwLCBzaW1wbGVfbGluYWxnXzEudHJhbnNwb3NlKShkaWZmKTtcbiAgICAgICAgY29uc3QgdmFsdWVNYXRyaXggPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKGRpZmZUcmFuc3Bvc2VkLCBjb3ZhcmlhbmNlSW52ZXJ0KSwgZGlmZik7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5zcXJ0KHZhbHVlTWF0cml4WzBdWzBdKTtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlYnVnVmFsdWUgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoKDAsIHNpbXBsZV9saW5hbGdfMS5tYXRNdWwpKGRpZmZUcmFuc3Bvc2VkLCBjb3ZhcmlhbmNlSW52ZXJ0KSwgZGlmZik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgICAgICAgICAgZGlmZiwgY292YXJpYW5jZUludmVydCwgdGhpczogdGhpcywgcG9pbnQsXG4gICAgICAgICAgICB9LCBkZWJ1Z1ZhbHVlKTtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ21haGFsYW5vYmlzIGlzIE5hTicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlmZixcbiAgICAgICAgICAgIGNvdmFyaWFuY2VJbnZlcnQsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZGV0YWlsZWRNYWhhbGFub2JpcyhhcmdzKSB7XG4gICAgICAgIGNvbnN0IHsga2YsIG9ic2VydmF0aW9uLCBvYnNJbmRleGVzIH0gPSBhcmdzO1xuICAgICAgICBpZiAob2JzZXJ2YXRpb24ubGVuZ3RoICE9PSBrZi5vYnNlcnZhdGlvbi5kaW1lbnNpb24pIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoYE1haGFsYW5vYmlzIG9ic2VydmF0aW9uICR7b2JzZXJ2YXRpb259IChkaW1lbnNpb246ICR7b2JzZXJ2YXRpb24ubGVuZ3RofSkgZG9lcyBub3QgbWF0Y2ggd2l0aCBrZiBvYnNlcnZhdGlvbiBkaW1lbnNpb24gKCR7a2Yub2JzZXJ2YXRpb24uZGltZW5zaW9ufSlgKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvcnJlY3RseVNpemVkT2JzZXJ2YXRpb24gPSAoMCwgYXJyYXlfdG9fbWF0cml4XzEuZGVmYXVsdCkoeyBvYnNlcnZhdGlvbiwgZGltZW5zaW9uOiBvYnNlcnZhdGlvbi5sZW5ndGggfSk7XG4gICAgICAgIFR5cGVBc3NlcnRfMS5kZWZhdWx0LmFzc2VydElzQXJyYXkyRChrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdTdGF0ZS5kZXRhaWxlZE1haGFsYW5vYmlzJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IGtmLmdldFZhbHVlKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwge30pO1xuICAgICAgICBsZXQgcHJvamVjdGVkU3RhdGUgPSBTdGF0ZS5tYXRNdWwoeyBzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb24gfSk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG4gICAgICAgICAgICBwcm9qZWN0ZWRTdGF0ZSA9IHByb2plY3RlZFN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuICAgICAgICAgICAgY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbiA9IG9ic0luZGV4ZXMubWFwKGkgPT4gY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2plY3RlZFN0YXRlLnJhd0RldGFpbGVkTWFoYWxhbm9iaXMoY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbik7XG4gICAgfVxuICAgIG1haGFsYW5vYmlzKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kZXRhaWxlZE1haGFsYW5vYmlzKG9wdGlvbnMpLnZhbHVlO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCdtYWhhbGFub2JpcyBpcyBOYU4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgb2JzQmhhdHRhY2hhcnl5YShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsga2YsIHN0YXRlLCBvYnNJbmRleGVzIH0gPSBvcHRpb25zO1xuICAgICAgICBUeXBlQXNzZXJ0XzEuZGVmYXVsdC5hc3NlcnRJc0FycmF5MkQoa2Yub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCAnU3RhdGUub2JzQmhhdHRhY2hhcnl5YScpO1xuICAgICAgICBjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBrZi5nZXRWYWx1ZShrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIHt9KTtcbiAgICAgICAgbGV0IHByb2plY3RlZFNlbGZTdGF0ZSA9IFN0YXRlLm1hdE11bCh7IHN0YXRlOiB0aGlzLCBtYXRyaXg6IHN0YXRlUHJvamVjdGlvbiB9KTtcbiAgICAgICAgbGV0IHByb2plY3RlZE90aGVyU3RhdGUgPSBTdGF0ZS5tYXRNdWwoeyBzdGF0ZSwgbWF0cml4OiBzdGF0ZVByb2plY3Rpb24gfSk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG4gICAgICAgICAgICBwcm9qZWN0ZWRTZWxmU3RhdGUgPSBwcm9qZWN0ZWRTZWxmU3RhdGUuc3ViU3RhdGUob2JzSW5kZXhlcyk7XG4gICAgICAgICAgICBwcm9qZWN0ZWRPdGhlclN0YXRlID0gcHJvamVjdGVkT3RoZXJTdGF0ZS5zdWJTdGF0ZShvYnNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvamVjdGVkU2VsZlN0YXRlLmJoYXR0YWNoYXJ5eWEocHJvamVjdGVkT3RoZXJTdGF0ZSk7XG4gICAgfVxuICAgIGJoYXR0YWNoYXJ5eWEob3RoZXJTdGF0ZSkge1xuICAgICAgICBjb25zdCB7IGNvdmFyaWFuY2UsIG1lYW4gfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGF2ZXJhZ2UgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmVsZW1XaXNlKShbY292YXJpYW5jZSwgb3RoZXJTdGF0ZS5jb3ZhcmlhbmNlXSwgKFthLCBiXSkgPT4gKGEgKyBiKSAvIDIpO1xuICAgICAgICBsZXQgY292YXJJbnZlcnRlZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvdmFySW52ZXJ0ZWQgPSAoMCwgc2ltcGxlX2xpbmFsZ18xLmludmVydCkoYXZlcmFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGludmVydCcsIGF2ZXJhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlmZiA9ICgwLCBzaW1wbGVfbGluYWxnXzEuc3VidHJhY3QpKG1lYW4sIG90aGVyU3RhdGUubWVhbik7XG4gICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoKDAsIHNpbXBsZV9saW5hbGdfMS50cmFuc3Bvc2UpKGRpZmYpLCAoMCwgc2ltcGxlX2xpbmFsZ18xLm1hdE11bCkoY292YXJJbnZlcnRlZCwgZGlmZikpWzBdWzBdO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFN0YXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBkZWJ1Z1ZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIH1cbiAgICBsZXQgYXNTdGlybmcgPSAnJztcbiAgICBhc1N0aXJuZyA9IHR5cGVvZiAodmFsdWUpID09PSAnZnVuY3Rpb24nID8gdmFsdWUudG9TdHJpbmcoKSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICBpZiAoYXNTdGlybmcubGVuZ3RoIDwgMTAwKSB7XG4gICAgICAgIHJldHVybiBhc1N0aXJuZztcbiAgICB9XG4gICAgcmV0dXJuIGFzU3Rpcm5nLnNsaWNlKDAsIDk3KSArICcuLi4nO1xufVxuY2xhc3MgVHlwZUFzc2VydCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZG8gbm90IGNvbnN0dWN0IG1lJyk7XG4gICAgfVxuICAgIGR1bW15KCkgeyB9XG4gICAgc3RhdGljIGFzc2VydE5vdEFycmF5KGFyZywgbmFtZSA9ICdwYXJhbWV0ZXInKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDEgJHtuYW1lfSBjYW5ub3QgYmUgYW4gYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhc3NlcnRJc0FycmF5MkQoYXJnLCBuYW1lID0gJ3BhcmFtZXRlcicpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDIgJHtuYW1lfSBpcyBub3QgYW4gYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZ1swXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDMgJHtuYW1lfSBtdXN0IGJlIGFuIGFycmF5IG9mIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYXNzZXJ0SXNBcnJheTJET3JGbmMoYXJnLCBuYW1lID0gJ3BhcmFtZXRlcicpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoYXJnKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKGFyZywgbmFtZSk7XG4gICAgfVxuICAgIHN0YXRpYyBhc3NlcnRJc051bWJlcnNBcnJheShhcmcsIG5hbWUgPSAncGFyYW1ldGVyJykge1xuICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVR5cGVBc3NlcnQuaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDA0ICR7bmFtZX0gaXMgbm90IGFuIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJnLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYXJnWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHlwZUFzc2VydC5pc0FycmF5KGFyZ1swXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDUgJHtuYW1lfSBpcyBub3QgYW4gYXJyYXkgb2YgYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgKGFyZ1swXVswXSkgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDA2ICR7bmFtZX0gaXMgbm90IGFuIGFycmF5IG9mIGFycmF5IG9mIG51bWJlci4gY3VycmVudCB2YWx1ZSBpcyAke2RlYnVnVmFsdWUoYXJnKX0uYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGlzQXJyYXkyRChvYmopIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkob2JqWzBdKSk7XG4gICAgfVxuICAgIHN0YXRpYyBpc0FycmF5MUQob2JqKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKG9ialswXSkgPT09ICdudW1iZXInKTtcbiAgICB9XG4gICAgc3RhdGljIGlzQXJyYXkob2JqKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyBpc0Z1bmN0aW9uKGFyZykge1xuICAgICAgICBpZiAodHlwZW9mIChhcmcpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVHlwZUFzc2VydDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gYXJyYXlUb01hdHJpeChhcmdzKSB7XG4gICAgY29uc3QgeyBvYnNlcnZhdGlvbiwgZGltZW5zaW9uIH0gPSBhcmdzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYnNlcnZhdGlvbikpIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbiA9PT0gMSAmJiB0eXBlb2YgKG9ic2VydmF0aW9uKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBbW29ic2VydmF0aW9uXV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYFRoZSBvYnNlcnZhdGlvbiAoJHtvYnNlcnZhdGlvbn0pIHNob3VsZCBiZSBhbiBhcnJheSAoZGltZW5zaW9uOiAke2RpbWVuc2lvbn0pYCkpO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2YXRpb24ubGVuZ3RoICE9PSBkaW1lbnNpb24pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBUeXBlRXJyb3IoYE9ic2VydmF0aW9uICgke29ic2VydmF0aW9uLmxlbmd0aH0pIGFuZCBkaW1lbnNpb24gKCR7ZGltZW5zaW9ufSkgbm90IG1hdGNoaW5nYCkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIChvYnNlcnZhdGlvblswXSkgPT09ICdudW1iZXInIHx8IG9ic2VydmF0aW9uWzBdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhdGlvbi5tYXAoZWxlbWVudCA9PiBbZWxlbWVudF0pO1xuICAgIH1cbiAgICByZXR1cm4gb2JzZXJ2YXRpb247XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhcnJheVRvTWF0cml4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiQHJheXlhbWhrL21hdHJpeFwiKSk7XG5jb25zdCBjaGVja19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jaGVjay1tYXRyaXhcIikpO1xuY29uc3QgdG9sZXJhbmNlID0gMC4xO1xuY29uc3QgY2hlY2tEZWZpbml0ZVBvc2l0aXZlID0gZnVuY3Rpb24gKGNvdmFyaWFuY2UsIHRvbGVyYW5jZSA9IDFlLTEwKSB7XG4gICAgY29uc3QgY292YXJpYW5jZU1hdHJpeCA9IG5ldyBtYXRyaXhfMS5kZWZhdWx0KGNvdmFyaWFuY2UpO1xuICAgIGNvbnN0IGVpZ2VudmFsdWVzID0gY292YXJpYW5jZU1hdHJpeC5laWdlbnZhbHVlcygpO1xuICAgIGZvciAoY29uc3QgZWlnZW52YWx1ZSBvZiBlaWdlbnZhbHVlcykge1xuICAgICAgICBpZiAoZWlnZW52YWx1ZSA8PSAtdG9sZXJhbmNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb3ZhcmlhbmNlLCBlaWdlbnZhbHVlKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRWlnZW52YWx1ZSBzaG91bGQgYmUgcG9zaXRpdmUgKGFjdHVhbDogJHtlaWdlbnZhbHVlfSlgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygnaXMgZGVmaW5pdGUgcG9zaXRpdmUnLCBjb3ZhcmlhbmNlKTtcbn07XG5jb25zdCBjaGVja1N5bWV0cmljID0gZnVuY3Rpb24gKGNvdmFyaWFuY2UsIHRpdGxlID0gJ2NoZWNrU3ltZXRyaWMnKSB7XG4gICAgZm9yIChjb25zdCBbcm93SWQsIHJvd10gb2YgY292YXJpYW5jZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBbY29sSWQsIGl0ZW1dIG9mIHJvdy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChyb3dJZCA9PT0gY29sSWQgJiYgaXRlbSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gVmFyaWFuY2VbJHtjb2xJZH1dIHNob3VsZCBiZSBwb3NpdGl2ZSAoYWN0dWFsOiAke2l0ZW19KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnMoaXRlbSkgPiBNYXRoLnNxcnQoY292YXJpYW5jZVtyb3dJZF1bcm93SWRdICogY292YXJpYW5jZVtjb2xJZF1bY29sSWRdKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdmFyaWFuY2UpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGl0bGV9XSBDb3ZhcmlhbmNlWyR7cm93SWR9XVske2NvbElkfV0gc2hvdWxkIHZlcmlmeSBDYXVjaHkgU2Nod2FyeiBJbmVxdWFsaXR5IGBcbiAgICAgICAgICAgICAgICAgICAgKyBgKGV4cGVjdGVkOiB8eHwgPD0gc3FydCgke2NvdmFyaWFuY2Vbcm93SWRdW3Jvd0lkXX0gKiAke2NvdmFyaWFuY2VbY29sSWRdW2NvbElkXX0pYFxuICAgICAgICAgICAgICAgICAgICArIGAgYWN0dWFsOiAke2l0ZW19KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnMoaXRlbSAtIGNvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXSkgPiB0b2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gQ292YXJpYW5jZVske3Jvd0lkfV1bJHtjb2xJZH1dIHNob3VsZCBlcXVhbCBDb3ZhcmlhbmNlWyR7Y29sSWR9XVske3Jvd0lkfV0gYFxuICAgICAgICAgICAgICAgICAgICArIGAgKGFjdHVhbCBkaWZmOiAke01hdGguYWJzKGl0ZW0gLSBjb3ZhcmlhbmNlW2NvbElkXVtyb3dJZF0pfSkgID0gJHtpdGVtfSAtICR7Y292YXJpYW5jZVtjb2xJZF1bcm93SWRdfVxcbmBcbiAgICAgICAgICAgICAgICAgICAgKyBgJHtjb3ZhcmlhbmNlLmpvaW4oJ1xcbicpfSBpcyBpbnZhbGlkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gY2hlY2tDb3ZhcmlhbmNlKGFyZ3MsIF90aXRsZSkge1xuICAgIGNvbnN0IHsgY292YXJpYW5jZSwgZWlnZW4gPSBmYWxzZSB9ID0gYXJncztcbiAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoY292YXJpYW5jZSk7XG4gICAgY2hlY2tTeW1ldHJpYyhjb3ZhcmlhbmNlKTtcbiAgICBpZiAoZWlnZW4pIHtcbiAgICAgICAgY2hlY2tEZWZpbml0ZVBvc2l0aXZlKGNvdmFyaWFuY2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNoZWNrQ292YXJpYW5jZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hlY2tfc2hhcGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jaGVjay1zaGFwZVwiKSk7XG5mdW5jdGlvbiBjaGVja01hdHJpeChtYXRyaXgsIHNoYXBlLCB0aXRsZSA9ICdjaGVja01hdHJpeCcpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobWF0cml4KSkge1xuICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgWyR7dGl0bGV9XSBzaG91bGQgYmUgYSAyLWxldmVsIGFycmF5IG1hdHJpeCBhbmQgaXMgJHttYXRyaXh9YCkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJvdyBvZiBtYXRyaXgpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJvdykpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKGBbJHt0aXRsZX1dIDEtbGV2ZWwgYXJyYXkgc2hvdWxkIGJlIGEgbWF0cml4ICR7SlNPTi5zdHJpbmdpZnkobWF0cml4KX1gKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1hdHJpeC5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKS5zb21lKGEgPT4gTnVtYmVyLmlzTmFOKGEpKSkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBbJHt0aXRsZX1dIE1hdHJpeCBzaG91bGQgbm90IGhhdmUgYSBOYU5cXG5JbiA6IFxcbmBcbiAgICAgICAgICAgICsgbWF0cml4LmpvaW4oJ1xcbicpKSk7XG4gICAgfVxuICAgIGlmIChzaGFwZSkge1xuICAgICAgICAoMCwgY2hlY2tfc2hhcGVfMS5kZWZhdWx0KShtYXRyaXgsIHNoYXBlLCB0aXRsZSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tNYXRyaXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNoZWNrU2hhcGUobWF0cml4LCBzaGFwZSwgdGl0bGUgPSAnY2hlY2tTaGFwZScpIHtcbiAgICBpZiAobWF0cml4Lmxlbmd0aCAhPT0gc2hhcGVbMF0pIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBleHBlY3RlZCBzaXplICgke3NoYXBlWzBdfSkgYW5kIGxlbmd0aCAoJHttYXRyaXgubGVuZ3RofSkgZG9lcyBub3QgbWF0Y2hgKSk7XG4gICAgfVxuICAgIGlmIChzaGFwZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBtYXRyaXguZm9yRWFjaChtID0+IGNoZWNrU2hhcGUobSwgc2hhcGUuc2xpY2UoMSksIHRpdGxlKSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tTaGFwZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hlY2tfY292YXJpYW5jZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NoZWNrLWNvdmFyaWFuY2VcIikpO1xuZnVuY3Rpb24gY29ycmVsYXRpb25Ub0NvdmFyaWFuY2UoeyBjb3JyZWxhdGlvbiwgdmFyaWFuY2UgfSkge1xuICAgICgwLCBjaGVja19jb3ZhcmlhbmNlXzEuZGVmYXVsdCkoeyBjb3ZhcmlhbmNlOiBjb3JyZWxhdGlvbiB9KTtcbiAgICByZXR1cm4gY29ycmVsYXRpb24ubWFwKChjLCByb3dJbmRleCkgPT4gYy5tYXAoKGEsIGNvbEluZGV4KSA9PiBhICogTWF0aC5zcXJ0KHZhcmlhbmNlW2NvbEluZGV4XSAqIHZhcmlhbmNlW3Jvd0luZGV4XSkpKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaGVja19jb3ZhcmlhbmNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY2hlY2stY292YXJpYW5jZVwiKSk7XG5mdW5jdGlvbiBjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbihjb3ZhcmlhbmNlKSB7XG4gICAgKDAsIGNoZWNrX2NvdmFyaWFuY2VfMS5kZWZhdWx0KSh7IGNvdmFyaWFuY2UgfSk7XG4gICAgY29uc3QgdmFyaWFuY2UgPSBjb3ZhcmlhbmNlLm1hcCgoXywgaSkgPT4gY292YXJpYW5jZVtpXVtpXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFyaWFuY2UsXG4gICAgICAgIGNvcnJlbGF0aW9uOiBjb3ZhcmlhbmNlLm1hcCgoYywgcm93SW5kZXgpID0+IGMubWFwKChhLCBjb2xJbmRleCkgPT4gYSAvIE1hdGguc3FydCh2YXJpYW5jZVtjb2xJbmRleF0gKiB2YXJpYW5jZVtyb3dJbmRleF0pKSksXG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNvdmFyaWFuY2VUb0NvcnJlbGF0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1bmlxXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdW5pcVwiKSk7XG5jb25zdCBsaW1pdCA9IDEwMDtcbmZ1bmN0aW9uIGRlZXBBc3NpZ25JbnRlcm5hbChhcmdzLCBzdGVwKSB7XG4gICAgaWYgKHN0ZXAgPiBsaW1pdCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKGBJbiBkZWVwQXNzaWduLCBudW1iZXIgb2YgcmVjdXJzaXZlIGNhbGwgKCR7c3RlcH0pIHJlYWNoZWQgbGltaXQgKCR7bGltaXR9KSwgZGVlcEFzc2lnbiBpcyBub3Qgd29ya2luZyBvbiAgc2VsZi1yZWZlcmVuY2luZyBvYmplY3RzYCkpO1xuICAgIH1cbiAgICBjb25zdCBmaWx0ZXJBcmd1bWVudHMgPSBhcmdzLmZpbHRlcihhcmcgPT4gKGFyZykgIT09IHVuZGVmaW5lZCAmJiBhcmcgIT09IG51bGwpO1xuICAgIGNvbnN0IGxhc3RBcmd1bWVudCA9IGZpbHRlckFyZ3VtZW50cy5hdCgtMSk7XG4gICAgaWYgKGZpbHRlckFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlckFyZ3VtZW50c1swXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAobGFzdEFyZ3VtZW50KSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShsYXN0QXJndW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBsYXN0QXJndW1lbnQ7XG4gICAgfVxuICAgIGlmIChmaWx0ZXJBcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBvYmplY3RzQXJndW1lbnRzID0gZmlsdGVyQXJndW1lbnRzLmZpbHRlcihhcmcgPT4gdHlwZW9mIChhcmcpID09PSAnb2JqZWN0Jyk7XG4gICAgbGV0IGtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBvYmplY3RzQXJndW1lbnRzKSB7XG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3Qua2V5cyhhcmcpKTtcbiAgICB9XG4gICAgY29uc3QgdW5pcUtleXMgPSAoMCwgdW5pcV8xLmRlZmF1bHQpKGtleXMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHVuaXFLZXlzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IG9iamVjdHNBcmd1bWVudHMubWFwKGFyZyA9PiBhcmdba2V5XSk7XG4gICAgICAgIHJlc3VsdFtrZXldID0gZGVlcEFzc2lnbkludGVybmFsKHZhbHVlcywgc3RlcCArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZGVlcEFzc2lnbiguLi5hcmdzKSB7IHJldHVybiBkZWVwQXNzaWduSW50ZXJuYWwoYXJncywgMCk7IH1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZXBBc3NpZ247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldENvdmFyaWFuY2UoeyBtZWFzdXJlcywgYXZlcmFnZXMgfSkge1xuICAgIGNvbnN0IGwgPSBtZWFzdXJlcy5sZW5ndGg7XG4gICAgY29uc3QgbiA9IG1lYXN1cmVzWzBdLmxlbmd0aDtcbiAgICBpZiAobCA9PT0gMCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdDYW5ub3QgZmluZCBjb3ZhcmlhbmNlIGZvciBlbXB0eSBzYW1wbGUnKSk7XG4gICAgfVxuICAgIHJldHVybiAobmV3IEFycmF5KG4pLmZpbGwoMSkpLm1hcCgoXywgcm93SW5kZXgpID0+IChuZXcgQXJyYXkobikuZmlsbCgxKSkubWFwKChfLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzdGRzID0gbWVhc3VyZXMubWFwKChtLCBpKSA9PiAobVtyb3dJbmRleF0gLSBhdmVyYWdlc1tpXVtyb3dJbmRleF0pICogKG1bY29sSW5kZXhdIC0gYXZlcmFnZXNbaV1bY29sSW5kZXhdKSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHN0ZHMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgLyBsO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCdyZXN1bHQgaXMgTmFOJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Q292YXJpYW5jZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5jb25zdCBjaGVja19tYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jaGVjay1tYXRyaXhcIikpO1xuY29uc3QgVHlwZUFzc2VydF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi90eXBlcy9UeXBlQXNzZXJ0XCIpKTtcbmZ1bmN0aW9uIHBvbHltb3JwaE1hdHJpeChjb3YsIG9wdHMgPSB7fSkge1xuICAgIGNvbnN0IHsgZGltZW5zaW9uLCB0aXRsZSA9ICdwb2x5bW9ycGgnIH0gPSBvcHRzO1xuICAgIGlmICh0eXBlb2YgKGNvdikgPT09ICdudW1iZXInIHx8IEFycmF5LmlzQXJyYXkoY292KSkge1xuICAgICAgICBpZiAodHlwZW9mIChjb3YpID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIHNpbXBsZV9saW5hbGdfMS5kaWFnKShuZXcgQXJyYXkoZGltZW5zaW9uKS5maWxsKGNvdikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChUeXBlQXNzZXJ0XzEuZGVmYXVsdC5pc0FycmF5MkQoY292KSkge1xuICAgICAgICAgICAgbGV0IHNoYXBlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGltZW5zaW9uKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBzaGFwZSA9IFtkaW1lbnNpb24sIGRpbWVuc2lvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoMCwgY2hlY2tfbWF0cml4XzEuZGVmYXVsdCkoY292LCBzaGFwZSwgdGl0bGUpO1xuICAgICAgICAgICAgcmV0dXJuIGNvdjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVHlwZUFzc2VydF8xLmRlZmF1bHQuaXNBcnJheTFEKGNvdikpIHtcbiAgICAgICAgICAgIHJldHVybiAoMCwgc2ltcGxlX2xpbmFsZ18xLmRpYWcpKGNvdik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdjtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHBvbHltb3JwaE1hdHJpeDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2ltcGxlX2xpbmFsZ18xID0gcmVxdWlyZShcInNpbXBsZS1saW5hbGdcIik7XG5mdW5jdGlvbiBwcm9qZWN0T2JzZXJ2YXRpb24oeyBvYnNlcnZhdGlvbiwgb2JzSW5kZXhlcywgc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24sIGludmVydFNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uIH0pIHtcbiAgICBpZiAoIW9ic2VydmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IG9ic2VydmF0aW9uLm9ic2VydmF0aW9uIHx8IG9ic2VydmF0aW9uO1xuICAgIGNvbnN0IHZlYyA9IG9ic0luZGV4ZXMubWFwKGkgPT4ge1xuICAgICAgICBpZiAoKHZhbHVlW2ldKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IFR5cGVFcnJvcihgb2JzSW5kZXhlcyAoJHtvYnNJbmRleGVzfSkgaXMgbm90IG1hdGNoaW5nIHdpdGggb2JzZXJ2YXRpb24gKCR7b2JzZXJ2YXRpb259KWApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3ZhbHVlW2ldXTtcbiAgICB9KTtcbiAgICBjb25zdCBpbnZlcnNlID0gaW52ZXJ0U2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24gfHwgKDAsIHNpbXBsZV9saW5hbGdfMS5pbnZlcnQpKHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uKTtcbiAgICBpZiAoaW52ZXJzZSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdzZWxlY3RlZFN0YXRlUHJvamVjdGlvbiBpcyBub3QgaW52ZXJ0aWJsZSwgcGxlYXNlIHByb3ZpZGUgaW52ZXJ0U2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24nKSk7XG4gICAgfVxuICAgIGNvbnN0IG91dCA9ICgwLCBzaW1wbGVfbGluYWxnXzEubWF0TXVsKShpbnZlcnNlLCB2ZWMpO1xuICAgIHJldHVybiBvdXRcbiAgICAgICAgLm1hcCh2ID0+IHZbMF0pXG4gICAgICAgIC5tYXAodiA9PiB7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4odikpIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgVHlwZUVycm9yKCdOYU4gaW4gcHJvamVjdGlvbicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHByb2plY3RPYnNlcnZhdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdG9GdW5jdGlvbihhcnJheSwgeyBsYWJlbCA9ICcnIH0gPSB7fSkge1xuICAgIGlmICh0eXBlb2YgKGFycmF5KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHRocm93IChuZXcgRXJyb3IoYCR7bGFiZWwgPT09IG51bGwgPyAnJyA6IGxhYmVsICsgJyA6ICd9T25seSBhcnJheXMgYW5kIGZ1bmN0aW9ucyBhcmUgYXV0aG9yaXplZCAoZ290OiBcIiR7YXJyYXl9XCIpYCkpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdG9GdW5jdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdW5pcShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHVuaXE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==