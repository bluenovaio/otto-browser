import * as core from '../core';

// Type operators
// -----------

describe('nil', () => {
  it('returns true if nil', () => {
    expect(core.nil(null, null)).toBeTruthy();
    expect(core.nil(undefined, null)).toBeTruthy();
  });

  it('returns false if not nil', () => {
    expect(core.nil({}, null)).toBeFalsy();
    expect(core.nil([], null)).toBeFalsy();
    expect(core.nil(0, null)).toBeFalsy();
    expect(core.nil([], null)).toBeFalsy();
    expect(core.nil(new Map(), null)).toBeFalsy();
    expect(core.nil(new Date(), null)).toBeFalsy();
  });
});

describe('notNil', () => {
  it('returns true if notNil', () => {
    expect(core.notNil({}, null)).toBeTruthy();
    expect(core.notNil([], null)).toBeTruthy();
    expect(core.notNil(0, null)).toBeTruthy();
    expect(core.notNil([], null)).toBeTruthy();
    expect(core.notNil(new Map(), null)).toBeTruthy();
    expect(core.notNil(new Date(), null)).toBeTruthy();
  });

  it('returns false if nil', () => {
    expect(core.notNil(null, null)).toBeFalsy();
    expect(core.notNil(undefined, null)).toBeFalsy();
  });
});

describe('string', () => {
  it('returns true if string', () => {
    expect(core.string('foo', null)).toBeTruthy();
  });

  it('returns false if not a string', () => {
    expect(core.string(new Map(), null)).toBeFalsy();
    expect(core.string({}, null)).toBeFalsy();
    expect(core.string(null, null)).toBeFalsy();
    expect(core.string(10, null)).toBeFalsy();
  });
});

describe('notString', () => {
  it('returns true if not string', () => {
    expect(core.notString(new Map(), null)).toBeTruthy();
    expect(core.notString({}, null)).toBeTruthy();
    expect(core.notString(null, null)).toBeTruthy();
    expect(core.notString(10, null)).toBeTruthy();
  });

  it('returns false if a string', () => {
    expect(core.notString('foo', null)).toBeFalsy();
  });
});

describe('number', () => {
  it('returns true if number', () => {
    expect(core.number(100, null)).toBeTruthy();
    expect(core.number(100.10, null)).toBeTruthy();
    expect(core.number(Number('100'), null)).toBeTruthy();
  });

  it('returns false if not a number', () => {
    expect(core.number(new Map(), null)).toBeFalsy();
    expect(core.number({}, null)).toBeFalsy();
    expect(core.number(null, null)).toBeFalsy();
    expect(core.number('10', null)).toBeFalsy();
  });
});

describe('notNumber', () => {
  it('returns true if not a number', () => {
    expect(core.notNumber(new Map(), null)).toBeTruthy();
    expect(core.notNumber({}, null)).toBeTruthy();
    expect(core.notNumber(null, null)).toBeTruthy();
    expect(core.notNumber('10', null)).toBeTruthy();
  });

  it('returns false if number', () => {
    expect(core.notNumber(100, null)).toBeFalsy();
    expect(core.notNumber(100.10, null)).toBeFalsy();
    expect(core.notNumber(Number('100'), null)).toBeFalsy();
  });
});

// String and Numeric operators
// -----------

describe('equal', () => {
  it('handles equivalent primitives', () => {
    expect(core.equal('a', 'a')).toBeTruthy();
    expect(core.equal('a', 'b')).toBeFalsy();
    expect(core.equal(100, 100)).toBeTruthy();
    expect(core.equal(100, 99)).toBeFalsy();
  });

  it('handles equivalent plain objects', () => {
    expect(core.equal({ a: 1 }, { a: 1 })).toBeTruthy();
    expect(core.equal({ a: 1 }, { b: 1 })).toBeFalsy();
  });

  it('handles equivalent primitive arrays', () => {
    expect(core.equal([1, 2, 3, 'a'], [1, 2, 3, 'a'])).toBeTruthy();
    expect(core.equal([1, 2, 3, 'a'], [1, 2, 3, 'b'])).toBeFalsy();
    expect(core.equal([1, 2, 3, 'a'], [1, 2, 'a', 3])).toBeFalsy();
  });

  it('handles equivalent collections', () => {
    expect(core.equal([{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }])).toBeTruthy();
    expect(core.equal([{ a: 1 }, { b: 1 }], [{ b: 1 }, { b: 1 }])).toBeFalsy();
    expect(core.equal([{ a: 1 }, { b: 1 }], [{ b: 1 }, { a: 1 }])).toBeFalsy();
  });
});

describe('notEqual', () => {
  it('handles non-equivalent primitives', () => {
    expect(core.notEqual('a', 'b')).toBeTruthy();
    expect(core.notEqual('a', 'a')).toBeFalsy();
    expect(core.notEqual(100, 99)).toBeTruthy();
    expect(core.notEqual(100, 100)).toBeFalsy();
  });

  it('handles non-equivalent plain objects', () => {
    expect(core.notEqual({ a: 1 }, { b: 1 })).toBeTruthy();
    expect(core.notEqual({ a: 1 }, { a: 1 })).toBeFalsy();
  });

  it('handles non-equivalent primitive arrays', () => {
    expect(core.notEqual([1, 2, 3, 'a'], [1, 2, 3, 'b'])).toBeTruthy();
    expect(core.notEqual([1, 2, 3, 'a'], [1, 2, 'a', 3])).toBeTruthy();
    expect(core.notEqual([1, 2, 3, 'a'], [1, 2, 3, 'a'])).toBeFalsy();
  });

  it('handles non-equivalent collections', () => {
    expect(core.notEqual([{ a: 1 }, { b: 1 }], [{ b: 1 }, { b: 1 }])).toBeTruthy();
    expect(core.notEqual([{ a: 1 }, { b: 1 }], [{ b: 1 }, { a: 1 }])).toBeTruthy();
    expect(core.notEqual([{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }])).toBeFalsy();
  });
});

// Numeric operators
// -----------

describe('lessThan', () => {
  it('returns true if fact less than value', () => {
    expect(core.lessThan(10, 30)).toBeTruthy();
    expect(core.lessThan(10, 30.5)).toBeTruthy();
    expect(core.lessThan(10.5, 30.5)).toBeTruthy();
    expect(core.lessThan(-10.5, 30.5)).toBeTruthy();
  });

  it('returns true if fact greater than or equal to value', () => {
    expect(core.lessThan(100, 30)).toBeFalsy();
    expect(core.lessThan(100, 30.5)).toBeFalsy();
    expect(core.lessThan(100.5, 30.5)).toBeFalsy();
    expect(core.lessThan(10.5, -30.5)).toBeFalsy();
  });
});

describe('lessThanInclusive', () => {
  it('returns true if fact less than value', () => {
    expect(core.lessThanInclusive(10, 30)).toBeTruthy();
    expect(core.lessThanInclusive(30.5, 30.5)).toBeTruthy();
    expect(core.lessThanInclusive(10.5, 30.5)).toBeTruthy();
    expect(core.lessThanInclusive(-10.5, 30.5)).toBeTruthy();
  });

  it('returns true if fact greater than or equal to value', () => {
    expect(core.lessThanInclusive(100, 30)).toBeFalsy();
    expect(core.lessThanInclusive(100, 30.5)).toBeFalsy();
    expect(core.lessThanInclusive(100.5, 30.5)).toBeFalsy();
    expect(core.lessThanInclusive(10.5, -30.5)).toBeFalsy();
  });
});

describe('greaterThan', () => {
  it('returns true if fact less than value', () => {
    expect(core.greaterThan(100, 30)).toBeTruthy();
    expect(core.greaterThan(100, 30.5)).toBeTruthy();
    expect(core.greaterThan(100.5, 30.5)).toBeTruthy();
    expect(core.greaterThan(10.5, -30.5)).toBeTruthy();
  });

  it('returns true if fact greater than or equal to value', () => {
    expect(core.greaterThan(10, 30)).toBeFalsy();
    expect(core.greaterThan(10, 30.5)).toBeFalsy();
    expect(core.greaterThan(10.5, 30.5)).toBeFalsy();
    expect(core.greaterThan(-10.5, 30.5)).toBeFalsy();
  });
});

describe('greaterThanInclusive', () => {
  it('returns true if fact less than value', () => {
    expect(core.greaterThanInclusive(100, 30)).toBeTruthy();
    expect(core.greaterThanInclusive(30.5, 30.5)).toBeTruthy();
    expect(core.greaterThanInclusive(100.5, 30.5)).toBeTruthy();
    expect(core.greaterThanInclusive(10.5, -30.5)).toBeTruthy();
  });

  it('returns true if fact greater than or equal to value', () => {
    expect(core.greaterThanInclusive(10, 30)).toBeFalsy();
    expect(core.greaterThanInclusive(10, 30.5)).toBeFalsy();
    expect(core.greaterThanInclusive(10.5, 30.5)).toBeFalsy();
    expect(core.greaterThanInclusive(-10.5, 30.5)).toBeFalsy();
  });
});
