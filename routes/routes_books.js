// besoin de express enfin de creer un router
const express = require("express");

//le router avec la fonction Router de express
const router = express.Router();

const controleursBooks = require("../controleurs/controleurs_books");

router.post("/", controleursBooks.createBook);
router.get("/:id", controleursBooks.getOneBook);
router.get("/", controleursBooks.getAllBooks);
router.put("/:id", controleursBooks.modifyBook);
router.delete("/:id", controleursBooks.deleteBook);

modules.export = router;
