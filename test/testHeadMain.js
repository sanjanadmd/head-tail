const assert = require('assert');
const { headMain } = require('../src/headLib.js');

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

const mockDisplay = (expected) => {
  let index = 0;
  return (result) => {
    assert.strictEqual(expected[index], result);
    index++;
  };
};

describe('headMain', () => {
  it('should give number of lines required from the file', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['hello']);
    let display = {
      log: mockDisplay(['hello']),
      error: mockDisplay([])
    };
    assert.strictEqual(headMain(mockReadFile,
      ['-n', '2', 'a.txt'], display), undefined);

    display = {
      log: mockDisplay(['a\nb\nc']),
      error: mockDisplay([])
    };
    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    assert.strictEqual(headMain(mockReadFile,
      ['-n', '3', 'a.txt'], display), undefined);

    mockReadFile = shouldReturn(['a.txt'], ['as\nan\nit\ndo']);
    display = {
      log: mockDisplay(['as\nan\nit']),
      error: mockDisplay([])
    };

    assert.strictEqual(headMain(mockReadFile,
      ['-n', '3', 'a.txt'], display), undefined);
  });

  it('should give number of bytes required from the file', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    const display = {
      log: mockDisplay(['a\nb']),
      error: mockDisplay([])
    };
    assert.strictEqual(headMain(mockReadFile,
      ['-c', '3', 'a.txt'], display), undefined);
  });

  it('should throw an error when file is not readable', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    const display = {
      log: mockDisplay([]),
      error: mockDisplay(['b.txt is not readable'])
    };
    assert.strictEqual(headMain(
      mockReadFile, ['-c', '1', 'b.txt'], display), undefined);
  });

  it('should return content of all given files', () => {
    let mockReadFile = shouldReturn(['a.txt', 'b.txt'], ['a\nb\nc', 'hello']);
    let display = {
      log: mockDisplay(['==> a.txt <==\na\n', '==> b.txt <==\nhello\n']),
      error: mockDisplay([''])
    };
    assert.strictEqual(headMain(mockReadFile,
      ['-n', '1', 'a.txt', 'b.txt'], display), undefined);

    mockReadFile = shouldReturn(['a.txt', 'a.txt'], ['a\nb\nc', 'a\nb\nc']);
    display = {
      log: mockDisplay(['==> a.txt <==\na\n', '==> a.txt <==\na\n']),
      error: mockDisplay([''])
    };
    assert.strictEqual(headMain(mockReadFile,
      ['-n', '1', 'a.txt', 'a.txt'], display), undefined);
  });
});
