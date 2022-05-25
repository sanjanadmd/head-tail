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
  if (argument === undefined) {
    throw {
      name: `option requires an argument -- ${options.option.slice(1)}`,
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  } else if (+argument <= 0 || !isFinite(argument)) {
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

const headValidator = {
  option: validateOption,
  line: validateLines,
  file: validateFiles
};

exports.headValidator = headValidator;
exports.validateFiles = validateFiles;
exports.validateLines = validateLines;
exports.validateOption = validateOption;
