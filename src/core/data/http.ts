import * as playwright from 'playwright';
import { HTTPMethod, HTTPRequest, HTTPResponse } from '../types';
import { HTTPCall } from '../scan';

// why is URL in response
// need to REALLY break this out and handle many cases and full objects for response and request
export async function buildResponse(response: playwright.Response): Promise<HTTPResponse> {
  let jsonBody = null;
  let body = null;

  try {
    jsonBody = await response.json();
  } catch (err) {}

  try {
    body = jsonBody ?? await response.text();
  } catch (err) {}

  return {
    body: body ? body.toString() : undefined,
    bodyType: jsonBody ? 'json' : 'unknown',
    headers: response.headers(),
    status: response.status(),
    statusText: response.statusText(),
  };
}

export async function buildRequest(response: playwright.Response): Promise<HTTPRequest> {
  const request = await response.request();
  return {
    headers: request.headers(),
    body: request.postDataBuffer() as any,
    method: request.method() as HTTPMethod
  };
}

export async function buildHttpCall(response: playwright.Response | null): Promise<HTTPCall | null> {
  if (response) {
    return {
      url: '',
      request: await buildRequest(response),
      response: await buildResponse(response)
    };
  } else {
    return null;
  }
}
