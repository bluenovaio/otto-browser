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

export interface HTTPResponse {
  body?: string;
  headers?: HTTPHeaders;
  status?: number;
  statusText?: string;
}

export interface HTTPRequest {
  body?: string;
  headers?: HTTPHeaders;
  method: HTTPMethod;
  isNavigation: boolean;
  timing: {
    /**
     * Request start time in milliseconds elapsed since January 1, 1970 00:00:00 UTC
     */
    startTime: number;

    /**
     * Time immediately before the browser starts the domain name lookup for the resource. The value is given in milliseconds
     * relative to `startTime`, -1 if not available.
     */
    domainLookupStart: number;

    /**
     * Time immediately after the browser starts the domain name lookup for the resource. The value is given in milliseconds
     * relative to `startTime`, -1 if not available.
     */
    domainLookupEnd: number;

    /**
     * Time immediately before the user agent starts establishing the connection to the server to retrieve the resource. The
     * value is given in milliseconds relative to `startTime`, -1 if not available.
     */
    connectStart: number;

    /**
     * Time immediately before the browser starts the handshake process to secure the current connection. The value is given in
     * milliseconds relative to `startTime`, -1 if not available.
     */
    secureConnectionStart: number;

    /**
     * Time immediately before the user agent starts establishing the connection to the server to retrieve the resource. The
     * value is given in milliseconds relative to `startTime`, -1 if not available.
     */
    connectEnd: number;

    /**
     * Time immediately before the browser starts requesting the resource from the server, cache, or local resource. The value
     * is given in milliseconds relative to `startTime`, -1 if not available.
     */
    requestStart: number;

    /**
     * Time immediately after the browser starts requesting the resource from the server, cache, or local resource. The value
     * is given in milliseconds relative to `startTime`, -1 if not available.
     */
    responseStart: number;

    /**
     * Time immediately after the browser receives the last byte of the resource or immediately before the transport connection
     * is closed, whichever comes first. The value is given in milliseconds relative to `startTime`, -1 if not available.
     */
    responseEnd: number;
  }
}

export interface HTTPCall {
  url: string;
  request: HTTPRequest;
  response: HTTPResponse;
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
  | 'query'
  | 'assertEnd'
  | 'assertStart';

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

export interface HTTPActionResult extends CoreActionResult, HTTPCall {
  type: HTTPActionType;
}

// Assert-ONLY Actions (no user-like action required)
// -----

export type AssertActionType = 'assertStart' | 'assertEnd';

export interface AssertAction extends Omit<CoreAction, 'id'> {
  type: AssertActionType;
}

export interface AssertActionResult extends Omit<CoreActionResult, 'id'> {
  type: AssertActionType;
}

// Aggregate
// -----

export type Action = DOMAction
  | HTTPAction
  | AssertAction;

export type ActionResult = DOMActionResult
  | HTTPActionResult
  | AssertActionResult;

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
