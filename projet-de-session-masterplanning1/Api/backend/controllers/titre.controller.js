
const titreModel = require("../models/titre.model");
var ObjectID = require('mongodb').ObjectId


module.exports.titre = async (req, res) => {
  const { titre } = req.body;
  try {
    const response = await titreModel.find({ titre }, 'sousTitre');
    const titres = response.map(reponse => reponse.sousTitre)
    return res.json(titres);

  } catch (err) {
    console.log('jatteint ce niveau4545')
    return res.status(500).json({
      message: "Veuillez vérifier votre connection"

    });
  }
};

module.exports.cours = async (req, res) => {
  const { sousTitre } = req.body;
  try {
    const response = await titreModel.find({ sousTitre }, 'cours');

    const cours = response.map(reponse => reponse.cours)
    return res.json(cours);
  } catch (err) {
    console.log('jatteint ce niveau')
    return res.status(500).json({
      message: "Veuillez vérifier votre connection444"

    });
  }
};
