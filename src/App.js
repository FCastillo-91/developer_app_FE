import React from 'react';
import Header from "./Header"
import DeveloperCount from "./DeveloperCount"
import Developer from "./Developer"

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <DeveloperCount />
      <div className="container">
      <Developer name="Sue Moron-Garcia" skills={["TDD", "Debugging"]}/>
      <Developer name="Fiona Castillo" skills={["HTML", "CSS"]}/>
      <Developer name="Harine Vijay" skills={["Java"]}/>
      <Developer name="Nichola Evans" skills={["CSS", "Ruby", "Python"]}/>
      </div>
    </div>
  );
}

export default App;
