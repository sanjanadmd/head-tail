const extractLines = (content, delimiter) => content.split(delimiter);
const joinLines = (lines, delimiter) => lines.join(delimiter);

exports.extractLines = extractLines;
exports.joinLines = joinLines;
