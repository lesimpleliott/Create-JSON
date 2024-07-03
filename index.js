const fs = require("fs");
const path = require("path");
const ProgressBar = require("progress");
const { readAlbums } = require("./utils/readAlbums");
const { createDirectories } = require("./utils/createDirectories");
const { countTotalImages } = require("./utils/countTotalImages");
const { copyImage } = require("./utils/copyImages");
const { optimizeImage } = require("./utils/optimizeImages");
const { getDatasFromFolder, createJsonFile } = require("./utils/createJSON");
const { createZipForAlbum } = require("./utils/createZip");
const {
  outputFileExtension,
  outputSize,
  outputJSONFile,
} = require("./settings");

const inputDir = "./import"; // Dossier principal contenant les albums
const outputDir = "./export/photos"; // Dossier de sortie
const outputFilePath = `./export/${outputJSONFile}.json`; // Nom du fichier JSON de sortie

const main = async () => {
  try {
    const albums = readAlbums(inputDir);
    const totalImages = countTotalImages(inputDir, albums);

    const bar = new ProgressBar("Traitement [:bar] :current/:total images", {
      total: totalImages,
      width: 30,
    });

    for (const album of albums) {
      const albumDir = path.join(inputDir, album);
      const { hdDir, displayDir } = createDirectories(outputDir, album);

      const jpgFiles = fs
        .readdirSync(albumDir)
        .filter((file) => file.toLowerCase().endsWith(".jpg"));

      for (const file of jpgFiles) {
        const inputFile = path.join(albumDir, file);
        await copyImage(inputFile, hdDir);
        await optimizeImage(
          inputFile,
          displayDir,
          outputSize,
          outputFileExtension
        );
        bar.tick();
      }

      // Créer un fichier ZIP contenant les images HD de l'album
      await createZipForAlbum(album, hdDir, outputDir);
    }

    // Générer le fichier JSON après le traitement des images et la création des fichiers ZIP
    const filesList = await getDatasFromFolder(inputDir, outputDir);
    createJsonFile(filesList, outputFilePath, outputFileExtension);

    console.log("Traitement terminé avec succès !");
  } catch (error) {
    console.error("Erreur lors du traitement des albums :", error);
  }
};

main();
