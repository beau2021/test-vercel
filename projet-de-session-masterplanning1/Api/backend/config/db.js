
/**
 * FONCTION DE CONNECTION DE MONGODB
 */
const mongoose = require("mongoose");
const uri = 'mongodb+srv://Haton:Test123@kanban.mcsw11q.mongodb.net';
//const uri = 'mongodb+srv://MasterPlanning:Test1234@kanban.mcsw11q.mongodb.net';
//********/?retryWrites=true&w=majority */
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log('Mongo connecté');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); // Quitte le processus Node.js en cas d'erreur de connexion
  }
  //modif apporte
};

module.exports = connectDB;