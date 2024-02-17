import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

const EditTaskCard = (props) => {
  const [courriel, setCourriel] = useState("");
  const [mdp, setmdp] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setSelectedValue] = useState('');
  const [userId, setUserId] = useState('');
  let afficher = props.modifierItem;
  const navigate = useNavigate();
  const [erreurs, setErreurs] = useState({});
  const [verifmdp, setVerifmdp] = useState("");
  const [mouseDown, setMouseDown] = useState(false);


  const gererMouseDown = () => {
    setMouseDown(true);
  };
  const gererMouseUp = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    const userID = localStorage.getItem('userId');
    if (userID) {
      setUserId(userID);
    }
  }, []);

  const onClickFermer = (e) => {
    afficher = false
    props.fermerFentreModifier()
  }


  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  /*-----------------------------------------------------------------*/
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
    /*if (!verifmdp)
      lesErreurs.verifmdp = "Le mot de passe de confirmation est requis";
    if (verifmdp !== mdp)
      lesErreurs.verifmdp = "Mot de passe de confirmation erroné";*/
    return lesErreurs;
  };

  /**----------------------------------------------------------------------- */

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const lesErreurs = validerFormulaire();
    setErreurs(lesErreurs);
    console.log()
    // Vérifier s'il y a dess erreurs
    if (Object.keys(lesErreurs).length === 0) {
      try {    console.log("------------------------------------")
        // Soumettre  le formulaire
        const response = await axios.post(
          "http://localhost:8000/utilisateur/inscription",
          { prenom, nom, courriel, mdp, status, telephone, userId, message }
        );
        setMessage();
        console.log(response.data.message)
        if (response) {

          Toastify({
            text: response.data.message,
            duration: 4000,
          }).showToast();

        } else {
          Toastify({
            text: "Erreur lors de l'enregistrement",
            duration: 4000,
          });
        }
        props.miseAjourListe()
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

    <motion.div
      initial={{ opacity: 0 }}
      animate={afficher ? { opacity: 1 } : { opacity: 0 }}
      exit={false}
      transition={{ duration: 0.5 }}
    >

      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      ></link>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"
      ></script>
      <div className="carte-editer">
        <div className="container">
          <div className="row">
            <div className="col md-6">
              <h3>Ajouter un membre</h3>
            </div>
            <div className="col-2 mr-auto">
              <button className="bouton-supprimer"

                onClick={onClickFermer}
              >
                X
              </button>
            </div>
          </div>
          <form className=" mb-3" onSubmit={handleSubmit}>
            <div>Nom :</div>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  type="nom"
                  placeholder=""
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  style={{ width: "100%" }}

                />
                {erreurs.nom && (
                  <p className="erreur Champ Formulaire">{erreurs.nom}</p>
                )}
              </div>
              <div>
                <div>Prenoms :</div>
                <div>
                  <input
                    className="form-control"
                    type="prenom"
                    placeholder=""
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    style={{ width: "100%" }}

                  />
                  {erreurs.prenom && (
                    <p className="erreur Champ Formulaire">{erreurs.prenom}</p>
                  )}
                </div>
              </div>

              <div>
                <div> courriel :</div>
                <div>
                  <input
                    className="form-control"
                    type="courriel"
                    placeholder=""
                    value={courriel}
                    onChange={(e) => setCourriel(e.target.value)}
                  />
                  {erreurs.courriel && (
                    <p className="erreur Champ Formulaire">{erreurs.courriel}</p>
                  )}
                </div>
              </div>
              <div>
                <div>Mot de passe :</div>
                <div>
                  <input
                    className="form-control"
                    type="password"
              placeholder="Mot de passe"
                    value={mdp}
                    onFocus={gererMouseDown}
                    onBlur={gererMouseUp}
                    onChange={(e) => setmdp(e.target.value)}
                  />
                  {erreurs.verifmdp && (
                    <p className="erreurChampFormulaire">{erreurs.verifmdp}</p>
                  )}
                </div>
              </div>

              <div>
                <div>Titre :</div>
                <select
                  type="status"
                  className="form-select"
                  aria-label="Default select example"

                  value={status}
                  onChange={handleSelectChange}
                >
                  <option value="">Obligatoire</option>
                  <option value="Developpeur">Developpeur</option>
                  <option value="Scrum">Scrum</option>
                  <option value="Designer">Product Owner</option>
                </select>
              </div>

              <div>
                <div>Téléphone :</div>
                <div>
                  <input
                    className="form-control"
                    type="telephone"
                    placeholder=""
                    value={telephone}
                    onChange={handleTelephoneChange}
                  />
                  {erreurs.telephone && (
                    <p className="erreur Champ Formulaire">{erreurs.telephone}</p>
                  )}
                </div>
              </div>
              <br />
              <p></p>
              <div className="col">
                <button
                  className="btn btn-success" type="submit"

                >
                  Enregistrer
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>

    </motion.div>
  );
};

export default EditTaskCard;
