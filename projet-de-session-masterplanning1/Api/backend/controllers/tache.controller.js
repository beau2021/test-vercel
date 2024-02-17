const tacheModel = require("../models/tache.model");
var ObjectID = require("mongodb").ObjectId;
const moment = require('moment');
const fs = require('fs');

//Fonction pour obtenir une liste de tâches selon le nom de la liste et le id de 
// l'utilisateur
module.exports.getTache = async (req, res) => {
  const { liste, userID } = req.body;
  console.log(req.body);
  try {
    const taches = await tacheModel.find({
      proprietaire: userID,
      liste: liste,
    });
    //console.log(taches);
    if (!taches) {
      return res.status(409).json({
        message: "Requete invalide veuillez verifier votre recherche",
      });
    }
    return res.json(taches);
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la connexion, svp essayez plus tard",
    });
  }
};

module.exports.setTache = async (req, res) => {
  const {
    titre,
    description,
    date,
    responsable,
    proprietaire,
    priority,
    indexTache,
    indexListe,
  } = req.body;
  const intIdListe = Number(indexListe);

  try {
    const taches = await tacheModel.find({
      proprietaire: proprietaire,
      indexListe: intIdListe,
    });
    console.log(taches);
    const derniereIndexTache = taches.length;
    console.log(derniereIndexTache);

    // Créer une nouvelle tâche dans MongoDB
    const nouvelleTache = new tacheModel({
      titre: titre,
      description: description,
      date: date,
      responsable: responsable,
      priority: priority,
      proprietaire: proprietaire,
      indexListe: indexListe,
      indexTache: derniereIndexTache,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await nouvelleTache.save();

    return res.status(201).json(nouvelleTache);
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    return res
      .status(500)
      .json({ message: "Votre création de la tâche a échoué" });
  }
};

module.exports.getTachesParListeId = async (req, res) => {
  const { indexListe, userID } = req.body;
  const intIdListe = Number(indexListe);
  try {
    const taches = await tacheModel.find({
      proprietaire: userID,
      indexListe: intIdListe,
    });

    if (!taches) {
      return res.status(409).json({
        message: "Requete invalide veuillez verifier votre recherche",
      });
    }
    return res.json(taches);
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de validation de tâches",
    });
  }
};

module.exports.modifierPositionTaches = async (req, res) => {
  const { colonnes, userID } = req.body;

  try {
    let compteurListe = 0;
    //Boucle de liste
    for (const col in colonnes) {
      const objetInterne = colonnes[col];
      let compteurTache = 0;
      //Boucle de tâches
      for (const tache in objetInterne.items) {
        const objetTache = objetInterne.items[tache];
        const filtre = { _id: new ObjectID(objetTache._id) };

        await tacheModel.updateOne(filtre, {
          indexListe: compteurListe,
          indexTache: compteurTache,
        });
        compteurTache++;

      }
      compteurListe++;
      compteurTache = 0;
    }
    return res.status(201).json({
      message: "Mise à jour des tâches",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de mise à jour des tâches",
    });
  }
};

module.exports.supprimerTache = async (req, res) => {
  const { tache_id } = req.body;
  try {
    await tacheModel.deleteOne({ _id: new ObjectID(tache_id) });
    return res.status(201).json({
      message: "Tâche supprimée",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de au moment de supprimer les tâches",
    });
  }

}
//Louis
module.exports.modifierTacheCalendrier = async (req, res) => {
  const { itemId, type, text } = req.body;

  try {
    const item = await tacheModel.findById(itemId);
    if (type === "titre") {
      item.titre = text;
    }
    else if (type === "description") {
      item.description = text;
    }
    else {
      const error = new Error("Oups, le type de donnée à modifier n'existe pas");
      error.status = 500;
      return next(error);
    }
    item.save();
    console.log("L'item a été modifié avec succès")
    return res.status(201).json({
      message: "L'item a été modifié avec succès",
    });
  }
  catch (err) {
    const error = new Error("Oups, il y a eu un problème, on ne peut pas modifier cette tache");
    error.status = 500;
    return next(error);
  }
}


//Luis
module.exports.modifierTache = async (req, res) => {
  const { tache_id, titre, description, date, responsable, priority, dateFinal } =
    req.body;
  const filtre = { _id: new ObjectID(tache_id) };
  try {
    await tacheModel.updateOne(filtre, {
      titre: titre,
      description: description,
      date: date,
      responsable: responsable,
      priority: priority,
      dateFinal: dateFinal
    });

    return res.status(201).json({
      message: "Mise à jour de tâche",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de au moment de supprimer les tâches",
    });
  }
};

module.exports.ListTache = async (req, res) => {
  try {
    const { proprietaire, userID } = req.body;

    const taches = await tacheModel.find({ proprietaire }, 'description titre responsable date');
    console.log(taches)
    const reponse = taches
      .filter(tache => tache.responsable === userID)
      .map(tache => ({
        titre: tache.titre,
        responsable: tache.responsable,
        date: tache.date

      }));
    return res.json(reponse);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur s'est produite" });
  }
};
module.exports.listeMetrique = async (req, res) => {
  const { proprietaire, titreSelectionne} = req.body;
{ 
    switch (titreSelectionne) {
      case "BACKLOG":
        indexListes = 0;
        break;
      case "A FAIRE":
        indexListes = 1;
        break;
      case "ENCOURS":
        indexListes = 2;
        break;
      case "TERMINE":
        indexListes = 3;
        break;
      default:
        indexListes = "Inconnu";
        break;
      }
      console.log(indexListes);
    }
 
 
 
  try {
   const taches = await tacheModel.find({proprietaire:proprietaire,indexListe:indexListes }, 'indexListe indexTache dateFinal date titre');
   

   let wip=0;
   let wip1=0;
   let wip2=0;
    const reponse = taches.map((tache) => {
  
      const dateDebut = new Date(tache.date);
      const dateFinale = new Date(tache.dateFinal);
      const dateActuelle = new Date();

    //  const differenceEnMilliseconds = dateActuelle - dateDebut;
      //const differenceEnJours = Math.round(differenceEnMilliseconds / (1000 * 60 * 60 * 24));
      if((indexListes==1||(indexListes==2))) { 
      const indexTacheRecherche = indexListes; // Remplacez par l'index que vous recherchez
      const tachesAvecIndexRecherche = taches.filter(tache => tache.indexListe === indexTacheRecherche);
      wip = tachesAvecIndexRecherche.length;}
    
      if (titreSelectionne === "TERMINE") {
        differenceEnMilliseconds = dateFinale - dateDebut;
       
      } else {
        differenceEnMilliseconds = dateActuelle - dateDebut;
       
      }
  
      differenceEnJours = Math.round(differenceEnMilliseconds / (1000 * 60 * 60 * 24));
  
            return { 
              differenceEnJours,
              indexTache: tache.indexTache,
              titre:tache.titre,
              Wip:wip
            
            }
          
        
        } 
      
    );
    

    return res.json(reponse);
  
   
  }catch (error) {
    return res.status(500).json({ error: "Une erreur s'est produite" });
  }
};
module.exports.modifierDateTache = async (req,res)=> {
  const { tache_id, date, dateFinal } =
    req.body;
  console.log(tache_id, date, dateFinal)
  const filtre = { _id: new ObjectID(tache_id) };
  try {
    await tacheModel.updateOne(filtre, {
      date: date,
      dateFinal: dateFinal
    });

    return res.status(201).json({
      message: "Mise à jour de tâche",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de au moment de supprimer les tâches",
    });
  }
}
module.exports.modifierDateTachefinal = async (req,res)=> {
  const { tache_id, dateFinal } =
    req.body;
  console.log(tache_id, dateFinal)
  const filtre = { _id: new ObjectID(tache_id) };
  try {
    await tacheModel.updateOne(filtre, {
      dateFinal: dateFinal
    });

    return res.status(201).json({
      message: "Mise à jour de tâche",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur de au moment de supprimer les tâches",
    });
  }
}

module.exports.getJoursAvecTaches = async (req, res) => {
  try{
    const {proprietaire, date} = req.body;
    const jours = []
    var dateDecoupe = date.split("-");
    const moisSelectionne = dateDecoupe[1]

    taches = await tacheModel.find({proprietaire})
    for(let i = 0; i < taches.length; i++){
      dateDecoupe = taches[i].date.split("-")
      mois = dateDecoupe[1];
      if(mois === moisSelectionne){
        jours.push(parseInt(dateDecoupe[2]));
        console.log(dateDecoupe[2])
      }
    }

    return res.json(jours);

  }catch (error) {
    return res.status(500).json({ error: "Une erreur s'est produite" });
  }
}

module.exports.Indicateur = async (req, res) => {
  try {
    const { proprietaire, titreSelectionne } = req.body;

    const taches = await tacheModel.find({ proprietaire }, 'indexListe indexTache dateFinal date');
    console.log(titreSelectionne);

    const getTitre = (indexListe) => {
      switch (indexListe) {
        case 0:
          return "BACKLOG";
        case 1:
          return "A FAIRE";
        case 2:
          return "ENCOURS";
        case 3:
          return "TERMINE";
        default:
          return "Inconnu";
      }
    };

    const reponse = taches.map((tache) => {
      const titre = getTitre(tache.indexListe);
      const dateDebut = new Date(tache.date);
      const dateFinale = new Date(tache.dateFinal);
      const dateActuelle = new Date();

      const index2 = taches.filter(tache => tache.indexListe === 2).length;
      const wip2 = index2; 
   
      if (titreSelectionne === titre) {
        let differenceEnMilliseconds, differenceEnJours;
    console.log(titre)
        if (titreSelectionne === 3) {
          differenceEnMilliseconds = dateFinale - dateDebut;
         
        } else {
          differenceEnMilliseconds = dateActuelle - dateDebut;
         
        }
    
        differenceEnJours = Math.round(differenceEnMilliseconds / (1000 * 60 * 60 * 24));
    
        return { differenceEnJours };
      } else {
        return {
          titre,
          indexTache: tache.indexTache,
          Wip:wip2,
       
        };
      }
    });

    return res.json(reponse);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur s'est produite" });
  }
};
