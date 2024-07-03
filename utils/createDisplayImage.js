const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const createDisplayImage = async (inputFile, outputDir, size, extension) => {
  try {
    const { name } = path.parse(inputFile);
    const outputFile = path.join(outputDir, name + `.${extension}`);

    // Lire les métadonnées de l'image originale
    const imageInfo = await sharp(inputFile).metadata();

    // Redimensionner l'image en conservant le ratio et réduire les dimensions de moitié
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
      .toFile(outputFile);

    return {
      filename: name,
      width: displayWidth,
      height: displayHeight,
    };
  } catch (error) {
    console.error(`Erreur lors de la création : ${error}`);
    throw error;
  }
};

module.exports = {
  createDisplayImage,
};
