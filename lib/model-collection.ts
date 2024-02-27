const registeredObservationModels: Record<string, any> = {};
// const registeredDynamicModels: Record<(dynamic, observation) => dynamic, {dimension, transition, covariance}> = {};
const registeredDynamicModels: Record<string, any> = {};

/**
 * Enables to register observation model and store it
 * @param {String} name
 * @callback fn the function corresponding to the desired model
 */

export function registerObservation(name: string, fn) {
  registeredObservationModels[name] = fn;
}

/**
 * Enables to register dynamic model and store it
 * @param {String} name
 * @callback fn the function corresponding to the desired model
 */
export function registerDynamic(name: string, fn) {
  registeredDynamicModels[name] = fn;
}

/**
 * Build a model given an observation configuration
 * @param {ObservationConfig} observation
 * @returns {ObservationConfig} the configuration with respect to the model
 */
export function buildObservation(observation) {
  if (typeof (registeredObservationModels[observation.name]) !== "function") {
    throw (new TypeError(
      `The provided observation model name (${observation.name}) is not registered`,
    ));
  }

  return registeredObservationModels[observation.name](observation);
}

/**
 * Build a model given dynamic and observation configurations
 * @param {DynamicConfig} dynamic
 * @param {ObservationConfig} observation
 * @returns {DynamicConfig} the dynamic configuration with respect to the model
 */
export function buildDynamic(dynamic, observation) {
  if (typeof (registeredDynamicModels[dynamic.name]) !== "function") {
    throw (new TypeError(
      `The provided dynamic model (${dynamic.name}) name is not registered`,
    ));
  }

  return registeredDynamicModels[dynamic.name](dynamic, observation);
}
