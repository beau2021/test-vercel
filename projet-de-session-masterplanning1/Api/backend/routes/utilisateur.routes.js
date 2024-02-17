/**
 * CES METHODES DEFINISSENT LES CHEMINS EMPRUNTER PAR LES INFORMATIONS 
 */


const express = require('express');
const { check } = require("express-validator")
const { inscription,
  login,
  getInformation,
  modifierUtilisateur, 
  getUser,
  deleteUser,
  supprimerUtilisateur, 
  like_utilisateur,
  dislike_utilisateur,
  envoyerEmail,
  majMotDePasse} = require('../controllers/utilisateur.controller');
//const { afficherUtilisateur } = require('../controllers/utilisateur.controller');
const router = express.Router();


router.post('/login', login);

router.post('/inscription',
[
    check("nom").notEmpty(),
    check("prenom").notEmpty(),
    check("adresse").notEmpty(),
    check("telephone").notEmpty(),
    check("courriel").isEmail(),
    check("mdp")
      .isLength({ min: 8, max: 20 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .matches(/[^a-zA-Z0-9]/),
  ],inscription); // route qui permet d'envoyer des informations

router.post('/email', envoyerEmail);
router.post('/majMdp', majMotDePasse);

router.get('/:userID', getInformation);// route qui permet de modifier des informations (mise à jour)
router.patch('/:id', modifierUtilisateur);// route qui permet de modifier des informations (mise à jour)
router.post('/getUser/:userId', getUser);
router.post('/delete/:userId',deleteUser);
//router.delete('/:id', supprimerUtilisateur);// route qui permet de supprimer des informations 
//router.patch('/like-utilisateur/:id', patchUtilisateur);// permet de verifier le nbre de like et dislike
//router.patch('/dislike-utilisateur/:id', patchUtilisateur);

 // appel la fonction
module.exports = router;


