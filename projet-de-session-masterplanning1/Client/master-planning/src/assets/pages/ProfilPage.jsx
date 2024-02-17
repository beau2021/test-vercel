/* react components */
import React from "react";


import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Profil from "../components/Profil";


function ProfilPage() {
  return (
    <div className="page-principale">
      <NavBar></NavBar>
      <Profil></Profil>
      <Footer></Footer>
    </div>
  );
}
export default ProfilPage;