// Fonction pour vérifier si un fichier est une image JPG
const isJpgFile = (file) => {
  return file.toLowerCase().endsWith(".jpg");
};

module.exports = {
  isJpgFile,
};
