const assert = require('assert');
const { head, firstNLines } = require('../src/headLib.js');

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

describe('firstNLines', () => {
  it('should return first line', () => {
    assert.deepStrictEqual(firstNLines(['hello'], 1), ['hello']);
    assert.deepStrictEqual(firstNLines(['hello', 'bye'], 1), ['hello']);
  });

  it('should return first 2 lines', () => {
    assert.deepStrictEqual(firstNLines(['hello'], 2), ['hello']);
    assert.deepStrictEqual(firstNLines(['hello', 'bye'], 2), ['hello', 'bye']);
    assert.deepStrictEqual(firstNLines(['a', 'b', 'c'], 2), ['a', 'b']);
  });

  it('should return empty line', () => {
    assert.deepStrictEqual(firstNLines([''], 1), ['']);
  });

  it('should return empty array', () => {
    assert.deepStrictEqual(firstNLines([], 1), []);
  });

});
