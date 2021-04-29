import * as RulesEngine from 'json-rules-engine';
import * as _ from 'lodash';

import { Action, Rule } from '../actionTypes';
import * as collection from './operators/collection';
import * as core from './operators/core';

export function transformActionToRule(action: Action): Rule | null {
  if (action.conditions) {
    return {
      conditions: _.pickBy({
        any: _.get(action, 'conditions.any'),
        all: _.get(action, 'conditions.all')
      }, _.identity) as RulesEngine.TopLevelCondition,
      event: {
        type: 'assertion',
        params: action.conditions.params
      }
    };
  } else {
    return null;
  }
}

export function create(rules: Rule[] = []): RulesEngine.Engine {
  const engine = new RulesEngine.Engine(rules, { allowUndefinedFacts: false });

  // Operators
  // ----
  engine.addOperator(new RulesEngine.Operator('nil', core.nil));
  engine.addOperator(new RulesEngine.Operator('notNil', core.notNil));
  engine.addOperator(new RulesEngine.Operator('equal', core.equal));
  engine.addOperator(new RulesEngine.Operator('notEqual', core.notEqual));
  engine.addOperator(new RulesEngine.Operator('string', core.string));
  engine.addOperator(new RulesEngine.Operator('notString', core.notString));
  engine.addOperator(new RulesEngine.Operator('number', core.number));
  engine.addOperator(new RulesEngine.Operator('notNumber', core.notNumber));
  engine.addOperator(new RulesEngine.Operator('greaterThan', core.greaterThan, _.isNumber));
  engine.addOperator(new RulesEngine.Operator('greaterThanInclusive', core.greaterThanInclusive, _.isNumber));
  engine.addOperator(new RulesEngine.Operator('lessThan', core.lessThan, _.isNumber));
  engine.addOperator(new RulesEngine.Operator('lessThanInclusive', core.lessThanInclusive, _.isNumber));
  engine.addOperator(new RulesEngine.Operator('in', collection.isIn));
  engine.addOperator(new RulesEngine.Operator('notIn', collection.notIn));
  engine.addOperator(new RulesEngine.Operator('inEvery', collection.inEvery));
  engine.addOperator(new RulesEngine.Operator('contains', collection.contains, _.isArray));
  engine.addOperator(new RulesEngine.Operator('doesNotContain', collection.doesNotContain, _.isArray));
  engine.addOperator(new RulesEngine.Operator('containsEvery', collection.containsEvery, _.isArray));
  engine.addOperator(new RulesEngine.Operator('greaterThanEvery', collection.greaterThanEvery, _.isArray));
  engine.addOperator(new RulesEngine.Operator('greaterThanInclusiveEvery', collection.greaterThanInclusiveEvery, _.isArray));
  engine.addOperator(new RulesEngine.Operator('greaterThanInclusiveSome', collection.greaterThanInclusiveSome, _.isArray));
  engine.addOperator(new RulesEngine.Operator('greaterThanSome', collection.greaterThanSome, _.isArray));
  engine.addOperator(new RulesEngine.Operator('lessThanEvery', collection.lessThanEvery, _.isArray));
  engine.addOperator(new RulesEngine.Operator('lessThanInclusiveEvery', collection.lessThanInclusiveEvery, _.isArray));
  engine.addOperator(new RulesEngine.Operator('lessThanInclusiveSome', collection.lessThanInclusiveSome, _.isArray));
  engine.addOperator(new RulesEngine.Operator('lessThanSome', collection.lessThanSome, _.isArray));

  return engine;
}
