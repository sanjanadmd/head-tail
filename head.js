const { headMain } = require('./src/headLib.js');
const fs = require('fs');

try {
  console.log(headMain(fs.readFileSync, process.argv.slice(2)));
} catch (error) {
  console.error(`head: ${error.name}\n${error.message}`);
}
