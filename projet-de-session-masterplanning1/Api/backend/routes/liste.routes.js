/**
 * CES METHODES DEFINISSENT LES CHEMINS EMPRUNTER PAR LES INFORMATIONS
 */

const express = require("express");
const { getListes } = require("../controllers/liste.controller");
const { setNouvelleListe } = require("../controllers/liste.controller");
const { supprimerListe } = require("../controllers/liste.controller");
const { modNomListe } = require("../controllers/liste.controller");

const router = express.Router();

router.post("/userId", getListes);
router.post("/setNouvelleListe", setNouvelleListe);
router.post("/supprimerListe", supprimerListe);
router.post("/modNomListe", modNomListe);
//modifier la position de la liste???
router.post("/modIndexListes",);

// appel la fonction
module.exports = router;
