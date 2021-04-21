import * as safe from '../safe';

describe('JSONParse', () => {
  it('returns null if errors', () => {
    expect(safe.JSONParse({}))
      .toEqual(null);
  });

  it('returns parsed value', () => {
    expect(safe.JSONParse('{"value": 1}'))
      .toEqual({ value: 1 });
  });
});

