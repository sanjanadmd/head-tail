const firstNLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = content.split('\n');
  const firstLine = firstNLines(lines, 1);
  return firstLine.join('\n');
};

exports.head = head;
exports.firstNLines = firstNLines;
