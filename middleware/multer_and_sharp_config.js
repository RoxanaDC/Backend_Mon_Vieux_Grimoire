const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.memoryStorage(); // storage dans la memoire

const upload = multer({ storage }).single("image");

// Middleware pour upload et modifier l'image
module.exports = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return next();

    try {
      // transformer l'image avec sharp - .webp
      const webpBuffer = await sharp(req.file.buffer)
        .resize({ height: 500 })
        .webp({ quality: 70 })
        .toBuffer();

      // construire le nom de l'image .webp
      const webpFilename = `${
        req.file.originalname.split(".")[0]
      }_${Date.now()}.webp`;
      const outputPath = path.join(__dirname, "..", "images", webpFilename);

      // enregistrer l'image .webp sur le disk
      await fs.promises.writeFile(outputPath, webpBuffer);
      console.log("Imaginea .webp a fost salvată cu succes:", outputPath);

      // Actualisation  `req.file` avec les infos sur l'image .webp
      req.file.filename = webpFilename;
      req.file.path = outputPath;

      next();
    } catch (error) {
      console.error("Eroare la procesarea imaginii:", error);
      res.status(500).json({ error: "Eroare la procesarea imaginii." });
    }
  });
};
