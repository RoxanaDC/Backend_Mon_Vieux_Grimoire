// les imports
const express = require("express");
const mongoose = require("mongoose");

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

// permets le travail avec JSON dans les requêtes
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// les routes de l'application
app.use("/api/books", routesBooks);
app.use("/api/auth", routesUsers);

// export application
module.exports = app;
