import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ListeTache from "./ListeTaches";

const EditTaskCard = (props) => {
  const [titre, setTitre] = useState(props.item.titre);
  const [date, setDate] = useState(props.item.date);
  const [dateFinal, setDateFinal] = useState(props.item.dateFinal);
  const [description, setDescription] = useState(props.item.description);
  const [priority, setPriority] = useState(props.item.priority);
  const [idResponsable, setIdResponsable] = useState(props.item.responsable);
  const [responsable, setResponsable] = useState("");
  const [listeUtilisateur, setListeUtilisateur] = useState([]);
  const [requeteDejaFait, setRequeteDejaFait] = useState(false);
  let afficher = props.modifierItem;

  // créer une liste et le boucle pour afficher les responsables
  const demandeListeResponsable = async (e) => {
    const userId = localStorage.getItem("userId");
    try {
      const listeReponse = await axios.post(
        `http://localhost:8000/utilisateur/getUser/${userId}`
      );
      setListeUtilisateur(listeReponse.data);
    } catch (err) {}
  };
  const obtenirUtilisateur = async (e) => {
    const userID = idResponsable;
    try {
      const reponse = await axios.get(
        `http://localhost:8000/utilisateur/${userID}`
      );

      const nomResponsable = `${reponse.data.prenom} ${reponse.data.nom}`;
      setResponsable(nomResponsable);
    } catch (err) {}
  };

  const onClickFermerCarte = (e) => {
    afficher = false;
    props.envoyerVariableAfficher(afficher);
  };
  const onclickEditerTache = async (e) => {
    try {
      const tache = await axios.post(
        "http://localhost:8000/taches/modifierTache",
        {
          titre: titre,
          description: description,
          responsable: idResponsable,
          priority: priority,
          date: date,
          dateFinal: dateFinal,
          tache_id: props.item._id,
        }
      );
      props.demandeListeUser();
      afficher = false;
      props.envoyerVariableAfficher(afficher);
    } catch (err) {}
  };

  const handleChangementDate = (e) => {
    const formaterInput = formaterDate(e.target.value);
    setDate(formaterInput);
  };
  const handleChangementDateFinal = (e) => {
    const formaterInput = formaterDate(e.target.value);
    setDateFinal(formaterInput);
  };
  const formaterDate = (input) => {
    const cleanedInput = input.replace(/\D/g, "");

    if (cleanedInput.length <= 4) {
      return cleanedInput;
    } else if (cleanedInput.length <= 6) {
      return `${cleanedInput.slice(0, 4)}-${cleanedInput.slice(4)}`;
    } else {
      return `${cleanedInput.slice(0, 4)}-${cleanedInput.slice(
        4,
        6
      )}-${cleanedInput.slice(6, 8)}`;
    }
  };
  useEffect(() => {
    if (!requeteDejaFait) {
      obtenirUtilisateur();
      demandeListeResponsable();
      setRequeteDejaFait(true);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={afficher ? { opacity: 1 } : { opacity: 0 }}
      exit={false}
      transition={{ duration: 0.5 }}
    >
      <div className="carte-editer">
        <div className="container">
          <div className="row">
            <div className="col md-6">
              <h3>Éditer item</h3>
            </div>
            <div className="col-2 mr-auto">
              <button
                className="btn-close"
                onClick={onClickFermerCarte}
              ></button>
            </div>
          </div>

          <div className="row gx-4 p-2">
            <div className="row p-2">
              <div>Nom item:</div>
              <div>
                <input
                  className="form-control form-control-md"
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-2">
              <div>Date Début:</div>
              <div>
                <input
                  className="form-control form-control-md"
                  type="text"
                  value={date}
                  onChange={(e) => handleChangementDate(e)}
                />
              </div>
            </div>
            <div className="row p-2">
              <div>Date Final:</div>
              <div>
                <input
                  className="form-control form-control-md"
                  type="text"
                  value={dateFinal}
                  onChange={(e) => handleChangementDateFinal(e)}
                />
              </div>
            </div>
            <div className="row p-2">
              <div>Description:</div>
              <div>
                <textarea
                  className="form-control form-control-md"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-2">
              <div>Priorité:</div>
              <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Haut">Haut</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Bas">Bas</option>
                </select>
              </div>
            </div>
            <div className="row p-2">
              <div>Responsables:</div>
              <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={idResponsable}
                  onChange={(e) => setIdResponsable(e.target.value)}
                >
                  {listeUtilisateur.map((utilisateur) => (
                    <option value={utilisateur.userID_Dev}>
                      {utilisateur.prenom} {utilisateur.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />

            <div className="row p-2">
              <div>
                <button
                  className="btn btn-lg btn-primary"
                  onClick={onclickEditerTache}
                >
                  Éditer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditTaskCard;
