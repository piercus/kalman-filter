/**
*This function returns the stateProjection paded with zeros with respect to a given
*observedProjection
*@param {Array.<Number> | Array.<Array.<Number>>} array the array we need to pad
*@param {Number} dimension in our case, the dynamic dimension
*@returns {Array.<Number> | Array.<Array.<Number>>} paded array
*/
module.exports = function (array, {dimension}) {
	const l1 = array.length;
	const l = array[0].length;
	const result = array.map(a => a.concat());

	if (dimension < l) {
		throw (new TypeError(`Dynamic dimension ${dimension} does not match with observedProjection ${l}`));
	}

	for (let i = 0; i < l1; i++) {
		for (let j = 0; j < dimension - l; j++) {
			result[i].push(0);
		}
	}

	return result;
};
