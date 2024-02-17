/**
 * CES METHODES DEFINISSENT LES CHEMINS EMPRUNTER PAR LES INFORMATIONS 
 */


const express = require('express');
const { titre, cours} = require('../controllers/titre.controller');
const router = express.Router();

router.post('/cours/', cours);// route qui permet d'envoyer des informations
 router.post('/', titre);// route qui permet de modifier des informations (mise à jour)



 // appel la fonction
module.exports = router;