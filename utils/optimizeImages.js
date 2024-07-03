const path = require("path");
const sharp = require("sharp");

const optimizeImage = async (inputFile, displayDir, size, extension) => {
  const { name } = path.parse(inputFile);
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
};

module.exports = { optimizeImage };
