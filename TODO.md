**TODO**
- **HEAD**
  - [ ] Select delimiter from headMain instead of head
  - [ ] Modify mockDisplay function testing
  - [ ] Extract fileReader and headMultipleFiles
  - [ ] Seperate formatResult and displayResult

- **PARSING**
  - [ ] Refactor parseArgs
  - [ ] Make parseArgs work for multiple numbered options

- **TAIL**
  - [ ] Seperate formatResult and displayResult
  - [ ] Implement multiple options
  - [ ] Fix the validation errors
  - [ ] Fix the exitCode with the numberOf errors insteadOf setting it to one

**MAYBE**
- [ ] Remove testStringUtils.js

**DONE**

- [x] Modify parseArgs to take validation functions
- [x] Link tailMain to tail.js to make it work from command line
- [x] Implement parseArgs
- [x] Modify setOption function name
- [x] Take the decision about the line count setOption
- [x] Take the decision about the line count from tailMain instead of tail
- [x] Update usage in tail.js
- [x] Update `README.md` with new options provided
- [x] Seperate tailMain tests
- [x] Investigate about new options (q,r)
  - [x] Options with and without values
  - [x] Multiple files
  - [x] Multiple options
- [x] Implement tailMain for multipleFiles
- [x] Implement happy path for tail
- [x] Implement -n option for tail
- [x] Fix tail contract to take the content, options and delimiter
- [x] Implement tailMain for one file
- [x] Implement tail to treat numbers with and without sign accordingly
- [x] Investigate breifly about tail
  - [x] How it works
  - [x] Options and with their values
  - [x] Using multiple options
  - [x] Valid and invalid structure or options
- [x] Write a test for `tail`
- [x] Make a `tailLib.js`, `testTailLib.js`
- [x] Add details about `tail` in README.md
- [x] Use the type in result to display data in console or error stream
- [x] Dealing arguments when option and number are combined 
- [x] Adding header when we have multiple files
- [x] Handle multiple options at the same time
- [x] Add header as a fileName while heading multiple files
- [x] Modify headMain to make it work for multiple files
- [x] Catch errors while parsing
- [x] Implement default options to head function
- [x] Investigate about how head behaves when it find fileNames starting with hypen
- [x] Seperate delimiter from parsing
- [x] Implement -n option from command line
- [x] Implement -c option from command line
- [x] Dealing `head` with files
- [x] Linking parseArgs to head.js
- [x] Rename firstNLines function to sliceUpto
- [x] Refactor parseArgs complex logic
- [x] Add a function to Parse commandLine inputs and return options and files
- [x] Report error when file is not readable
- [x] Add number of bytes option
- [x] Add number of lines option
- [x] Modify contract of head to take options
- [x] Modify contract of joinLines to take delimiter and lines
- [x] Modify contract of extractLines to take delimiter and content
- [x] Seperate headMain tests
- [x] Modify parameters of headMain to take objects
- [x] Add feature to pass a file and get back number of lines we require
- [x] Add headMain function to pass the file
- [x] Fix contract of `head` function to take lines with number of lines and get
 back lines we want
- [x] Seperate extractLines and joinLines to stringUtils.js
- [x] Seperate `split` and `join` from head
- [x] Rename head.js in src to headLib.js
- [x] Modify `firstLine` contract to take count with lines and give back count lines
- [x] Modify `firstLine` function to `firstNlines` 
- [x] Add a function which takes lines and gives back first line
- [x] Make 'head' to display single line
- [x] Write a test
- [x] Make `head.js` and `testHead.js` 
- [x] Create directory structure ( src, test )
- [x] Add eslint and verify mocha exists