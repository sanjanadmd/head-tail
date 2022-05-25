const { extractLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { tailValidator } = require('./tailValidations.js');
const { displayResult, formatResult } = require('./displayFormat.js');

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

const tailMain = (readFile, args, display) => {
  const { fileNames, options } = parseArgs(args, tailValidator);
  const newOptions = getOption(options);
  let exitCode = 0;
  const results = fileNames.map((fileName) => {
    try {
      const content = readFile(fileName, 'utf8');
      return { fileName, result: tail(content, newOptions), type: 'log' };
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
exports.sliceFrom = sliceFrom;
