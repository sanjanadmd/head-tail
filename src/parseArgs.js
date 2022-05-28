const isFlag = (arg) => arg.startsWith('-');

const splitArgs = (arg) => {
  return isFlag(arg) ? [arg.slice(0, 2), arg.slice(2)] : [arg];
};

const standardizeArgs = (args) => {
  const newArgs = args.slice(0);
  if (isFlag(args[0]) && isFinite(args[0])) {
    newArgs[0] = '-n' + Math.abs(args[0]);
  }
  return newArgs.flatMap(splitArgs).filter(arg => arg.length > 0);
};

const setDefaultOption = (arg) => {
  const options = { flag: '-n', count: '10' };
  if (isFlag(arg)) {
    options.flag = arg;
  }
  return options;
};

const parseArgs = (cmdArgs, validator) => {
  const args = standardizeArgs(cmdArgs);
  const options = setDefaultOption(args[0]);

  let index = 0;
  while (isFlag(args[index])) {
    validator.option(['-n', '-c'], options.flag, args[index]);
    validator.line(args[index + 1], options);
    options.count = args[index + 1];
    index += 2;
  }

  const fileNames = args.slice(index);
  validator.file(fileNames);
  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.standardizeArgs = standardizeArgs;
exports.splitArgs = splitArgs;
exports.setDefaultOption = setDefaultOption;
