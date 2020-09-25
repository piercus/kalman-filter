module.exports = (mat, selectedIndexes) => {
	return selectedIndexes.map(s1 => selectedIndexes.map(s2 => mat[s1][s2]));
};
