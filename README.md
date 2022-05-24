## **HEAD**

### Synopsis
`head [-n lines | -c bytes] [file ...]`

### Description
```
  head file -
    display first lines of a file.
    ( By default first ten lines )

  head -n count file -
    display first count lines of specified files

  head -c bytes file -
    display first bytes of specified files
  
  head --help
    display head usage
```

## **TAIL**

### Synopsis
`tail [-c # | -n #] [file ...]`

### Description
```
  tail file -
    display last part of a file.
    ( The default starting location is ``-n 10'', or the last 10 lines of the input.)

  tail -n number file -
    display last lines of specified files
    The Location is number lines

  tail -c bytes file -
    display last bytes of specified files
    The Location is number lines
  
  tail --help
    display tail usage 
``` 
### NOTES
`Numbers having a leading plus (`+') sign`
- Relative to the beginning of the input
`Numbers having a leading minus (`-')` sign or no explicit sign`
- Relative to the end of the input
