const { extractLines, joinLines } = require('./stringUtils.js');

const firstNLines = (lines, count) => lines.slice(0, count);

const head = (content, numberOfLines) => {
  const allLines = extractLines(content);
  const lines = firstNLines(allLines, numberOfLines);
  return joinLines(lines);
};

exports.head = head;

exports.firstNLines = firstNLines;
