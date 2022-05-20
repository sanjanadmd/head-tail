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
  it('should give first line from the file', () => {
    const mockReadFile = shouldReturn('./a.txt', 'hello');
    assert.strictEqual(headMain(mockReadFile, './a.txt', {
      lines: 2,
    }), 'hello');
  });

  it('should give first 3 lines from the file', () => {
    let mockReadFile = shouldReturn('./a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(mockReadFile, './a.txt', {
      lines: 3,
      delimiter: '\n'
    }), 'a\nb\nc');

    mockReadFile = shouldReturn('./a.txt', 'as\nan\nit\ndo');
    assert.strictEqual(headMain(mockReadFile, './a.txt', {
      lines: 3,
      delimiter: '\n'
    }), 'as\nan\nit');
  });

  it('should give first 3 characters from the file', () => {
    const mockReadFile = shouldReturn('./a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(mockReadFile, './a.txt', {
      lines: 3,
      delimiter: ''
    }), 'a\nb');
  });
});
