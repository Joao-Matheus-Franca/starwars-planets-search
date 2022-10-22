import React from 'react';
import Provider from './Components/MyContext';
import './App.css';
import Table from './Components/Table';

function App() {
  return (
    <Provider>
      <h1>Star Wars</h1>
      <Table />
    </Provider>
  );
}

export default App;

// João Matheus Silva Franca
