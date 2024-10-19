// besoin de express enfin de creer un router
const express = require("express");

//le router avec la fonction Router de express
const router = express.Router();

const controleursUsers = require("../controleurs/controleurs_users");

router.post("/signup", controleursUsers.signup);
router.post("/login", controleursUsers.login);

module.exports = router;
// on l'importe dans app.js
