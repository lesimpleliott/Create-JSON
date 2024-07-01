# Image Metadata JSON Exporter

Ce script Node.js permet de sélectionner un dossier contenant des images sur macOS et de générer un fichier JSON contenant des métadonnées pour chaque image.

## Prérequis

- Node.js installé sur votre système.
- Modules `sharp` `fs` `path` `child_process` installés

## Installation / Utilisation

1. **Clonez ce dépôt ou téléchargez les fichiers nécessaires.**

2. **Installez les dépendances requises :**
   
   ```bash
   npm install
   ```

3. **Installez les dépendances requises :**

```bash
node createJSON.js
```

4. **Séléctionnez le dossier principal** 
5. **Votre JSON est prêt : 'exportData.json'**





## <u>Modèle JSON</u>

```json
[
  {
    "title": "FIRST ALBUM",
    "id": "first-album",
    "path": "/path/to/photos/1_First-Album",
    "preview": "FirstAlbum_00001",
    "cover": "FirstAlbum_00001",
    "coverAlignment": "center",
    "images": [
      {
        "id": "00001",
        "filename": "FirstAlbum_00001",
        "author": "default author",
        "width": 3000,
        "height": 2000
      },
      {
        "id": "00002",
        "filename": "FirstAlbum_00002",
        "author": "default author",
        "width": 2000,
        "height": 3000
      },
    ]
  }
]

```





