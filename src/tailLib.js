const { extractLines, joinLines } = require('./stringUtils.js');
const sliceFrom = (list, count) => list.slice(count);

const tail = (content, count) => {
  const allLines = extractLines(content, '\n');
  const filteredLines = sliceFrom(allLines, -Math.abs(count));
  return joinLines(filteredLines, '\n');
};

exports.tail = tail;
