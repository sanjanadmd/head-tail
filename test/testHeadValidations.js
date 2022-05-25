const assert = require('assert');
const { validateOption, validateLines } = require('../src/headValidations.js');

describe('validateOptions', () => {
  it('should return an error when option not found', () => {
    assert.throws(() => validateOption([], '-n', '-a'), {
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

describe('validateLines', () => {
  it('should throw error when argument is not a number', () => {
    assert.throws(() => validateLines('a', { option: '-n' }), {
      name: 'option requires an argument -- n',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('should throw error when argument is less than zero', () => {
    assert.throws(() => validateLines('-4', { option: '-n' }), {
      name: 'illegal lines count -- -4'
    });
  });
});
