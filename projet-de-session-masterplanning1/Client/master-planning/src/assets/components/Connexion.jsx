import React, { useState } from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Toastify from "toastify-js";

import { Link, useNavigate } from "react-router-dom";

function Connexion() {
  const navigate = useNavigate();

  const [courriel, setcourriel] = useState("");
  const [userId, setText] = useState("");
  const [mdp, setmdp] = useState("");

  const linkButtomConnecter = () => {
    navigate("/inscription");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8000/utilisateur/login",
        { courriel, mdp },

        { headers: { "Content-Type": "application/json" } }
      );


      localStorage.setItem("monToken", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("validation", response.data.validation);
      const test = localStorage.getItem("validation")
     
      console.log(test)
      if (response) {
        Toastify({
          text: response.data.message,

          duration: 3000,
        }).showToast();

        setTimeout(() => {
          if(test=="undefined"){
            navigate("/Accueil2");
         }else{
          navigate("/Index");
         }
        }, 3000);
      } else {
        Toastify({
          text: "Mauvais identifiant ou mot de passe",

          duration: 3000,
        });
      }
    } catch (err) {
      Toastify({
        text: err.response.data.message,

        duration: 3000,
      }).showToast();
    }
  };

  return (
    // <div className='auth-container d-flex justify-content-center'>

    <div className="connexionCorps">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      ></link>

      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"
      ></script>

      <div className="auth-comp w-50 w-md-75 w-lg-50 rounded p-4 p-sm-3 blockConnexion">
        <h1 className="d-flex justify-content-center">Connexion</h1>

        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Courriel</label>

            <input
              className="form-control"
              type="text"
              placeholder="Nom d'utilisateur"
              value={courriel}
              onChange={(e) => setcourriel(e.target.value)}
            />
            <label>Mot de passe</label>

            <input
              className="form-control"
              type="password"
              placeholder="Mot de passe"
              value={mdp}
              onChange={(e) => setmdp(e.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              Se connecter
            </button>
          </div>
          <p>
            <Link to="/mdpOublie">Mot de passe oublié </Link>
          </p>
        </form>
      </div>
    </div>

  );
}

export default Connexion;


