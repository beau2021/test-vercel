import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from 'react';
import axios from "axios";

const Accueil2 = () => {
    const [userName, setUserName] = useState('');

  useEffect(() => {
    const chargerNomUtilisateur = async () => {
      try {
        const userID = localStorage.getItem('userId');
        const UtilisateurInfo = await axios.get(`http://localhost:8000/utilisateur/${userID}`);
        const userData = UtilisateurInfo.data;
        const nomUtilisateur = userData.prenom;
        setUserName('Bonjour '+nomUtilisateur);
      } catch (err) {
        console.error(err);
      }
    };

    chargerNomUtilisateur();
  }, []);
    return (
        <div className="Accueil2-container">
            <h1 className="user-name">{userName}</h1>
            <div className="buttons-container">
                <div className="circle">
                <a href="/Documentation">
                    <button className="circular-button">
                        <img src="document.jpg" alt="Image 1" />
                    </button>
                    </a>
                    <h2>Documentation</h2>
                </div>
                <div className="circle">
                <a href="/kanban">
                    <button className="circular-button">
                        <img src="photo.jpg" alt="Image 2" />
                    </button>
                    </a>
                    <h2>Kanban</h2>
                </div>
                 <div className="circle">
                <a href="/Ajouter_User">
                    <button className="circular-button">
                        <img src=" tableauBord.png" alt="Image 3" />
                    </button>
                    </a>
                    <h2>Tableau de Bord</h2>
                </div>
                <div className="circle">
                <a href="/Profil">
                    <button className="circular-button">
                        <img src="profil.jpg" alt="Image 3" />
                    </button>
                    </a>
                    <h2> Profil </h2>
                </div>
            </div>
        </div>
    );
}

export default Accueil2;