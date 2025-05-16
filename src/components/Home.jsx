import React from 'react';
// import '../App.css';
import SearchMovie from '/src/components/SearchMovie';
import CardDisplay from '/src/components/CardDisplay';

export default function Home({movieList, setMovieList, favList, setFavList}) {
  return (
    <>
      <main>
        <h1>Movie Search</h1>
        <SearchMovie movieList={movieList} setMovieList={setMovieList}>
          <CardDisplay
            movieList={movieList}
            favList={favList}
            setFavList={setFavList}
          />
        </SearchMovie>
      </main>
    </>
  );
}
