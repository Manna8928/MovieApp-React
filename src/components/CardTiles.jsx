import React, { useCallback, useEffect, useState } from 'react';
import '/src/components/CardTiles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router';

export default function CardTiles({ card, favList, setFavList }) {
  const [favExists, setFavExists] = useState(
    !!favList.find((a) => a.imdbID === card.imdbID)
  );
  //function for checking existing fav state in intial loading
  const setFavourites = useCallback(() => {
    // console.log('favexist', favExists);
    if (!favExists) {
      setFavList((latestList) => {
        return [...latestList, card];
      });
      setFavExists(true);
    } else {
      setFavList((latestList) => {
        const filtered = latestList.filter(
          (listItem) => listItem.imdbID !== card.imdbID
        );
        return filtered;
      });
      setFavExists(false);
    }
  }, [setFavExists, setFavList, card, favExists]);

  return (
    <>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <img src={card.Poster} />
          </div>
          <div className="card-back">
            <h2>
              <NavLink to={'/details/' + card.imdbID} className="text-green">
                {card.Title}
              </NavLink>
            </h2>
            <FontAwesomeIcon
              icon={faHeart}
              color={favExists ? 'white' : 'black'}
              size="4xs"
              className="font"
              onClick={() => {
                setFavourites(card);
              }}
            />

            <p>
              <b>Type : </b>
              {card.Type}{' '}
            </p>
            <p>
              <b>Year : </b>
              {card.Year}
            </p>
            <p>
              <b>ImdbID : </b>
              {card.imdbID}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
