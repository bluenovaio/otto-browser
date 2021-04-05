import * as safe from '../safe';

describe('exec', () => {
  it('returns null if errors', () => {
    expect(safe.exec(() => { throw new Error('never'); }))
      .toEqual(null);
  });

  it('passes in all args', () => {
    // @ts-ignore
    expect(safe.exec((a: string, b: string) => { return [a, b].join('-'); }, ['foo', 'bar']))
      .toEqual('foo-bar');
  });
});

describe('execAsync', () => {
  it('returns null if errors', async () => {
    expect(await safe.execAsync(async () => { throw new Error('never'); }))
      .toEqual(null);
  });

  it('passes in all args', async () => {
    // @ts-ignore
    expect(await safe.execAsync(async (a: string, b: string) => { return [a, b].join('-'); }, ['foo', 'bar']))
      .toEqual('foo-bar');
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

