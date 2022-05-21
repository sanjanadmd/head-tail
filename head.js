// console.log('usage: head [-n lines | -c bytes] [file ...]');

const { headMain } = require('./src/headLib.js');
const fs = require('fs');

try {
  console.log(headMain(fs.readFileSync, process.argv.slice(2)));
} catch (error) {
  console.log('head:', error.message);
  console.log('usage: head [-n lines | -c bytes] [file ...]');
}
