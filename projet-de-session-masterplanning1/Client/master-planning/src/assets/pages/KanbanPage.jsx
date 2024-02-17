/* react components */
import React from "react";
import {useNavigate} from "react-router-dom"


import Kanban from "../components/Kanban";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";


function TachePage() {
  //à effacer
  const navigate = useNavigate();
  const linkButtomConnecter =()=>{
    navigate("/calendrier")
}
  return (
    <div className="page-principale">
      <Navbar/>
      <Kanban></Kanban>
      <button type="button" className="btn btn-danger" onClick={linkButtomConnecter}>Calendrier</button>
      <Footer></Footer>
    </div>
  );
}
export default TachePage;