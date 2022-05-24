const { extractLines, joinLines } = require('./stringUtils.js');

const sliceFrom = (list, count) => list.slice(count);

const tail = (content, { lines, sign, delimiter }) => {
  const count = sign === '+' ? Math.abs(lines - 1) : -Math.abs(lines);
  const allLines = extractLines(content, delimiter);
  const filteredLines = sliceFrom(allLines, count);
  return joinLines(filteredLines, delimiter);
};

const getDelimiter = (option) => {
  const options = { '-n': '\n', '-c': '' };
  return options[option];
};

const setOption = (args) => {
  const options = {};
  options.lines = args.lines;
  options.sign = args.sign;
  options.delimiter = getDelimiter(args.option);
  return options;
};

const tailMain = (readFile, fileName, args) => {
  const options = setOption(args);
  try {
    const content = readFile(fileName, 'utf8');
    return tail(content, options);
  } catch (error) {
    throw { message: `tail: ${fileName}: No such file or directory` };
  }
};

exports.tail = tail;
exports.tailMain = tailMain;
