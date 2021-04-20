import * as collection from '../collection';

// Array operators
// -----------

describe('isIn', () => {
  it('returns true if fact in value', () => {
    expect(collection.isIn(1, [1, 2, 3, '4'])).toBeTruthy();
  });

  it('returns false if fact not in value', () => {
    expect(collection.isIn(5, [1, 2, 3, '4'])).toBeFalsy();
  });
});

describe('notIn', () => {
  it('returns true if fact not in value', () => {
    expect(collection.notIn(5, [1, 2, 3, '4'])).toBeTruthy();
  });

  it('returns false if fact in value', () => {
    expect(collection.notIn(1, [1, 2, 3, '4'])).toBeFalsy();
  });
});

describe('inEvery', () => {
  it('returns true if fact equal to every value (array)', () => {
    expect(collection.inEvery(5, [5, 5, 5])).toBeTruthy();
  });

  it('returns false if fact not equal to every value (array)', () => {
    expect(collection.inEvery(1, [1, 2, 3, '4'])).toBeFalsy();
  });
});

describe('contains', () => {
  it('returns true if value in fact', () => {
    expect(collection.contains([1, 2, 3, '4'], 1)).toBeTruthy();
  });

  it('returns false if value not in fact', () => {
    expect(collection.contains([1, 2, 3, '4'], 5)).toBeFalsy();
  });
});

describe('doesNotContain', () => {
  it('returns true if value not in fact', () => {
    expect(collection.doesNotContain([1, 2, 3, '4'], 5)).toBeTruthy();
  });

  it('returns false if value in fact', () => {
    expect(collection.doesNotContain([1, 2, 3, '4'], 1)).toBeFalsy();
  });
});

describe('containsEvery', () => {
  it('returns true if all values equals input', () => {
    expect(collection.containsEvery(['ba', 'ba'], 'ba'))
      .toBeTruthy();
  });

  it('returns false if some values equals input', () => {
    expect(collection.containsEvery(['foo', 'ba'], 'ba'))
      .toBeFalsy();
  });

  it('returns false if no values equals input', () => {
    expect(collection.containsEvery(['foo', 'bar'], 'gg'))
      .toBeFalsy();
  });
});

// LessThan(Inclusive)
// --------

describe('lessThanInclusiveEvery', () => {
  it('returns true if all values contained in list are lessThanInclusive', () => {
    expect(collection.lessThanInclusiveEvery([3, 1, 40], 40))
      .toBeTruthy();
  });

  it('returns false if any values contained in list are NOT lessThanInclusive', () => {
    expect(collection.lessThanInclusiveEvery([3, 100, 2], 40))
      .toBeFalsy();
  });
});

describe('lessThanEvery', () => {
  it('returns true if all values contained in list are lessThan', () => {
    expect(collection.lessThanEvery([3, 10, 33], 40))
      .toBeTruthy();
  });

  it('returns false if any values contained in list are NOT lessThan', () => {
    expect(collection.lessThanEvery([3, 10, 40], 40))
      .toBeFalsy();
    expect(collection.lessThanEvery([3, 1000, 4], 40))
      .toBeFalsy();
  });
});

describe('lessThanInclusiveSome', () => {
  it('returns true if some values contained in list are lessThanInclusive', () => {
    expect(collection.lessThanInclusiveSome([3, 1000, 40], 40))
      .toBeTruthy();
  });

  it('returns false if no values contained in list are NOT lessThanInclusive', () => {
    expect(collection.lessThanInclusiveSome([3, 100, 2], 1))
      .toBeFalsy();
  });
});

describe('lessThanSome', () => {
  it('returns true if some values contained in list are lessThan', () => {
    expect(collection.lessThanSome([3, 1000, 40], 40))
      .toBeTruthy();
  });

  it('returns false if no values contained in list are lessThan', () => {
    expect(collection.lessThanSome([300, 100, 40], 30))
      .toBeFalsy();
  });
});

// GreaterThan(Inclusive)
// --------

describe('greaterThanInclusiveEvery', () => {
  it('returns true if all values contained in list are greaterThanInclusive', () => {
    expect(collection.greaterThanInclusiveEvery([300, 100, 40], 40))
      .toBeTruthy();
  });

  it('returns false if any values contained in list are NOT greaterThanInclusive', () => {
    expect(collection.greaterThanInclusiveEvery([3, 10, 2], 40))
      .toBeFalsy();
  });
});

describe('greaterThanEvery', () => {
  it('returns true if all values contained in list are greaterThan', () => {
    expect(collection.greaterThanEvery([300, 100, 330], 40))
      .toBeTruthy();
  });

  it('returns false if any values contained in list are NOT greaterThan', () => {
    expect(collection.greaterThanEvery([3, 10, 40], 40))
      .toBeFalsy();
    expect(collection.greaterThanEvery([3, -1999, 4], 40))
      .toBeFalsy();
  });
});

describe('greaterThanInclusiveSome', () => {
  it('returns true if some values contained in list are greaterThanInclusive', () => {
    expect(collection.greaterThanInclusiveSome([3, 1000, 40], 40))
      .toBeTruthy();
  });

  it('returns false if no values contained in list are NOT greaterThanInclusive', () => {
    expect(collection.greaterThanInclusiveSome([3, 100, 2], 101))
      .toBeFalsy();
  });
});

describe('greaterThanSome', () => {
  it('returns true if some values contained in list are greaterThan', () => {
    expect(collection.greaterThanSome([3, 1000, 40], 40))
      .toBeTruthy();
  });

  it('returns false if no values contained in list are greaterThan', () => {
    expect(collection.greaterThanSome([300, 100, 40], 300))
      .toBeFalsy();
  });
});
