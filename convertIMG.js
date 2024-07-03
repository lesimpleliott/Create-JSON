const fs = require("fs");
const path = require("path");
const ProgressBar = require("progress");
const { readAlbums } = require("./utils/readAlbums");
const { countTotalImages } = require("./utils/countTotalImages");
const { optimizeImage } = require("./utils/optimizeImages");
const { outputFileExtension, outputSize } = require("./settings");

const inputDir = "./import"; // Dossier principal contenant les albums
const outputDir = "./export/optimized-images"; // Dossier de sortie

const main = async () => {
  try {
    const albums = readAlbums(inputDir);
    const totalImages = countTotalImages(inputDir, albums);

    const bar = new ProgressBar("Optimisation [:bar] :current/:total images", {
      total: totalImages,
      width: 30,
    });

    for (const album of albums) {
      const albumDir = path.join(inputDir, album);
      const optimizedDir = path.join(outputDir, album);

      // Créer le répertoire de sortie s'il n'existe pas
      if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir, { recursive: true });
      }

      const jpgFiles = fs
        .readdirSync(albumDir)
        .filter((file) => file.toLowerCase().endsWith(".jpg"));

      for (const file of jpgFiles) {
        const inputFile = path.join(albumDir, file);
        await optimizeImage(
          inputFile,
          optimizedDir,
          outputSize,
          outputFileExtension
        );
        bar.tick();
      }
    }

    console.log("Optimisation terminée avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'optimisation des albums :", error);
  }
};

main();
