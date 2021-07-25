import * as safe from '../safe';

describe('execAsync', () => {
  it('handles an error', async () => {
    const [err, result] = await safe.execAsync(
      async () => {
        throw new Error('An Error');
      });
    expect(err?.message).toEqual('An Error');
    expect(result).toBeNull();
  });

  it('handles a non-error', async () => {
    const [err, result] = await safe.execAsync(
      async () => 'Not an Error');
    expect(err).toBeNull();
    expect(result).toEqual('Not an Error');
  });
});

describe('exec', () => {
  it('handles an error', () => {
    const [err, result] = safe.exec(
      () => {
        throw new Error('An Error');
      });
    expect(err?.message).toEqual('An Error');
    expect(result).toBeNull();
  });

  it('handles a non-error', () => {
    const [err, result] = safe.exec(
      () => 'Not an Error');
    expect(err).toBeNull();
    expect(result).toEqual('Not an Error');
  });
});

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
