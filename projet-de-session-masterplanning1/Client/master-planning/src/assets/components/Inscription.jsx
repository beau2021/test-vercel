import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { colors } from "@mui/material";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

function Inscription() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [username, setUsername] = useState("");
  const [courriel, setCourriel] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mdp, setmdp] = useState("");
  const [verifmdp, setVerifmdp] = useState("");
  const [message, setMessage] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [mouseDown, setMouseDown] = useState(false);

  const navigate = useNavigate();

  const gererMouseDown = () => {
    setMouseDown(true);
  };
  const gererMouseUp = () => {
    setMouseDown(false);
  };



  const validerFormulaire = () => {
    const lesErreurs = {};
    const regexNumeroTel = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexMdp = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/; // Au moins 8 caractères, une majuscule, puis un caractères spécial.

    if (!nom) lesErreurs.nom = "Le nom est requis";
    if (!prenom) lesErreurs.prenom = "Le prénom est requis";
    if (!courriel) {
      lesErreurs.courriel = "Le courriel est recquis";
    } else if (!regexEmail.test(courriel)) {
      lesErreurs.courriel = "Le courriel n'est pas valide";
    }
    if (!telephone) {
      lesErreurs.telephone = "Le Numréro de téléphone est recquis";
    } else if (!regexNumeroTel.test(telephone)) {
      lesErreurs.telephone =
        "Saisissez un numéro de téléphone du format XXX-XXX-XXXX";
    }
    if (!mdp) {
      lesErreurs.mdp = "Le Mot de passe est recquis";
    } else if (!regexMdp.test(mdp)) {
      lesErreurs.mdp = "Saisissez un mot de passe valide";
    }
    if (!verifmdp)
      lesErreurs.verifmdp = "Le mot de passe de confirmation est requis";
    if (verifmdp !== mdp)
      lesErreurs.verifmdp = "Mot de passe de confirmation erroné";
    return lesErreurs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du formulaire
    const lesErreurs = validerFormulaire();
    setErreurs(lesErreurs);

    // Vérifier s'il y a dess erreurs
    if (Object.keys(lesErreurs).length === 0) {
      try {
        // Soumettre le formulaire
        const response = await axios.post(
          "http://localhost:8000/utilisateur/inscription",
          { prenom, nom, courriel, mdp, telephone, message }
        );
        setMessage(response.data.message);
        if (response) {
          //console.log(response);
          Toastify({
            text: response.data.message,
            duration: 3000,
          }).showToast();
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          Toastify({
            text: "Erreur lors de l'enregistrement",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
        Toastify({
          text: error.response.data.message,
          duration: 3000,
        }).showToast();
        setMessage("Échec de la connexion");
      }
    }
  };

  const formatTelephone = (input) => {
    const cleanedInput = input.replace(/\D/g, '');

    // Vérifier la longueur pour savoir où ajouter le tiret
    if (cleanedInput.length <= 3) {
      return cleanedInput;
    } else if (cleanedInput.length <= 6) {
      return `${cleanedInput.slice(0, 3)}-${cleanedInput.slice(3)}`;
    } else {
      return `${cleanedInput.slice(0, 3)}-${cleanedInput.slice(3, 6)}-${cleanedInput.slice(6, 10)}`;
    }
  };

  const handleTelephoneChange = (e) => {
    const formattedInput = formatTelephone(e.target.value);
    setTelephone(formattedInput);
  };
  return (
    <div className="auth-container d-flex justify-content-center div-isncription">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      ></link>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"
      ></script>
      <div className="auth-comp border w-50 w-md-75 w-lg-50 rounded p-4 p-sm-3">
        <h1
          className="d-flex justify-content-center"
          style={{ color: "#326dd4" }}
        >
          Page d'Inscription
        </h1>
        <form className=" mb-3" onSubmit={handleSubmit}>
          {/* <div class='d-inline-block 'style={{ marginRight: '40%'}}> */}
          <div className="form-group">
            <label>Prénom</label>
            <input
              className="form-control"
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              style={{ width: "100%" }}
            />
            {erreurs.prenom && (
              <p className="erreurChampFormulaire">{erreurs.prenom}</p>
            )}
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input
              className="form-control"
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              style={{ width: "100%" }}
            />
            {erreurs.nom && (
              <p className="erreurChampFormulaire">{erreurs.nom}</p>
            )}
          </div>

          <div className="form-group">
            <label>Courriel</label>
            <input
              className="form-control"
              type="text"
              placeholder="Courriel"
              value={courriel}
              onChange={(e) => setCourriel(e.target.value)}
            />
            {erreurs.courriel && (
              <p className="erreurChampFormulaire">{erreurs.courriel}</p>
            )}
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input
              className="form-control"
              type="tel"
              placeholder="XXX-XXX-XXXX"


              value={telephone}
              onChange={handleTelephoneChange}

            />
            {erreurs.telephone && (
              <p className="erreurChampFormulaire">{erreurs.telephone}</p>
            )}
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              className="form-control"
              type="password"
              placeholder="Mot de passe"
              value={mdp}
              onFocus={gererMouseDown}
              onBlur={gererMouseUp}
              onChange={(e) => setmdp(e.target.value)}
            />
            {erreurs.mdp && (
              <p className="erreurChampFormulaire">{erreurs.mdp}</p>
            )}
          </div>
          <div className="form-group">
            <label>Confirmez votre mot de passe</label>
            <input
              className="form-control"
              type="password"
              placeholder="Mot de passe"
              value={verifmdp}
              onFocus={gererMouseDown}
              onBlur={gererMouseUp}
              onChange={(e) => setVerifmdp(e.target.value)}
            />
            {erreurs.verifmdp && (
              <p className="erreurChampFormulaire">{erreurs.verifmdp}</p>
            )}
          </div>

          {mouseDown && (
            <div className="form-group">
              <p>Critères pour le mot de passe :</p>
              <ul>
                <li>Au moins 8 caractères.</li>
                <li>Au une lettre majuscule.</li>
                <li>Au moins un caractère spécial ex: (!,@,#,$,%,?,...).</li>
              </ul>
            </div>
          )}

          <div>
            <button className="btn btn-primary" type="submit">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Inscription;
