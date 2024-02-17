import React, { useState } from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import axios from "axios";

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;
const Title = styled.span`
  color: #000c7b;
  background: #b7d2fd;
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const ColonneListe = (props) => {
  const [colonne, setColone] = useState(props.column.items);
  const [liste, setListe] = useState();
  const [isEditingTitre, setIsEditingTitre] = useState(false);
  //temp status
  const [nouvelleTache, setNouvelleTache] = useState("");

  //const [updateDonnee, setUpdateDonnee] = useState('');

  //ajouter tâche

  const ajouterTache = async (e) => {
    const userID = localStorage.getItem("userId");
    const tache = await axios.post(
      "http://localhost:8000/taches/nouvelleTache",
      {
        titre: nouvelleTache,
        description: "",
        responsable: "",
        proprietaire: userID,
        priority: "moyenne",
        indexListe: props.column.indexListe,
        date: "",
      }
    );
    props.demandeListeUser();
  };
  const onClickSupprimerListe = async (column) => {
    try {
      const supprimerListe = await axios.post(
        "http://localhost:8000/liste/supprimerListe",
        { idListe: props.column.id }
      );
      props.demandeListeUser();
    } catch {}
  };
  const doubleClickEditer = () => {
    setIsEditingTitre(true);
  };
  const handleBlur = () => {
    setIsEditingTitre(false);
  };
  const onKeyDownEditerNomColonne = async (event, colonne) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nouveauTitre = event.target.textContent;
      event.target.contentEditable = 'false';
      if (nouveauTitre === '') {
        //message alert
      } else {
        try {
          console.log(props.column)
          const editerTitre = await axios.post(
            "http://localhost:8000/liste/modNomListe",
            {
              idListe: props.column.id,
              titreListe: nouveauTitre,
            }
          );
        } catch {}
        props.demandeListeUser();
      }
    }
    event.target.contentEditable = 'true';
  };
  return (
    <Droppable key={props.column._id} droppableId={props.columnId}>
      {(provided, snapshot) => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
          <div className="container">
            <div className="row">
              <div className="col md-6">
                <Title onBlur={handleBlur}
                onKeyDown={(event) =>
                  onKeyDownEditerNomColonne(event, props.column)
                }
                contentEditable={true}>
                  {props.column.titre}
                </Title>
              </div>
              <div className="col-2 mr-auto">
                <button
                  className="btn-close"
                  onClick={onClickSupprimerListe}
                  onChange={(e) => setListe(props.column)}
                ></button>
              </div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col">
              <input
                value={nouvelleTache}
                onChange={(e) => setNouvelleTache(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={ajouterTache} className="btn btn-lg btn-primary">
                Ajouter Item
              </button>
            </div>
          </div>
          <br />

          {props.column.items.map((item, index) => (
            <TaskCard
              key={item._id}
              item={item}
              index={index}
              demandeListeUser={props.demandeListeUser}
            />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  );
};

export default ColonneListe;
