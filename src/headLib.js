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
  const { fileNames, options } = parseArgs(args);
  const result = [];
  for (let index = 0; index < fileNames.length; index++) {
    try {
      const content = readFile(fileNames[index], 'utf8');
      result.push(head(content, options));
    } catch (error) {
      throw { message: `${fileNames[index]} is not readable` };
    }
  }
  return result.join('\n');
};

exports.head = head;
exports.headMain = headMain;
exports.sliceUpto = sliceUpto;
