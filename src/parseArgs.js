const parseArgs = (args) => {
  const defaultOptions = { '-n': '\n', '-c': '' };
  const options = { lines: 10, delimiter: '\n' };
  const fileNames = [];
  for (let index = 0; index < args.length; index += 2) {
    if (args[index].match(/^[^-]/)) {
      fileNames.push(...args.slice(index));
      return { fileNames, options };
    }
    options.delimiter = defaultOptions[args[index]];
    options.lines = +args[index + 1];
  }

  return { fileNames, options };
};

exports.parseArgs = parseArgs;
