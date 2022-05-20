const assert = require('assert');
const { parseArgs } = require('../parseArgs');

describe('parseArgs', () => {
  it('should provide fileName and default options', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        fileName: ['a.txt'], options: { lines: 10, delimiter: '\n' }
      });
  });
  it('should provide fileName and given options', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', 'a.txt']),
      {
        fileName: ['a.txt'], options: { lines: 1, delimiter: '\n' }
      });
  });
  it('should provide all fileNames and default options', () => {
    assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']),
      {
        fileName: ['a.txt', 'b.txt'],
        options: { lines: 10, delimiter: '\n' }
      });
  });
});
