import { Link } from 'react-router-dom';
import './style.css';

export default function Header() {
  return (
    <nav className="header">
      <h1>Mon assistante maternelle Mélanie</h1>
      <div className="navHeader">
        <Link to={'/presentation'}>Accueil</Link>
        <Link to={'/formulaire-de-connection'}>Mon espace</Link>
        <Link to={'/livre-dor'}>Livre d'or</Link>
      </div>
    </nav>
  );
}
