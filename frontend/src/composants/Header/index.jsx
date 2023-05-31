import { Link } from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <nav className="navHeader">
      <h1>Mon assistante maternelle Mélanie</h1>
      <div className="lienHeader">
        <Link to={'/presentation'}>Accueil</Link>
        <Link to={'/formulaire-de-connection'}>Mon espace</Link>
        <Link to={'/livre-dor'}>Livre d'or</Link>
      </div>
    </nav>
  );
}

export default Header;
