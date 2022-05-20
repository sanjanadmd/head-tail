const assert = require('assert');
const { head, firstLine } = require('../src/head.js');

describe('head', () => {
  it('should display single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('should display empty line', () => {
    assert.strictEqual(head(''), '');
  });

  it('should display first line of given lines', () => {
    assert.strictEqual(head('hello\nbye'), 'hello');
    assert.strictEqual(head('hello\nbye\ngood'), 'hello');
  });
});

describe('firstLine', () => {
  it('should return first line', () => {
    assert.deepStrictEqual(firstLine(['hello'], 1), ['hello']);
    assert.deepStrictEqual(firstLine(['hello', 'bye'], 1), ['hello']);
  });

  it('should return empty line', () => {
    assert.deepStrictEqual(firstLine([''], 1), ['']);
  });

  it('should return empty array', () => {
    assert.deepStrictEqual(firstLine([], 1), []);
  });

});
