import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ViewList from "./components/ViewList/ViewList";
import ViewItem from "./components/ViewItem/ViewItem";
import HeaderApp from "./components/HeaderApp/HeaderApp";
import Toast from "./components/Toast/Toast";
import "./App.css";
import {DataProvider, DataContext } from './context/DataContext';
import ThemeLoader from "./components/ThemeLoader/ThemeLoader";
import { useContext } from "react";

function ToastContainer() {
  const { toasts, removeToast } = useContext(DataContext);
  return <Toast messages={toasts} onClose={removeToast} />;
}

function App() {
  return (
    <>
      <div className="App">
        <DataProvider>
            <ThemeLoader />
            <ToastContainer />
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
