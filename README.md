# kalman-filter

[Kalman Filter](https://en.wikipedia.org/wiki/Kalman_filter) in JavaScript

This library implements following features:
* N-dimensional Kalman Filter (for [multivariate Gaussian](https://en.wikipedia.org/wiki/Multivariate_normal_distribution))
* Forward Kalman Filter (Online)
* Forward-Backward Smoothing Kalman Filter
* Split Prediction/Correction steps
* Extended Kalman Filter (when using functions for dynamics and observation matrixes)
* Correlation Matrix

## Installation

```sh
npm install kalman-filter
```

## Simple Example

### 1D Smoothing Usage

```js
const {KalmanFilter} = require('kalman-filter');

const observations = [0, 0.1, 0.5, 0.2];
const kFilter = new KalmanFilter();
const res = kFilter.filterAll(observations)

console.log(res);
```

**TO DO** add a screenshot of the resulting curve

## How to instantiate your kalman filter

### Configure the dynamic with `dynamic.name`

`dynamic.name` is a shortcut to configure commonly use models as :
* constant-position
* constant-speed
* constant-acceleration

You can also register your own shortcust see [Register models shortcuts](#register-models-shortcuts)

#### 'constant-position' on 2D data

This is the default behavior

```js
const {KalmanFilter} = require('kalman-filter');

const kFilter = new KalmanFilter({
	observation: {
		sensorDimension: 2,
		name: 'sensors'
	},
	dynamic: {
		name: 'constant-position',// observation.sensorDimension == dynamic.dimension
		covariance: [3, 4]// equivalent to diag([3, 4])
	}
});

```

#### 'constant-speed' on 3D data


```js
const {KalmanFilter} = require('kalman-filter');

const kFilter = new KalmanFilter({
	observation: {
		sensorDimension: 3,
		name: 'sensors'
	},
	dynamic: {
		name: 'constant-speed',// observation.sensorDimension * 2 == state.dimension
		timeStep: 0.1,
		covariance: [3, 3, 3, 4, 4, 4]// equivalent to diag([3, 3, 3, 4, 4, 4])
	}
});

```

#### 'constant-acceleration' on 2D data


```js
const {KalmanFilter} = require('kalman-filter');

const kFilter = new KalmanFilter({
	observation: {
		sensorDimension: 2,
		name: 'sensors'
	},
	dynamic: {
		name: 'constant-acceleration',// observation.sensorDimension * 3 == state.dimension
		timeStep: 0.1,
		covariance: [3, 3, 4, 4, 5, 5]// equivalent to diag([3, 3, 4, 4, 5, 5])
	}
});

```

### Instanciation of a generic linear model

This is an example of how build a constant speed model, in 3D without `dynamic.name`

```js
const {KalmanFilter} = require('kalman-filter');

const timeStep = 0.1;

const kFilter = new KalmanFilter({
	observation: {
		dimension: 3
	},
	dynamic: {
		dimension: 6, //(x, y, z, vx, vy, vz)
		transition: [
			[1, 0, 0, timeStep, 0, 0],
			[0, 1, 0, 0, timeStep, 0],
			[0, 0, 1, 0, 0, timeStep],
			[0, 0, 0, 1, 0, 0],
			[0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 1]
		],
		covariance: [1, 1, 1, 0.1, 0.1, 0.1]// equivalent to diag([1, 1, 1, 0.1, 0.1, 0.1])
	}
});

```

### Configure the observation

#### Using `sensor` observation

The observation is made from 2 different sensors with identical properties (i.e. same covariances) , the input measure will be `[<sensor0-dim0>, <sensor0-dim1>, <sensor1-dim0>, <sensor1-dim1>]`.

```js
const {KalmanFilter} = require('kalman-filter');

const timeStep = 0.1;

const kFilter = new KalmanFilter({
	observation: {
		sensorDimension: 2,// observation.dimension == observation.sensorDimension * observation.nSensors
		nSensors: 2,
		sensorCovariance: [3, 4], // equivalent to diag([3, 3, 4, 4])
		name: 'sensors'
	},
	dynamic: {
		name: 'constant-speed',// observation.sensorDimension * 2 == state.dimension
		covariance: [3, 3, 4, 4]// equivalent to diag([3, 3, 4, 4])
	}
});

```

#### Custom Observation matrix

The observation is made from 2 different sensors with different properties (i.e. different covariances), the input measure will be `[<sensor0-dim0>, <sensor0-dim1>, <sensor1-dim0>, <sensor1-dim1>]`.

This can be achived manually by doing

```js
const {KalmanFilter} = require('kalman-filter');

const timeStep = 0.1;

const kFilter = new KalmanFilter({
	observation: {
		dimension: 4,
		stateProjection: [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[1, 0, 0, 0],
			[0, 1, 0, 0]
		],
		covariance: [3, 4, 0.3, 0.4]
	},
	dynamic: {
		name: 'constant-speed',// observation.sensorDimension * 2 == state.dimension
		covariance: [3, 3, 4, 4]// equivalent to diag([3, 3, 4, 4])
	}
});
```

### Extended Kalman Filter

In order to use the Kalman-Filter with a dynamic or observation model which is not strictly a [General linear model](https://en.wikipedia.org/wiki/General_linear_model), it is possible to use `function` in following parameters :
* `observation.stateProjection`
* `observation.covariance`
* `observation.transition`
* `observation.covariance`

In this situation this `function` will return the value of the matrix at each step of the kalman-filter.

In this example, we create a constant-speed filter with non-uniform intervals;


```js
const {KalmanFilter} = require('kalman-filter');

const intervals = [1,1,1,1,2,1,1,1];

const kFilter = new KalmanFilter({
	observation: {
		dimension: 2,
		/**
		* @param {State} predictedState
		* @param {Array.<Number>} observation
		* @param {Number} index		
		*/
		stateProjection: function(opts){
			return [
				[1, 0, 0, 0],
				[0, 1, 0, 0]
			]
		},
		/**
		* @param {State} predictedState
		* @param {Array.<Number>} observation
		* @param {Number} index
		*/		
		covariance: function(opts){
			return [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			]
		}
	},
	dynamic: {
		dimension: 4, //(x, y, vx, vy)
		/**
		* @param {State} previousCorrected
		* @param {Number} index
		*/
		transition: function(opts){
			const dT = intervals[opts.index];
			if(typeof(dT) !== 'number' || isNaN(dT) || dT <= 0){
				throw(new Error('dT should be positive number'))
			}
			return [
				[1, 0, dT, 0],
				[0, 1, 0, dT]
				[0, 0, 1, 0]
				[0, 0, 0, 1]
			]
		},
		/**
		* @param {State} previousCorrected
		* @param {Number} index
		*/		
		covariance: function(opts){
			const dT = intervals[opts.index];
			if(typeof(dT) !== 'number' || isNaN(dT) || dT <= 0){
				throw(new Error('dT should be positive number'))
			}			
			return [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 1*dT, 0],
				[0, 0, 0, 1*dT]
			]
		}
	}
});
```

## Use your kalman filter

### Simple Batch usage (run it once for the whole dataset)

```js
const observations = [[0, 2], [0.1, 4], [0.5, 9], [0.2, 12]];

// batch kalman filter
const results = kFilter.filterAll(observations);
```
### Online usage (run it online, forward step only)

When using online usage (only the forward step), the output of the `filter` method is an instance of the ["State"](/lib/state.js) class.

```js
// online kalman filter
let previousCorrected = null;
const results = [];
observations.forEach(observation => {
	previousCorrected = kFilter.filter({previousCorrected, observation});
	results.push(previousCorrected.mean);
});
```

### Predict/Correct detailed usage (run it online)

If you want to use KalmanFilter in more advanced usage, you might want to dissociate the `predict` and the `correct` functions

```js
// online kalman filter
let previousCorrected = null;
const results = [];
observations.forEach(observation => {
	const predictedState = kFilter.predict({
		previousCorrected
	});

	 const correctedState = kFilter.correct({
		predicted,
		observation
	});

	results.push(correctedState.mean);

	// update the previousCorrected for next loop iteration
	previousCorrected = correctedState
});

console.log(results);
```

### Batch Forward - Backward smoothing usage

The Forward - Backward process

```js
// batch kalman filter
const results = kFilter.filterAll({observations, passMode: 'forward-backward'});
```

## Register models shortcuts

To get more information on how to build a dynamic model, check in the code `lib/dynamic/` (or `lib/observation` for observation models).

If you feel your model can be used by other, do not hesitate to create a Pull Request.

```js
const {registerDynamic, KalmanFilter, registerObservation} = require('kalman-filter');

registerDynamic('custom-dynamic', function(opts1){
	// do your stuff
	return {
		dimension,
		transition,
		covariance
	}
})

registerObservation('custom-sensor', function(opts2){
	// do your stuff
	return {
		dimension,
		stateProjection,
		covariance
	}
})

const kFilter = new KalmanFilter({
	dynamic: {
		name: 'custom-dynamic',
		// ... fields of opts1
	},
	observation: {
		name: 'custom-sensor',
		// ... fields of opts2
	}
});

```

## Set your model parameters from the ground truths state values

In order to find the proper values for covariance matrix, we use following approach :

```js

const {getCovariance, KalmanFilter} = require('kalman-filter');

// Ground truth values in the dynamic model hidden state
const groundTruthStates = [ // here this is (x, vx)
	[[0, 1.1], [1.1, 1], [2.1, 0.9], [3, 1], [4, 1.2]], // example 1
	[[8, 1.1], [9.1, 1], [10.1, 0.9], [11, 1], [12, 1.2]] // example 2
]

// Observations of this values
const measures = [ // here this is x only
	[[0.1], [1.3], [2.4], [2.6], [3.8]], // example 1
	[[8.1], [9.3], [10.4], [10.6], [11.8]] // example 2
];

const kFilter = new KalmanFilter({
	observation: {
		name: 'sensor',
		sensorDimension: 1
	},
	dynamic: {
		name: 'constant-speed'
	}
})

const dynamicCovariance = getCovariance({
	measures: groundTruthStates.map(ex =>
		return ex.slice(1).map((_, index) => {
			return kFilter.predict({previousCorrected: ex[index - 1]}).av;
		})
	).reduce((a,b) => a.concat(b)),
	averages: groundTruthStates.map(ex =>
		return ex.slice(1)
	).reduce((a,b) => a.concat(b)),
});

const observationCovariance = getCovariance({
	measures: measures.reduce((a,b) => a.concat(b)),
	averages: groundTruthStates.map((a) => a[0]).reduce((a,b) => a.concat(b))
});

```

## How to measure how good does a specific model fits with data

There are different ways to measure the performance of a model against some measures :

### Model fits with a specific measurements

We use [Mahalanobis distance](https://en.wikipedia.org/wiki/Mahalanobis_distance)

```js
const observations = [[0, 2], [0.1, 4], [0.5, 9], [0.2, 12]];

// online kalman filter
let previousCorrected = null;
const results = [];

observations.forEach(observation => {
	const predictedState = kFilter.predict({
		previousCorrected
	});

	const dist = predicted.mahalanobis(observation)

	previousCorrected = kFilter.correct({
		predicted,
		observation
	});

	distances.push(dist);
});

const distance = distances.reduce((d1, d2) => d1 + d2, 0);
```
### How precise is this Model

We compare the model with random generated numbers sequence.

```js
const h = require('hasard')
const observationHasard = h.array({value: h.number({type: 'normal'}), size: 2})

const observations = observationHasard.run(200);

// online kalman filter
let previousCorrected = null;
const results = [];

observations.forEach(observation => {
	const predictedState = kFilter.predict({
		previousCorrected
	});

	const dist = predicted.mahalanobis(measure)

	previousCorrected = kFilter.correct({
		predicted,
		observation
	});

	distances.push(dist);
});

const distance = distances.reduce((d1, d2) => d1 + d2, 0);

```
