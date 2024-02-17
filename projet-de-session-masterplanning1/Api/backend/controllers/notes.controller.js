const notesModel = require("../models/notes.model");
var ObjectID = require('mongodb').ObjectId
const mongoose = require('mongoose');

module.exports.getTitre = async (req, res) => {
    const { userId } = req.body;
    try {
        const response = await notesModel.find({ userId }, 'titre');
        const titres = response.map(reponse => reponse.titre)
        return res.json(titres);

    } catch (err) {
        console.log('Voici les notes ')
        return res.status(500).json({
            message: "Informations introuvables "

        });
    }
};

module.exports.notesTitre = async (req, res) => {
    const { description, titre, userId } = req.body;

    try {
        // Trouver le document avec le numéro le plus élevé
        const dernierNumero = await notesModel.findOne().sort({ numero: -1 }).maxTimeMS(20000);
    
        if (dernierNumero) {
            // Utiliser le numéro trouvé pour obtenir l'enregistrement précédent
            const enregistrementPrecedent = await notesModel.findOne({ numero: { $lt: dernierNumero.numero } }).sort({ numero: -1 });
    
            if (enregistrementPrecedent) {
                const numeroEnregistrementPrecedent = enregistrementPrecedent.numero;
                console.log("Numéro de l'enregistrement précédent :", numeroEnregistrementPrecedent);
    
                // Ajouter 1 au numéro de l'enregistrement précédent
                const nouveauNumero = numeroEnregistrementPrecedent + 1;
                console.log("Nouveau numéro :", nouveauNumero);
                const nouvelleNote = new notesModel({
                    _id: new mongoose.Types.ObjectId(),
                    numero: nouveauNumero + 1,
                    titre: titre,
                    description: description, 
                    validation: userId,
                  
    
                });
    
                await nouvelleNote.save();
                return res.status(201).json({ message: "Enregistrement effectué avec succès" });

            } else {
                console.log("Aucun enregistrement précédent trouvé.");
            }
        } else {
            console.log("Aucun enregistrement trouvé.");
        }
    } catch (erreur) {
        console.error("Erreur lors de la recherche de l'enregistrement précédent :", erreur);
        return res.status(500).json({ message: "Votre enregistrement a échoué" });
    } 
};

module.exports.getTitre = async (req, res) => {
    const { validation } = req.body;
    
    try {
      const response = await notesModel.find({ validation }, 'titre description _id');
      const titres = response.map(reponse => ({
        titre : reponse.titre,
        description: reponse.description,
        _id : reponse._id,
      
      }));
      console.log(titres)
      return res.json(titres);
     
    } catch (err) {
      
      return res.status(500).json({
        message: "Veuillez vérifier votre connection"
  
      });
    }
  };