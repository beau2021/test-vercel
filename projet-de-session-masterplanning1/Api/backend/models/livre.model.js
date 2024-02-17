
const mongoose =require('mongoose');

const livreSchema = mongoose.Schema(

{

        titre: {
            type: String,
            require:true,
        },
      
        index: {
            type: Number,
            require:true,
        }
},

);
module.exports = mongoose.model('livre', livreSchema);