let Core = require('../dist/index.umd.js');

test('creates new core instance', () => {
  let c = new Core({
    id: 'OKOQo8va',
    key: 'IK-JNLo8SXM-hRW1lcLUU'
  });

  expect(c.iframe.tagName).toEqual('IFRAME');
});

test('fires init events', (done) => {
  expect.assertions(1);

  let c = new Core({
    id: 'OKOQo8va',
    key: 'IK-JNLo8SXM-hRW1lcLUU'
  });

  c.on('init', () => {
    expect(true).toBeTruthy();
    done();
  })
});
