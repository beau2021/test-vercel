import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import EditTaskCard from "./EditerCarte";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 440px;
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

const TaskCard = (props) => {
  const [boutonSupprimerVisible, serBoutonSupprimerVisible] = useState(false);
  const [tache, setTache] = useState();
  const [selected, setSelected] = useState(false);
  const [modifierItem, setModifierItem] = useState(false);
  const [animationEditCarte, setAnimationEditCarte] = useState(false);

  const handleClick = () => {
    if (!selected) {
      setSelected(true);
      serBoutonSupprimerVisible(true);
    } else {
      setSelected(false);
      serBoutonSupprimerVisible(false);
      setAnimationEditCarte(false);
      setTimeout(function () {
        setModifierItem(false);
      }, 700);
    }
  };
  const onClickSupprimerTache = async (e) => {
    const resultatRequete = await axios.post(
      "http://localhost:8000/taches/supprimerTache",
      {
        tache_id: props.item._id,
      }
    );
    props.demandeListeUser();
  };
  const onClickModifierTache = async (e) => {
    setAnimationEditCarte(true);
    setModifierItem(true);
  };
  const envoyerVariableAfficher = (data) => {
    setAnimationEditCarte(false);
    setTimeout(function () {
      setModifierItem(false);
    }, 700);
  };
  return (
    <div>
      <Draggable
        key={props.item._id}
        draggableId={props.item._id}
        index={props.index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskInformation
              onDoubleClick={handleClick}
              style={{
                boxShadow: selected ? "5px 5px 5px black" : "1px 1px 1px black",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col md-6">
                    <p>{props.item.titre}</p>
                  </div>
                  <div className="col-2 mr-auto">
                    {boutonSupprimerVisible && (
                      <button
                        className="btn-close"
                        onClick={onClickSupprimerTache}
                        onChange={(e) => setTache(props.item)}
                      ></button>
                    )}
                  </div>
                </div>
              </div>

              <div className="secondary-details">
                <p>
                  <span>Date Début:</span>
                  <span> {props.item.date}</span>
                  <br />
                  <span>Date Final:</span>
                  <span> {props.item.dateFinal}</span>
                  <br />
                  Description:
                  <br />
                  <span>{props.item.description}</span>
                  <br />
                  <span>
                    <span>Priorité: </span>
                    {props.item.priority}
                  </span>
                  <br />
                  {boutonSupprimerVisible && (
                    <div className="space-bouton">
                      <button
                        className="bouton-modifier"
                        onClick={onClickModifierTache}
                        onChange={(e) => setTache(props.item)}
                      >
                        Modifier item
                      </button>
                    </div>
                  )}
                </p>
              </div>
            </TaskInformation>
          </div>
        )}
      </Draggable>
      {modifierItem && (
        <EditTaskCard
          envoyerVariableAfficher={envoyerVariableAfficher}
          item={props.item}
          modifierItem={animationEditCarte}
          demandeListeUser={props.demandeListeUser}
        />
      )}
    </div>
  );
};

export default TaskCard;
