const { extractLines, joinLines } = require('./stringUtils.js');

const sliceFrom = (list, count) => list.slice(count);

const tail = (content, { lines, sign, delimiter }) => {
  const count = sign === '+' ? Math.abs(lines - 1) : -Math.abs(lines);
  const allLines = extractLines(content, delimiter);
  const filteredLines = sliceFrom(allLines, count);
  return joinLines(filteredLines, delimiter);
};

const tailMain = (readFile, fileName, options) => {
  try {
    const content = readFile(fileName, 'utf8');
    return tail(content, options);
  } catch (error) {
    throw { message: `tail: ${fileName}: No such file or directory` };
  }
};

exports.tail = tail;
exports.tailMain = tailMain;
