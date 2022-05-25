const assert = require('assert');
const { head, sliceUpto, formatResult, displayResult } = require('../src/headLib.js');

describe('head', () => {
  it('should display first line ', () => {
    const options = { lines: 1, option: '-n' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
  });

  it('should display first 2 lines', () => {
    const options = { lines: 2, option: '-n' };
    assert.strictEqual(head('hello\nbye', options), 'hello\nbye');
    assert.strictEqual(head('a\nb\nc', options), 'a\nb');
  });

  it('should display first character ', () => {
    const options = { lines: 1, option: '-c' };
    assert.strictEqual(head('', options), '');
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'h');
  });

  it('should display first 5 characters ', () => {
    const options = { lines: 5, option: '-c' };
    assert.strictEqual(head('a', options), 'a');
    assert.strictEqual(head('hello\nbye', options), 'hello');
  });
});

describe('sliceUpto', () => {
  it('should return first line', () => {
    assert.deepStrictEqual(sliceUpto(['hello'], 1), ['hello']);
    assert.deepStrictEqual(sliceUpto(['hello', 'bye'], 1), ['hello']);
  });

  it('should return first 2 lines', () => {
    assert.deepStrictEqual(sliceUpto(['hello'], 2), ['hello']);
    assert.deepStrictEqual(sliceUpto(['hello', 'bye'], 2), ['hello', 'bye']);
    assert.deepStrictEqual(sliceUpto(['a', 'b', 'c'], 2), ['a', 'b']);
  });

  it('should return empty line', () => {
    assert.deepStrictEqual(sliceUpto([''], 1), ['']);
  });

  it('should return empty array', () => {
    assert.deepStrictEqual(sliceUpto([], 1), []);
  });
});

describe('formatResult', () => {
  it('should return unformatted result when there is only one file', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'n', type: 'log' }
    ]), [{ fileName: 'a.txt', result: 'n', type: 'log' }]);
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
