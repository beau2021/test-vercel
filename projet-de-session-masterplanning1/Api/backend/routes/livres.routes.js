/**
 * CES METHODES DEFINISSENT LES CHEMINS EMPRUNTER PAR LES INFORMATIONS 
 */


const express = require('express');
const { 
  
  getTitre} = require('../controllers/livres.controller');
  const router = express.Router();

router.get('/', getTitre);// route qui permet d'envoyer des informations
//router.get('/titre',titre );// route qui permet de modifier des informations (mise à jour)


 // appel la fonction
module.exports = router;