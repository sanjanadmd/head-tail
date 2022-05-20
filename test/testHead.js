const assert = require('assert');
const { head } = require('../src/head.js');

describe('head', () => {
  it('should display single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
  it('should display empty line', () => {
    assert.strictEqual(head(''), '');
  });
  it('should return first line of given lines', () => {
    assert.strictEqual(head('hello\nbye'), 'hello');
    assert.strictEqual(head('hello\nbye\ngood'), 'hello');
  });
});
