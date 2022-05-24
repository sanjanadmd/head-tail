const splitArgs = (argument) => {
  return argument.startsWith('-') ?
    [argument.slice(0, 2), argument.slice(2)] : [argument];
};

const formatArgs = (args) => {
  const newArgs = args.slice(0);
  if (args[0].startsWith('-') && isFinite(args[0])) {
    newArgs[0] = '-n' + Math.abs(args[0]);
  }
  return newArgs.flatMap(splitArgs).filter(argument => argument.length > 0);
};

const validateOption = (defaultOptions, option, argument) => {
  if (!defaultOptions.includes(argument)) {
    throw {
      name: `illegal option -- ${argument.slice(1)}`,
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  } else if (option !== argument) {
    throw { name: 'can not combine line and byte counts' };
  }
};

const validateLines = (argument, options) => {
  if (!isFinite(+argument)) {
    throw {
      name: `option requires an argument -- ${options.option.slice(1)}`,
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  } else if (+argument <= 0) {
    const keys = { '-n': 'lines', '-c': 'bytes' };
    throw { name: `illegal ${keys[options.option]} count -- ${argument}` };
  }
};

const validateFiles = (files) => {
  if (files.length < 1) {
    throw {
      name: 'File not provided',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const parseArgs = (args) => {
  const newArgs = formatArgs(args);
  const fileNames = [];
  const options = { option: '-n', lines: 10 };
  if (newArgs[0].startsWith('-')) {
    options.option = newArgs[0];
  }
  for (let index = 0; index < newArgs.length; index += 2) {
    if (!newArgs[index].startsWith('-')) {
      fileNames.push(...newArgs.slice(index));
      return { fileNames, options };
    }
    validateOption(['-n', '-c'], options.option, newArgs[index]);
    validateLines(newArgs[index + 1], options);
    options.lines = +newArgs[index + 1];
  }
  validateFiles(fileNames);
};

exports.parseArgs = parseArgs;
exports.validateOption = validateOption;
exports.validateLines = validateLines;
exports.formatArgs = formatArgs;
exports.splitArgs = splitArgs;
