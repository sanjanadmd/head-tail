const assert = require('assert');
const { parseArgs, setDelimiter, validateOption } = require('../src/parseArgs');

describe('parseArgs', () => {
  it('should provide all fileNames and default options', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        fileNames: ['a.txt'], options: { lines: 10, delimiter: '\n' }
      });
    assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: 10, delimiter: '\n' }
      });
  });
  it('should provide all fileNames and given options', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', 'a.txt']),
      {
        fileNames: ['a.txt'], options: { lines: 1, delimiter: '\n' }
      });
    assert.deepStrictEqual(parseArgs(['-n', '4', 'a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: 4, delimiter: '\n' }
      });
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: 4, delimiter: '' }
      });
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt', '-n', '4']),
      {
        fileNames: ['a.txt', 'b.txt', '-n', '4'],
        options: { lines: 4, delimiter: '' }
      });
  });
  it('should provide fileNames starting with numbers also', () => {
    assert.deepStrictEqual(parseArgs(['123.txt']),
      {
        fileNames: ['123.txt'],
        options: { lines: 10, delimiter: '\n' }
      });
  });
  it('should not provide fileNames starting with hyphen', () => {
    assert.deepStrictEqual(parseArgs(['-hello.txt']),
      {
        error: {
          name: 'SyntaxError',
          message: 'can not combine line and byte counts'
        }
      });
  });

  it('should not change option once it is fixed in the start', () => {
    assert.deepStrictEqual(parseArgs(['-n', '4', '-c', 1, 'a.txt']),
      {
        error: {
          name: 'SyntaxError',
          message: 'can not combine line and byte counts'
        }
      });
  });

});

describe('setDelimiter', () => {
  it('should return delimiter if the option is found', () => {
    assert.strictEqual(setDelimiter('-n', { '-n': '\n' }), '\n');
    assert.strictEqual(setDelimiter('-c', { '-c': '' }), '');
  });
  it('should return "\n" as delimiter when option not found', () => {
    assert.strictEqual(setDelimiter('hello', {}), '\n');
    assert.strictEqual(setDelimiter('-a', {}), '\n');
  });
});

describe('validateOptions', () => {
  it('should return an error when option not found', () => {
    assert.deepStrictEqual(validateOption({}, '\n', '-a'), {
      name: 'SyntaxError',
      message: 'can not combine line and byte counts'
    });
  });

  it('should return an error when option won\'t match with given value', () => {
    assert.deepStrictEqual(validateOption({}, '\n', '-a'), {
      name: 'SyntaxError',
      message: 'can not combine line and byte counts'
    });
  });
});
