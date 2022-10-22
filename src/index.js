import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import MapGrid from './components/MapGrid';
import NavBar from './components/NavBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <MapGrid />
  </React.StrictMode>
);

