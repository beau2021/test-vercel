const mongoose = require('mongoose')

const codesmdpSchema = mongoose.Schema({

    proprietaire: {
        type: String,
        require:true,
    },
    code: {
        type: String,
        require:true,
    },
    dateCreation: {
        type: Date,
        require:true,
    }
});
module.exports = mongoose.model('codesmdp', codesmdpSchema);