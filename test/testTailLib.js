const assert = require('assert');
const { tail, tailMain } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', 1), 'b');
    assert.strictEqual(tail('a\nb\nc', 1), 'c');
    assert.strictEqual(tail('a\nb\nc', 3), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(tail('a\nb', 1, '+'), 'a\nb');
    assert.strictEqual(tail('a\nb\nc', 1, '+'), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc', 3, '+'), 'c');
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

describe.only('tailMain', () => {
  it('should return the last line of the file if file exists', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    assert.strictEqual(tailMain(mockReadFile, 'a.txt', { lines: 1 }), 'c');

    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    assert.throws(() => tailMain(mockReadFile, 'b.txt', { lines: 1 })
      , { message: 'tail: b.txt: No such file or directory' });
  });
});
