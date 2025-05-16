import React, { useEffect } from 'react';
import './App.css';
import Home from '/src/components/Home';
import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router';
import Favorites from './components/Favorites';
import Details from '/src/components/Details';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [favList, setFavList] = useState(() => {
    const str = localStorage.getItem('favItems');
    return str ? JSON.parse(str) : [];
  });

  useEffect(() => {
    favList?.length
      ? localStorage.setItem('favItems', JSON.stringify(favList))
      : localStorage.removeItem('favItems');
  }, [favList]);

  return (
    <div className="root">
      <header>
        <div>
          <NavLink to="/" className="navlink">
            {' '}
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/favorites" className="navlink">
            {' '}
            Favorites
          </NavLink>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movieList={movieList}
              setMovieList={setMovieList}
              favList={favList}
              setFavList={setFavList}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          element={<Favorites favList={favList} setFavList={setFavList} />}
        />

        <Route path="/details/:movieID" element={<Details />} />
      </Routes>
    </div>
  );
};
export default App;
