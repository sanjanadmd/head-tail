const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', 1), 'b');
    assert.strictEqual(tail('a\nb\nc', 1), 'c');
    assert.strictEqual(tail('a\nb\nc', 3), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(tail('a\nb', 1, '+'), 'a\nb');
    assert.strictEqual(tail('a\nb\nc', 1, '+'), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc', 3, '+'), 'c');
  });
});
