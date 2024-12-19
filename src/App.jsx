import React from "react";
import { Routes, Route } from "react-router-dom";

import MainScreen from "./components/MainScreen/MainScreen";
import ListScreen from "./components/ListScreen/ListScreen";
import ModalViewItem from "./components/ModalViewItem/ModalViewItem";
import HeaderApp from "./components/HeaderApp/HeaderApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HeaderApp />
      <Routes>
        {/* Ruta para la pantalla principal */}
        <Route path="/" element={<MainScreen />} />
        
        {/* Ruta para la pantalla de listas */}
        <Route path="/lists" element={<ListScreen />} />
        
        {/* Ruta para la vista modal de un ítem 
        <Route path="/item/:id" element={<ModalViewItem />} />*/}
        <Route path="/modal" element={<ModalViewItem />} />
      </Routes>
    </div>
  );
}

export default App;
