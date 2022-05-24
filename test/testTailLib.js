const assert = require('assert');
const { tail, tailMain, formatResult, displayResult } = require('../src/tailLib.js');

describe('tail', () => {
  it('should return last lines from the content', () => {
    assert.strictEqual(tail('a\nb', { lines: 1, delimiter: '\n' }), 'b');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 1, delimiter: '\n'
    }), 'c');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 3, delimiter: '\n'
    }), 'a\nb\nc');
  });
  it('should return lines from given number of the content', () => {
    assert.strictEqual(tail('a\nb', {
      lines: 1, sign: '+', delimiter: '\n'
    }), 'a\nb');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 1, sign: '+', delimiter: '\n'
    }), 'a\nb\nc');
    assert.strictEqual(tail('a\nb\nc', {
      lines: 3, sign: '+', delimiter: '\n'
    }), 'c');
  });
});

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

const shouldReturn = (expectedFiles, content) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expectedFiles[index]);
    assert.strictEqual(encoding, 'utf8');
    const lastIndex = index;
    index++;
    return content[lastIndex];
  };
};

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

describe('tailMain', () => {
  it('should return the last line of the file if file exists', () => {
    let mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    let display = {
      log: mockDisplay(['c']),
      error: mockDisplay([])
    };
    assert.strictEqual(tailMain(mockReadFile,
      { fileNames: ['a.txt'], options: { lines: 1, option: '-n' } }
      , display), 0);

    mockReadFile = shouldReturn(['a.txt'], ['a\nb\nc']);
    display = {
      log: mockDisplay([]),
      error: mockDisplay(['tail: b.txt: No such file or directory'])
    };
    assert.deepStrictEqual(tailMain(mockReadFile,
      { fileNames: ['b.txt'], options: { lines: 1, option: '-n' } },
      display), 1);
  });
});
