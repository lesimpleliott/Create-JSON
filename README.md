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

3. **Configurez les paramètres personnalisables dans settings.js**

4. **Importez les albums photos dans le dossier 'import'**

```folder
|-- import
    |-- 1_First-Album
        |-- Example_First-Album_00001.jpg
        |-- Example_First-Album_00002.jpg
        |-- Example_First-Album_00003.jpg
        |-- Example_First-Album_00004.jpg
    |-- 2_Second-Album
        |-- Example_Second-Album_00005.jpg
        |-- Example_Second-Album_00006.jpg
        |-- Example_Second-Album_00007.jpg
        |-- Example_Second-Album_00008.jpg
    |-- 3_Third-Album
        |-- Example_Third-Album_00009.jpg
        |-- Example_Third-Album_00010.jpg
        |-- Example_Third-Album_00011.jpg
        |-- Example_Third-Album_00012.jpg
    |-- 4_Fourth-Album
        |-- Example_Fourth-Album_00013.jpg
        |-- Example_Fourth-Album_00014.jpg
        |-- Example_Fourth-Album_00015.jpg
        |-- Example_Fourth-Album_00016.jpg
```

6. **ATTENTION : Vérifier le nommage des images**

```
Optionnal_album-name_00001.jpg
Optionnal_albumName_00001.jpg
Album-name_00001.jpg
albumName_00001.jpg
```

7. **Lancer le script**

```bash
npm start
```

8. **C'est cuit !!!!!**

```folder
|-- export
    |-- exportData.json
    |-- photos
        |-- 1_First-Album
            |-- First-Album.zip
            |-- display
                |-- Example_First-Album_00001.avif
                |-- Example_First-Album_00002.avif
                |-- Example_First-Album_00003.avif
                |-- Example_First-Album_00004.avif
            |-- hd
                |-- Example_First-Album_00001.jpg
                |-- Example_First-Album_00002.jpg
                |-- Example_First-Album_00003.jpg
                |-- Example_First-Album_00004.jpg
        |-- 2_Second-Album
        |-- 3_Third-Album
        |-- 4_Fourth-Album
```

```exportData.json
[
  {
    "title": "FIRST ALBUM",
    "id": "first-album",
    "path": "/photos/1_First-Album/",
    "zipFile": "First-Album.zip",
    "cover": {
      "mini": "Example_First-Album_00001",
      "cover": "Example_First-Album_00001",
      "coverAlignment": "center"
    },
    "images": [
      {
        "id": 1,
        "filename": "Example_First-Album_00001",
        "author": "unsplash",
        "path": {
          "hd": "/photos/1_First-Album/hd/Example_First-Album_00001.jpg",
          "display": "/photos/1_First-Album/display/Example_First-Album_00001.webp"
        },
        "size": {
          "width": 4160,
          "height": 6240
        }
      },
    ]
  }
]
```
