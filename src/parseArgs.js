const doesExist = (item, list) => {
  const existance = list.find((element) => element === item);
  return existance !== undefined;
};

const getOption = (option, existingOptions) => {
  if (doesExist(option, existingOptions)) {
    return option;
  }
  return '-n';
};

const validateOption = (defaultOptions, option, newOption) => {
  const error = {};
  if (doesExist(newOption, defaultOptions) === false) {
    error.name = `illegal option ${newOption}`;
    error.message = 'usage: head [-n lines | -c bytes] [file ...]';
  } else if (option !== newOption) {
    error.name = 'SyntaxError';
    error.message = 'can not combine line and byte counts';
  }
  return error;
};

const parseArgs = (args) => {
  const existingOptions = ['-n', '-c'];
  const options = { lines: 10, option: '\n' };
  const fileNames = [];
  options.option = getOption(args[0], existingOptions);
  for (let index = 0; index < args.length; index += 2) {
    if (args[index].match(/^[^-]/)) {
      fileNames.push(...args.slice(index));
      return { fileNames, options };
    }
    const error = validateOption(existingOptions, options.option, args[index]);
    if (Object.keys(error).length > 0) {
      throw error;
    }
    options.lines = +args[index + 1];
  }

  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.getOption = getOption;
exports.validateOption = validateOption;
