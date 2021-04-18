# Otto Browser Runtime

[![CI](https://github.com/bluenovaio/otto-browser/actions/workflows/ci.yaml/badge.svg)](https://github.com/bluenovaio/otto-browser/actions/workflows/ci.yaml)
[![Publish](https://github.com/bluenovaio/otto-browser/actions/workflows/publish.yaml/badge.svg)](https://github.com/bluenovaio/otto-browser/actions/workflows/publish.yaml)

Core runtime for running otto actions in a Browser environment.

## Installation

```bash
npm install @bluenova/otto-browser
```

```bash
yarn add @bluenova/otto-browser
```

## Usage

```typescript
import * as ottoBrowser from '@bluenova/otto-browser';

async function doSomethingInBrowser() {
  const results = await ottoBrowser.run(
    { runTime: 'chromium' },
    [
      // Add actions you want to run here
    ]
  );
  
  console.log(results);
}

doSomethingInBrowser();

```
