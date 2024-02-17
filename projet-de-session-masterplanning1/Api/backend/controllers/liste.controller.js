const listeModel = require("../models/liste.model");
const utilisateurModel = require("../models/utilisateur.model");
var ObjectID = require("mongodb").ObjectId;

module.exports.getListes = async (req, res) => {
  const { userID } = req.body;

  try {
    const utilisateur = await utilisateurModel.findOne({
      _id: new ObjectID(userID),
    });
    const courriel = utilisateur.courriel;

    try {
      const listes = await listeModel.find({ proprietaire: courriel });
      if (!listes) {
        return res.status(409).json({
          message:
            "Requete invalide veuillez verifier votre recherche de liste",
        });
      }
      return res.json(listes);
    } catch (err) {
      return res.status(500).json({
        message: "Erreur lors de la connexion, svp essayez plus tard",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la connexion, svp essayez plus tard",
    });
  }
};

module.exports.setNouvelleListe = async (req, res) => {
  const { titreListe, proprietaire } = req.body;
  console.log(titreListe);
  try {
    const utilisateur = await utilisateurModel.findOne({
      _id: new ObjectID(proprietaire),
    });
    const courriel = utilisateur.courriel;
    const listes = await listeModel.find({ proprietaire: courriel });

    const derniereIndexListe = listes.length;
    // Créer une nouvelle tâche dans MongoDB
    const nouvelleListe = new listeModel({
      titreListe: titreListe,
      proprietaire: courriel,
      indexListe: derniereIndexListe,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await nouvelleListe.save();

    return res.status(201).json(nouvelleListe);
  } catch (error) {
    return res.status(500).json({ message: "Création de la liste a échoué" });
  }
};

module.exports.supprimerListe = async (req, res) => {
  const { idListe } = req.body;
  console.log(idListe);
  try {
    await listeModel.deleteOne({ _id: new ObjectID(idListe) });
    return res.status(201).json({
      message: "Liste supprimée",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de au moment de supprimer les listes",
    });
  }
};

module.exports.modNomListe = async (req, res) => {
  const { idListe, titreListe } = req.body;

  const filtre = { _id: new ObjectID(idListe) };
  try {
    await listeModel.updateOne(filtre, {
      titreListe: titreListe,
    });
    return res.status(201).json({
      message: "Mise à jour de liste",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de au moment de modifier la liste",
    });
  }
};
