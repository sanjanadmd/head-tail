const { extractLines, joinLines } = require('./stringUtils.js');

const sliceFrom = (list, count) => list.slice(count);

const getDelimiter = (option) => {
  const options = { '-n': '\n', '-c': '' };
  return options[option];
};

const getOption = ({ lines, option }) => {
  const count = lines.startsWith('+') ?
    Math.abs(+lines - 1) : -Math.abs(+lines);
  return { count, delimiter: getDelimiter(option) };
};

const tail = (content, { count, delimiter }) => {
  const allLines = extractLines(content, delimiter);
  const filteredLines = sliceFrom(allLines, count);
  return joinLines(filteredLines, delimiter);
};

const formatResult = (results) => {
  if (results.length < 2) {
    return results;
  }
  return results.map(({ fileName, result, type }) => {
    if (type === 'log') {
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

const tailMain = (readFile, parsedArgs, display) => {
  const options = getOption(parsedArgs.options);
  const fileNames = parsedArgs.fileNames;
  let exitCode = 0;
  const results = fileNames.map((fileName) => {
    try {
      const content = readFile(fileName, 'utf8');
      return { fileName, result: tail(content, options), type: 'log' };
    } catch (error) {
      exitCode = 1;
      return {
        result: `tail: ${fileName}: No such file or directory`,
        type: 'error'
      };
    }
  });
  displayResult(display, formatResult(results));
  return exitCode;
};

exports.tail = tail;
exports.tailMain = tailMain;
exports.formatResult = formatResult;
exports.displayResult = displayResult;
