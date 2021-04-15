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

export interface CoreConfig {
  type: ActionType;
}

export interface CoreResult {
  type: ActionType;
}

// DOM
// -----

export interface DOMAction extends CoreConfig {
  type: 'click' | 'query';
  selector: string;
}

export interface DOMActionResult extends CoreResult {
  element?: Element;
}

// HTTP
// -----

export interface HTTPAction extends CoreConfig {
  type: 'navigate';
  url: string;
}

export interface HTTPActionResult extends CoreResult {
  request?: HTTPRequest;
  response?: HTTPResponse;
}

// Aggregate
// -----

export type Action = DOMAction
  | HTTPAction
