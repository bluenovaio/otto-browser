import * as RulesEngine from 'json-rules-engine';
import * as _ from 'lodash';

import { Action, Rule } from '../actionTypes';

function buildEventParams (conditions: RulesEngine.TopLevelCondition) {
  if (_.has(conditions, 'all')) {
    return _.get(conditions, 'all[0].params');
  } else if (_.has(conditions, 'any')) {
    return _.get(conditions, 'any[0].params');
  } else {
    throw new Error('Invalid Condition, must contain `any` or `all` properties');
  }
}

function buildRules (actions: Action[]): Rule[] {
  const rules: Rule[] = [];

  actions.forEach((action) => {
    if (action.conditions) {
      rules.push({
        conditions: action.conditions,
        event: {
          type: 'assertion',
          params: buildEventParams(action.conditions)
        }
      });
    }
  });

  return rules;
}

export function create (actions: Action[]): RulesEngine.Engine {
  const engine = new RulesEngine.Engine();

  const rules = buildRules(actions);
  rules.forEach((rule) => {
    engine.addRule(rule);
  });

  return engine;
}
