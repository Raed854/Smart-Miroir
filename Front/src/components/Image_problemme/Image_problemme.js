import React, { useState, useEffect } from 'react';
import './Image_problemme.css'
import { useNavigate } from "react-router-dom";

const Card = ({ imageUrl, title }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/image_problemme/`)
      .then(response => response.json())
      .then(data => {
        const newCards = data.map(item => ({
          imageUrl: item.image,
          title: `Image du ${item.date} à ${item.hour}`
        }));
        setCards(newCards);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des images:', error);
      });
  }, []);
  useEffect(() => {
    if(sessionStorage.getItem('auth')[2]!='1'){
      navigate('/home/404');
    }
  }, []);

  return (
    <div className="app">
      <div className="card-list">
        {cards.map((card, index) => (
          <Card key={index} imageUrl={card.imageUrl} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default App;
