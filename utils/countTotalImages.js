const fs = require("fs");
const path = require("path");
const { isJpgFile } = require("./helpers");

const countTotalImages = (inputDir, albums) => {
  let totalImages = 0;

  for (const album of albums) {
    const albumDir = path.join(inputDir, album);
    const jpgFiles = fs.readdirSync(albumDir).filter((file) => isJpgFile(file));
    totalImages += jpgFiles.length;
  }

  return totalImages;
};

module.exports = {
  countTotalImages,
};
