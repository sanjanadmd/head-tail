const validateOption = (defaultOptions, option, argument) => {
  if (!defaultOptions.includes(argument)) {
    throw {
      name: `illegal option -- ${argument.slice(1)}\n` +
        'usage: tail [-r] [-q] [-c # | -n #] [file ...]'
    };
  } else if (option !== argument) {
    throw { name: 'usage: tail [-r] [-q] [-c # | -n #] [file ...]' };
  }
};

const validateLines = (argument, options) => {
  if (argument === undefined) {
    throw {
      name: `option requires an argument -- ${options.option.slice(1)}\n`
        + 'usage: tail [-r] [-q] [-c # | -n #] [file ...]'
    };
  } else if (!isFinite(+argument)) {
    throw { name: `illegal offset -- ${argument}` };
  }
};

const validateFiles = (files) => {
  if (files.length < 1) {
    throw {
      name: 'File not provided\nusage: tail [-r] [-q] [-c # | -n #] [file ...]'
    };
  }
};

const tailValidator = {
  option: validateOption,
  line: validateLines,
  file: validateFiles
};

exports.tailValidator = tailValidator;
exports.validateFiles = validateFiles;
exports.validateLines = validateLines;
exports.validateOption = validateOption;
