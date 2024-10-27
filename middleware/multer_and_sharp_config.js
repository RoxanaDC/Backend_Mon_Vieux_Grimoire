const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// configuration pour multer: save l'image brute dans le dossier "images"
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images"); // le dossier destination pour les images bruts
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

console.log("execut multer");

// le middleware multer pour upload
const upload = multer({ storage }).single("image");

// Middleware pour processer l'image en utilisant sharp
const processImage = (req, res, next) => {
  if (!req.file) {
    return next(); // Si l'image n'existe pas, on passe au middleware suivant
  }

  // on construit un nom pour le fichier processé
  const transformedFilename = `${req.file.filename.split(".")[0]}.webp`;

  // on specifie la route pour le fichier processé
  const outputPath = path.join(__dirname, "..", "images", transformedFilename);

  // On processe l'image: resize, conversion webp et save
  sharp(req.file.path)
    .resize({ height: 500 })
    .webp({ quality: 70 })
    .toFile(outputPath, (error) => {
      if (error) {
        return res.status(500).json({ error });
      }

      // On actualise req.file pour reflecter le fichier processé
      req.file.filename = transformedFilename;
      req.file.path = outputPath;
      next();
    });
};

// export les middlewares pour etre utilisées ensemble
module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    processImage(req, res, next); // on aplique la processation sharp après upload
  });
};
