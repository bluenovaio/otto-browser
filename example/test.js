/* eslint-disable */

const ottoBrowser = require('../dist/main');

(async () => {
  const results = await ottoBrowser.run({
    runTime: 'chromium'
  }, [
    {
      type: 'navigate',
      url: 'https://bluenova.io'
    },
    {
      type: 'query',
      selector: 'div'
    },
  ]);

  console.log(JSON.stringify(results));
})();
