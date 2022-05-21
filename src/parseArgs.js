const setDelimiter = (key, defaultOptions) => {
  if (defaultOptions[key] !== undefined) {
    return defaultOptions[key];
  }
  return '\n';
};

const validateOption = (defaultOptions, delimiter, option) => {
  const error = {};
  if (defaultOptions[option] === undefined) {
    error.name = 'illegal Option';
    error.message = 'option not found';
  }
  if (delimiter !== defaultOptions[option]) {
    error.name = 'SyntaxError';
    error.message = 'can not combine line and byte counts';
  }
  return error;
};

const parseArgs = (args) => {
  const defaultOptions = { '-n': '\n', '-c': '' };
  const options = { lines: 10, delimiter: '\n' };
  const fileNames = [];
  options.delimiter = setDelimiter(args[0], defaultOptions);
  for (let index = 0; index < args.length; index += 2) {
    if (args[index].match(/^[^-]/)) {
      fileNames.push(...args.slice(index));
      return { fileNames, options };
    }
    const error = validateOption(
      defaultOptions, options.delimiter, args[index]
    );
    if (Object.keys(error).length > 0) {
      return { error };
    }
    options.lines = +args[index + 1];
  }

  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.setDelimiter = setDelimiter;
exports.validateOption = validateOption;
