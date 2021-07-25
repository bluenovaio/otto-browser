import * as playwright from 'playwright';

import * as safe from '../../lib/safe';
import { HTTPCall, HTTPMethod, HTTPRequest, HTTPResponse } from '../types';

// Response
// -----

async function getResponseBody(response: playwright.Response) {
  const [, jsonBody] = await safe.execAsync(response.json);
  const [, textBody] = await safe.execAsync(response.text);
  const [, bufferBody] = await safe.execAsync(response.body);

  return JSON.stringify(jsonBody) || textBody || bufferBody?.toString();
}

export async function buildResponse(response: playwright.Response): Promise<HTTPResponse> {
  return {
    body: await getResponseBody(response),
    headers: response.headers(),
    status: response.status(),
    statusText: response.statusText()
  };
}

// Request
// -----

export async function buildRequest(request: playwright.Request): Promise<HTTPRequest> {
  const timing = request.timing();
  const [, body] = safe.exec(request.postDataJSON);

  return {
    headers: request.headers(),
    body: JSON.stringify(body),
    method: request.method() as HTTPMethod,
    isNavigation: request.isNavigationRequest(),
    timing: {
      startTime: timing.startTime,
      domainLookupStart: timing.domainLookupStart,
      domainLookupEnd: timing.domainLookupEnd,
      connectStart: timing.connectStart,
      secureConnectionStart: timing.secureConnectionStart,
      connectEnd: timing.connectEnd,
      requestStart: timing.requestStart,
      responseStart: timing.responseStart,
      responseEnd: timing.responseEnd
    }
  };
}

export async function buildHttpCall(response: playwright.Response | null): Promise<HTTPCall | null> {
  if (response) {
    return {
      url: response.url(),
      request: await buildRequest(response.request()),
      response: await buildResponse(response)
    };
  } else {
    return null;
  }
}
