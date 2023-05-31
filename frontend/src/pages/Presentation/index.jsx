import React from 'react';
import './style.css';
import CarrouselDePhoto from '../../composants/CarrouselDePhoto';
import ContenuDescription from '../../composants/ContenuDescription';

export default function Presentation() {
  return (
    <React.Fragment>
      <h1>Page Présentation</h1>
      <CarrouselDePhoto />
      <ContenuDescription />
    </React.Fragment>
  );
}
