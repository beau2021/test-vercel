//const { Timestamp } = require('mongodb');
const mongoose =require('mongoose');

const tacheSchema = mongoose.Schema(

{

        titre: {
            type: String,
            require:true,
        },
        date: {
            type: String,
            require:true,
        },
        description: {
            type: String,
            require:true,
        },
        proprietaire: {
            type: String,
            require:true,
        },
        responsable: {
            type: String,
            require:true,
        },
        priority: {
            type: String,
            require:true,
         }, 
         indexListe: {
            type: Number,
            require:true,
        },
        indexTache: {
            type: Number,
            require:true,
         }, 
         itemID: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        text: {
            type: String,
            require: true,
        },
        dateFinal: {
            type: String,
            require:true,
        },
},
/*{
    timestamps: true,
}*/
);
module.exports = mongoose.model('tache', tacheSchema);