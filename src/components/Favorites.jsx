import React from 'react';
import CardDisplay from "/src/components/CardDisplay"
import CardTiles from '/src/components/CardTiles';
import '/src/components/CardDisplay.css';

export default function Favorites(props) {
  const callCardTiles = (cards) => {
    return (
      <CardTiles
        card={cards}
        key={cards.imdbID}
        favList={props.favList}
        setFavList={props.setFavList}
      />
    );
  };
  return <div className="favCardDisplay">
    <h1>Movie Search</h1>
    <div className="favCardTileDisplay">
    {props.favList.length ? props.favList.map(callCardTiles) : "No Favorite items in List"}
    </div>
  </div>;
}

