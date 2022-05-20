const parseArgs = (args) => {
  const defaultOptions = { '-n': '\n', '-c': '' };
  const newOptions = { lines: 10, delimiter: '\n' };
  const fileNames = [];
  for (let index = 0; index < args.length; index++) {
    if (args[index].match(/^-/)) {
      newOptions.delimiter = defaultOptions[args[index]];
      newOptions.lines = +args[index + 1];
      index++;
    } else if (args[index].match(/^[^-\d]/)) {
      fileNames.push(args[index]);
    }
  }

  return { fileNames, options: newOptions };
};

exports.parseArgs = parseArgs;
