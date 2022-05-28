const assert = require('assert');
const {
  head, sliceUpto, fileReader, createErrorObj, createContentObj,
  firstNLines, firstNBytes
} = require('../src/headLib.js');

describe('firstNLines', () => {
  it('should return first line', () => {
    assert.strictEqual(firstNLines('', 1), '');
    assert.strictEqual(firstNLines('a', 1), 'a');
    assert.strictEqual(firstNLines('hello\nbye', 1), 'hello');
  });

  it('should return first 2 lines', () => {
    assert.strictEqual(firstNLines('hello\nbye', 2), 'hello\nbye');
    assert.strictEqual(firstNLines('a\nb\nc', 2), 'a\nb');
  });
});

describe('firstNBytes', () => {
  it('should return first character ', () => {
    assert.strictEqual(firstNBytes('', 1), '');
    assert.strictEqual(firstNBytes('a', 1), 'a');
    assert.strictEqual(firstNBytes('hello\nbye', 1), 'h');
  });

  it('should display first 5 characters ', () => {
    assert.strictEqual(firstNBytes('a', 5), 'a');
    assert.strictEqual(firstNBytes('hello\nbye', 5), 'hello');
  });
});

describe('head', () => {
  it('should display first line ', () => {
    const options = { count: 1, flag: '-n' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
  });

  it('should display first character ', () => {
    const options = { count: 1, flag: '-c' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'h');
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
      error: { message: 'head: b.txt: No such file or directory', }
    });
  });
});

describe('createErrorObj', () => {
  it('should return file not found error and type will error ', () => {
    assert.deepStrictEqual(createErrorObj('a.txt'), {
      message: 'head: a.txt: No such file or directory',
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
