const { extractLines, joinLines } = require('./stringUtils.js');

const firstNLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = extractLines(content);
  const firstLine = firstNLines(lines, 1);
  return joinLines(firstLine);
};

exports.head = head;

exports.firstNLines = firstNLines;
