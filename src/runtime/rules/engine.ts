import * as RulesEngine from 'json-rules-engine';
import * as _ from 'lodash';

import { Action, Rule } from '../actionTypes';
import * as collection from './operators/collection';
import * as core from './operators/core';

export function buildRules(actions: Action[]): Rule[] {
  const rules: Rule[] = [];

  actions.forEach((action) => {
    if (action.conditions) {
      const all = _.get(action, 'conditions.all', null);
      const any = _.get(action, 'conditions.any', null);
      const conditions = {} as RulesEngine.TopLevelCondition;
      if (!all) {
        _.set(conditions, 'any', any);
      } else {
        _.set(conditions, 'all', all);
      }
      rules.push({
        conditions: conditions,
        event: {
          type: 'assertion',
          params: action.conditions.params
        }
      });
    }
  });

  return rules;
}

export function create(actions: Action[]): RulesEngine.Engine {
  const engine = new RulesEngine.Engine([], { allowUndefinedFacts: false });

  // Operators
  // ----

  // Remove default operations
  [
    'equal',
    'notEqual',
    'in',
    'notIn',
    'contains',
    'doesNotContain',
    'lessThan',
    'lessThanInclusive',
    'greaterThan',
    'greaterThanInclusive'
  ]
    .forEach((operatorName) => {
      engine.removeOperator(operatorName);
    });

  // Add internal operators
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

  // Setup & Add Action Rules
  // ----
  const rules = buildRules(actions);
  rules.forEach((rule) => {
    engine.addRule(rule);
  });

  return engine;
}
