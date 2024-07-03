const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const processImages = async (
  albumDir,
  hdDir,
  displayDir,
  size,
  extension,
  bar
) => {
  const jpgFiles = fs
    .readdirSync(albumDir)
    .filter((file) => file.toLowerCase().endsWith(".jpg"));

  for (const file of jpgFiles) {
    const inputFile = path.join(albumDir, file);
    const hdOutputFile = path.join(hdDir, file);

    fs.copyFileSync(inputFile, hdOutputFile);

    const { name } = path.parse(file);
    const displayOutputFile = path.join(displayDir, `${name}.${extension}`);

    const imageInfo = await sharp(inputFile).metadata();
    const displayWidth = Math.round(imageInfo.width * size);
    const displayHeight = Math.round(imageInfo.height * size);

    await sharp(inputFile)
      .resize({
        width: displayWidth,
        height: displayHeight,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat(extension)
      .toFile(displayOutputFile);

    bar.tick();
  }
};

module.exports = { processImages };
