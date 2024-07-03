# Script de Traitement d'Images et de Génération de JSON et ZIP

Ce script Node.js est conçu pour traiter les albums d'images, les convertir dans le format souhaité, générer un fichier JSON structuré avec les informations des images traitées, et créer des fichiers ZIP contenant les versions haute résolution des images.

## Fonctionnalités

- **Traitement des Albums :** Le script parcourt un répertoire principal contenant des albums d'images au format JPG.
- **Création de Versions HD et Display :** Pour chaque image, le script crée une version haute résolution au format JPG dans un dossier `hd` et une version affichage au format désiré dans un dossier `display`.
- **Création de Fichier JSON :** Un fichier JSON est généré pour chaque album, contenant des informations détaillées sur chaque image, y compris les chemins vers les versions HD et Display.
- **Création de Fichier ZIP :** Pour chaque album, le script crée un fichier ZIP contenant toutes les images haute résolution.

## Installation / Utilisation

1. **Clonez ce dépôt**

2. **Installez les dépendances requises :**

   ```bash
   npm install
   ```

3. **Configurez le format d'export dans index.js : outputFileExtension "webp", "avif"...**
4. **Configurez le photographe par défaut dans createJSON.js : defaultAuthor**

5. **Importez les albums photos dans le dossier 'import'**

```folder
|-- import
    |-- 1_Fisrt-album
        |--Fisrt-album_00001.jpg
        |--Fisrt-album_00002.jpg
        |--Fisrt-album_00003.jpg
        |--Fisrt-album_00004.jpg
        |--Fisrt-album_00005.jpg
    |-- 2_Second-album
    |-- 3_Third-album
    |-- 4_Fourth-album
```

6. **Vérifier le nommage des images**

```
NomEvenement_First-album_00001.jpg
First-album_00001.jpg
FirstAlbum_00001.jpg
```

7. **Lancer le script**

```bash
npm start
```

8. **C'est cuit !!!!!**

```folder
|-- export
    |-- 1_Fisrt-album
      |-- hd
        |--Fisrt-album_00001.jpg
        |--Fisrt-album_00002.jpg
        |--...
      |-- display
        |--Fisrt-album_00001.webp
        |--Fisrt-album_00002.webp
        |--...
      |-- Fisrt-album.zip
    |-- 2_Second-album
    |-- 3_Third-album
    |-- 4_Fourth-album
    |-- exportData.json
```

```exportData.json
[
  {
    "title": "FIRST ALBUM",
    "id": "first-album",
    "path": "/photos/1_First-album/",
    "zipFile": "First-album.zip",
    "cover": {
      "mini": "First-album_00001",
      "cover": "First-album_00001",
      "coverAlignment": "center"
    },
    "images": [
      {
        "id": 1,
        "filename": "First-album_00001",
        "author": "to be define",
        "path": {
          "hd": "/photos/1_First-album/hd/First-album_00001.jpg",
          "display": "/photos/1_First-album/display/First-album_00001.webp"
        },
        "size": {
          "width": 4032,
          "height": 3024
        }
      }
    ]
  }
]
```
