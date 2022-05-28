const { extractLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { headValidator } = require('./headValidations.js');
const { displayResult, formatResult } = require('./displayFormat.js');

const sliceUpto = (lines, count) => lines.slice(0, count);

const firstNBytes = (content, noOfBytes) => {
  const allBytes = extractLines(content, '');
  const bytes = sliceUpto(allBytes, noOfBytes);
  return joinLines(bytes, '');
};

const firstNLines = (content, noOfLines) => {
  const allLines = extractLines(content, '\n');
  const lines = sliceUpto(allLines, noOfLines);
  return joinLines(lines, '\n');
};

const head = (content, { count, flag }) => {
  if (flag === '-n') {
    return firstNLines(content, count);
  } else if (flag === '-c') {
    return firstNBytes(content, count);
  }
};

const createContentObj = (fileName, result) => {
  return { fileName, result };
};

const createErrorObj = (fileName) => {
  const message = `head: ${fileName}: No such file or directory`;
  return { message };
};

const fileReader = (fileName, readFile) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    return { error: createErrorObj(fileName) };
  }
};

const headOfFile = (fileName, readFile, options) => {
  const content = fileReader(fileName, readFile);

  if (content.error !== undefined) {
    return content;
  }
  const result = head(content, options);
  return createContentObj(fileName, result);
};

const getExitCode = results =>
  +results.some(({ error }) => error !== undefined);

const headMain = (args, readFile, { log, error }) => {
  const { fileNames, options } = parseArgs(args, headValidator);

  const results = fileNames.map(
    (fileName) => headOfFile(fileName, readFile, options)
  );

  displayResult({ log, error }, formatResult(results));
  return getExitCode(results);
};

exports.head = head;
exports.headMain = headMain;
exports.headOfFile = headOfFile;
exports.fileReader = fileReader;
exports.createErrorObj = createErrorObj;
exports.createContentObj = createContentObj;
exports.firstNBytes = firstNBytes;
exports.firstNLines = firstNLines;
exports.sliceUpto = sliceUpto;
