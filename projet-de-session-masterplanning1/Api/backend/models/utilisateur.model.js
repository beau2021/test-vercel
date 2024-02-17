//const { Timestamp } = require('mongodb');

const mongoose = require('mongoose');

const utilisateurSchema = mongoose.Schema(

    {
       
        courriel: {
            type: String,
            require: true,
        },
        mdp: {
            type: String,
            require: true,
        },
        nom: {
            type: String,
            require: true,
        },
        prenom: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true,
        },
        telephone: {
            type: String,
            require: true,
        },
        validation: {
            type: String,
            require: true,
        },
        userId: {
            type: String,
            require: true,
        },
    titre: {
        type: String,
        require: true,
    },

    },
    /*{
        timestamps: true,
    }*/
);
module.exports = mongoose.model("utilisateur", utilisateurSchema);
