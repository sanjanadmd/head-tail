const assert = require('assert');
const { headMain, headOfFile } = require('../src/headLib.js');

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

const mockConsole = (expected) => {
  let index = 0;
  return (result) => {
    assert.strictEqual(expected[index], result);
    index++;
  };
};

describe('headOfFile', () => {
  it('should return the head of the file when file is found', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['hello']);
    const options = { flag: '-c', count: 1 };
    const expected = { fileName: 'a.txt', result: 'h' };
    assert.deepStrictEqual(
      headOfFile('a.txt', mockReadFile, options), expected);
  });

  it('should return the error when file is not readable', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['hello']);
    const options = { flag: '-c', count: 1 };
    const expected = {
      error: { message: 'head: b.txt: No such file or directory' }
    };
    assert.deepStrictEqual(
      headOfFile('b.txt', mockReadFile, options), expected);
  });
});

describe('headMain', () => {
  it('should give number of lines required from the file', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['hello']);
    let display = {
      log: mockConsole(['hello']),
      error: mockConsole([])
    };
    assert.strictEqual(headMain(['-n', '2', 'a.txt'],
      mockReadFile, display), 0);

    display = {
      log: mockConsole(['a\nb\nc']),
      error: mockConsole([])
    };
    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    assert.strictEqual(headMain(['-n', '3', 'a.txt'],
      mockReadFile, display), 0);

    mockReadFile = shouldReturn(['a.txt'], ['as\nan\nit\ndo']);
    display = {
      log: mockConsole(['as\nan\nit']),
      error: mockConsole([])
    };

    assert.strictEqual(headMain(['-n', '3', 'a.txt'],
      mockReadFile, display), 0);
  });

  it('should give number of bytes required from the file', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    const display = {
      log: mockConsole(['a\nb']),
      error: mockConsole([])
    };
    assert.strictEqual(headMain(['-c', '3', 'a.txt'],
      mockReadFile, display), 0);
  });

  it('should throw an error when file is not readable', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    let display = {
      log: mockConsole([]),
      error: mockConsole(['head: b.txt: No such file or directory'])
    };
    assert.strictEqual(headMain(['-c', '1', 'b.txt'],
      mockReadFile, display), 1);

    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    display = {
      log: mockConsole(['==> a.txt <==\na\n']),
      error: mockConsole(['head: b.txt: No such file or directory'])
    };
    assert.strictEqual(headMain(['-c', '1', 'a.txt', 'b.txt'],
      mockReadFile, display), 1);
  });

  it('should return content of all given files', () => {
    let mockReadFile = shouldReturn(['a.txt', 'b.txt'], ['a\nb\nc', 'hello']);
    let display = {
      log: mockConsole(['==> a.txt <==\na\n', '==> b.txt <==\nhello\n']),
      error: mockConsole([])
    };
    assert.strictEqual(headMain(['-n', '1', 'a.txt', 'b.txt'],
      mockReadFile, display), 0);

    mockReadFile = shouldReturn(['a.txt', 'a.txt'], ['a\nb\nc', 'a\nb\nc']);
    display = {
      log: mockConsole(['==> a.txt <==\na\n', '==> a.txt <==\na\n']),
      error: mockConsole([])
    };
    assert.strictEqual(headMain(['-n', '1', 'a.txt', 'a.txt'],
      mockReadFile, display), 0);
  });
});
