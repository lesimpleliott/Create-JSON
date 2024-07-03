// scripts/settings.js

const fs = require("fs");
const readline = require("readline");

const settingsFile = "./settings.js"; // Chemin vers votre fichier settings.js

// Fonction pour lire les paramètres actuels
const readCurrentSettings = (callback) => {
  fs.readFile(settingsFile, "utf-8", (err, data) => {
    if (err) {
      console.error(
        "Erreur lors de la lecture du fichier de configuration :",
        err
      );
      return callback(err);
    }

    try {
      const currentSettings = eval(data); // Évaluer le contenu comme du code JavaScript
      callback(null, currentSettings);
    } catch (error) {
      console.error(
        "Erreur lors de l'évaluation du fichier de configuration :",
        error
      );
      callback(error);
    }
  });
};

// Fonction pour modifier les paramètres
const modifySettings = async () => {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Lecture du contenu actuel du fichier settings.js
    readCurrentSettings((err, currentSettings) => {
      if (err) {
        console.error("Impossible de lire les paramètres actuels.");
        rl.close();
        return;
      }

      // Demander à l'utilisateur de saisir de nouvelles valeurs
      const newSettings = {};

      console.log(
        "Indiquez les nouveaux paramètres ou appuyez sur Entrée pour conserver les valeurs actuelles (indiquées entre parenthèses) :"
      );

      // Fonction pour poser une question et traiter la réponse
      const askQuestion = (question, defaultValue, callback) => {
        rl.question(question, (answer) => {
          // Utiliser la réponse de l'utilisateur si elle n'est pas vide, sinon utiliser la valeur par défaut
          const trimmedAnswer = answer.trim();
          callback(trimmedAnswer !== "" ? trimmedAnswer : defaultValue);
        });
      };

      askQuestion(
        `- Extension des fichiers de sortie (Ex: avif, webp...) (${currentSettings.outputFileExtension}): `,
        currentSettings.outputFileExtension,
        (outputFileExtension) => {
          newSettings.outputFileExtension = outputFileExtension;

          askQuestion(
            `- Taille de l'image de sortie (Ex: 0.5 pour 50%) (${currentSettings.outputSize}): `,
            currentSettings.outputSize.toString(),
            (outputSize) => {
              newSettings.outputSize = parseFloat(outputSize);

              askQuestion(
                `- Auteur par défaut (${currentSettings.defaultAuthor}): `,
                currentSettings.defaultAuthor,
                (defaultAuthor) => {
                  newSettings.defaultAuthor = defaultAuthor;

                  askQuestion(
                    `- Nom du fichier JSON de sortie (${currentSettings.outputJSONFile}): `,
                    currentSettings.outputJSONFile,
                    (outputJSONFile) => {
                      newSettings.outputJSONFile = outputJSONFile;

                      // Fusionner les nouveaux paramètres avec les paramètres actuels
                      const updatedSettings = {
                        ...currentSettings,
                        ...newSettings,
                      };

                      // Écrire les nouveaux paramètres dans le fichier settings.js
                      const settingsContent = `// ***** SETTINGS FILE *****

const outputFileExtension = "${updatedSettings.outputFileExtension}"; // Extension des fichiers de sortie
const outputSize = ${updatedSettings.outputSize}; // Taille de l'image de sortie (0.1 à 1)
const defaultAuthor = "${updatedSettings.defaultAuthor}"; // Auteur par défaut
const outputJSONFile = "${updatedSettings.outputJSONFile}"; // Nom du fichier JSON de sortie

module.exports = {
  outputFileExtension,
  outputSize,
  defaultAuthor,
  outputJSONFile,
};
`;

                      fs.writeFile(
                        settingsFile,
                        settingsContent,
                        "utf-8",
                        (err) => {
                          if (err) {
                            console.error(
                              "Erreur lors de l'écriture des paramètres dans le fichier :",
                              err
                            );
                          } else {
                            console.log("Paramètres mis à jour avec succès !");
                            console.log(
                              "Vous pouvez lancer le script : npm start"
                            );
                          }
                          rl.close();
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres :", error);
  }
};

// Appeler la fonction pour modifier les paramètres
modifySettings();
