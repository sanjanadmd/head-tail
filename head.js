const { headMain } = require('./src/headLib.js');
const fs = require('fs');
const { exit } = require('process');

const main = () => {
  try {
    exit(headMain(fs.readFileSync, process.argv.slice(2), console));
  } catch (error) {
    console.error(`head: ${error.name}\n${error.message}`);
    exit(1);
  }

};

main();
