const {KalmanFilter} = require('../../index.js');

const test = require('ava');

test('#34 1-D', t => {

	let dataset = [0,0,0,0,16.1,0,0,30.9,0,0,0,0,26.1,null,null].map(a => [a]) 
	let baseVariance = 1;
	let huge = 1e30;
	let kf = new KalmanFilter({
	  observation : {
	    dimension: 1, 
	    covariance: function (o) {
        if (o.observation[0][0] === null){
          return [[huge]]
        } else {
          return [[baseVariance]]
        }
	    }
	  }
	})

	const res = kf.filterAll(dataset);
	t.is(res.length, dataset.length)
})



test('#34 2D', t => {
	const {diag} = require('../..').linalgebra;

	let dataset = [
		[22, null],
		[25, null],
		[4, 4],
		[4, 4],
		[22, 5],
		[null, null],
		[34, 45]
	];

	let baseVariance = 1;
	let huge = 1e15;
	let kf = new KalmanFilter({
		observation : {
	    dimension: 2,
			stateProjection: [[1], [1]],
	    covariance: function (o) {
				let variances = o.observation.map(a => {
					if(a[0] === null){
						return huge
					} else {
						return baseVariance
					}
				})
				return diag(variances)
	    }
	  }
	});

	const res = kf.filterAll(dataset);
	t.is(res.length, dataset.length)
})


