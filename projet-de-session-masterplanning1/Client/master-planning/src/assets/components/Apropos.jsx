import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

function Apropos() {
    
    return (
        <>
            <Navbar/>
            <div className="aproposCorps">
                <div className="aproposCorpsContenu">
                    <h1>MasterPlanning</h1>
                    <p>Cette plateforme a pour objectif de vous fournir les outils dont vous avez besoin pour vous aider à gérer vos projets ou vos tâches efficacement.<br/>Elle vous donne accès à un calendrier qui vous aide à établir un echéancier pour vos tâches et à y tenir.<br/>Projet créer Josué Avlah - Luis Ho - Carlos Pineda - Beau - Séjour N'Goran </p>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Apropos;