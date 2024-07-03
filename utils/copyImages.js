const fs = require("fs");
const path = require("path");

const copyImage = (inputFile, hdDir) => {
  const hdOutputFile = path.join(hdDir, path.basename(inputFile));
  fs.copyFileSync(inputFile, hdOutputFile);
};

module.exports = { copyImage };
