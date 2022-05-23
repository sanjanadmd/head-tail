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

const formatResult = (results) => {
  if (results.length < 2) {
    return results[0].result || '';
  }
  const formatted = results.map(({ fileName, result }) => {
    if (fileName !== undefined) {
      return `==> ${fileName} <==\n${result}\n`;
    }
    return result;
  });
  return formatted.join('\n');
};

const headMain = (readFile, args) => {
  const { fileNames, options } = parseArgs(args);
  if (!isFinite(options.lines)) {
    throw { message: `option requires an argument ${options.option}` };
  }
  if (options.option === '--help') {
    return 'usage: head [-n lines | -c bytes] [file ...]';
  }
  const results = fileNames.map((fileName) => {
    try {
      const content = readFile(fileName, 'utf8');
      return { fileName, result: head(content, options) };
    } catch (error) {
      return { result: `${fileName} is not readable` };
    }
  });
  return formatResult(results);
};

exports.head = head;
exports.headMain = headMain;
exports.sliceUpto = sliceUpto;
