const { extractLines, joinLines } = require('./stringUtils.js');

const firstNLines = (lines, count) => lines.slice(0, count);

const head = (content, numberOfLines) => {
  const allLines = extractLines(content, '\n');
  const lines = firstNLines(allLines, numberOfLines);
  return joinLines(lines, '\n');
};

const headMain = (readFile, fileName, { lines }) => {
  const content = readFile(fileName, 'utf8');
  return head(content, lines);
};

exports.head = head;
exports.headMain = headMain;
exports.firstNLines = firstNLines;
