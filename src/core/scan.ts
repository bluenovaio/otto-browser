import * as playwright from 'playwright';

import { HTTPMethod, HTTPRequest, HTTPResponse } from './types';

export interface HTTPCall {
  url: string;
  method: HTTPMethod;
  request: HTTPRequest;
  response: HTTPResponse;
}

export interface Feature {
  tag: string;
}

export interface ScannedPage {
  baseUrl: string;
  route: string;
  features: Feature[];
  httpCalls: HTTPCall[];
}

// async function getForms(page: playwright.Page) {
//   return await page.$$('form');
// }

export interface ScanConfig {
  baseUrl: string;
  routes: string[];
}

function assertScanConfig(config: ScanConfig) {
  if (config.routes.length === 0) {
    throw new Error('At least one route in the "routes" array is required');
  }

  if (!config.baseUrl) {
    throw new Error('"baseUrl" is a required field');
  }
}

// @todo listen to all res/req and build array
// @todo return ALL Http for Pages ONLY
// @todo return ALL unique forms (i.e. handle footer forms)
// @todo intercept API requests

// page DOC request
// forms
// navigate and test feature
export async function scan(config: ScanConfig): Promise<ScannedPage[]> {
  assertScanConfig(config);

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto(config.baseUrl);
  const scannedPages: ScannedPage[] = [];

  for (let i = 0; i < config.routes.length; i++) {
    const route = config.routes[i];
    const scannedPage: ScannedPage = {
      baseUrl: config.baseUrl,
      route,
      features: [],
      httpCalls: []
    };

    // Base Navigation Request
    const req = await page.goto(`${config.baseUrl}${route}`);

    scannedPage.httpCalls.push({
      url: `${config.baseUrl}${route}`,
      request: {
        method: 'GET'
      },
      response: {}
    });

    scannedPages.push(scannedPage);
  }

  return scannedPages;
}
