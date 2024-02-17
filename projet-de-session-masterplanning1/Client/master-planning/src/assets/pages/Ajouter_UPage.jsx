import React from "react";

import Ajouter_User from "../components/Ajouter_User";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


function Ajouter_UPage () {
    return (
        <div className="page-principale">
            
        <NavBar></NavBar>
        <Ajouter_User></Ajouter_User>
        <Footer></Footer>
        </div>
    );
}
export default Ajouter_UPage;