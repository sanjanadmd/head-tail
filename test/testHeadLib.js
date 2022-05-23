const assert = require('assert');
const { head, sliceUpto, formatResult } = require('../src/headLib.js');

describe('head', () => {
  it('should display first line ', () => {
    const options = { lines: 1, option: '-n' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
  });

  it('should display first 2 lines', () => {
    const options = { lines: 2, option: '-n' };
    assert.strictEqual(head('hello\nbye', options), 'hello\nbye');
    assert.strictEqual(head('a\nb\nc', options), 'a\nb');
  });

  it('should display first character ', () => {
    const options = { lines: 1, option: '-c' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'h');
  });

  it('should display first 5 characters ', () => {
    const options = { lines: 5, option: '-c' };
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
  });
});

describe('sliceUpto', () => {
  it('should return first line', () => {
    assert.deepStrictEqual(sliceUpto(['hello'], 1), ['hello']);
    assert.deepStrictEqual(sliceUpto(['hello', 'bye'], 1), ['hello']);
  });

  it('should return first 2 lines', () => {
    assert.deepStrictEqual(sliceUpto(['hello'], 2), ['hello']);
    assert.deepStrictEqual(sliceUpto(['hello', 'bye'], 2), ['hello', 'bye']);
    assert.deepStrictEqual(sliceUpto(['a', 'b', 'c'], 2), ['a', 'b']);
  });

  it('should return empty line', () => {
    assert.deepStrictEqual(sliceUpto([''], 1), ['']);
  });

  it('should return empty array', () => {
    assert.deepStrictEqual(sliceUpto([], 1), []);
  });
});

describe('formatResult', () => {
  it('should return unformatted result when there is only one file', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'n', type: 'log' }
    ]), [{ result: 'n', type: 'log' }]);
  });
  it('should return unformatted result when there is only one file', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'a', type: 'log' },
      { fileName: 'b.txt', result: 'b', type: 'error' }
    ]), [
      { result: '==> a.txt <==\na\n', type: 'log' },
      { result: '==> b.txt <==\nb\n', type: 'error' }
    ]);
  });
});
