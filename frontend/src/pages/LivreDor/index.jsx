import React from 'react';
import './style.css';
import BaniereLivreDor from '../../composants/BanniereLivreDor';
import BoutonAjout from '../../composants/BoutonAjout';
import Commentaire from '../../composants/Commentaire';

export default function LivreDor() {
  return (
    <React.Fragment>
      <h1>Page Livre d'or</h1>
      <BaniereLivreDor />
      <BoutonAjout />
      <Commentaire />
    </React.Fragment>
  );
}
