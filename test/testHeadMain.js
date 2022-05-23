const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const shouldReturn = (expectedFile, content) => {
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expectedFile);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

describe('headMain', () => {
  it('should give number of lines required from the file', () => {
    let mockReadFile = shouldReturn('a.txt', 'hello');
    assert.strictEqual(headMain(mockReadFile, ['-n', '2', 'a.txt']), 'hello');

    mockReadFile = shouldReturn('a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(mockReadFile, ['-n', '3', 'a.txt']), 'a\nb\nc');

    mockReadFile = shouldReturn('a.txt', 'as\nan\nit\ndo');
    assert.strictEqual(headMain(mockReadFile,
      ['-n', '3', 'a.txt']), 'as\nan\nit');
  });

  it('should give number of bytes required from the file', () => {
    const mockReadFile = shouldReturn('a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(mockReadFile, ['-c', '3', 'a.txt']), 'a\nb');
  });

  it('should throw an error when file is not readable', () => {
    const mockReadFile = shouldReturn('a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(
      mockReadFile, ['-c', '1', 'b.txt']), 'b.txt is not readable');
  });

  it('should throw an error when options not provided argument', () => {
    const mockReadFile = shouldReturn('a.txt', 'a\nb\nc');
    assert.throws(() => headMain(
      mockReadFile, ['-n']), { message: 'option requires an argument -n' });
  });

  it('should return content of all given files', () => {
    const mockReadFile = shouldReturn('a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(mockReadFile, ['-n', '1', 'a.txt', 'a.txt']),
      '==> a.txt <==\na\n\n==> a.txt <==\na\n');
  });
});
