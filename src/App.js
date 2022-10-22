import React from 'react';
import Provider from './Components/MyContext';
import './App.css';
import Table from './Components/Table';
import Header from './Components/Header';

function App() {
  return (
    <Provider>
      <h1>Star Wars</h1>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;

// João Matheus Silva Franca
