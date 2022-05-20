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
    let mockReadFile = shouldReturn('./a.txt', 'hello');
    let parameters = {
      fileName: './a.txt', options: { lines: 2, delimiter: '\n' }
    };
    assert.strictEqual(headMain(mockReadFile, parameters), 'hello');
    parameters = {
      fileName: './a.txt', options: { lines: 3, delimiter: '\n' }
    };

    mockReadFile = shouldReturn('./a.txt', 'a\nb\nc');
    assert.strictEqual(headMain(mockReadFile, parameters), 'a\nb\nc');

    mockReadFile = shouldReturn('./a.txt', 'as\nan\nit\ndo');
    assert.strictEqual(headMain(mockReadFile, parameters), 'as\nan\nit');
  });

  it('should give number of bytes required from the file', () => {
    const mockReadFile = shouldReturn('./a.txt', 'a\nb\nc');
    const options = { lines: 3, delimiter: '' };
    const parameters = { fileName: './a.txt', options };
    assert.strictEqual(headMain(mockReadFile, parameters), 'a\nb');
  });

  it('should throw an error when file is not readable', () => {
    const mockReadFile = shouldReturn('./a.txt', 'a\nb\nc');
    const options = { lines: 1, delimiter: '' };
    const parameters = { fileName: './b.txt', options };
    assert.throws(() => headMain(mockReadFile, parameters), {
      name: 'FileReadError',
      message: './b.txt is not readable',
    });
  });
});
