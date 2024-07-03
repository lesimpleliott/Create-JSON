const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const createZipForAlbum = (album, hdDir, outputDir) => {
  return new Promise((resolve, reject) => {
    const albumName = album.split("_")[1];
    const zipFilePath = path.join(outputDir, album, `${albumName}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(hdDir, false);
    archive.finalize();
  });
};

module.exports = { createZipForAlbum };
