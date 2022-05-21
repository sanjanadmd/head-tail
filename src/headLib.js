const { extractLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const sliceUpto = (lines, count) => lines.slice(0, count);

const head = (content, { lines, delimiter }) => {
  const allLines = extractLines(content, delimiter);
  const filteredLines = sliceUpto(allLines, lines);
  return joinLines(filteredLines, delimiter);
};

const headMain = (readFile, args) => {
  const { fileNames, options } = parseArgs(args);
  const fileName = fileNames[0];
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
exports.sliceUpto = sliceUpto;
