import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { frFR } from '@mui/x-date-pickers/locales';
import axios from 'axios';
import { fr } from 'date-fns/locale';
import {useNavigate } from "react-router-dom";
import Badge, { badgeClasses } from '@mui/material/Badge';
import {PickersDay} from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function Calendrier() {
  const [columns, setColumns] = useState([]);
  const [col, setCol] = useState([]);
  const [taches, setTache] = useState('');
  const [date, setDate] = useState('');
  const [dateSelectionne, setDateSelectionne] = useState('');
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [chercherDate, setchercherDate] = useState(false);
  const [chercherJours, setChercherJours] = useState(false);
  const [badge, setBadge] = useState('✅')

  const navigate = useNavigate();

  function dateactuel (){
    if(!chercherDate){
      const date = new Date()
      const annee = date.getFullYear()
      const mois = date.getMonth()+1
      const jour = date.getDate()
      const datecomplete = annee + '-' + mois + '-'+ jour
      setDate(datecomplete)
      setDateSelectionne(datecomplete)
      console.log(datecomplete)
      setchercherDate(true)
    }
  }

  const demandeJourAvecTaches = async () => {
    if(!chercherJours){
      try{
        dateactuel()
        console.log(date)
        const userID = localStorage.getItem('userId');
        var jours = [];
        jours = await axios.post('http://localhost:8000/taches/jourAvecTaches', {proprietaire: userID, date:date.toString()})
        setHighlightedDays(jours.data)
        console.log(jours.data[0])
        console.log("allo")
        // console.log(highlightedDays)
        console.log("allo")
        setChercherJours(true)
  
      }catch (err){
  
        console.error(err);
      }

    }
  }

  const demandeListeUser = async () => {
    try {
      const userID = localStorage.getItem('userId');
      const listesBD = await axios.post('http://localhost:8000/liste/userId', { userID: userID})
      setCol(listesBD.data);
    } catch (err) {
      console.error(err);
    }
  }

  const demandeTaches7 = async () => {
    try {
      const userID = localStorage.getItem('userId');
      const taches = [];

      for (let i = 0; i < col.length; i++) {
       /* const resultatRequete = await axios.post('http://localhost:8000/taches/:liste', {
          userID: userID,
          liste: col[i].titreListe,
        });*/
        const resultatRequete = await axios.post('http://localhost:8000/taches/tachesParId', { userID: userID, indexListe: col[i].indexListe })
        const tacheCol = resultatRequete.data;


        for (let j = 0; j < tacheCol.length; j++) {
          taches.push(tacheCol[j]);
        }
      }

      const colonneAvecTaches = col.map((liste) => {
        const tacheDeLaListe = taches.filter((tache) => tache.indexListe === liste.indexListe);
        
        return {
          id: liste._id,
          titre: liste.titreListe,
          items: tacheDeLaListe,
        };
      });

      setColumns(colonneAvecTaches);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (col.length === 0) {
      demandeListeUser();
    }
  }, [col]);

  useEffect(() => {
    demandeTaches7();
  }, [col]);

  useEffect(() =>{
    demandeJourAvecTaches();
  })


  const handeleMonthChange = (newDate) => {
    const formattedDate = newDate.toISOString().split('T')[0];
    setDate(formattedDate);
    console.log(formattedDate)
    setChercherJours(false)
    demandeJourAvecTaches()

  }

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split('T')[0];
    setDate(formattedDate);
    setDateSelectionne(formattedDate);
    console.log(formattedDate)
  };
  console.log(columns)

  const handleChangerItem = async (event, colonneId, itemId, type, text) => {
    event.target.contentEditable = 'true';
    try{
      console.log(itemId)
      await axios.patch('http://localhost:8000/taches/modifierTacheCalendrier', {itemId, type, text})
      alert("L'item a été modifié avec succès")
    }
    catch(err){
      console.log(err)
    }
   
  };

  const handleKeyEntrer = (event, colonneId, item, type) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      verificationText(event, colonneId, item, type)
    }
  };

  const handleIconClick = async (colonne, item) =>{
    const tache_id = item._id
    console.log(colonne.items)
    try{

      await axios.post('http://localhost:8000/taches/supprimerTache', {tache_id})

      setColumns(ancienColonne => {
        const nouvelleColonne = ancienColonne.map(col => {
          if (col.id === colonne.id) {
            return {
              ...col,
              items: col.items.filter(tache => tache._id !== tache_id),
            };
          }
          return col;
        });
        return nouvelleColonne;
      });
      
      alert("L'item a été supprimé avec succès")
    }
    catch(err){
      console.log(err)
    }

  }

  const handleBoutonKanban = () => {
    navigate("/kanban")
  }

  const verificationText = (event, colonneId, item, type) =>{
    const nouveauText = event.target.textContent;   
    event.target.contentEditable = 'false';
    console.log(nouveauText);
    console.log(item.titre);

    if (type === 'titre' && nouveauText === '') {
      event.target.textContent = item.titre
      alert("Vous ne pouvez pas avoir un item sans nom")
      
    }
    else if (nouveauText === (type === 'titre' ? item.titre : item.description)) {
      alert("Vous n'avez apporté aucun changement");
    } else {
      type === 'titre' ? (item.titre = nouveauText) : (item.description = nouveauText);
      handleChangerItem(event, colonneId, item._id, type, nouveauText);
    }

    event.target.contentEditable = 'true';
  }

  

  function ServerDay(props) {
    
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? badge : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
    //🌚
  }

  const handleBadgeChange = (event) =>{
    setBadge(event.target.value)

  }

  return (
    <div className="calendrier-page">
      <div className="calendrier-corps">
     
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr" localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}>
          <div className="calendrier">
      
             <ThemeProvider
              theme={createTheme({
                components: {
                  MuiPickersToolbar: {
                    styleOverrides: {
                      root: {
                        color: 'white',
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: '#2196f3',
                        border: '1px solid',
                        backgroundColor: '#326dd4',
                      },
                    },
                  },
                },
              })}
            >            
              <StaticDatePicker onChange={handleDateChange} onMonthChange={handeleMonthChange}
               renderLoading={() => <DayCalendarSkeleton />}
               slots={{
                 day: ServerDay,
               }}
               slotProps={{
                 day: {
                   highlightedDays,
                 },
               }}/>
            </ThemeProvider>            
          </div>
        </LocalizationProvider>
      </div>

      <div className='div-bouton-kanban'>
        <select className='badge-selection' onChange={handleBadgeChange}>

          <option value="✅">✅</option>

          <option value="🔴">🔴</option>

          <option value="🌚">🌚</option>

          <option value="💀">💀</option>

          <option value="😊">😊</option>

        </select>
   
        <button className='bouton-kanban' onClick={handleBoutonKanban}>Kanban</button>
      </div>
      <div className="tableau-bord">
        <h1 style={{ textDecoration: 'underline' }}>{date}</h1>
        <br />
        {columns.map((colonne) => (
          <div key={colonne.id}>
            <h2>{colonne.titre}</h2>
          
              {colonne.items
                .filter((item) => dateSelectionne === item.date)
                .map((filteredItem) => (
                  
                  <p className='tableau-bord-titre-taches' key={filteredItem._id}>
                  <span
                    onKeyDown={(event) => handleKeyEntrer(event, colonne.id, filteredItem,'titre')}
                    contentEditable={true}
                  >
                    {filteredItem.titre}
                  </span>
                  <span> : </span>
                  <span
                    onKeyDown={(event) => handleKeyEntrer(event, colonne.id, filteredItem, 'description')}
                    contentEditable={true} 
                  >
                    {filteredItem.description}                  
                  </span>
                  <span> 
                    <img src="cancel_icon.png" alt="Icon" title = "Modifier" style={{marginLeft: '1%'}} onClick={() => handleIconClick(colonne, filteredItem)}/>
                  </span>
                </p>
                ))}
  
          </div>
        ))}
        <h2>{taches}</h2>
      </div>
    </div>
  );
}

export default Calendrier;








