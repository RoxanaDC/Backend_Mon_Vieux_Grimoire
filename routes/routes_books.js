// besoin de express enfin de creer un router
const express = require("express");
const controleursBooks = require("../controleurs/controleurs_books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer_config");
//le router avec la fonction Router de express
const router = express.Router();

router.post("/", auth, multer, controleursBooks.createBook);
router.get("/bestrating", controleursBooks.getTop3Books); // auth NO
router.get("/", controleursBooks.getAllBooks); // auth NO

router.post("/:id/rating", auth, controleursBooks.addRating);

router.get("/:id", controleursBooks.getOneBook); // auth NO

router.put("/:id", auth, multer, controleursBooks.modifyBook);

router.delete("/:id", auth, controleursBooks.deleteBook);

module.exports = router;
