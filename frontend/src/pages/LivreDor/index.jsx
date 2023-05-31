import React from 'react';
import './style.css';
import BaniereLivreDor from '../../composants/BanniereLivreDor';
import Commentaire from '../../composants/Commentaire';

export default function LivreDor() {
  return (
    <React.Fragment>
      <h1>Page Livre d'or</h1>
      <BaniereLivreDor />
      <Commentaire />
    </React.Fragment>
  );
}
