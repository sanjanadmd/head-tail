const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    process.exit(headMain(fs.readFileSync, process.argv.slice(2), console));
  } catch (error) {
    console.error(`head: ${error.name}\n${error.message}`);
    process.exit(1);
  }

};

main();
