
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement("#root");

const Histogramme = () => {
  const chartRef = React.createRef();
  const [chart, setChart] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titreColonne, setTitreColonne] = useState([]);
  const [differenceEnJours, setDifferenceEnJoursArray] = useState([]);
  const [proprietaire, setProprietaire] = useState(localStorage.getItem("userId"));
  const [titreSelectionne, setTitreSelectionne] = useState(null);
  const [titreTaches,  setTitreTache] = useState(null);
 

  const buildChart = (differenceEnJours,titreTaches) => {
    const ctx = chartRef.current.getContext("2d");
    if (chart) {
      chart.destroy();
    }
    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: titreTaches,
        datasets: [
          {
            label: "JOURS",
            data: differenceEnJours,
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
            borderWidth: 2,
           
          },  
        ],
      },  
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    setChart(newChart)
  };

const handleTitleClick = async (titreSelectionne) => {
  try {  
    const response = await axios.post("http://localhost:8000/taches/metrique/", {proprietaire: proprietaire, titreSelectionne:titreSelectionne});
    console.log(response.data);
    
    const differencesArray = response.data.map((tache) => tache.differenceEnJours);
    setDifferenceEnJoursArray(differencesArray);
    const titreTaches = response.data.map((tache) => tache.titre);
    console.log(titreTaches)
    setTitreTache(titreTaches);
    buildChart(titreTaches,differencesArray);


  
    
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la liste :", error);
  }

  console.log(" titre selectionné :",titreSelectionne);
setTitreSelectionne(titreSelectionne)
  // Add your logic here, such as navigating to a specific page or fetching more details about the clicked title.
};
useEffect(() => {
  handleAfficherTitre();
 
}, []);
useEffect(() => {
  // Appeler buildChart avec les données initiales
  buildChart(differenceEnJours,titreTaches);
}, [differenceEnJours,titreTaches]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 

 

  const handleAfficherTitre = async () => {
    try {
      const response = await axios.post("http://localhost:8000/taches/indicateur", { proprietaire: proprietaire});
      console.log(response.data);
      setTitreColonne(response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };

  const customStyles = {
    content: {
      width: "11%", // Ajustez la largeur selon vos besoins
      height: "35%", // Ajustez la hauteur selon vos besoins
      margin: "auto",
    },
  };

  return (
    <div  className="buttons">
      <canvas ref={chartRef} />
      <button onClick={openModal}> Filtre </button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Exemple de boîte de dialogue" style={customStyles}>
        <h5>Titre de Colonne</h5>
        {/* Render unique titles in the modal */}
        <div className="btn-group-vertical">
          {Array.from(new Set(titreColonne.map((tache) => tache.titre))).map((uniqueTitle, index) => (
            <button className="btn btn-primary" key={index} onClick={() => handleTitleClick(uniqueTitle)}>
              {uniqueTitle}
            </button>
          ))}
        </div>
       
        <div>
        <button className="btn btn-primary" onClick={closeModal}>Retour</button>
        </div>
      </Modal>
    </div>
  );
};

export default Histogramme;
