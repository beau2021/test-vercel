const utilisateurtModel = require("../models/utilisateur.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment")
//const { signup } = require('../models/utilisateur.model');
const utilisateurModel = require('../models/utilisateur.model');
const codesmdp = require('../models/codesmdp.model');
var ObjectID = require('mongodb').ObjectId

const validationResult = require("express-validator");
//import { validationResult } from "express-validator";
const codeGenere = null;

module.exports.login = async (req, res) => {
  const { courriel, mdp } = req.body;

  try {
    const utilisateur = await utilisateurtModel.findOne({ courriel });

    if (!utilisateur) {
      return res.status(409).json({
        message: "Identifiants invalides, vérifiez-les s'il vous plaît",
      });
    }
    let mdpValide = false;
    try {
      mdpValide = await bcrypt.compare(mdp, utilisateur.mdp);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Votre connexion a echoué, svp essayez plus tard" });
    }
    // vérification du mdp a celui du hash

    console.log("resultat de la connectivité : " + mdpValide);
    if (!mdpValide) {
      return res.status(409).json({
        message: "Identifiants invalides, vérifiez-les s'il vous plaît",
      });
    }

    const token = jwt.sign(
      {
        utilisateurId: utilisateur._id,
        utilisateurCourriel: utilisateur.courriel,
      },
      "Beausejour_Carlos_Josue_Louis_the_private_key",
      { expiresIn: "1h" }
    );

    // const { prenom, status } = utilisateur;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // une heure
      sameSite: "lax",
    });

    res.status(201).json({
      message: "Vous êtes connecté(e)!",
      userId: utilisateur._id,
      token: token,
      validation: utilisateur.validation
    });


  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la connexion, svp essayez plus tard",
    });
  }
};

module.exports.logout = async (req, res) => {
  logger.info(`Déconnexion`);
  res.cookie("token", "", "validation", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Vous êtes déconnecté(e)!" });
};
//module.exports = { logout };

/**
 * INSCRIPTION D'UN UTILISATEUR
 */

//import { validationResult } from "express-validator";

module.exports.inscription = async (req, res) => {
  const { prenom, nom, telephone, courriel, mdp, status, validation } =
    req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données MongoDB
    const existingUser = await utilisateurtModel.findOne({
      courriel: courriel,
    });
    console.log(existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "L'utilisateur existe déjà!" });
    }

  
    // Crypter et hasher le mot de passe
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
    if (validation == null) {
      N_acces = "owner";
    } else N_acces = status;

    // Créer un nouvel utilisateur dans MongoDB avec le nouveau statut
    const newUser = new utilisateurtModel({
      status: N_acces,
      mdp: hash,
      courriel: courriel,
      prenom: prenom,
      nom: nom,
      telephone: telephone,
      validation: validation,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    return res.status(201).json({ message: "Votre inscription est réussie" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return res.status(500).json({ message: "Votre inscription a échoué" });
  }
};

/**
 * MODIFIER UTILISATEUR
 */
module.exports.modifierUtilisateur = async (req, res, next) => {
  /*const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }*/

  const { nom, prenom, adresse, telephone, mdp, userID } = req.body;

  try {
    // Recherche de l'utilisateur par ID
    const utilisateur = await utilisateurModel.findById(userID);
    if (!utilisateur) {
      //logger.warn(`Utilisateur non trouvé avec l'id: ${utilisateur_id}`);
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      return next(error);
    }

    // Mise à jour des données de l'utilisateur
    utilisateur.nom = nom;
    utilisateur.prenom = prenom;
    utilisateur.adresse = adresse;
    utilisateur.telephone = telephone;

    if (mdp) {
      if (await bcrypt.compare(mdp, utilisateur.mdp)) {
        await utilisateur.save();
        res.status(200).json({
          message: "Utilisateur  " + prenom + "  modifié avec succès",
        });
        console.log("Utilisateur  " + prenom + "  modifié avec succès");
      }
    }

    res.status(201).json({
      message: "Utilisateur pas modifié",
    });
    console.log("Utilisateur pas modifié");

    //logger.info(`Utilisateur modifié avec succès - id: ${utilisateurId}`);
  } catch (err) {
    const error = new Error(
      "Oups, il y a eu un problème, on ne peut pas modifier cet utilisateur"
    );
    error.status = 500;
    return next(error);
  }
};

module.exports.supprimerUtilisateur = async (req, res, next) => {
  // Utilisez maintenant le modèle utilisateur pour effectuer des opérations MongoDB

  /* const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }*/

  const { utilisateurId, mdp } = req.body;

  try {
    // Trouvez l'utilisateur dans MongoDB
    const utilisateur = await utilisateurModel.findOne({
      id_utilisateur: utilisateurId,
    });
    console.log(utilisateur);
    if (!utilisateur) {
      logger.warn(`Utilisateur non trouvé avec l'id: ${utilisateurId}`);
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      return next(error);
    }

    const mdpValide = await bcrypt.compare(mdp, utilisateur.mot_de_passe);
    if (!mdpValide) {
      logger.warn(`Le mot de passe est incorrect`);
      const error = new Error("Le mot de passe est incorrect");
      error.status = 401;
      return next(error);
    }

    // Supprimez l'utilisateur
    await Utilisateur.deleteOne({ id_utilisateur: utilisateurId });

    // Suppression d'autres données liées si nécessaire

    res.status(200).json({ message: "Votre compte a été supprimé" });
  } catch (err) {
    logger.error(`Erreur lors de la requête: ${err.message}`);
    const error = new Error(
      "Opps, il y a eu un problème, on ne peut pas supprimer ce client"
    );
    error.status = 500;
    return next(error);
  }
};

module.exports.getInformation = async (req, res) => {
  const { userID } = req.params;
  
  try {
    const utilisateur = await utilisateurtModel.findOne({
      _id: new ObjectID(userID),
    });
    
    res.status(200).json({
      message: "Vous êtes connecté(e)!",
      status: utilisateur.status,
      courriel: utilisateur.courriel,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      telephone: utilisateur.telephone,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Veuillez vérifier votre connection",
    });
  }
};

const nodemailer = require("nodemailer");

module.exports.envoyerEmail = async (req, res) => {
  const NB_CARACTERES_ALEATOIRES = 5
  const LIEN_PAGE_RECUP_MDP = req.body.mdpOublieRecupLink
  const codeAleatoire = (longueurCode) => {
    caracteres = '1234567890'
    longueurCaracteres = caracteres.length
    resultat = ''
    for (let i = 0; i < longueurCode; i++) {
      resultat += caracteres.charAt(Math.floor(Math.random() * longueurCaracteres))
    }
    return resultat
  }
  
  let codeGenere = codeAleatoire(NB_CARACTERES_ALEATOIRES)
  const {courriel} = req.body
  console.log(courriel)
  
  try {
    const utilisateur = await utilisateurtModel.findOne({ courriel });
    if (utilisateur) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'masterplanning23@gmail.com',
            pass: 'nozpzmyalwmtomjp',
          },
        });
        
        const mailOptions = {
            from: 'masterplanning23@gmail.com',
            to: courriel,
            subject: "Mot de passe oublié.",
            html: `<p>Bonjour ${utilisateur.prenom},</p>
                   <p>Voici votre code de récupération :</p>
                   <p><b>${codeGenere}</b></p>
                   <p>Accompagnez le formunlaire de cette <a href="${LIEN_PAGE_RECUP_MDP}">page</a> 
                   par le code fourni afin de poursuivre la récupération du mot de passe.</p>
                   <p>Assurez-vous de l'utiliser dans les 5 prochaines minutes.</p>`,
        };
          
        try {
          await transporter.sendMail(mailOptions);
          res.status(200).json({ message: 'E-mail envoyé avec succès' });
          console.log("Courriel envoyé.")
        } catch (error) {
          res.status(202).json({message : "Erreur l'ors de l'envoie de l'e-mail"})
          console.error('Erreur lors de l\'envoi d\'e-mail :', error);
        }

        // Inscrire le code dans la bd
        const codeExistant = await codesmdp.findOne({proprietaire : courriel})
        if (codeExistant) {
          await codesmdp.updateOne({proprietaire : courriel}, {$set:{code:codeGenere, dateCreation:new Date()}})
          console.log("Le code de confirmation existant mis à jour.")
        } else {
            const nouveauCode = new codesmdp({
              proprietaire : courriel,
              code: codeGenere,
              dateCreation: new Date()
            });
           await nouveauCode.save();
          }
    } else {
      res.status(201).json({message: "Aucun utilisateur ne correspond à l'adresse courriel"})
      console.log("Aucun utilisateur ne correspond à l'adresse courriel")
    } 
  } catch (err) {
    console.log(err);
  }
}


module.exports.deleteUser = async (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  try {
    await utilisateurModel.deleteOne({ _id: new ObjectID(userId) });
    console.log("Utilisateur supprimé1111");
    return res.status(201).json({
      message: "Utilisateur supprimé",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de suppression ",
    });
  }
};



module.exports.getUser = async (req, res) => {
  const { userId } = req.params;
  // console.log("test getUser"+userId);
  try {
    const User = await utilisateurModel.find({ userId: userId }, 'nom prenom status userId');
    
    if (User) {
      //const reponse = {
        const reponse = User.map((user) => ({
        nom: user.nom,
        prenom: user.prenom,
        status: user.status,
        userID_Dev: user._id
      })) ;
      return res.json(reponse);
    } else {
      return res.status(500).json({ error: 'L\'utilisateur n\'existe pas dans la base de données.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
};


module.exports.majMotDePasse = async (req, res) => {
  const {courriel, code, mdp} = req.body
  const codeBD = await codesmdp.findOne({proprietaire:courriel, code:code})
  
  // Si le code n'existe pas dans la BD
  if (!codeBD) {
    console.log("Le code n'existe pas dans la BD.")
    res.status(201).json({message: 'Code de validation ou courriel invalide'})
  } else {
    const delaisMinute = 5  
    const dateCreation = moment(codeBD.dateCreation)
    const dateCourante = moment()
    const diffEnSecondes = dateCourante.diff(dateCreation, 'seconds')
  
    // si le code a expiré
    if (diffEnSecondes > (delaisMinute * 60)) {
      console.log(`Temps écoulé : ${diffEnSecondes}`)
      res.status(201).json({message: 'Code de validation expiré'})
    } else {
      // Crypter et hasher le mot de passe
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(mdp, salt);

      // Mettre à jour le mdp de l'utilisateur
      await utilisateurModel.updateOne({courriel:courriel}, {$set:{mdp:hash}})
      console.log('Mise à jour du mot de passe réussie.')
      res.status(200).json({message: 'Mise à jour du mot de passe réussie.'})
      
      // Supprimer le code de validation
      await codesmdp.deleteOne({proprietaire:courriel, code:code})
      console.log("Code de validation supprimé.")
    }
  }
};
