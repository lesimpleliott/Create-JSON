const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { exec } = require("child_process");

const defaultAuthor = "Fabrice Joubert Photographe"; // Auteur par défaut
const outputFilePath = "./exportData.json"; // Nom du fichier JSON de sortie

// Fonction pour ouvrir la boîte de dialogue de sélection de dossier
const selectFolder = () => {
  return new Promise((resolve, reject) => {
    exec(
      'osascript -e "POSIX path of (choose folder with prompt \\"Select a folder\\")"',
      (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout.trim());
        }
      }
    );
  });
};

// Fonction pour obtenir les données des dossiers
const getDatasFromFolder = async (imagesDirectory) => {
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
      const id = fileName.substring(fileName.lastIndexOf("_") + 1);
      const imageInfo = await sharp(filePath).metadata();

      return {
        id: id,
        filename: fileName,
        author: defaultAuthor,
        width: imageInfo.width,
        height: imageInfo.height,
      };
    });

    return Promise.all(images).then((resolvedImages) => ({
      title: folder.toUpperCase().split("_")[1].replace("-", " "),
      id: folder.toLowerCase().split("_")[1],
      path: path.join("/", imagesDirectory, folder),
      preview: defaultImage,
      cover: defaultImage,
      coverAlignment: "center",
      images: resolvedImages,
    }));
  });

  return Promise.all(foldersList);
};

// Fonction pour créer le fichier JSON
const createJsonFile = (fileList, outputFile) => {
  const jsonData = JSON.stringify(fileList, null, 2);
  fs.writeFileSync(outputFile, jsonData, "utf-8");
  console.log(`JSON file created successfully at ${outputFile}`);
};

// Fonction principale
const main = async () => {
  try {
    const imagesDirectory = await selectFolder();
    const filesList = await getDatasFromFolder(imagesDirectory);
    createJsonFile(filesList, outputFilePath);
  } catch (error) {
    console.error("Error processing files:", error);
  }
};

main();
