const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = (args) => {
  try {
    process.exitCode = headMain(args, fs.readFileSync, console);
  } catch (error) {
    console.error(`head: ${error.name}\n${error.message}`);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
