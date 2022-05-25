const formatResult = (results) => {
  if (results.length < 2) {
    return results;
  }
  return results.map(({ fileName, result, type }) => {
    if (type === 'log') {
      return { result: `==> ${fileName} <==\n${result}\n`, type };
    }
    return { result, type };
  });

};
const displayResult = (display, results) => {
  results.forEach(fileResult => {
    display[fileResult.type](fileResult.result);
  });
};

exports.formatResult = formatResult;
exports.displayResult = displayResult;
