module.exports = (mat, obsIndexes) => {
	return obsIndexes.map(s1 => obsIndexes.map(s2 => mat[s1][s2]));
};
