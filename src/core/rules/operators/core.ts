import * as _ from 'lodash';

// Type operators
// -----------

/**
 * "fact" MUST be nil (null, undefined, NaN)
 * @param factValue
 * @param compareToValue
 */
export function nil (factValue: unknown, compareToValue: null): boolean {
  return _.isNil(factValue);
}

/**
 * "fact" MUST NOT be nil (null, undefined, NaN)
 * @param factValue
 * @param compareToValue
 */
export function notNil (factValue: unknown, compareToValue: null): boolean {
  return !_.isNil(factValue);
}

/**
 * "fact" MUST be a string
 * @param factValue
 * @param compareToValue
 */
export function string (factValue: unknown, compareToValue: null): boolean {
  return _.isString(factValue);
}

/**
 * "fact" MUST NOT be a string
 * @param factValue
 * @param compareToValue
 */
export function notString (factValue: unknown, compareToValue: null): boolean {
  return !_.isString(factValue);
}

/**
 * "fact" MUST be a number
 * @param factValue
 * @param compareToValue
 */
export function number (factValue: unknown, compareToValue: null): boolean {
  return _.isNumber(factValue);
}

/**
 * "fact" MUST NOT be a number
 * @param factValue
 * @param compareToValue
 */
export function notNumber (factValue: unknown, compareToValue: null): boolean {
  return !_.isNumber(factValue);
}

// String and Numeric operators
// -----------

/**
 * "fact" must equal to the value
 * @param factValue
 * @param compareToValue
 */
export function equal (factValue: unknown, compareToValue: unknown): boolean {
  return _.isEqual(factValue, compareToValue);
}

/**
 * "fact" must not equal to the value
 * @param factValue
 * @param compareToValue
 */
export function notEqual (factValue: unknown, compareToValue: unknown): boolean {
  return !_.isEqual(factValue, compareToValue);
}

// Numeric operators
// -----------

/**
 * "fact" MUST be less than value
 * @param factValue
 * @param compareToValue
 */
export function lessThan (factValue: number, compareToValue: number): boolean {
  return factValue < compareToValue;
}

/**
 * "fact" MUST be less than or equal to value
 * @param factValue
 * @param compareToValue
 */
export function lessThanInclusive (factValue: number, compareToValue: number): boolean {
  return factValue <= compareToValue;
}

/**
 * "fact" MUST be greater than to value
 * @param factValue
 * @param compareToValue
 */
export function greaterThan (factValue: number, compareToValue: number): boolean {
  return factValue > compareToValue;
}

/**
 * "fact" MUST be greater than or equal to value
 * @param factValue
 * @param compareToValue
 */
export function greaterThanInclusive (factValue: number, compareToValue: number): boolean {
  return factValue >= compareToValue;
}
