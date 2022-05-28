const appendHeader = ({ result, fileName }) => {
  return `==> ${fileName} <==\n${result}\n`;
};

const decideFormatter = (results) =>
  results.length < 2 ? fetchResult : appendHeader;

const fetchResult = ({ result }) => result;

const formatResult = (results) => {
  const formatter = decideFormatter(results);

  return results.map(({ fileName, result, error }) => {
    if (error === undefined) {
      return { result: formatter({ result, fileName }) };
    }
    return { error };
  });

};

const displayResult = ({ log, error: logError }, results) => {
  results.forEach(({ error, result }) => {
    if (error === undefined) {
      log(result);
      return;
    }
    logError(error.message);
  });
};

exports.formatResult = formatResult;
exports.displayResult = displayResult;
