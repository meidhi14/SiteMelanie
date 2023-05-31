import './style.css';
import flecheRetour from '../../assets/images-logos-maquettes/fleche-superieure-droite.png';

export default function Footer() {
  const handleImageClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="imageFlecheRetour">
        <img
          src={flecheRetour}
          alt="logo flèche retour"
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
}
