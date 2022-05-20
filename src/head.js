const head = (content) => {
  const lines = content.split('\n');
  return lines[0];
};

exports.head = head;
