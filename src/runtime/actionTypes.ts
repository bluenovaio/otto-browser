import * as RulesEngine from 'json-rules-engine';

// ===========================
// ======= DataTypes =========
// ===========================

// DOM
// ------

export interface Element {
  other?: string;
  innerHTML?: string;
  innerText?: string;
  visible?: boolean;
  hidden?: boolean;
  editable?: boolean;
  checked?: boolean;
  disabled?: boolean;
  enabled?: boolean;
}

// HTTP
// ------

export type HTTPHeaders = Record<string, string>;

export type HTTPMethod = 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'PATCH';

export type HTTPBodyType = 'json'
  | 'text'
  | 'xml'
  | 'unknown';

export interface HTTPResponse {
  bodyType: HTTPBodyType;
  body?: string;
  headers?: HTTPHeaders;
  status?: number;
  statusText?: string;
  url?: string;
}

export interface HTTPRequest {
  body?: string;
  headers?: HTTPHeaders;
  method: HTTPMethod;
}

// ===========================
// ======== Actions ==========
// ===========================

// Core
// ------

export type ActionType = 'click'
  | 'navigate'
  | 'query';

export type ActionConditions = RulesEngine.TopLevelCondition;

export interface CoreConfig {
  type: ActionType;
  conditions?: ActionConditions;
}

export interface CoreResult {
  type: ActionType;
}

// DOM
// -----

export type DOMActionType = 'click' | 'query';

export interface DOMAction extends CoreConfig {
  type: DOMActionType;
  selector: string;
}

export interface DOMActionResult extends CoreResult {
  type: DOMActionType;
  element?: Element;
}

// HTTP
// -----

export type HTTPActionType = 'navigate';

export interface HTTPAction extends CoreConfig {
  type: HTTPActionType;
  url: string;
}

export interface HTTPActionResult extends CoreResult {
  type: HTTPActionType;
  request?: HTTPRequest;
  response?: HTTPResponse;
}

// Aggregate
// -----

export type Action = DOMAction
  | HTTPAction

export type ActionResult = DOMActionResult
  | HTTPActionResult

// ===========================
// ========= Rules ===========
// ===========================

export type RuleType = 'assertion';

export interface RuleEvent extends RulesEngine.Event {
  type: RuleType;
}

export interface Rule extends RulesEngine.RuleProperties {
  event: RuleEvent;
}
