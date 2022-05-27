const { extractLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { headValidator } = require('./headValidations.js');
const { displayResult, formatResult } = require('./displayFormat.js');

const sliceUpto = (lines, count) => lines.slice(0, count);

const getDelimiter = (option) => {
  const options = { '-n': '\n', '-c': '' };
  return options[option];
};

const getOption = ({ lines, option }) => {
  const delimiter = getDelimiter(option);
  return { lines, delimiter };
};

const head = (content, { lines, delimiter }) => {
  const allLines = extractLines(content, delimiter);
  const filteredLines = sliceUpto(allLines, lines);
  return joinLines(filteredLines, delimiter);
};

const createContentObj = (fileName, result) => {
  return { fileName, result, type: 'log' };
};

const createErrorObj = (fileName) => {
  const result = `head: ${fileName}: No such file or directory`;
  return { result, type: 'error' };
};

const fileReader = (fileName, readFile) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    return createErrorObj(fileName);
  }
};

const headOfFile = (fileName, readFile, options) => {
  const content = fileReader(fileName, readFile);

  if (content.type === 'error') {
    return content;
  }
  const headOptions = getOption(options);
  const result = head(content, headOptions);
  return createContentObj(fileName, result);
};

const getExitCode = results =>
  results.some(({ type }) => type === 'error') ? 1 : 0;

const headMain = (args, readFile, display) => {
  const { fileNames, options } = parseArgs(args, headValidator);

  const results = fileNames.map(
    (fileName) => headOfFile(fileName, readFile, options)
  );

  displayResult(display, formatResult(results));
  return getExitCode(results);
};

exports.head = head;
exports.headMain = headMain;
exports.headOfFile = headOfFile;
exports.fileReader = fileReader;
exports.createErrorObj = createErrorObj;
exports.createContentObj = createContentObj;
exports.sliceUpto = sliceUpto;
