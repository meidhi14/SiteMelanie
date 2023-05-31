import React from 'react';
import './style.css';
import BaniereLivreDor from '../../composants/BanniereLivreDor';
import FormulaireAjoutCommentaireComposant from '../../composants/FormulaireAjoutCommentaire';

export default function FormulaireAjoutCommentaire() {
  return (
    <React.Fragment>
      <h1>Page Formulaire d'ajout de commentaire</h1>
      <BaniereLivreDor />
      <FormulaireAjoutCommentaireComposant />
    </React.Fragment>
  );
}
