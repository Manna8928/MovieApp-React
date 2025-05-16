import React from 'react';
import '/src/components/SearchMovie.css';
import { useState, useEffect, useCallback } from 'react';

import _ from 'lodash';

const SearchMovie = (props) => {
  const [movieName, setMovieName] = useState('');
  const { movieList, setMovieList } = props;

  let url = 'https://www.omdbapi.com/?apikey=5ffea7a1&s=';

  const sendQuery = useCallback(
    async (movieName) => {
      try {
        const bulkResult = await fetch(url + movieName);
        const result = await bulkResult.json();
        setMovieList(result);
        console.log('api call result ', result);
      } catch (error) {
        console.log('error', error);
      }
    },
    [setMovieList]
  );

  const debouncedSendQuery = useCallback(_.debounce(sendQuery, 200), [
    sendQuery,
  ]);

  useEffect(() => {
    if (movieName) debouncedSendQuery(movieName);
  }, [movieName]);

  return (
    <div className="searchMovie">
      <div className="searchAndGenere">
        <input
          placeholder="Search..."
          className="searchInput"
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <select className="options">
          <option>All</option>
          <option>Movies</option>
          <option>Series</option>
          <option>Episodes</option>
        </select>
      </div>
      {props.children}
      {/* <CardDisplay movieList={movieList} />; */}
    </div>
  );
};
export default SearchMovie;
