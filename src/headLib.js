const { extractLines, joinLines } = require('./stringUtils.js');

const firstNLines = (lines, count) => lines.slice(0, count);

const head = (content, { lines, delimiter }) => {
  const allLines = extractLines(content, delimiter);
  const filteredLines = firstNLines(allLines, lines);
  return joinLines(filteredLines, delimiter);
};

const headMain = (readFile, { fileName, options }) => {
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `${fileName} is not readable`,
    };
  }
  return head(content, options);
};

exports.head = head;
exports.headMain = headMain;
exports.firstNLines = firstNLines;
