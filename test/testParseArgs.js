const assert = require('assert');
const { parseArgs } = require('../src/parseArgs');

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
        fileNames: [],
        options: { lines: NaN, delimiter: undefined }
      });
  });

});
