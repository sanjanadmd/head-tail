const assert = require('assert');
const { head, firstNLines } = require('../src/headLib.js');

describe('head', () => {

  it('should display first line ', () => {
    assert.strictEqual(head('a', 1), 'a');
    assert.strictEqual(head('hello\nbye', 1), 'hello');
  });

  it('should display first 2 lines', () => {
    assert.strictEqual(head('hello\nbye', 2), 'hello\nbye');
    assert.strictEqual(head('a\nb\nc', 2), 'a\nb');
  });

  it('should display empty line', () => {
    assert.strictEqual(head('', 1), '');
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
