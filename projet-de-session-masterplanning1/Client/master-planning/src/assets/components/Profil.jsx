import React, { useState, useEffect } from "react";
import axios from "axios";
import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

function Profil() {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mdp, setMDP] = useState("");
  const [verif_MDP, setVerifMDP] = useState("");
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    const userID = localStorage.getItem("userId");

    axios
      .get(`http://localhost:8000/utilisateur/${userID}`)
      .then((response) => {
        const userData = response.data;
        setPrenom(userData.prenom);
        setNom(userData.nom);
        setCourriel(userData.courriel);
        setTelephone(userData.telephone);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //   const verifierFormulaire = () => {
  //     if (mdp !== verif_MDP) {
  //       console.log("Non");
  //       return false;
  //     } else console.log("Ok");
  //     return true;
  //   };
  const verifierFormulaire = () => {
    const regexNumeroTel = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const lesErreurs = {};
    if (mdp !== verif_MDP) {
      console.log("Non");
      lesErreurs.mdp = "Mot de passe de confirmation incorrect!";
    }
    if (telephone && !regexNumeroTel.test(telephone)) {
      lesErreurs.telephone = "Format invalide!";
    }
    return lesErreurs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


      


    //Validation du formulaire
    // const verification = verifierFormulaire();
    const lesErreurs = verifierFormulaire();
    setErreurs(lesErreurs);
    // if (verification) {
    if (Object.keys(lesErreurs).length === 0) {
      try {
        const userID = localStorage.getItem("userId");
        console.log(userID);
        const listesBD = await axios.patch(
          "http://localhost:8000/utilisateur/:id",
          { nom, prenom, courriel, telephone, mdp, userID: userID }
        );
        if (listesBD.status === 200) {
          Toastify({
            text: "Informations changées avec succès",
            duration: 3000,
          }).showToast();
        } else {
          Toastify({
            text: "Mot de passe invalide",
            duration: 3000,
          }).showToast();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      Toastify({
        text: "Formulaire invalide",
        // text: "Les mots de passe ne sont pas identiques",

        duration: 3000,
      }).showToast();
    }

    //const demandeListeUser = async () => {
  };

  return (
    <div className="profil-page">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      ></link>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"
      ></script>

            <div className='profil-infos'>
                <form onSubmit={handleSubmit}>


                    {}
             
 
                <h1 className="profil-titre">Profil</h1>
                <div className='form-group'>
 
                    <label>Prénom</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        style={{ width: '100%'}}
                    />
                </div>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
 
                <div className='form-group'>
                    <label>Courriel</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Courriel"
                        value={courriel}
                        onChange={(e) => setCourriel(e.target.value)}
                    />
                </div>
 
                <div className='form-group'>
                    <label>Téléphone</label>
                    <input
                        className="form-control"
                        type='tel'
                        placeholder="Téléphone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </div>
 
                <hr className = "profil-ligne"/>
                <div className='form-group'>
                    <label>Entrez votre mot de passe</label>
 
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Mot de passe"
                        value={mdp}
                        onChange={(e) => setMDP(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Confirmez votre mot de passe</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Mot de passe"
                        value={verif_MDP}
                        onChange={(e) => setVerifMDP(e.target.value)}
                    />
                </div>
                <br />
 
                <div className='text-center mb-3'>
                    <button className="btn btn-success "
                        type="submit">
                        Modifier
                    </button>
                </div>
 
                </form>
            </div>
        </div>
    )
}
export default Profil;
