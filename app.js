const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Book = require("./models/Book");
// mongoose.connect('mongodb+srv://jimbob:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',

mongoose
  .connect(
    "mongodb+srv://userroxana:123aze@cluster0.1lslq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("BRAVOOOO! >:D< - Connexion à MongoDB réussie !"))
  .catch(() => console.log("UFF .... :( - Connexion à MongoDB échouée !"));

app.use(express.json());

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

// ------ CRUD ------
// ------ POST ------ CREATE ------
app.post("/api/books", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre bien enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// ------ GET ------ READ ------
app.get("/api/books/:id", (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
});

app.get("/api/books", (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
});

// ----- UPDATE ------ UPDATE ------
app.put("/api/books/:id", (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre bien modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

// ----- DELETE ------ DELETE ------
app.delete("/api/books/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre bien supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

/*  const books = [
    {
      _id: "book1",
      title: "Mon premier book",
      description: "Les infos de mon premier book",
      imageUrl:
        "https://m.media-amazon.com/images/I/41qPj-N+++L._SY445_SX342_.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "book2",
      title: "Mon deuxième book",
      description: "Les infos de mon deuxième book",
      imageUrl: "https://m.media-amazon.com/images/I/814sf-LvR0L._SL1500_.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
    {
      _id: "book3",
      title: "Mon troisieme book",
      description: "Les infos de mon deuxième book",
      imageUrl: "https://m.media-amazon.com/images/I/71BCCd79xgL._SY522_.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
    {
      _id: "book4",
      title: "Mon quatrieme book",
      description: "Les infos de mon deuxième book",
      imageUrl:
        "https://m.media-amazon.com/images/I/51T8OXMiB5L._SY445_SX342_.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
    {
      _id: "book5",
      title: "Mon troisieme book",
      description: "Les infos de mon deuxième book",
      imageUrl: "https://m.media-amazon.com/images/I/61lvyux4OjL._SY522_.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
    {
      _id: "book6",
      title: "Paroles de Chamane:",
      description: "Les infos de mon deuxième book",
      imageUrl:
        "https://m.media-amazon.com/images/I/51-sfnfQTSL._SY445_SX342_.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(books); 
});*/

module.exports = app;
