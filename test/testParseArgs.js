const assert = require('assert');
const { parseArgs, formatArgs, splitArgs } = require('../src/parseArgs');
const { headValidator } = require('../src/headValidations.js');
const { tailValidator } = require('../src/tailValidations.js');

describe('parseArgs', () => {
  it('should provide all fileNames and default options', () => {
    assert.deepStrictEqual(parseArgs(['a.txt'], headValidator),
      {
        fileNames: ['a.txt'], options: { lines: '10', option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt'], headValidator),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: '10', option: '-n' }
      });
  });
  it('should provide all fileNames and given options', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', 'a.txt'], headValidator),
      {
        fileNames: ['a.txt'], options: { lines: '1', option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(
      ['-n', '4', 'a.txt', 'b.txt'], headValidator), {
      fileNames: ['a.txt', 'b.txt'],
      options: { lines: '4', option: '-n' }
    });
    assert.deepStrictEqual(parseArgs(
      ['-c', '4', 'a.txt', 'b.txt'], headValidator), {
      fileNames: ['a.txt', 'b.txt'],
      options: { lines: '4', option: '-c' }
    });
    assert.deepStrictEqual(parseArgs(
      ['-c', '4', 'a.txt', 'b.txt', '-n', '4'], headValidator), {
      fileNames: ['a.txt', 'b.txt', '-n', '4'],
      options: { lines: '4', option: '-c' }
    });
  });
  it('should provide fileNames starting with numbers also', () => {
    assert.deepStrictEqual(parseArgs(['123.txt'], headValidator),
      {
        fileNames: ['123.txt'],
        options: { lines: '10', option: '-n' }
      });
  });
  it('should not provide fileNames starting with hyphen', () => {
    assert.throws(() => parseArgs(['-hello.txt'], headValidator), {
      name: 'illegal option -- h',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
    assert.throws(() => parseArgs(['-hello.txt'], tailValidator), {
      name:
        'illegal option -- h\nusage: tail [-r] [-q] [-c # | -n #] [file ...]'
    });
  });

  it('should not change option once it is fixed in the start', () => {
    assert.throws(() => parseArgs(
      ['-n', '4', '-c', '1', 'a.txt'], headValidator), {
      name: 'can not combine line and byte counts'
    });
    assert.throws(() => parseArgs(
      ['-n', '4', '-c', '1', 'a.txt'], tailValidator), {
      name: 'usage: tail [-r] [-q] [-c # | -n #] [file ...]'
    });
  });

  it('should treat option with number as valid when it is first argument',
    () => {
      assert.deepStrictEqual(parseArgs(['-1', 'a.txt'], headValidator), {
        fileNames: ['a.txt'],
        options: { lines: '1', option: '-n' }
      });

      assert.deepStrictEqual(parseArgs(['-1', 'a.txt'], tailValidator), {
        fileNames: ['a.txt'],
        options: { lines: '1', option: '-n' }
      });
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
