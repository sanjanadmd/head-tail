const assert = require('assert');
const {
  head, sliceUpto, fileReader, createErrorObj, createContentObj
} = require('../src/headLib.js');

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

const shouldReturn = (expectedFiles, content) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expectedFiles[index]);
    assert.strictEqual(encoding, 'utf8');
    const lastIndex = index;
    index++;
    return content[lastIndex];
  };
};

describe('fileReader', () => {
  it('should return the content of file when file exists', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['hello']);
    assert.deepStrictEqual(fileReader('a.txt', mockReadFile), 'hello');
  });
  it('should return the error of file when file does not exist', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['hello']);
    assert.deepStrictEqual(fileReader('b.txt', mockReadFile), {
      result: 'head: b.txt: No such file or directory',
      type: 'error'
    });
  });
});

describe('createErrorObj', () => {
  it('should return file not found error and type will error ', () => {
    assert.deepStrictEqual(createErrorObj('a.txt'), {
      result: 'head: a.txt: No such file or directory',
      type: 'error'
    });
  });
});

describe('createContentObj', () => {
  it('should return file not found error and type will error ', () => {
    assert.deepStrictEqual(createContentObj('a.txt', 'hello'), {
      fileName: 'a.txt',
      result: 'hello',
      type: 'log'
    });
  });
});
