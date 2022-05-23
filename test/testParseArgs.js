const assert = require('assert');
const {
  parseArgs, formatArgs, splitArgs, validateOption, validateLines
} = require('../src/parseArgs');

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
      {
        name: 'illegal option -- h',
        message: 'usage: head [-n lines | -c bytes] [file ...]'
      });
  });

  it('should not change option once it is fixed in the start', () => {
    assert.throws(() => parseArgs(['-n', '4', '-c', '1', 'a.txt']),
      { name: 'can not combine line and byte counts' });
  });

  it('should treat option with number as valid when it is first argument',
    () => {
      assert.deepStrictEqual(parseArgs(['-1', 'a.txt']),
        {
          fileNames: ['a.txt'],
          options: { lines: 1, option: '-n' }
        });
    });
});

describe('validateOptions', () => {
  it('should return an error when option not found', () => {
    assert.throws(() => validateOption([], '-n', '-a'),
      {
        name: 'illegal option -- a',
        message: 'usage: head [-n lines | -c bytes] [file ...]'
      });
  });

  it('should return an error when option won\'t match with given value', () => {
    assert.throws(() => validateOption(['-n', '-c'], '-n', '-c'),
      { name: 'can not combine line and byte counts' });

  });
  it(
    'should give empty string when newOption is found and same as given option',
    () => {
      assert.strictEqual(validateOption(['-n'], '-n', '-n'), undefined);
    });
});

describe('formatArgs', () => {
  it('should seperated option and value', () => {
    assert.deepStrictEqual(formatArgs(['-n1']), ['-n', '1']);
    assert.deepStrictEqual(formatArgs(['-n', '1']), ['-n', '1']);
  });

  it('should set option as -n when first arg is numbered option',
    () => {
      assert.deepStrictEqual(formatArgs(['-1']), ['-n', '1']);
      assert.deepStrictEqual(formatArgs(['-1', '-2']), ['-n', '1', '-2']);
    });
});

describe('splitArgs', () => {
  it('should seperate argument when it starts with hyphen', () => {
    assert.deepStrictEqual(splitArgs('-n'), ['-n', '']);
    assert.deepStrictEqual(splitArgs('-n3'), ['-n', '3']);
    assert.deepStrictEqual(splitArgs('hello'), ['hello']);
  });
});

describe('validateLines', () => {
  it('should throw error when argument is not a number',
    () => {
      assert.throws(() => validateLines('a', { option: '-n' }),
        {
          name: 'option requires an argument -- n',
          message: 'usage: head [-n lines | -c bytes] [file ...]'
        });
    });

  it('should throw error when argument is less than zero',
    () => {
      assert.throws(() => validateLines('-4', { option: '-n' }),
        {
          name: 'illegal line count -- -4'
        });
    });
});
