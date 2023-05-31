import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Presentation from './pages/Presentation';
import FormulaireAjoutActualite from './pages/FormulaireAjoutActualite';
import FormulaireAjoutCommentaire from './pages/FormulaireAjoutCommentaire';
import FormulaireAjoutEnfant from './pages/FormulaireAjoutEnfant';
import FormulaireDeConnection from './pages/FormulaireDeConnection';
import MonEnfant from './pages/MonEnfant';
import ListeEnfants from './pages/ListeEnfants';
import LivreDor from './pages/LivreDor';
import Error from './pages/Error';
import Header from './composants/Header';
import Footer from './composants/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/presentation" element={<Presentation />} />

        <Route
          path="/formulaire-ajout-actualite"
          element={<FormulaireAjoutActualite />}
        />

        <Route
          path="/formulaire-ajout-commentaire"
          element={<FormulaireAjoutCommentaire />}
        />

        <Route
          path="/formulaire-ajout-enfant"
          element={<FormulaireAjoutEnfant />}
        />

        <Route
          path="/formulaire-de-connection"
          element={<FormulaireDeConnection />}
        />

        <Route path="/mon-enfant/:id" element={<MonEnfant />} />
        <Route path="/liste-enfants" element={<ListeEnfants />} />
        <Route path="/livre-dor" element={<LivreDor />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
