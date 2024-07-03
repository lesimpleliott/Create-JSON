const fs = require("fs");
const path = require("path");

const readAlbums = (inputDir) => {
  return fs
    .readdirSync(inputDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

module.exports = {
  readAlbums,
};
