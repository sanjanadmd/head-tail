const { extractLines, joinLines } = require('./stringUtils.js');

const sliceFrom = (list, count) => list.slice(count);

const tail = (content, lines, sign) => {
  const count = sign === '+' ? Math.abs(lines - 1) : -Math.abs(lines);
  const allLines = extractLines(content, '\n');
  const filteredLines = sliceFrom(allLines, count);
  return joinLines(filteredLines, '\n');
};

exports.tail = tail;
