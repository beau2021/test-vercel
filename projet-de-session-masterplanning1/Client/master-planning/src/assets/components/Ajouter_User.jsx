import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
//import React, { useState, useEffect} from 'react';
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import Histogramme from "./Histogramme";
import Ajouter_UPage from "./Ajouter_UEditeCarte";
import Recherche from "./RechercheNotes";
import Tableau from "./Tableau";
import EquipeDeveloppeur from './Gest_Equipe';
import ListeTache from './ListeTaches';
import Toastify from "toastify-js";

function Ajouter_User() {
  const [modifierItem, setModifierItem] = useState(false);
  const [modifierNotes, setModifierNotes] = useState(false);
  const [listeUser, setListeUser] = useState([])
  const [texte, setTexte] = useState('');
  const [userId, setValidation] = useState(localStorage.getItem('userId'));  /**----- **/
  const [taches, setTaches] = useState('');
  const [texte1, setTexte1] = useState('');
  const [reponse_titre, setSelectedBook] = useState([]);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [titre, setTitre] = useState("");
  const [valeur, setValeur] = useState("");
  const [TitreColonne, setTitreColonne] = useState("");
  const kanban = () => { navigate('/kanban'); };
  const documentation = () => { navigate('/Documentation'); };
  const profil = () => { navigate('/profil'); };
  const calendrier = () => { navigate('/Calendrier'); };

  const navigate = useNavigate();


  /*---- */
  const handleChange = (e) => {
    setTexte(e.target.value);
  };
  const afficherFenetre = (e) => {
    setModifierItem(true)
  };

  const fermerFentreModifier = (e) => {
    setModifierItem(false)
  }


  const faireMiseAJour = (nouvelleListe) => {
    // Faites ce que vous devez faire avec la liste mise à jour
    console.log("Liste mise à jour :", nouvelleListe);

    // Par exemple, mettez à jour l'état local
    setListeUser(nouvelleListe);
  };
  const handleAfficherTitre = async (userID_Dev) => {
    try {
      const proprietaire = userId
      setTitre('')

      const reponse = await axios.post(
        //  'http://localhost:8000/utilisateur/getUser/:userId',{validation :validation}
        `http://localhost:8000/taches/indicateur`, { proprietaire: proprietaire }
      );
      console.log(reponse.data);
      setTitreColonne(reponse.data)

    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };
  /*-----------------------------------------------------------*/
  const handleAfficherDetails = async (userID_Dev) => {
    try {
      const proprietaire = userId
      setTaches('')

      const reponse = await axios.post(

        `http://localhost:8000/taches/`, { proprietaire: proprietaire, userID: userID_Dev }
      );
      console.log(reponse.data);
      console.log(userID_Dev);
      console.log(userId);
      setTaches(reponse.data)

    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };
  /*---GESTION DES NOTES --------------- */
  const afficherFNotes = (e) => {
    setModifierNotes(true)
  };
  const fermerFenetreNotes = (e) => {
    setModifierNotes(false)
  }
  const handleSelectChange = (e) => {
    const titre = e.target.value;

    // Effectuez une requête pour obtenir les détails du livre sélectionné
    axios.post('http://localhost:8000/titre/', { titre })
      .then((response) => {
        const bookData = response.data;
        setSelectedBook(bookData);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails du livre :', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Soumettre le formulaire
      const response = await axios.post(
        "http://localhost:8000/note/informationNotes",
        { description, titre, userId })

      if (response.status === 200) {
        Toastify({
          text: response.data.message,
          duration: 3000,
        }).showToast();
      }
      else {
        Toastify({
          text: response.data.message,
          duration: 3000,
        }).showToast();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /*---------GESTION DE LISTE PREMIERE COLONNE */
  const miseAjourListe = async () => {
    try {

      const response = await axios.post(

        `http://localhost:8000/utilisateur/getUser/${userId}`
      );

      // Mise à jour de la liste des utilisateurs
      const userList = response.data;
      console.log(userList);
      // Appel de la fonction faireMiseAJour avec la liste mise à jour
      faireMiseAJour(userList);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };
  useEffect(() => {
    // Appel initial pour obtenir la liste
    miseAjourListe();
  }, []);




  const handleSupprimerUtilisateur = async (userID_Dev) => {
    try {


      const reponse = await axios.post(
        //  'http://localhost:8000/utilisateur/getUser/:userId',{validation :validation}
        `http://localhost:8000/utilisateur/delete/:`, { userId: userID_Dev }
      );
      miseAjourListe();

      console.log(reponse.message);
      //setReq(reponse.data);
    } catch (error) {
      console.log(`Supprimer noooooo l'utilisateur ${listeUser.nom}`);
    }

  };
  /*----------------------------------------------------------*/
  const handleChange1 = (e) => {
    setValeur(e.target.value);
  };

  const handleClick = async (info) => {
    try {
      const proprietaire = userId
      setValeur('')

      const reponse = await axios.post(

        `http://localhost:8000/taches/indicateur`, { proprietaire: proprietaire }
      );
      console.log(info);

      const differencesArray = reponse.data.map((valeurs) => {
        switch (info) {
          case 'Wip':
            return valeurs[info]; // Exemple de condition pour le bouton 'Wip'
          case 'SLE':
            return valeurs[info] > 10 ? valeurs[info] : 0; // Exemple de condition pour le bouton 'SLE'
          // Ajoutez d'autres conditions selon vos besoins
          default:
            return valeurs[info];
        }
      });


      console.log(differencesArray);

      if (differencesArray !== undefined && differencesArray.length > 0) {
        setValeur(differencesArray[0]);
      } else {
        console.error(`Aucune correspondance trouvée pour l'info : ${info}`);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
    console.log(`Clic sur le bouton ${info}`);
  };

  const boutons = [
    { info: 'Wip', placeholder:  'WIP' },
    { info: 'SLE ', placeholder: 'SLE' },
    { info: 'AGE ', placeholder: 'AGE' },
    { info: 'DEB ', placeholder: 'DEB' },
    { info: 'SLA ', placeholder: 'SLA' },
    { info: 'SLE ', placeholder: 'SLE' },
  
  ];


  return (
    <div className="main-container">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      ></link>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"
      ></script>
      {modifierItem && <Ajouter_UPage modifierItem={modifierItem} miseAjourListe={miseAjourListe} fermerFentreModifier={fermerFentreModifier}></Ajouter_UPage>}
      <div className="column">
        <div className="box">
          <h5> Gestionnaire d'équipe</h5>
          <div className="buttons">
            <button onClick={afficherFenetre}>Ajouter</button>

          </div>

        </div>

        <div className="box" style={{ width: '98%', height: '35%' }} >
          <h5>Equipe Développeur</h5>
          <EquipeDeveloppeur listeUser={listeUser} afficherDetails={handleAfficherDetails} supprimerUtilisateur={handleSupprimerUtilisateur} />
        </div>
        <div className="box"
          style={{ width: '98%', height: '49%' }} >
          <h5>Details</h5>
          <ListeTache taches={taches} />
        </div>
      </div>
      <div className="column">
        <div className="box">
          <h5>Backlog</h5>
          <Tableau />
        </div>
        <div className="box">
          <h5>Bloc Notes</h5>
          {modifierNotes && <Recherche modifierNotes={modifierNotes} handleSelectChange={handleSelectChange} fermerFenetreNotes={fermerFenetreNotes}></Recherche>}
          <div className="buttons">
            <form className=" mb-3" onSubmit={handleSubmit}>
              <div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  style={{ width: "100%" }}
                />
                <br></br>
                <div style={{ textAlign: 'right' }}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Bloc Notes"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", height: 100 }}
                  />
                  <br></br>
                  <button className="btn btn-success" type="submit">Sauvegarder</button>

                </div>
              </div>
            </form>
            <button onClick={afficherFNotes}>Rechercher</button>

          </div>

        </div>
      </div>
      <div className="column">
        <div className="box">
          <h5>Histogramme de Planning</h5>
          <Histogramme />

        </div>

        <div className="box">
          <h5>Accès</h5>
          <div className="buttons">
            <button onClick={kanban}>kanban</button>
            <button onClick={documentation}>documentation</button>
            <button onClick={profil}>profil</button>
            <button onClick={calendrier}>Calendrier</button>
          </div>
        </div>

        <div>
        <div className="box">
      {/* Première rangée de boutons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} className="buttons">
        {boutons.slice(0, 3).map((bouton, index) => (
          <button key={index} className="btn btn-success" type="button" onClick={() => handleClick(bouton.info)}>
            {bouton.placeholder}
          </button>
        ))}
      </div>

      {/* Deuxième rangée de boutons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} className="buttons">
        {boutons.slice(3, 6).map((bouton, index) => (
          <button key={index + 3} className="btn btn-success" type="button" onClick={() => handleClick(bouton.info)}>
            {bouton.placeholder}
          </button>
        ))}
      </div>

      {/* Zone d'affichage en dessous */}
      <div>
        <input type="text" value={valeur} onChange={handleChange1} />
        {/* Ajoutez ici votre zone d'affichage */}
      </div>
    </div>
        </div>
      </div>
    </div>


  );
}

export default Ajouter_User;