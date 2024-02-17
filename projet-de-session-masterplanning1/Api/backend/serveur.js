const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = 8000;
const app = express();

// connexion à la DB
connectDB();

// Middlewoare qui permet de traiter les donnes de du REQ
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({ origin:'http://localhost:3000'}));

// cette ligne va chercher les informations dans puis post.
app.use("/liste",require("./routes/liste.routes"));
app.use("/utilisateur",require("./routes/utilisateur.routes"));
app.use("/taches",require("./routes/tache.routes"));
app.use("/livres",require("./routes/livres.routes"));
app.use("/titre",require("./routes/titre.routes"));
app.use("/note",require("./routes/notes.routes"));

// lancer le serveur
app.listen(port, () => console.log("Le serveur est en écoute sur le port " + port));