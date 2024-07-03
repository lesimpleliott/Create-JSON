// ********************* SETTINGS FILE *********************
// *********** Fichier de configuration du script ***********
// **********************************************************

// Extension des fichiers de sortie
const outputFileExtension = "avif";

// Taille de l'image de sortie
// (0.1 = 10%, 0.5 = 50%, 1 = 100%)
const outputSize = 0.4;

// Auteur par défaut
const defaultAuthor = "Unsplash";

// Nom du fichier JSON de sortie
const outputJSONFile = "exportData";

module.exports = {
  outputFileExtension,
  outputSize,
  defaultAuthor,
  outputJSONFile,
};
