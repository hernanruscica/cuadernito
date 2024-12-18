import React from 'react';

import MainScreen from './components/MainScreen/MainScreen';
import ListScreen from './components/ListScreen/ListScreen';
import ModalViewItem from './components/ModalViewItem/ModalViewItem';
import './app.css';

function App() {
  return (
    <div className="App">
      {/* Puedes usar el MainScreen como la primera pantalla que quieres ver */}
        <MainScreen />
      {/* o el ListScreen */}
       <ListScreen/> 
        <ModalViewItem />
    </div>
  );
}

export default App;