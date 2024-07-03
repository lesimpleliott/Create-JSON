const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const defaultAuthor = "Fabrice Joubert Photographe"; // Auteur par défaut

const getDatasFromFolder = async (imagesDirectory, outputDir) => {
  const folders = fs
    .readdirSync(imagesDirectory)
    .filter((folder) => folder !== ".DS_Store");

  const foldersList = folders.map((folder) => {
    const folderPath = path.join(imagesDirectory, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file !== ".DS_Store");

    const defaultImage =
      files.length > 0 ? path.parse(files[0]).name : "No cover found";

    const images = files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const fileName = path.parse(file).name;
      // const id = fileName.substring(fileName.lastIndexOf("_") + 1);

      const idWithZeros = fileName.substring(fileName.lastIndexOf("_") + 1); // Extrait l'ID avec les zéros
      const id = parseInt(idWithZeros, 10); // Convertit l'ID en nombre entier pour supprimer les zéros inutiles

      const imageInfo = await sharp(filePath).metadata();

      const hdPath = path.join("/", "photos", folder, "hd", `${fileName}.jpg`);
      const displayPath = path.join(
        "/",
        "photos",
        folder,
        "display",
        `${fileName}.webp`
      );

      return {
        id: id,
        filename: fileName,
        author: defaultAuthor,
        path: {
          hd: hdPath,
          display: displayPath,
        },
        size: {
          width: imageInfo.width,
          height: imageInfo.height,
        },
      };
    });

    return Promise.all(images).then((resolvedImages) => {
      const albumName = folder.split("_")[1];
      const albumId = albumName.toLowerCase();
      const zipFile = `${albumName}.zip`; // Nom du fichier ZIP sans espaces
      const coverImage =
        resolvedImages.length > 0
          ? resolvedImages[0].filename
          : "No cover found";

      return {
        title: albumName.toUpperCase().replace("-", " "),
        id: albumId,
        path: path.join("/", "photos", folder, "/"),
        zipFile: zipFile,
        cover: {
          mini: coverImage,
          cover: coverImage,
          coverAlignment: "center",
        },
        images: resolvedImages,
      };
    });
  });

  return Promise.all(foldersList);
};

const createJsonFile = (fileList, outputFile, outputFileExtension) => {
  const jsonData = JSON.stringify(fileList, null, 2);
  fs.writeFileSync(outputFile, jsonData, "utf-8");
  console.log(`JSON file created successfully at ${outputFile}`);
};

module.exports = {
  getDatasFromFolder,
  createJsonFile,
};
