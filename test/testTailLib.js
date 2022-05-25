const assert = require('assert');
const { tail, sliceFrom } = require('../src/tailLib.js');

describe('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', { count: -1, delimiter: '\n' }), 'b');
    assert.strictEqual(tail('a\nb\nc', { count: -1, delimiter: '\n' }), 'c');
    assert.strictEqual(tail('a\nb\nc',
      { count: -3, delimiter: '\n' }), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(tail('a\nb',
      { count: 0, delimiter: '\n' }), 'a\nb');
    assert.strictEqual(tail('a\nb\nc',
      { count: 0, delimiter: '\n' }), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc',
      { count: 2, delimiter: '\n' }), 'c');
  });
  it('should return last bytes from the content', () => {
    assert.strictEqual(tail('a\nb', { count: -1, delimiter: '' }), 'b');
    assert.strictEqual(tail('a\nb\nc',
      { count: -1, delimiter: '' }), 'c');
    assert.strictEqual(tail('a\nb\nc',
      { count: -3, delimiter: '' }), 'b\nc');
  });
  it('should return bytes from given number of the content', () => {
    assert.strictEqual(tail('a\nb',
      { count: 0, delimiter: '' }), 'a\nb');
    assert.strictEqual(tail('a\nb\nc',
      { count: 0, delimiter: '' }), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc',
      { count: 2, delimiter: '' }), 'b\nc');
  });
});

describe('sliceFrom', () => {
  it('should return last line', () => {
    assert.deepStrictEqual(sliceFrom(['hello'], -1), ['hello']);
    assert.deepStrictEqual(sliceFrom(['a', 'b', 'c'], -1), ['c']);
  });

  it('should return line from given number', () => {
    assert.deepStrictEqual(sliceFrom(['hello'], 1), []);
    assert.deepStrictEqual(sliceFrom(['a', 'b', 'c'], 1), ['b', 'c']);
  });
  it('should return empty array', () => {
    assert.deepStrictEqual(sliceFrom([], 1), []);
  });
});

