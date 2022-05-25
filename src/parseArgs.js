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

const parseArgs = (args, validator) => {
  const newArgs = formatArgs(args);
  const fileNames = [];
  const options = { option: '-n', lines: '10' };
  if (newArgs[0].startsWith('-')) {
    options.option = newArgs[0];
  }
  for (let index = 0; index < newArgs.length; index += 2) {
    if (!newArgs[index].startsWith('-')) {
      fileNames.push(...newArgs.slice(index));
      return { fileNames, options };
    }
    validator.option(['-n', '-c'], options.option, newArgs[index]);
    validator.line(newArgs[index + 1], options);
    options.lines = newArgs[index + 1];
  }
  validator.file(fileNames);
};

exports.parseArgs = parseArgs;
exports.formatArgs = formatArgs;
exports.splitArgs = splitArgs;
