/* react components */
import React from "react";

import Inscription from "../components/Inscription";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";




function InscriptionPage() {
  return (
    <div className="page-principale">
      <NavBar></NavBar>
      <Inscription></Inscription>
      <Footer></Footer>
    </div>
  );
}
export default InscriptionPage;