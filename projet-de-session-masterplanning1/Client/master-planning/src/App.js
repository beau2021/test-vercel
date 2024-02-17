import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ConnexionPage from './assets/pages/ConnexionPage';
import CalendrierPage from './assets/pages/CalendrierPage';
import KanbanPage from './assets/pages/KanbanPage';
import AccueilPage from './assets/pages/AccueilPage';
import AproposPage from './assets/pages/AproposPage';
import ProfilPage from './assets/pages/ProfilPage';




import './App.css';

import InscriptionPage from './assets/pages/InscriptionPage';
import Accueil2 from './assets/pages/Accueil2';
import Documentation from './assets/pages/Documentation';
import MdpOubliePage from './assets/pages/MdpOubliePage';

import Ajouter_UPage from './assets/pages/Ajouter_UPage';
import IndexPage from './assets/pages/IndexPage';

import MdpOublieRecupPage from './assets/pages/MdpOublieRecupPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<ConnexionPage/>}/>
          <Route path='/inscription' element={<InscriptionPage/>}/>
          
          <Route path='/calendrier' element={<CalendrierPage/>}/> 
          <Route path='/apropos' element={<AproposPage/>}/>
                  
          <Route path='/' element={<AccueilPage/>}/>         
          <Route path='/kanban' element={<KanbanPage></KanbanPage>}/>

          <Route path='/mdpOublie' element={<MdpOubliePage/>}/>
          <Route path='/mdpOublieRecup' element={<MdpOublieRecupPage/>}/>

          <Route path='/Profil' element={<ProfilPage></ProfilPage>}/>
          <Route path='/Accueil2' element={<Accueil2></Accueil2>}/>
          <Route path='/Documentation' element={<Documentation></Documentation>}/>
          <Route path='/Ajouter_User' element={<Ajouter_UPage></Ajouter_UPage>}/>
          <Route path='/index' element={<IndexPage></IndexPage>}/>
         

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
