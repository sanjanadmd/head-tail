const { headMain } = require('./src/headLib.js');
const fs = require('fs');

try {
  headMain(fs.readFileSync, process.argv.slice(2), console);
} catch (error) {
  console.error(`head: ${error.name}\n${error.message}`);
}
