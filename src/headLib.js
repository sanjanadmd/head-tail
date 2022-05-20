const firstNLines = (lines, count) => lines.slice(0, count);

const extractLines = (content) => content.split('\n');
const joinLines = (lines) => lines.join('\n');

const head = (content) => {
  const lines = extractLines(content);
  const firstLine = firstNLines(lines, 1);
  return joinLines(firstLine);
};

exports.head = head;
exports.extractLines = extractLines;
exports.joinLines = joinLines;
exports.firstNLines = firstNLines;
