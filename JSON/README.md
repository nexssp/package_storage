# Storage JSON Get/Set

Set, Get storage from json data file

## Parameters

- **storageFilename** - sets the filename of the storage, default `nexssStorage.json`

## Examples

```sh
nexss Storage/JSON/set myvar1 val1 myvar2 val2 # will set and save myvar1:val1, myvar2:val2
# if any of the value does not exist --nxsDefault will be used.
nexss Storage/JSON/get "x,y" "z,e" # will receive from file values for x y z e
nexss Storage/JSON/get myvar1,myvar2,myvar3 # will read multiple vars
nexss Storage/JSON/get myval asdasdasd myval2 asdasdsd231231231 --nxsDefault='${Date.now()}'
nexss Storage/JSON/get myval --storageFilename="myfile.json" # use multiple files
nexss Storage/JSON/set myval2 --storageFilename="myfile2.json" # use multuple files
```
