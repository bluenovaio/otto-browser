import * as RulesEngine from 'json-rules-engine';

// ===========================
// ======= DataTypes =========
// ===========================

// DOM
// ------

export interface DOMElement {
  id?: string;
  classNames?: string[];
  tagName: string;
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

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'PATCH';

export type HTTPBodyType = 'json' | 'text' | 'xml' | 'unknown';

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

export type ActionType =
  | 'click'
  | 'navigate'
  | 'type'
  | 'uncheck'
  | 'check'
  | 'submit'
  | 'select'
  | 'query';

export interface CoreActionConditions {
  params?: Record<string, unknown>;
}

export type ActionConditions = RulesEngine.TopLevelCondition &
  CoreActionConditions;

export interface CoreAction {
  type: ActionType;
  id: string;
  conditions?: ActionConditions;
}

export interface CoreActionResult {
  type: ActionType;
  id: string;
  rule?: RulesEngine.Event | null;
}

// DOM
// -----

export type DOMActionType =
  | 'click'
  | 'type'
  | 'uncheck'
  | 'check'
  | 'submit'
  | 'select'
  | 'query';

export type DOMFormFieldValue = string | string[];

export interface DOMAction extends CoreAction {
  type: DOMActionType;
  value?: DOMFormFieldValue;
  selector: string;
}

export interface DOMActionResult extends CoreActionResult {
  type: DOMActionType;
  elements?: DOMElement[];
}

// HTTP
// -----

export type HTTPActionType = 'navigate';

export interface HTTPAction extends CoreAction {
  type: HTTPActionType;
  url: string;
}

export interface HTTPActionResult extends CoreActionResult {
  type: HTTPActionType;
  request?: HTTPRequest;
  response?: HTTPResponse;
}

// Aggregate
// -----

export type Action = DOMAction | HTTPAction;

export type ActionResult = DOMActionResult | HTTPActionResult;

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
