import * as _ from 'lodash';

import * as collection from '../operators/collection';
import * as core from '../operators/core';
import * as engine from '../engine';

const conditions = {
  any: [{
    operator: 'equal',
    value: 1,
    fact: 'aNumber'
  }]
};

describe('operators', () => {
  const eng = engine.create([]);

  _.forOwn(collection, (value, operator) => {
    it(`contains the ${operator === 'isIn' ? 'in' : operator}`, () => {
      expect(eng.removeOperator(operator === 'isIn' ? 'in' : operator)).toBeTruthy();
    });
  });

  _.forOwn(core, (value, operator) => {
    it(`contains the ${operator}`, () => {
      expect(eng.removeOperator(operator)).toBeTruthy();
    });
  });
});

describe('transformActionToRule', () => {
  it('properly creates rule from action', () => {
    expect(engine.transformActionToRule(
      {
        type: 'query',
        id: '123',
        selector: 'h1',
        conditions: {
          ...conditions,
          params: {
            foo: true
          }
        }
      }
    )).toEqual({
      conditions: conditions,
      event: {
        type: 'assertion',
        params: {
          foo: true
        }
      }
    });
  });

  it('returns null if action does not have conditions', () => {
    expect(engine.transformActionToRule(      {
      type: 'click',
      id: '123',
      selector: 'h1'
    })).toEqual(null);
  });
});

describe('adds rules', () => {
  it('adds the proper rules', async () => {
    const eng = engine.create(_.compact([
      engine.transformActionToRule(
        {
          type: 'query',
          id: '123',
          selector: 'h1',
          conditions: {
            ...conditions,
            params: {
              foo: true
            }
          }
        }
      )
    ]));

    const result = await eng.run({ aNumber: 1 });
    expect(result.events[0]).toEqual({
      type: 'assertion',
      params: {
        foo: true
      }
    });
  });
});
