**TODO**

- [ ] Implement -n option
- [ ] Implement -c option
- [ ] Report error when file not found
- [ ] Modify contract of head to take options
- [ ] Implement default options to head function
- [ ] Remove testStringUtils.js

**MAYBE**

- [ ] Remove tests for firstNLines

**DONE**

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