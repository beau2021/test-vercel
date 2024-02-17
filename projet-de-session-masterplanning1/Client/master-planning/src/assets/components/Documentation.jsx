import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "kanb.jpg",
        "agile.jpg",
        "scrum1.jpg",
        "kanban3.jpg",
        "kanban4.jpg",
        "agile2.jpg",
        "scrum2.jpg",
        "kanban5.jpg",
        "agile3.jpg",
        "scrum3.jpg",

        // Ajoutez d'autres noms de fichiers d'images ici
      ],
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.startCarousel();
  }

  componentWillUnmount() {
    this.stopCarousel();
  }

  startCarousel = () => {
    this.carouselInterval = setInterval(this.nextImage, 3000); // Défilement toutes les 3 secondes (3000 ms)
  };

  stopCarousel = () => {
    clearInterval(this.carouselInterval);
  };

  nextImage = () => {
    const { images, currentIndex } = this.state;
    this.setState({
      currentIndex: (currentIndex + 1) % images.length,
    });
  };

  render() {
    const { images, currentIndex } = this.state;

    return (
      <div className="carousel">
        <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
      </div>
    );
  }
}

const Documentation = () => {
  const [reponse_titre, setSelectedBook] = useState([]);
  const [options, setOptions] = useState([]);
  const [cours, setCours] = useState([]);
  const [selectedSousTitre, setSelectedSousTitre] = useState("");
  const [selectedCours, setSelectedCours] = useState("");
  console.log(reponse_titre);

  useEffect(() => {
    // Récupérez la liste des options (par exemple, les titres des livres) lors du chargement de la page
    axios
      .get("http://localhost:8000/livres/")
      .then((response) => {
        const titres = response.data;
        setOptions(titres);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des titres :", error);
      });
  }, []);

  // Gestionnaire d'événements pour la sélection d'un livre dans la liste déroulante

  const handleSelectChange = (e) => {
    const titre = e.target.value;

    // Effectuez une requête pour obtenir les détails du livre sélectionné
    axios
      .post("http://localhost:8000/titre/", { titre })
      .then((response) => {
        const bookData = response.data;
        setSelectedBook(bookData);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails du livre :",
          error
        );
      });
  };
  const handleSousTitreClick = async (sousTitre) => {
    const coursCorrespondant = reponse_titre.find(
      (cours) => cours === sousTitre
    );
    console.log(coursCorrespondant);
    console.log(sousTitre);
    try {
      const response = await axios.post("http://localhost:8000/titre/cours/", {
        sousTitre,
      });
      const cours = response.data; // Accédez au résultat à partir de la réponse

      console.log(cours); // Affichez le résultat ici

      if (coursCorrespondant) {
        setSelectedSousTitre(sousTitre);
        setSelectedCours(cours);
      } else {
        setSelectedSousTitre("");
        setSelectedCours("");
      }
    } catch (err) {
      console.error(err);
    }

    console.log(coursCorrespondant);
  };

  return (
    <div className="page">
      <div className="column1">
        <div className="search-bar">
          <label>Choisir un livre : </label>
          <select onChange={handleSelectChange}>
            <option value="">Sélectionnez un livre</option>
            {options.map((titre, index) => (
              <option key={index} value={titre}>
                {titre}
              </option>
            ))}
          </select>
        </div>

        <div className="search-results">
          {reponse_titre.map((sousTitre, index) => (
            <div key={index}>
              <button
                className="custom-button"
                onClick={() => handleSousTitreClick(sousTitre)}
              >
                {sousTitre}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="column2">
        <div className="buttons">
          <button>Enregistrer</button>
          <button>Imprimer</button>
          <button>Agrandir</button>
        </div>

        {selectedSousTitre && (
          <div>
            <h4>Cours associé au sous-titre "{selectedSousTitre}" :</h4>
            <div className="scrollable-text">
              <p>{selectedCours}</p>
            </div>
          </div>
        )}
      </div>
      <div className="column3">
        <Carousel />
      </div>
    </div>
  );
};

export default Documentation;
