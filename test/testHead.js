const assert = require('assert');
const { head } = require('../src/head.js');

describe('head', () => {
  it('should display single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
});
