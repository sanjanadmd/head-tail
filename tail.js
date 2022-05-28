const fs = require('fs');

const { tailMain } = require('./src/tailLib.js');

const main = (args) => {
  try {
    process.exitCode = tailMain(fs.readFileSync, args, console);
  } catch (error) {
    console.error(`tail: ${error.name}`);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));

