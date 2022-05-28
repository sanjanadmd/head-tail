const assert = require('assert');
const {
  tail, sliceFrom, lastNLines, lastNBytes, createContentObj, createErrorObj
} = require('../src/tailLib.js');

describe('lastNLines', () => {

  it('should return last lines from the content', () => {
    assert.strictEqual(lastNLines('a\nb', -1), 'b');
    assert.strictEqual(lastNLines('a\nb\nc', -1), 'c');
    assert.strictEqual(lastNLines('a\nb\nc', -3), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(lastNLines('a\nb', 0), 'a\nb');
    assert.strictEqual(lastNLines('a\nb\nc', 0), 'a\nb\nc');
    assert.strictEqual(lastNLines('a\nb\nc', 2), 'c');
  });
});

describe('lastNBytes', () => {
  it('should return last bytes from the content', () => {
    assert.strictEqual(lastNBytes('a\nb', -1), 'b');
    assert.strictEqual(lastNBytes('a\nb\nc', -1), 'c');
    assert.strictEqual(lastNBytes('a\nb\nc', -3), 'b\nc');
  });
  it('should return bytes from given number of the content', () => {
    assert.strictEqual(lastNBytes('a\nb', 0), 'a\nb');
    assert.strictEqual(lastNBytes('a\nb\nc', 0), 'a\nb\nc');
    assert.strictEqual(lastNBytes('a\nb\nc', 2), 'b\nc');
  });
});

describe('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', { count: '-1', flag: '-n' }), 'b');
    assert.strictEqual(tail('a\nb\nc', { count: '-1', flag: '-n' }), 'c');
    assert.strictEqual(tail('a\nb\nc',
      { count: '-3', flag: '-n' }), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(lastNLines('a\nb',
      { count: '+1', flag: '-n' }), 'a\nb');
  });
  it('should return last bytes from the content', () => {
    assert.strictEqual(tail('a\nb', { count: '-1', flag: '-c' }), 'b');
    assert.strictEqual(tail('a\nb\nc',
      { count: '-1', flag: '-c' }), 'c');
    assert.strictEqual(tail('a\nb\nc',
      { count: '-3', flag: '-c' }), 'b\nc');
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

describe('createErrorObj', () => {
  it('should return file not found error and type will error ', () => {
    assert.deepStrictEqual(createErrorObj('a.txt'), {
      message: 'tail: a.txt: No such file or directory',
    });
  });
});

describe('createContentObj', () => {
  it('should return file not found error and type will error ', () => {
    assert.deepStrictEqual(createContentObj('a.txt', 'hello'), {
      fileName: 'a.txt',
      result: 'hello',
    });
  });
});
