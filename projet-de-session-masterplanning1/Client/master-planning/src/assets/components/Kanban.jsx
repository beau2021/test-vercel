import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { DragDropContext } from "react-beautiful-dnd";
import ColonneListe from "./ColonneListe";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { set } from "date-fns";

const Container = styled.div`
  display: flex;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

function Kanban() {
  const [columns, setColumns] = useState([]);
  const [requeteDejaFait, setRequeteDejaFait] = useState(false);
  const [nouvelleListe, setNouvelleListe] = useState("");
  const verrouillerMiseAJour = useRef(false);
  const requestMade = useRef(false);
  const navigate = useNavigate();

  const accueil = () => {
    navigate("/Accueil2");
  };
  const documentation = () => {
    navigate("/Documentation");
  };
  const profil = () => {
    navigate("/profil");
  };
  const calendrier = () => {
    navigate("/Calendrier");
  };
  const tableau = () => {
    navigate("/Ajouter_User");
  };

  const demandeListeUser = async (e) => {
    try {
      const userID = localStorage.getItem("userId");
      const listesBD = await axios.post("http://localhost:8000/liste/userId", {
        userID: userID,
      });
      const colu = listesBD.data;
      try {
        const userID = localStorage.getItem("userId");
        const taches = [];
        for (let i = 0; i < colu.length; i++) {
          const resultatRequete = await axios.post(
            "http://localhost:8000/taches/tachesParId",
            { userID: userID, indexListe: colu[i].indexListe }
          );
          const tacheCol = resultatRequete.data;
          for (let j = 0; j < tacheCol.length; j++) {
            taches.push(tacheCol[j]);
          }
        }
        //fonction pour comparer deux valeurs index
        function comparerIndex(a, b) {
          return a.indexTache - b.indexTache;
        }
        taches.sort(comparerIndex);
        const colonneAvecTaches = colu.map((liste) => {
          const tacheDeLaListe = taches.filter(
            (tache) => tache.indexListe === liste.indexListe
          );

          return {
            id: liste._id,
            titre: liste.titreListe,
            items: tacheDeLaListe,
            indexListe: liste.indexListe,
          };
        });

        setColumns(colonneAvecTaches);
      } catch (err) {}
    } catch (err) {}
  };

  useEffect(() => {
    if (!requestMade.current) {
      demandeListeUser();
      requestMade.current = true;
    }
  }, [requeteDejaFait]);

  const ajouterListe = async (e) => {
    const userID = localStorage.getItem("userId");
    const liste = await axios.post(
      "http://localhost:8000/liste/setNouvelleListe",
      {
        titreListe: nouvelleListe,
        proprietaire: userID,
      }
    );
    setRequeteDejaFait(false);

    if (!requeteDejaFait) {
      demandeListeUser();

      setRequeteDejaFait(true);
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      //console.log(destination.droppableId)//position colonne
      console.log(result);
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      //console.log(destination.index)//position de la liste
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      //méthode pour vérifier la position indexListe 0 et indexListe.size-1
      miseAJourDateDeplacement(result);
      //envoyer à la bd
      mettreAJourListe({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
      //envoyer à la bd
      mettreAJourListe({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  const mettreAJourListe = async (col) => {
    const userID = localStorage.getItem("userId");
    //locker de mise à jour de listes
    while (true) {
      if (!verrouillerMiseAJour.current) {
        verrouillerMiseAJour.current = true;
        try {
          const resultatRequete = await axios.post(
            "http://localhost:8000/taches/modIndexTaches",
            {
              userID: userID,
              colonnes: col,
            }
          );
          if (resultatRequete.data.message) {
            verrouillerMiseAJour.current = false;
          }
        } catch (err) {
          verrouillerMiseAJour.current = false;
        }
        demandeListeUser();
        break;
      }
    }
  };
  const miseAJourDateDeplacement = (result) => {
    const destination = result.destination.droppableId;
    const idItem = result.draggableId;

    const dateActuelle = new Date();

    // Obtenir le jour du mois (de 1 à 31)
    const jour = dateActuelle.getDate();

    // Obtenir le mois (de 0 à 11, où 0 correspond à janvier)
    const mois = dateActuelle.getMonth() + 1; // Ajouter 1 car les mois commencent à 0

    // Obtenir l'année
    const annee = dateActuelle.getFullYear();

    // Afficher la date d'aujourd'hui au format "YYYY-MM-DD"
    const dateAujourdhui = `${annee}-${mois < 10 ? "0" : ""}${mois}-${
      jour < 10 ? "0" : ""
    }${jour}`;
    if (destination === "0") {
      requeteModifierPremierColonne(dateAujourdhui, idItem);
    } else if (destination === "3") {
      requeteModifierDernierCol(dateAujourdhui, idItem);
    } else {
      requeteModifierResteCol(dateAujourdhui, idItem);
    }
  };

  const requeteModifierPremierColonne = async (date, idItem) => {
    console.log("test colonne début");
    try {
      const resultatRequete = await axios.post(
        "http://localhost:8000/taches/modDateTache",
        {
          date: "",
          dateFinal: "",
          tache_id: idItem,
        }
      );
    } catch (err) {}
  };

  const requeteModifierDernierCol = async (date, idItem) => {
    console.log("test colonne final");
    try {
      const resultatRequete = await axios.post(
        "http://localhost:8000/taches/modDateTacheFinal",
        {
          dateFinal: date,
          tache_id: idItem,
        }
      );
    } catch (err) {}
  };

  const requeteModifierResteCol = async (date, idItem) => {
    console.log("test colonne mileu");
    try {
      const resultatRequete = await axios.post(
        "http://localhost:8000/taches/modDateTache",
        {
          date: date,
          dateFinal: "",
          tache_id: idItem,
        }
      );
    } catch (err) {}
  };
  return (
    <div className="container-fluid div-kanban">
      <div className="row">
        <div className="panneau-lateral">
          <div className="container align-self-center container-div">
            <div className="row align-items-center p-3">
              <div className="col text-center align-items-center">
                <div className="menu-kanban">
                  <h4>Menu</h4>
                  <div className="btn-group-vertical">
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={accueil}
                    >
                      Accueil
                    </button>
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={tableau}
                    >
                      Tableau de Bord
                    </button>
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={calendrier}
                    >
                      Calendrier
                    </button>
                    <button className="btn btn-lg btn-primary" onClick={profil}>
                      Profil
                    </button>
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={documentation}
                    >
                      Documentation
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center p-3">
              <div className="col text-center align-items-center">
                <div className="creer-liste">
                  <div className="input-liste">
                    <input
                      className="form-control form-control-lg"
                      value={nouvelleListe}
                      onChange={(e) => setNouvelleListe(e.target.value)}
                    />
                  </div>
                  <div className="bouton-creer-liste" onClick={ajouterListe}>
                    <div className="plus-sign">Nouvelle liste</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 div-static"></div>
        <div className="col-4">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <Container>
              <TaskColumnStyles>
                {Object.entries(columns).map(([columnId, column]) => {
                  return (
                    <div className="none">
                      <ColonneListe
                        columnId={columnId}
                        column={column}
                        demandeListeUser={demandeListeUser}
                      ></ColonneListe>
                    </div>
                  );
                })}
              </TaskColumnStyles>
            </Container>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Kanban;
