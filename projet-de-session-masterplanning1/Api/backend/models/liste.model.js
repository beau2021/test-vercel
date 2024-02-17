//const { Timestamp } = require('mongodb');
const mongoose =require('mongoose');

const listeSchema = mongoose.Schema(

{

        titreListe: {
            type: String,
            require:true,
        },
        proprietaire: {
            type: String,
            require:true,
        },
        indexListe: {
            type: Number,
            require:true,
        }
},
/*{
    timestamps: true,
}*/
);
module.exports = mongoose.model('liste', listeSchema);