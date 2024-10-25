// les imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// pour express.static - les images
const path = require("path");

const routesBooks = require("./routes/routes_books");
const routesUsers = require("./routes/routes_users");

// initialisation de l'application express
const app = express();

//connexion à la base de donneés
mongoose
  .connect(
    "mongodb+srv://userroxana:123aze@cluster0.1lslq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("BRAVOOOO! >:D< - Connexion à MongoDB réussie !"))
  .catch(() => console.log("UFF .... :( - Connexion à MongoDB échouée !"));

app.use(express.json()); // permets le travail avec JSON dans les requêtes
app.use(cors()); //CORS
app.use("/api/books", routesBooks); // les routes de l'application

app.use("/api/auth", routesUsers);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
