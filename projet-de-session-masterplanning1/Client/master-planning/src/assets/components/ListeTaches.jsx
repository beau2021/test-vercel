
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EquipeDeveloppeur = ({ taches }) => {
  return (
    <div className="button1">
      {Array.isArray(taches) && taches.length > 0 ? (
        <>
          {taches.map((user) => (
            <div key={user.responsable} className="row mb-2">
              <div className="col">
                {user.titre}
              </div>
              <div className="col text-right">
              {user.date}
               
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>(+) Pour afficher details.</p>
      )}
    </div>
  );
};

export default EquipeDeveloppeur;

