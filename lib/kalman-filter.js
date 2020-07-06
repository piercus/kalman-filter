const CoreKalmanFilter = require('./core-kalman-filter');

class KalmanFilter extends CoreKalmanFilter {
  /**
  * Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
  * in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
  * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
  * @return {<Array.<Array.<Number>>>} covariance
  */
  asymptoticStateCovariance(){
  }
  /**
  * Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
  * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
  * @return {<Array.<Array.<Number>>>} gain
  */
  asymptoticGain(){
  }  
}
