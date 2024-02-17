import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

function MdpOublie() {
  const navigate = useNavigate();
  const [courriel, setCourriel] = useState("");
  const mdpOublieRecupLink = "http://localhost:3000/mdpOublieRecup";

  const afficherToast = (message) => {
    Toastify({
      text: message,
      duration: 3000,
    }).showToast();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/utilisateur/email", {
        courriel,
        mdpOublieRecupLink,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          afficherToast("E-mail envoyé avec succès.");
          navigate("/login");
        } else if (response.status === 201) {
          afficherToast(response.data.message);
        }
        if (response.status === 202) {
          afficherToast(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
    // navigate("/login");
  };

  return (
    <>
      <div className="auth-container d-flex justify-content-center div-mdp">
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
            Mot de passe oublié?
          </h1>
          <form className=" mb-3" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Entrez votre courriel : </label>
              <input
                className="form-control"
                type="text"
                placeholder="Courriel"
                value={courriel}
                onChange={(e) => setCourriel(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default MdpOublie;
