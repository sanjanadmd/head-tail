const { extractLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { tailValidator } = require('./tailValidations.js');
const { displayResult, formatResult } = require('./displayFormat.js');

const sliceFrom = (list, count) => list.slice(count);

const fetchCount = (count) => count.startsWith('+') ?
  Math.abs(+count - 1) : -Math.abs(+count);
const lastNBytes = (content, noOfBytes) => {
  const allBytes = extractLines(content, '');
  const bytes = sliceFrom(allBytes, noOfBytes);
  return joinLines(bytes, '');
};

const lastNLines = (content, noOfLines) => {
  const allLines = extractLines(content, '\n');
  const lines = sliceFrom(allLines, noOfLines);
  return joinLines(lines, '\n');
};

const tail = (content, { count, flag }) => {
  const value = fetchCount(count);
  if (flag === '-n') {
    return lastNLines(content, value);
  } else if (flag === '-c') {
    return lastNBytes(content, value);
  }
};

const createContentObj = (fileName, result) => {
  return { fileName, result };
};

const createErrorObj = (fileName) => {
  const message = `tail: ${fileName}: No such file or directory`;
  return { message };
};

const fileReader = (fileName, readFile) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    return { error: createErrorObj(fileName) };
  }
};

const tailOfFile = (fileName, readFile, options) => {
  const content = fileReader(fileName, readFile);

  if (content.error !== undefined) {
    return content;
  }
  const result = tail(content, options);
  return createContentObj(fileName, result);
};

const getExitCode = results =>
  +results.some(({ error }) => error !== undefined);

const tailMain = (readFile, args, { log, error }) => {
  const { fileNames, options } = parseArgs(args, tailValidator);

  const results = fileNames.map(
    (fileName) => tailOfFile(fileName, readFile, options)
  );

  displayResult({ log, error }, formatResult(results));
  return getExitCode(results);
};

exports.tail = tail;
exports.tailMain = tailMain;
exports.lastNLines = lastNLines;
exports.lastNBytes = lastNBytes;
exports.createContentObj = createContentObj;
exports.createErrorObj = createErrorObj;
exports.sliceFrom = sliceFrom;
