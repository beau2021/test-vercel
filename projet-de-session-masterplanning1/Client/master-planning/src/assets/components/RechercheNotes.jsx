import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

const Recherche = (props) => {
  const [courriel, setCourriel] = useState("");
  const [mdp, setmdp] = useState("");
  const [prenom, setPrenom] = useState("");
  const [options, setOptions] = useState([]);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setSelectedValue] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [validation, setUserId] = useState('');
  let afficher = props.modifierNotes;
  const navigate = useNavigate();
  console.log(options.titre)
  useEffect(() => {

    const userID = localStorage.getItem('userId');

    if (userID) {
      setUserId(userID);
    }
  }, []);




  const onClickFermer = (e) => {
    afficher = false
    props.fermerFenetreNotes()
  }


  /*const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };*/
  useEffect(() => {
    // Assurez-vous d'ajuster l'URL et les données envoyées selon vos besoins
    axios.post('http://localhost:8000/note/titre', { validation })
      .then((response) => {
        const bookData = response.data;
        setOptions(bookData); // Mettre à jour les options du sélecteur
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails du livre :', error);
      });
  }, [validation]);


  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    console.log("Options:", options);

    console.log(selectedValue)

    // Mettre à jour selectedBook avec les détails du livre sélectionné
    const selectedBookDetails = options.find(book => book.titre === selectedValue);
    setSelectedBook(selectedBookDetails);
    console.log('***************************************')
    console.log(selectedBookDetails)
  };


  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={afficher ? { opacity: 1 } : { opacity: 0 }}
      exit={false}
      transition={{ duration: 0.5 }}
    >

      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      ></link>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/toastify-js"
      ></script>
      <div className="carte-editer">
        <div className="container">
          <div className="row">
            <div className="col md-6">
              <h3>Notes </h3>
            </div>
            <div className="col-2 mr-auto">
              <button className="bouton-supprimer"

                onClick={onClickFermer}
              >
                X
              </button>
            </div>
          </div>


          <div className="row">
            <div>
              <div>Titre :</div>
              <select onChange={handleSelectChange}>
                <option value="">Sélectionnez un livre</option>
                {options.map((texte, index) => (
                  <option key={index} value={texte.titre}>
                    {texte.titre}
                  </option>
                ))}
              </select>
            </div>


            {selectedBook && (
              <div>


                {/* Ajoutez d'autres détails du livre ici */}
              </div>
            )}
            <div className="buttons" >
              Notes :
              <div className="box"
                style={{ width: '98%', height: '200%' }} >
                <p>Titre : {selectedBook.titre}</p>
                Description :
                <p>{selectedBook.description}</p>

              </div>
              <div>

              </div>
             
              <button >Modifier </button>
              <button >Supprimer</button>
              
            </div>
           
          </div>

        </div>
      
      </div>
   
    </motion.div>
     
  );
};

export default Recherche;
