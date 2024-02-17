import React from "react";
import Index from "../components/Index";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
//import Profil from "../components/Profil";

function Accueil () {
    return (
        <div className="page-principale">
            
        <NavBar></NavBar>
        <Index></Index>
        <Footer></Footer>
        </div>
    );
}
export default Accueil;