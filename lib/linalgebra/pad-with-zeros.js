/**
*This function returns the stateProjection paded with zeros with respect to a given
*observedProjection
*@param {Array} array
*@param {Number} dimension in our case, the dynamic dimension
*@returns {Array} paded array
*/
module.exports = function (array, {dimension}) {
	const l = array.length;
	if (dimension < l) {
		throw (new TypeError('Dynamic dimension does not match with observedProjection'));
	}

	for (let i = 0; i < l; i++) {
		for (let j = 0; j < dimension - l; j++) {
			array[i].push(0);
		}
	}

	return array;
};
