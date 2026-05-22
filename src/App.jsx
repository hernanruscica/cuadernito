import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashHome from "./components/SplashHome/SplashHome";
import Home from "./components/Home/Home";
import ViewList from "./components/ViewList/ViewList";
import HelpPage from "./components/HelpPage/HelpPage";
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
            <Route path="/" element={<SplashHome />} />
            <Route path="/lists" element={<Home />} />
            <Route path="/lists/:listId" element={<ViewList />} />  
            <Route path="/help" element={<HelpPage />} />
            <Route path="/ayuda" element={<HelpPage />} />
          </Routes>
        </DataProvider>
      </div>
    </>
  );
}

export default App;
