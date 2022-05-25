const assert = require('assert');
const { tailMain } = require('../src/tailLib.js');

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

describe('tailMain', () => {
  it('should return the last line of the file if file exists', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    let display = {
      log: mockDisplay(['c']),
      error: mockDisplay([])
    };
    assert.strictEqual(tailMain(mockReadFile, ['-n1', 'a.txt']
      , display), 0);

    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    display = {
      log: mockDisplay([]),
      error: mockDisplay(['tail: b.txt: No such file or directory'])
    };
    assert.deepStrictEqual(tailMain(mockReadFile, ['-n', '1', 'b.txt']
      , display), 1);
  });

  it('should give number of bytes required from the file', () => {
    const mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    const display = {
      log: mockDisplay(['c']),
      error: mockDisplay([])
    };
    assert.strictEqual(tailMain(mockReadFile, ['-c', '1', 'a.txt'],
      display), 0);
  });

  it('should throw an error when file is not readable', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    let display = {
      log: mockDisplay([]),
      error: mockDisplay(['tail: b.txt: No such file or directory'])
    };
    assert.strictEqual(tailMain(mockReadFile, ['-c1', 'b.txt']
      , display), 1);

    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    display = {
      log: mockDisplay(['==> a.txt <==\nc\n']),
      error: mockDisplay(['tail: b.txt: No such file or directory'])
    };
    assert.strictEqual(tailMain(mockReadFile,
      ['-c1', 'a.txt', 'b.txt'], display), 1);
  });

  it('should return content of all given files', () => {
    let mockReadFile = shouldReturn(['a.txt', 'b.txt'], ['a\nb\nc', 'hello']);
    let display = {
      log: mockDisplay(['==> a.txt <==\nc\n', '==> b.txt <==\nhello\n']),
      error: mockDisplay([])
    };
    assert.strictEqual(tailMain(mockReadFile,
      ['-n1', 'a.txt', 'b.txt'], display), 0);

    mockReadFile = shouldReturn(['a.txt', 'a.txt'], ['a\nb\nc', 'a\nb\nc']);
    display = {
      log: mockDisplay(['==> a.txt <==\nc\n', '==> a.txt <==\nc\n']),
      error: mockDisplay([])
    };
    assert.strictEqual(tailMain(mockReadFile,
      ['-n1', 'a.txt', 'a.txt'], display), 0);
  });

});
