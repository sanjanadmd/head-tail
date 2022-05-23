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
    return [{ result: results[0].result, type: results[0].type }];
  }
  return results.map(({ fileName, result, type }) => {
    if (fileName !== undefined) {
      return { result: `==> ${fileName} <==\n${result}\n`, type };
    }
    return { result, type };
  });

};

const displayResult = (display, results) => {
  results.forEach(fileResult => {
    display[fileResult.type](fileResult.result);
  });
};

const headMain = (readFile, args, display) => {
  const { fileNames, options } = parseArgs(args);
  const results = fileNames.map((fileName) => {
    try {
      const content = readFile(fileName, 'utf8');
      return { fileName, result: head(content, options), type: 'log' };
    } catch (error) {
      return { result: `${fileName} is not readable`, type: 'error' };
    }
  });
  displayResult(display, formatResult(results));
};

exports.head = head;
exports.headMain = headMain;
exports.formatResult = formatResult;
exports.sliceUpto = sliceUpto;
exports.displayResult = displayResult;
