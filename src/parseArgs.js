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
  if (doesExist(newOption, defaultOptions) === false) {
    return { message: `illegal option ${newOption}` };
  } else if (option !== newOption) {
    return { message: 'can not combine line and byte counts' };
  }
  return '';
};

const parseArgs = (args) => {
  const existingOptions = ['-n', '-c', '--help'];
  const options = { lines: 10, option: '\n' };
  const fileNames = [];
  options.option = getOption(args[0], existingOptions);
  for (let index = 0; index < args.length; index += 2) {
    if (args[index].match(/^[^-]/)) {
      fileNames.push(...args.slice(index));
      return { fileNames, options };
    }
    const error = validateOption(existingOptions, options.option, args[index]);
    if (error !== '') {
      throw error;
    }
    options.lines = +args[index + 1];
  }

  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.getOption = getOption;
exports.validateOption = validateOption;
