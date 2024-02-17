import { useState } from "react";
import axios from "axios";

const MdpOublieRecup = () => {
  const [courriel, setCourriel] = useState("");
  const [code, setCode] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [erreurs, setErreurs] = useState({});

  const validerFormulaire = () => {
    const lesErreurs = {};
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexMdp = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/; // Au moins 8 caractères, une majuscule, puis un caractères spécial.

    if (!courriel) {
      lesErreurs.courriel = "Le courriel est requis";
    } else if (!regexEmail.test(courriel)) {
      lesErreurs.courriel = "Saisissez un courriel valide";
    }
    if (!code) lesErreurs.code = "Le code est requis";
    if (!mdp) {
      lesErreurs.mdp = "Le mot de passe est requis";
    } else if (!regexMdp.test(mdp)) {
      lesErreurs.mdp = "Saisissez un mot de passe conforme aux critères";
    }
    if (!confirmMdp) {
      lesErreurs.confirmMdp = "Mot de passe de confirmation recquis";
    } else if (mdp !== confirmMdp) {
      lesErreurs.confirmMdp = "Mot de passe de confirmation incorrect";
    }
    return lesErreurs;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du formulaire
    const lesErreurs = validerFormulaire();
    setErreurs(lesErreurs);

    // Vérification des erreurs
    if (Object.keys(lesErreurs).length === 0) {
      // Envoyer le formulaire
      axios
        .post("http://localhost:8000/utilisateur/majMdp", {
          courriel,
          code,
          mdp,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            window.close();
          } else if (response.status === 201) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la requête :", error);
        });
    }
  };
  return (
    <>
      <div className="auth-container d-flex justify-content-center">
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        ></link>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/toastify-js"
        ></script>
        <div className="auth-comp border w-50 w-md-75 w-lg-50 rounded p-4 p-sm-3 corpsMdpOubleRecup">
          <h1
            className="d-flex justify-content-center"
            style={{ color: "#007bff" }}
          >
            Récupération du mot de passe
          </h1>
          <form className=" mb-3" onSubmit={handleSubmit}>
            {/* <div class='d-inline-block 'style={{ marginRight: '40%'}}> */}

            <div class="form-group">
              <label>Entrez votre courriel : </label>
              <input
                class="form-control"
                type="text"
                placeholder="Courriel"
                value={courriel}
                onChange={(e) => setCourriel(e.target.value)}
                style={{ width: "100%" }}
              />
              {erreurs.courriel && (
                <p className="erreurChampFormulaire">{erreurs.courriel}</p>
              )}
            </div>

            <div class="form-group">
              <label>Code : </label>
              <input
                class="form-control"
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: "100%" }}
              />
              {erreurs.code && (
                <p className="erreurChampFormulaire">{erreurs.code}</p>
              )}
            </div>

            <div class="form-group">
              <label>Nouveau mot de passe : </label>
              <input
                class="form-control"
                type="password"
                placeholder="Nouveau mot de passe"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                style={{ width: "100%" }}
              />
              {erreurs.mdp && (
                <p className="erreurChampFormulaire">{erreurs.mdp}</p>
              )}
            </div>

            <div class="form-group">
              <label>Confirmation du nouveau mot de passe : </label>
              <input
                class="form-control"
                type="password"
                placeholder="Confirmation du nouveau mot de passe"
                value={confirmMdp}
                onChange={(e) => setConfirmMdp(e.target.value)}
                style={{ width: "100%" }}
              />
              {erreurs.confirmMdp && (
                <p className="erreurChampFormulaire">{erreurs.confirmMdp}</p>
              )}
            </div>
            <div className="form-group">
              <p>Critères pour le mot de passe :</p>
              <ul>
                <li>Au moins 8 caractères.</li>
                <li>Au une lettre majuscule.</li>
                <li>Au moins un caractère spécial ex: (!,@,#,$,%,?,...).</li>
              </ul>
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
};
export default MdpOublieRecup;
