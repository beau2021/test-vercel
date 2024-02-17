//import React from 'react';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


const Tableau = () => {
  const [proprietaire, setProprietaire] = useState(localStorage.getItem("userId"));
  const [titre, setTitre] = useState(null);

  const handleTitleClick = async () => {

    console.log(proprietaire);

    try {
      const response = await axios.post("http://localhost:8000/taches/metrique/", { proprietaire: proprietaire, titreSelectionne:"BACKLOG" });
      console.log(response.data);

      const titreBacklog = response.data.map((tache) => tache.titre);
      setTitre(titreBacklog);

    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i <= 5; i++) {
    
      rows.push(
        <tr key={i}>
          <td >{i}</td>
          <td>{titre && titre[i]}</td>
          <td>{titre && titre[i + 5]}</td>
          <td>{titre && titre[i + 10]}</td>
        </tr>
       
      );
    }
    return rows;
  };

  return (
    <div>
       <div className="buttons">
         <button onClick={handleTitleClick}>Afficher</button>
         </div>
      <table className="styled-table">
        <thead>
          <tr>
          <th>N°</th>
            <th>Backlog</th>
            <th>Backlog</th>
            <th>Backlog</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
     

</div>

  );
};

export default Tableau;
