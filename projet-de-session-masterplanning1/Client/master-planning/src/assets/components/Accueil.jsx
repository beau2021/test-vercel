import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();

  const linkButtomConnecter = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="image">
          <img
            height="150px"
            width="150px"
            src="/‎MasterPlanning-Logo.png"
            alt="Logo_MasterPlanning"
          />
        </div>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/apropos">À propos</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-primary button-style"
              onClick={linkButtomConnecter}
            >
              Se connecter
            </button>
          </li>
        </ul>
      </div>

      <div className="corps">
        <div className="contenuCorps">
          <div className="contenuCorpsTexte">
            <h1>Planifiez votre</h1>
            <h3>quotidien à votre guise!</h3>
            <a href="#">Gestionnaire de tâches</a>
          </div>
        </div>
      </div>

      <div className="piedsPage">
        <p>© MasterPlanning 2023</p>
        <ul>
          <li>
            <a href="/apropos">À propos</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Accueil;
