const assert = require('assert');
const { parseArgs, getOption, validateOption } = require('../src/parseArgs');

describe('parseArgs', () => {
  it('should provide all fileNames and default options', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        fileNames: ['a.txt'], options: { lines: 10, option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: 10, option: '-n' }
      });
  });
  it('should provide all fileNames and given options', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', 'a.txt']),
      {
        fileNames: ['a.txt'], options: { lines: 1, option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['-n', '4', 'a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: 4, option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: 4, option: '-c' }
      });
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt', '-n', '4']),
      {
        fileNames: ['a.txt', 'b.txt', '-n', '4'],
        options: { lines: 4, option: '-c' }
      });
  });
  it('should provide fileNames starting with numbers also', () => {
    assert.deepStrictEqual(parseArgs(['123.txt']),
      {
        fileNames: ['123.txt'],
        options: { lines: 10, option: '-n' }
      });
  });
  it('should not provide fileNames starting with hyphen', () => {
    assert.throws(() => parseArgs(['-hello.txt']),
      { message: 'illegal option -hello.txt' });
  });

  it('should not change option once it is fixed in the start', () => {
    assert.throws(() => parseArgs(['-n', '4', '-c', 1, 'a.txt']),
      { message: 'can not combine line and byte counts' });
  });

});

describe('validateOptions', () => {
  it('should return an error when option not found', () => {
    assert.deepStrictEqual(validateOption([], '-n', '-a'),
      { message: 'illegal option -a' });
  });

  it('should return an error when option won\'t match with given value', () => {
    assert.deepStrictEqual(validateOption(['-n', '-c'], '-n', '-c'),
      { message: 'can not combine line and byte counts' });

  });
  it(
    'should give empty string when newOption is found and same as given option',
    () => {
      assert.strictEqual(validateOption(['-n'], '-n', '-n'), '');
    });
});

describe('getOption', () => {
  it('should return same option when option exists', () => {
    assert.strictEqual(getOption('-a', ['-a']), '-a');
    assert.strictEqual(getOption('-a', ['-b', '-a']), '-a');
  });

  it('should return "-n" when option does not exists ', () => {
    assert.strictEqual(getOption('-b', ['-a']), '-n');
    assert.strictEqual(getOption('hello', ['a', 'b']), '-n');
  });
});
