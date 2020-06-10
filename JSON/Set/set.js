const {
  nxsError,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();

process.chdir(NexssStdout.cwd);

if (!NexssStdout.nxsIn) {
  nxsError("Select Data eg. nexss Storage/JSON/Set myfield mydata");
  process.exit(1);
}
let storageFilename = "nexssStorage.json";
if (NexssStdout.storageFilename) {
  storageFilename = NexssStdout.storageFilename;
}
const fs = require("fs");
let newData = {};

// console.log(NexssStdout.nxsIn);

if (NexssStdout.nxsIn.length === 1) {
  // parameter has, which allows to store multiple values at once
  if (NexssStdout.nxsIn[0].indexOf(",") > -1) {
    const fields = NexssStdout.nxsIn[0].split(",");
    for (i = 0; i < fields; i++) {
      newData[fields[i]] = NexssStdout[fields[i]];
    }
  } else if (NexssStdout[NexssStdout.nxsIn[0]]) {
    newData[NexssStdout.nxsIn[0]] = NexssStdout[NexssStdout.nxsIn[0]];
  }
} else {
  for (i = 0; i < NexssStdout.nxsIn.length; i = i + 2) {
    newData[NexssStdout.nxsIn[i]] = NexssStdout.nxsIn[i + 1];
  }
}

data = {};
if (fs.existsSync(storageFilename)) {
  var stats = fs.statSync(storageFilename);
  var fileSizeInBytes = stats["size"];
  if (fileSizeInBytes > 0)
    data = require(NexssStdout.cwd + "/" + storageFilename);
}

Object.assign(NexssStdout, newData);
Object.assign(data, newData);

fs.writeFileSync(storageFilename, JSON.stringify(data));
// NexssStdout.nxsOut = result;

delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
delete NexssStdout.storageFilename;
process.stdout.write(JSON.stringify(NexssStdout));
