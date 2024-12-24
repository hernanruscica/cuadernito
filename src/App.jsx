import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import ViewList from "./components/ViewList/ViewList";
import ViewItem from "./components/ViewItem/ViewItem";
import HeaderApp from "./components/HeaderApp/HeaderApp";
import "./App.css";
import {DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
         {/* <HeaderApp /> */}
         
        <Routes>
          {/* Ruta para la pantalla principal */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para la pantalla de listas */}
          <Route path="/lists/:listId" element={<ViewList />} />
          
          {/* Ruta para la vista modal de un ítem 
          <Route path="/item/:id" element={<ModalViewItem />} />*/}
          <Route path="/lists/:listId/items/:itemId" element={<ViewItem />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
