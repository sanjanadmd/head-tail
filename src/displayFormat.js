const appendHeader = ({ result, fileName }) => {
  return `==> ${fileName} <==\n${result}\n`;
};

const decideFormatter = (results) =>
  results.length < 2 ? fetchResult : appendHeader;

const fetchResult = ({ result }) => result;

const formatResult = (results) => {
  const formatter = decideFormatter(results);

  return results.map(({ fileName, result, type }) => {
    if (type === 'log') {
      return { result: formatter({ result, fileName }), type };
    }
    return { result, type };
  });

};
const displayResult = (display, results) => {
  results.forEach(({ type, result }) => {
    display[type](result);
  });
};

exports.formatResult = formatResult;
exports.displayResult = displayResult;
