// besoin de express enfin de creer un router
const express = require("express");
const controleursBooks = require("../controleurs/controleurs_books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer_config");
//le router avec la fonction Router de express
const router = express.Router();

router.post("/", auth, multer, controleursBooks.createBook);
router.get("/:id", auth, controleursBooks.getOneBook);
router.get("/", auth, controleursBooks.getAllBooks);
router.put("/:id", auth, multer, controleursBooks.modifyBook);
router.delete("/:id", auth, controleursBooks.deleteBook);

module.exports = router;
