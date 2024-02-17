import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const linkButtomConnecter = () => {
    navigate("/login");
  };

  const linkButtomDeconnecter = () => {
    localStorage.removeItem("monToken")
    localStorage.removeItem("userId")
    navigate("/login");
  };

  const linkButtonSinscrire = () => {
    navigate("/inscription");
  };

  const linkButtonModifierProfil = () => {
    navigate("/profil");
  };

  const location = useLocation();

  return (
    <>
      <div className="navbar">
        <div className="image">
          <img
            height="120px"
            width="150px"
            src="/‎MasterPlanning-Logo.png"
            alt="Logo_MasterPlanning"
          />
        </div>
        <div className="boutons-navbar">
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
          
          {location.pathname === "/login" ? (
            <li>
              <button
                type="button"
                className="btn btn-success button-style"
                onClick={linkButtonSinscrire}
              >
                S'inscrire
              </button>
            </li>
            
          )  : location.pathname === "/inscription" ? (
            <li>
              <button
                type="button"

                className="btn btn-secondary button-style"

                onClick={linkButtomConnecter}
              >
                Connexion
              </button>
            </li>
          )      
          : (
            <li>
              <button
                type="button"
                className="btn btn-primary button-style"
                onClick={linkButtomDeconnecter}
              >
                Déconnexion
              </button>
            </li>
          )}

         
        </ul>
          
        </div>
        
      </div>
    </>
  );
}
export default Navbar;
