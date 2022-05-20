const assert = require('assert');
const { head, firstNLines } = require('../src/headLib.js');

describe('head', () => {
  it('should display first line ', () => {
    const options = { lines: 1, delimiter: '\n' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
  });

  it('should display first 2 lines', () => {
    const options = { lines: 2, delimiter: '\n' };
    assert.strictEqual(head('hello\nbye', options), 'hello\nbye');
    assert.strictEqual(head('a\nb\nc', options), 'a\nb');
  });

  it('should display first character ', () => {
    const options = { lines: 1, delimiter: '' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'h');
  });

  it('should display first 5 characters ', () => {
    const options = { lines: 5, delimiter: '' };
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
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
