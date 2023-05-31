import React from 'react';
import './style.css';
import BaniereEnfant from '../../composants/BanniereEnfant';
import BoutonAjout from '../../composants/BoutonAjout';

export default function ListeEnfants() {
  return (
    <React.Fragment>
      <h1>Page Listes des enfants en garde</h1>
      <BaniereEnfant />
      <BoutonAjout />
    </React.Fragment>
  );
}
