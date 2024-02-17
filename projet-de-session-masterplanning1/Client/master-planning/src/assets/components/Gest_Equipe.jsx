import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EquipeDeveloppeur = ({ listeUser, afficherDetails, supprimerUtilisateur }) => {
  return (
    <div className="button1">
      {Array.isArray(listeUser) && listeUser.length > 0 ? (
        <>
          {listeUser.map((user) => (
            <div key={user.userID_Dev} className="row mb-2">
              <div className="col">
                {user.nom} {user.prenom}
              </div>
              <div className="col text-right">
                <button onClick={() => afficherDetails(user.userID_Dev)}>+</button>
                <button onClick={() => supprimerUtilisateur(user.userID_Dev)}>-</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Aucun utilisateur à afficher.</p>
      )}
    </div>
  );
};

export default EquipeDeveloppeur;