const {
  nxsError,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();

process.chdir(NexssStdout.cwd);

if (!NexssStdout.nxsIn) {
  nxsError("Select Data eg. nexss Storage/JSON/Get myfield myfield2");
  process.exit(1);
}
let storageFilename = "nexssStorage.json";
if (NexssStdout.storageFilename) {
  storageFilename = NexssStdout.storageFilename;
}
const fs = require("fs");

data = {};
if (fs.existsSync(storageFilename)) {
  var stats = fs.statSync(storageFilename);
  var fileSizeInBytes = stats["size"];
  if (fileSizeInBytes > 0)
    data = require(NexssStdout.cwd + "/" + storageFilename);
}
NexssStdout.nxsOut = {};
for (i = 0; i < NexssStdout.nxsIn.length; i++) {
  if (data[NexssStdout.nxsIn[i]]) {
    NexssStdout.nxsOut[NexssStdout.nxsIn[i]] = data[NexssStdout.nxsIn[i]];
  } else if (NexssStdout.nxsDefault) {
    NexssStdout.nxsOut[NexssStdout.nxsIn[i]] = NexssStdout.nxsDefault;
  }
}

delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
delete NexssStdout.storageFilename;
process.stdout.write(JSON.stringify(NexssStdout));
