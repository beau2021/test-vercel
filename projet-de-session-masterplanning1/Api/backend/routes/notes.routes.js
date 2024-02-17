
const express = require('express');
const { 
  
  notesTitre,getTitre} = require('../controllers/notes.controller');
  const router = express.Router();

router.post('/informationNotes', notesTitre);// route qui permet d'envoyer des informations
router.post('/titre',getTitre );// route qui permet de modifier des informations (mise à jour)


 // appel la fonction
module.exports = router;