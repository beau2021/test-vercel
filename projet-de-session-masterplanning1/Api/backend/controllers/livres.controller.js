//const livreModel = require("../models/livre.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const livreModel = require('../models/livre.model');
var ObjectID = require('mongodb').ObjectId



module.exports.getTitre = async (req, res) => {
  try {
    const livres = await livreModel.find({}, 'titre'); 
    const titres = livres.map(livre => livre.titre); 
    return res.json(titres);
  } catch (error) {
    return res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
};
