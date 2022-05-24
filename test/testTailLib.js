const assert = require('assert');
const { tail, tailMain } = require('../src/tailLib.js');

describe('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', { lines: 1, delimiter: '\n' }), 'b');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 1, delimiter: '\n'
    }), 'c');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 3, delimiter: '\n'
    }), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(tail('a\nb', {
      lines: 1, sign: '+', delimiter: '\n'
    }), 'a\nb');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 1, sign: '+', delimiter: '\n'
    }), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 3, sign: '+', delimiter: '\n'
    }), 'c');
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

describe('tailMain', () => {
  it('should return the last line of the file if file exists', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    assert.strictEqual(tailMain(mockReadFile, 'a.txt',
      { lines: 1, option: '-n' }), 'c');

    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    assert.throws(() => tailMain(mockReadFile, 'b.txt',
      { lines: 1, option: '-n' }),
      { message: 'tail: b.txt: No such file or directory' });
  });
});
