const assert = require('assert');
const { tail, formatResult, displayResult } = require('../src/tailLib.js');

describe('formatResult', () => {
  it('should return unformatted result when there is only one file', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'n', type: 'log' }
    ]), [{ result: 'n', type: 'log' }]);
  });
  it('should return unformatted result when there is only one file', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'a', type: 'log' },
      { fileName: 'b.txt', result: 'b', type: 'error' }
    ]), [
      { result: '==> a.txt <==\na\n', type: 'log' },
      { result: 'b', type: 'error' }
    ]);
  });
});

const mockDisplay = (expected) => {
  let index = 0;
  return (result) => {
    assert.strictEqual(expected[index], result);
    index++;
  };
};

describe('displayResult', () => {
  it('should display all data with logs', () => {
    let display = { log: mockDisplay(['n']) };
    assert.strictEqual(displayResult(display,
      [{ result: 'n', type: 'log' }]), undefined);

    display = { log: mockDisplay(['n', 'b']) };
    assert.strictEqual(displayResult(display, [
      { result: 'n', type: 'log' },
      { result: 'b', type: 'log' }
    ]), undefined);

    display = {
      log: mockDisplay(['n', 'b']), error: mockDisplay(['n'])
    };
    assert.strictEqual(displayResult(display,
      [{ result: 'n', type: 'error' }]), undefined);
  });

  it('should display all data with errors', () => {
    let display = { error: mockDisplay(['n']) };
    assert.strictEqual(displayResult(display,
      [{ result: 'n', type: 'error' }]), undefined);

    display = { error: mockDisplay(['n', 'b']) };
    assert.strictEqual(displayResult(display, [
      { result: 'n', type: 'error' },
      { result: 'b', type: 'error' }
    ]), undefined);
  });
  it('should display logs and errors also', () => {
    const display = {
      log: mockDisplay(['a', 'c', 'e']),
      error: mockDisplay(['b', 'd'])
    };

    assert.strictEqual(displayResult(display, [
      { result: 'a', type: 'log' },
      { result: 'b', type: 'error' },
      { result: 'c', type: 'log' },
      { result: 'd', type: 'error' },
      { result: 'e', type: 'log' }
    ]), undefined);
  });
});

describe('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', { lines: 1, delimiter: '\n' }), 'b');
    assert.strictEqual(tail('a\nb\nc', { lines: 1, delimiter: '\n' }), 'c');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 3, delimiter: '\n' }), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(tail('a\nb',
      { lines: 1, sign: '+', delimiter: '\n' }), 'a\nb');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 1, sign: '+', delimiter: '\n' }), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 3, sign: '+', delimiter: '\n' }), 'c');
  });
  it('should return last bytes from the content', () => {
    assert.strictEqual(tail('a\nb', { lines: 1, delimiter: '' }), 'b');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 1, delimiter: '' }), 'c');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 3, delimiter: '' }), 'b\nc');
  });
  it('should return bytes from given number of the content', () => {
    assert.strictEqual(tail('a\nb',
      { lines: 1, sign: '+', delimiter: '' }), 'a\nb');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 1, sign: '+', delimiter: '' }), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc',
      { lines: 3, sign: '+', delimiter: '' }), 'b\nc');
  });
});
