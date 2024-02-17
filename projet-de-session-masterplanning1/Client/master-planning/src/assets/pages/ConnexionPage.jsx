/* react components */
import React from "react";

import Connexion from "../components/Connexion";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function ConnexionPage() {
  return (
    <>
      <Navbar />
      <Connexion></Connexion>
      <Footer />
    </>
  );
}
export default ConnexionPage;
