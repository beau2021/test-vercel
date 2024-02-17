import React from "react";
import Accueil2 from "../components/Accueil2";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
//import Profil from "../components/Profil";

function Accueil() {
  return (
    <div className="page-principale">
      <NavBar></NavBar>
      <Accueil2></Accueil2>
      <Footer></Footer>
    </div>
  );
}
export default Accueil;
