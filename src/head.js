const firstLine = (lines) => lines.slice(0, 1);

const head = (content) => {
  const lines = content.split('\n');
  const line = firstLine(lines);
  return line.join('\n');
};

exports.head = head;
exports.firstLine = firstLine;
