const parseArgs = (args) => {
  const defaultOptions = { '-n': '\n', '-c': '' };
  const options = { lines: 10, delimiter: '\n' };
  const fileNames = [];
  for (let index = 0; index < args.length; index++) {
    if (args[index].match(/^-/)) {
      options.delimiter = defaultOptions[args[index]];
      options.lines = +args[index + 1];
      index++;
    } else if (args[index].match(/^[^-\d]/)) {
      fileNames.push(...args.slice(index));
      return { fileNames, options };
    }
  }

  return { fileNames, options };
};

exports.parseArgs = parseArgs;
