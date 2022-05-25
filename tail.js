// console.log('usage: tail  [-r] [-q] [-c # | -n #] [file ...]');
const { tailMain } = require('./src/tailLib.js');
const fs = require('fs');
const { exit } = require('process');

const main = () => {
  try {
    exit(tailMain(fs.readFileSync, process.argv.slice(2), console));
  } catch (error) {
    console.error(`tail: ${error.name}`);
    exit(1);
  }
};

main();

