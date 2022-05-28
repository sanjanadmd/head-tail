const assert = require('assert');
const { formatResult, displayResult } = require('../src/displayFormat.js');

describe('formatResult', () => {
  it('should return unformatted result when there is only one file', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'n', type: 'log' }
    ]), [{ result: 'n' }]);
  });
  it('should return formatted result when there are multiple files', () => {
    assert.deepStrictEqual(formatResult([
      { fileName: 'a.txt', result: 'a', type: 'log' },
      { error: { message: 'b.txt: No such file or directory' } }
    ]), [
      { result: '==> a.txt <==\na\n', },
      { error: { message: 'b.txt: No such file or directory' } }
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
      [{ result: 'n' }]), undefined);

    display = { log: mockDisplay(['n', 'b']) };
    assert.strictEqual(displayResult(display, [
      { result: 'n' },
      { result: 'b' }
    ]), undefined);

    display = {
      log: mockDisplay(['n', 'b']), error: mockDisplay(['n'])
    };
    assert.strictEqual(displayResult(display,
      [{ error: { message: 'n' } }]), undefined);
  });

  it('should display all data with errors', () => {
    let display = { error: mockDisplay(['n']) };
    assert.strictEqual(displayResult(display,
      [{ error: { message: 'n' } }]), undefined);

    display = { error: mockDisplay(['n', 'b']) };
    assert.strictEqual(displayResult(display, [
      { error: { message: 'n' } },
      { error: { message: 'b' } },
    ]), undefined);
  });
  it('should display logs and errors also', () => {
    const display = {
      log: mockDisplay(['a', 'c', 'e']),
      error: mockDisplay(['b', 'd'])
    };

    assert.strictEqual(displayResult(display, [
      { result: 'a' },
      { error: { message: 'b' } },
      { result: 'c' },
      { error: { message: 'd' } },
      { result: 'e' }
    ]), undefined);
  });
});
