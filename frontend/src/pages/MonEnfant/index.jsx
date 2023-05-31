import React from 'react';
import './style.css';
import BaniereEnfant from '../../composants/BanniereEnfant';
import BoutonAjout from '../../composants/BoutonAjout';
import Actualite from '../../composants/Actualite';

export default function MonEnfant() {
  return (
    <React.Fragment>
      <h1>Page Mon enfant</h1>
      <BaniereEnfant />
      <BoutonAjout />
      <Actualite />
    </React.Fragment>
  );
}
