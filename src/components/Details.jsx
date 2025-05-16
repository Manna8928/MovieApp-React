import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import '/src/components/Details.css';

export default function Details() {
  let url = 'https://www.omdbapi.com/?apikey=5ffea7a1&i=';
  let params = useParams();

  const [details, setDetails] = useState({});
  const removeKey = ['Title', 'Poster', 'Ratings', 'Response'];
  useEffect(() => {
    fetch(url + params.movieID)
      .then((result) => result.json())
      .then((data) => {
        setDetails(data);
        console.log(data);
      });
  }, []);

  const displayDetails = useCallback((details) => {
    console.log('inside detail display', details);
    let arr = Object.keys(details).map((keyPt) => {
      if (!removeKey.includes(keyPt))
        return (
          <div>
            <b>{keyPt}</b>:{details[keyPt]}
          </div>
        );
    });

    return arr;
  }, []);

  return (
    <div className="details_main">
      <div className="image">
        <img src={details.Poster} alt="image" />
      </div>
      <div className="data">
        <h2>{details.Title}</h2>
        <br />
        {displayDetails(details)}
      </div>
    </div>
  );
}
