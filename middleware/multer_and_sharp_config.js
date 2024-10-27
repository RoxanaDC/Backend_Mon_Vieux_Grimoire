const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// configuration pour multer: save l'image brute dans le dossier "images"
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage }).single("image");

// le middleware multer pour upload et modification de l'image
module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return next();

    // la construction du nom de l'image .webp
    const webpFilename = `${req.file.filename.split(".")[0]}.webp`;
    const outputPath = path.join(__dirname, "..", "images", webpFilename);

    // modifier l'image avec sharp et save le resultat .webp
    sharp(req.file.path)
      .resize({ height: 500 })
      .webp({ quality: 70 })
      .toFile(outputPath, (error) => {
        if (error) return res.status(500).json({ error });

        // Supprimer l'image originale .jpg/.png après le save de l'image .webp
        console.log(req.file.path);
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError)
            console.error(
              "Erreur à la suppression de l'image originale",
              unlinkError
            );
        });

        // L'actualisation du `req.file` avec les infos de l'image .webp
        req.file.filename = webpFilename;
        req.file.path = outputPath;
        next();
      });
  });
};
