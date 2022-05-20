const assert = require('assert');
const { extractLines, joinLines } = require('../src/stringUtils.js');

describe('extractLines', () => {
  it('should extract single line into array', () => {
    assert.deepStrictEqual(extractLines('a'), ['a']);
    assert.deepStrictEqual(extractLines('first line'), ['first line']);
  });

  it('should extract lines seperated by \\n', () => {
    assert.deepStrictEqual(extractLines('first\nlast'), ['first', 'last']);
  });

});
describe('joinLines', () => {
  it('should join lines into single line', () => {
    assert.strictEqual(joinLines(['a']), 'a');
    assert.strictEqual(joinLines(['first line']), 'first line');
    assert.strictEqual(joinLines(['first', 'last']), 'first\nlast');
  });

});
