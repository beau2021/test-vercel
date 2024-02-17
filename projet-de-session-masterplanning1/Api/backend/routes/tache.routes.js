/**
 * CES METHODES DEFINISSENT LES CHEMINS EMPRUNTER PAR LES INFORMATIONS
 */

const express = require("express");
const { getTache, metrique } = require("../controllers/tache.controller");
const { getTachesParListeId } = require("../controllers/tache.controller");
const { setTache } = require("../controllers/tache.controller");
const { modifierPositionTaches } = require("../controllers/tache.controller");
const { supprimerTache } = require("../controllers/tache.controller");
const { modifierTache } = require("../controllers/tache.controller");
const { modifierTacheCalendrier } = require("../controllers/tache.controller");
const { ListTache } = require("../controllers/tache.controller");
const { deleteTache } = require("../controllers/tache.controller");
const { patchTache } = require("../controllers/tache.controller");
const { Indicateur } = require("../controllers/tache.controller");
const { listeMetrique } = require("../controllers/tache.controller");
const { modifierDateTache } = require("../controllers/tache.controller");
const { modifierDateTachefinal } = require("../controllers/tache.controller");
const {getJoursAvecTaches} = require('../controllers/tache.controller')

const router = express.Router();

router.post("/liste", getTache);
router.post("/tachesParId", getTachesParListeId);
router.post("/nouvelleTache", setTache);
router.post("/modIndexTaches", modifierPositionTaches);
router.post("/supprimerTache", supprimerTache);
router.post("/modifierTache", modifierTache);
router.patch("/modifierTacheCalendrier", modifierTacheCalendrier);
router.post("/", ListTache);
router.post("/indicateur", Indicateur);
router.post("/metrique", listeMetrique);
router.post("/modDateTache", modifierDateTache);
router.post("/modDateTacheFinal", modifierDateTachefinal);
router.post('/jourAvecTaches', getJoursAvecTaches)


//router.put('/:id', putTache);// route qui permet de modifier des informations (mise à jour)
//router.delete('/:id', deleteTache);// route qui permet de supprimer des informations
//router.patch('/like-utilisateur/:id', patchTache);// permet de verifier le nbre de like et dislike
//router.patch('/dislike-utilisateur/:id', patchTache);

module.exports = router;
