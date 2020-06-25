const test = require('ava');

const coreKalmanFilter = require ('../lib/core-kalman-filter.js');
const State = require ('../lib/state.js');
const diag = require ('../test/unit/core/diag.js')

const defaultOptions = {
  observation: {
          dimension: 1,
          stateProjection: function(opts){
            return [
                  [1, 0],
          ]
          },

          covariance: function(opts){
  			       return [
  				          [1],
  			]
  },

  dynamic: {
          dimension: 2,
          init: {
                mean: [[0],[0]],

                covariance: [
                      [1, 0],
                      [0, 1]
                ],
        },
          transition : function (opts) { //Constant position model
            return [
                    [1, 0],
                    [0, 0]
            ]
          },

          covariance: function(opts){
  			       return [
  				          [1, 0],
  				          [0, 1]
  			       ]
          }
  }

};

const huge = 1000;
const tiny = 0.001;


//Test 1: Verify that we have the same result when the previousCorrected.mean =null
// and when previousCorrected.mean = 0


test('Init with zero mean', t =>{
  const kf1 = new CoreKalmanFilter(defaultOptions);
  const initNullOpts = Object.assign({}, defaultOptions, {
    dynamic: Object.assign({}, defaultOptions.dynamic, {
      init: {
        mean: null,
        covariance: [
                    [1, 0],
                    [0, 1]
                  ]
      }
    })
  })
  const kf2 = new CoreKalmanFilter(initNullOpts);
  t.is(kf1.predict({init}),kf2.predict({init}));
  t.true(kf1.predict instanceof State);
  t.true(kf2.predict instanceof State);
});



//Test 2: Verify that smalls previousCorrected.covariance and dynamic.covariance
// return a small predicted.covariance

test('Impact previousCorrected and dynamic covariance', t =>{
  const smallDynamicCovOpts = Object.assign({}, defaultOptions, {
    dynamic: Object.assign({}, defaultOptions.dynamic, {
      init: {
        covariance: [
                    [tiny, 0],
                    [0, tiny]
                  ]
      }
    })
  })
  const kf = new CoreKalmanFilter(smallDynamicCovOpts);
  const previousCorrected = new State ({covariance: [
                                                    [tiny, 0],
                                                    [0,tiny],
                                        ]
                                      })
  const predicted = kf.filter({previousCorrected})
  t.true(predicted instanceof State);
  t.true(predicted.hasOwnProperty(index));
  t.true(2/diag(predicted.covariance)> huge/2)

})

//Test 3: Verify that a huge predicted.covariance return a huge newCorrected.covariance

test('Huge predicted covariance', t =>{
  const kf = new CoreKalmanFilter(defaultOptions);
  const predicted = new State ({covariance: [
                                            [huge, 0],
                                            [0,huge],
                                        ]
                                      })
  const previousCorrected = kf.correct({predicted,observation})
  t.true(previousCorrected instanceof State);
  t.true(2/diag(previousCorrected.covariance)<tiny/2);

})

//Test 4: Verify that huge dynamic.covariance + small observation.covariance
//leads to a poorer result (bigger covariance) than huge observation.covariance + small dynamic.covariance

test('Compare dynamic and observation covariances', t =>{
  const smallDynamicCovOpts = Object.assign({}, defaultOptions, {
    dynamic: Object.assign({}, defaultOptions.dynamic, {
      init: {
        covariance: [
                    [tiny, 0],
                    [0, tiny]
                  ]
      }
    })
    observation: Object.assign({}, defaultOptions.observation, {
      covariance: [[huge]]
    })
  })
  const kf1 = new CoreKalmanFilter(smallDynamicCovOpts);
  const smallObservationCovOpts = Object.assign({}, defaultOptions, {
    dynamic: Object.assign({}, defaultOptions.dynamic, {
      init: {
        covariance: [
                    [huge, 0],
                    [0, huge]
                  ]
      }
    })
    observation: Object.assign({}, defaultOptions.observation, {
      covariance: [[tiny]]
    })
  })
  const kf2 = new CoreKalmanFilter(smallObservationCovOpts);
  const predicted1 = kf1.filter({init});
  const predicted2 = kf2.filter({init});
  const previousCorrected1 = kf1.correct({predicted1, observation});
  const previousCorrected2 = kf2.correct({predicted1, observation});
  t.true(diag(previousCorrected1.covariance) > diag(previousCorrected2.covariance));
})

//Test 5: Verify that if predicted.covariance = 0, then newCorrected.covariance = 0

test('Predicted covariance equals to zero', t =>{
  const kf = new CoreKalmanFilter(defaultOptions);
  const predicted = new State ({covariance: [
                                            [0, 0],
                                            [0, 0],
                                        ]
                                      })
  const previousCorrected = kf.correct({predicted,observation})
  t.is(diag(previousCorrected.covariance),0);

})


//Test 6: Verify that if observation fits the model, then the newCorrected.covariance
//is smaller than if not


//Test : Throw an error if a covariance or mean is wrongly sized

//Test : Throws an error if covariance are non-function
