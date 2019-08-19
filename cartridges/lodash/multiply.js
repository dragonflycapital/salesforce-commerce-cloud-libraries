'use strict';

var createMathOperation = require('./.internal/createMathOperation.js');

/**
 * Multiply two numbers.
 *
 * @since 4.7.0
 * @category Math
 * @param {number} multiplier The first number in a multiplication.
 * @param {number} multiplicand The second number in a multiplication.
 * @returns {number} Returns the product.
 * @example
 *
 * multiply(6, 4)
 * // => 24
 */
const multiply = createMathOperation(function (multiplier, multiplicand) { return multiplier * multiplicand; }, 1);

module.exports = multiply;
