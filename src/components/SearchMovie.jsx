import React from 'react';
import '/src/components/SearchMovie.css';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import _ from 'lodash';

const SearchMovie = (props) => {
  const [movieName, setMovieName] = useState('');
  const { movieList, setMovieList } = props;
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)

  function calculatePages(totalResult) {
    setMaxPages(Math.ceil(totalResult / 10));
  }

  let url = "https://www.omdbapi.com/?apikey=5ffea7a1&page=" + page + "&s=";

  const sendQuery = useCallback(
    async (movieName) => {
      try {
        setShowLoader(true);
        const bulkResult =
        await fetch(url + movieName);
        const result = await bulkResult.json();
        page == 1 && calculatePages(result.totalResults);
        setMovieList(result);
        setShowLoader(false);
        console.log('api call result ', result);
      } catch (error) {
        console.log('error', error);
      }
    },
    [setMovieList, url, setShowLoader]
  );

  const debouncedSendQuery = useCallback(_.debounce(sendQuery, 400), [
    sendQuery,
  ]);

  useEffect(() => {
    if (movieName) debouncedSendQuery(movieName);
  }, [movieName, page]);

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
        <select className="options" onChange={()=>{
          
        }}>
          <option value="all">All</option>
          <option value="movies">Movies</option>
          <option value="series">Series</option>
          <option value="episodes">Episodes</option>
        </select>
      </div>

      {movieList?.Search?.length &&
        <section className='paging'>
          <FontAwesomeIcon icon={faChevronLeft}
            className='pageIcon'
            onClick={() => {
              page > 1 && setPage(prev => prev - 1)
            }}
          />
          <div>{page}</div>
          <FontAwesomeIcon icon={faChevronRight}
            className='pageIcon'
            onClick={() => {
              setPage(prev => {
                if (prev < maxPages)
                  return prev + 1
              })

            }}
          />
        </section>}
      {showLoader && <img className="loader" src="./assets/loader.gif"
        alt="load image" />}
      {props.children}
      {/* <CardDisplay movieList={movieList} />; */}
    </div>
  );
};
export default SearchMovie;
