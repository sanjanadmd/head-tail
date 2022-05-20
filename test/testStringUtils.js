const assert = require('assert');
const { extractLines, joinLines } = require('../src/stringUtils.js');

describe('extractLines', () => {
  it('should extract single line into array', () => {
    assert.deepStrictEqual(extractLines('a', '\n'), ['a']);
    assert.deepStrictEqual(extractLines('first line', '\n'), ['first line']);
  });

  it('should extract lines seperated by \\n', () => {
    assert.deepStrictEqual(extractLines('first\nlast', '\n'),
      ['first', 'last']
    );
  });

  it('should extract every character as a lines ', () => {
    assert.deepStrictEqual(extractLines('first', ''),
      ['f', 'i', 'r', 's', 't']
    );
  });

});
describe('joinLines', () => {
  it('should join lines with \\n', () => {
    assert.strictEqual(joinLines(['a'], '\n'), 'a');
    assert.strictEqual(joinLines(['first line'], '\n'), 'first line');
    assert.strictEqual(joinLines(['first', 'last'], '\n'), 'first\nlast');
  });
  it('should join lines into single line', () => {
    assert.strictEqual(joinLines(['a'], ''), 'a');
    assert.strictEqual(joinLines(['first', 'last'], ''), 'firstlast');
  });

});
