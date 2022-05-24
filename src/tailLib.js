const tail = (content, lines) => {
  const allLines = content.split('\n');

  const filteredLines = allLines.slice(-lines);
  return filteredLines.join('\n');
};

exports.tail = tail;
