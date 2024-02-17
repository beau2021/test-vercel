const mongoose =require('mongoose');
const notesSchema = mongoose.Schema(

{

        titre: {
            type: String,
            require:true,
        },
        description: {
            type: String,
            require:true,
        },
        validation: {
            type: String,
            require:true,
        },
        numero: {
            type: Number,
            require:true,
        },
       _id: {
            type: Object,
            require:true,
        },
},

);
module.exports = mongoose.model('note', notesSchema);