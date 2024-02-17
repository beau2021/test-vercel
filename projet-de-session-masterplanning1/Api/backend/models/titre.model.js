const mongoose =require('mongoose');
const titreSchema = mongoose.Schema(

{

        titre: {
            type: String,
            require:true,
        },
        sousTitre: {
            type: String,
            require:true,
        },
        cours: {
            type: String,
            require:true,
        },
        index: {
            type: Number,
            require:true,
        }
},

);
module.exports = mongoose.model('Titre', titreSchema);