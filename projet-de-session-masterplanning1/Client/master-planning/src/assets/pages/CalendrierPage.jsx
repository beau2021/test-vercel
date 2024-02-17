/* react components */
import React from "react";

import Calendrier from "../components/Calendrier";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


function CalendrierPage() {
  return (
    <div className="page-principale">
      <NavBar></NavBar>
      <Calendrier></Calendrier>
      <Footer></Footer>
    </div>
  );
}
export default CalendrierPage;