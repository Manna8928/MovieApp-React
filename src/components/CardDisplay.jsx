import React from 'react';
import CardTiles from '/src/components/CardTiles';
import '/src/components/CardDisplay.css';

const CardDisplay = ({ movieList, favList, setFavList }) => {
  const callCardTiles = (cards) => {
    
    return (
      <CardTiles
        card={cards}
        key={cards.imdbID}
        favList={favList}
        setFavList={setFavList}
      />
    );
  };
  return (
    <main>
    <div className="card-display">
      {movieList?.Search?.length && movieList.Search.map(callCardTiles)}
    </div>
    </main>
  );
};

export default CardDisplay;
