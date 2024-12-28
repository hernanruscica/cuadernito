import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ViewList from "./components/ViewList/ViewList";
import ViewItem from "./components/ViewItem/ViewItem";
import HeaderApp from "./components/HeaderApp/HeaderApp";
import "./App.css";
import {DataProvider } from './context/DataContext';
import ThemeLoader from "./components/ThemeLoader/ThemeLoader";

function App() {
  return (
    <>
      <div className="App">
        <DataProvider>
            <ThemeLoader />
            <HeaderApp />          
          <Routes>          
            <Route path="/" element={<Home />} />      
            <Route path="/lists/:listId" element={<ViewList />} />  
            <Route path="/lists/:listId/items/:itemId" element={<ViewItem />} />              
          </Routes>
        </DataProvider>
      </div>
    </>
  );
}

export default App;
