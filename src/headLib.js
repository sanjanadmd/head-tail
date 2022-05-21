const { extractLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const sliceUpto = (lines, count) => lines.slice(0, count);

const getDelimiter = (option) => {
  const options = { '-n': '\n', '-c': '' };
  return options[option];
};

const head = (content, { lines, option }) => {
  const delimiter = getDelimiter(option);
  const allLines = extractLines(content, delimiter);
  const filteredLines = sliceUpto(allLines, lines);
  return joinLines(filteredLines, delimiter);
};

const headMain = (readFile, args) => {
  let fileNames, options;
  try {
    ({ fileNames, options } = parseArgs(args));
  } catch (error) {
    return `head: ${error.name}\n${error.message}`;
  }
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
