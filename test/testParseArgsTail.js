const assert = require('assert');
const { parseArgs } = require('../src/parseArgsTail.js');

describe('parseArgs', () => {
  it('should provide all fileNames and default options', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        fileNames: ['a.txt'], options: { lines: '10', option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: '10', option: '-n' }
      });
  });
  it('should provide all fileNames and given options', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', 'a.txt']),
      {
        fileNames: ['a.txt'], options: { lines: '1', option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['-n', '4', 'a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: '4', option: '-n' }
      });
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt']),
      {
        fileNames: ['a.txt', 'b.txt'],
        options: { lines: '4', option: '-c' }
      });
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt', '-n', '4']),
      {
        fileNames: ['a.txt', 'b.txt', '-n', '4'],
        options: { lines: '4', option: '-c' }
      });
  });
  it('should provide fileNames starting with numbers also', () => {
    assert.deepStrictEqual(parseArgs(['123.txt']),
      {
        fileNames: ['123.txt'],
        options: { lines: '10', option: '-n' }
      });
  });
  it('should not provide fileNames starting with hyphen', () => {
    assert.throws(() => parseArgs(['-hello.txt']),
      {
        name: 'illegal option -- h',
        message: 'usage: tail  [-r] [-q] [-c # | -n #] [file ...]'
      });
  });
  it('should not change option once it is fixed in the start', () => {
    assert.throws(() => parseArgs(['-n', '4', '-c', '1', 'a.txt']),
      { name: 'usage: tail  [-r] [-q] [-c # | -n #] [file ...]' });
  });

  it('should treat option with number as valid when it is first argument',
    () => {
      assert.deepStrictEqual(parseArgs(['-1', 'a.txt']),
        {
          fileNames: ['a.txt'],
          options: { lines: '1', option: '-n' }
        });
    });

});
