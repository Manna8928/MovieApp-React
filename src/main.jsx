import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router"

const root = document.getElementById('root');
const createdRoot = createRoot(root);

createdRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>);
