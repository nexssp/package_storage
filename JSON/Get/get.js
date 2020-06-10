const {
  nxsError,
  nxsWarn,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();

process.chdir(NexssStdout.cwd);

if (!NexssStdout.nxsIn) {
  nxsError("Select Data eg. nexss Storage/JSON/Get myfield myfield2");
  process.exit(1);
}

// console.error(NexssStdout.nxsIn);

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

// NexssStdout.nxsOut = {};

for (i = 0; i < NexssStdout.nxsIn.length; i++) {
  // parameter comma separated
  if (NexssStdout.nxsIn[i].indexOf(",") > -1) {
    const arr = NexssStdout.nxsIn[i].split(",");
    NexssStdout.nxsIn.splice(i, 1, ...arr); // add splitted array at the position
  }

  if (data[NexssStdout.nxsIn[i]]) {
    NexssStdout[NexssStdout.nxsIn[i]] = data[NexssStdout.nxsIn[i]];
  } else if (NexssStdout.nxsDefault) {
    NexssStdout[NexssStdout.nxsIn[i]] = NexssStdout.nxsDefault;
  } else {
    nxsWarn(
      NexssStdout.nxsIn[i] +
        " has not been found in the " +
        storageFilename +
        "."
    );
  }
}

delete NexssStdout.nxsDefault;
delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
delete NexssStdout.storageFilename;
process.stdout.write(JSON.stringify(NexssStdout));
