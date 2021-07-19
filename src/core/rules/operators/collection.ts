import * as _ from 'lodash';

import * as core from './core';

/**
 * "fact" MUST be included in value (an array)
 * @param factValue
 * @param compareToValue
 */
export function isIn (factValue: unknown, compareToValue: unknown[]): boolean {
  return _.includes(compareToValue, factValue);
}

/**
 * "fact" MUST NOT be included in value (an array)
 * @param factValue
 * @param compareToValue
 */
export function notIn (factValue: unknown, compareToValue: unknown[]): boolean {
  return !_.includes(compareToValue, factValue);
}

/**
 * "fact" MUST be included in every value (an array)
 * @param factValue
 * @param compareToValue
 */
export function inEvery (factValue: unknown, compareToValue: unknown[]): boolean {
  return _.every(compareToValue, (val) => core.equal(val, factValue));
}

/**
 * "fact" (array) MUST include value
 * @param factValue
 * @param compareToValue
 */
export function contains (factValue: unknown[], compareToValue: unknown): boolean {
  return _.includes(factValue, compareToValue);
}

/**
 * "fact" (array) MUST NOT include value
 * @param factValue
 * @param compareToValue
 */
export function doesNotContain (factValue: unknown[], compareToValue: unknown): boolean {
  return !_.includes(factValue, compareToValue);
}

/**
 * Every value in "fact" (array) MUST be equal to value
 * @param factValue
 * @param compareToValue
 */
export function containsEvery (factValue: unknown[], compareToValue: unknown): boolean {
  return _.every(factValue, (val) => core.equal(val, compareToValue));
}

// Numeric operators
// -----------

/**
 * Every value in "fact" (array) MUST be less than or equal to value
 * @param factValue
 * @param compareToValue
 */
export function lessThanInclusiveEvery (factValue: number[], compareToValue: number): boolean {
  return _.every(factValue, (val) => core.lessThanInclusive(val, compareToValue));
}

/**
 * Every value in "fact" (array) MUST be less than value
 * @param factValue
 * @param compareToValue
 */
export function lessThanEvery (factValue: number[], compareToValue: number): boolean {
  return _.every(factValue, (val) => core.lessThan(val, compareToValue));
}

/**
 * Some values in "fact" (array) MUST be less than or equal to value
 * @param factValue
 * @param compareToValue
 */
export function lessThanInclusiveSome (factValue: number[], compareToValue: number): boolean {
  return _.some(factValue, (val) => core.lessThanInclusive(val, compareToValue));
}

/**
 * Some values in "fact" (array) MUST be less than value
 * @param factValue
 * @param compareToValue
 */
export function lessThanSome (factValue: number[], compareToValue: number): boolean {
  return _.some(factValue, (val) => core.lessThan(val, compareToValue));
}

/**
 * Every value in "fact" (array) MUST be greater than or equal to value
 * @param factValue
 * @param compareToValue
 */
export function greaterThanInclusiveEvery (factValue: number[], compareToValue: number): boolean {
  return _.every(factValue, (val) => core.greaterThanInclusive(val, compareToValue));
}

/**
 * Every value in "fact" (array) MUST be greater than value
 * @param factValue
 * @param compareToValue
 */
export function greaterThanEvery (factValue: number[], compareToValue: number): boolean {
  return _.every(factValue, (val) => core.greaterThan(val, compareToValue));
}

/**
 * Some values in "fact" (array) MUST be greater than or equal to value
 * @param factValue
 * @param compareToValue
 */
export function greaterThanInclusiveSome (factValue: number[], compareToValue: number): boolean {
  return _.some(factValue, (val) => core.greaterThanInclusive(val, compareToValue));
}

/**
 * Some values in "fact" (array) MUST be greater than value
 * @param factValue
 * @param compareToValue
 */
export function greaterThanSome (factValue: number[], compareToValue: number): boolean {
  return _.some(factValue, (val) => core.greaterThan(val, compareToValue));
}
