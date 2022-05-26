const assert = require('assert');
const {
  validateOption, validateLines, validateFiles
} = require('../src/tailValidations.js');
describe('Tail validations', () => {

  describe('validateOptions', () => {
    it('should throw an error when option not found', () => {
      assert.throws(() => validateOption([], '-n', '-a'), {
        name:
          'illegal option -- a\nusage: tail [-r] [-q] [-c # | -n #] [file ...]'
      });
    });

    it('should throw an error when multiple options provided', () => {
      assert.throws(() => validateOption(['-n', '-c'], '-n', '-c'), {
        name: 'usage: tail [-r] [-q] [-c # | -n #] [file ...]'
      });

    });
  });

  describe('validateLines', () => {
    it('should throw error when argument is not a number', () => {
      assert.throws(() => validateLines(undefined, { option: '-n' }), {
        name: 'option requires an argument -- n\n' +
          'usage: tail [-r] [-q] [-c # | -n #] [file ...]'
      });
      assert.throws(() => validateLines('1a', { option: '-n' }), {
        name: 'illegal offset -- 1a',
      });
    });

  });

  describe('validateFiles', () => {
    it('should throw error when argument is not a number', () => {
      assert.strictEqual(validateFiles(['a.txt']), undefined);
      assert.throws(() => validateFiles([]), {
        name:
          'File not provided\nusage: tail [-r] [-q] [-c # | -n #] [file ...]'
      });
    });
  });
});
