import React from 'react';
import uuid from "uuid/v4";
import Header from "./Header";
import DeveloperCount from "./DeveloperCount";
import Developer from "./Developer";
import AddDeveloper from "./AddDeveloper";

import './App.css';

// Only class components can have state
// State must live in the parent of any compomnents that need to access it
class App extends React.Component {
  state = {
    developers: [
      { name: "Sue Moron-Garcia", skills: ["TDD", "Debugging"], available: false, dateJoined: "2019-12-02", id: uuid() },
      { name: "Fiona Castillo", skills: ["HTML, CSS"], available: true, dateJoined: "2019-11-30", id: uuid() },
      { name: "Harine Vijay", skills: ["Java"], available: false, dateJoined: "2019-12-01", id: uuid()},
      { name: "Ilga Koko", skills: ["HTML", "TDD", "React"], available: false, dateJoined: "2019-10-22", id: uuid() },
      { name: "Nichola Evans", skills: ["CSS", "Ruby", "Python"], available: false, dateJoined: "2019-11-02", id: uuid() },
    ],
  }

  // Any component that updates state MUST live in the same component as the state.
  addNewDeveloper = (name, skills,date) => {
    // Create a new developer object
    const newDeveloper = {
      name: name,
      skills: skills,
      available: true,
      dateJoined: date,
      id: uuid()
    }
    // Add that developer to the list
    // We must never update state directly, setState is the correct way of updating state
    // Slice makes a copy of an array
    const copyOfDevs = this.state.developers.slice()
    copyOfDevs.push(newDeveloper)

    // Ensure the state is updated (setState)
    this.setState({
      developers: copyOfDevs
    })
  }
  render() {
    const availableDevelopers = this.state.developers.filter(developer => {
        return developer.available === true
    });

    const unavailableDevelopers = this.state.developers.filter(developer => {
      return developer.available === false
    })
    return (
      <div className="App">
        <div className="container">
        <Header />
        <AddDeveloper addNewDevFunc={this.addNewDeveloper} />
        <DeveloperCount count={availableDevelopers.length} />
        <h2>Available right now:</h2>
        {availableDevelopers.map((developer) => {
          return (
            <Developer
            key={developer.id}
            available={developer.available}
            name={developer.name}
            skills={developer.skills}
            dateJoined={developer.dateJoined} 
            />
          );
        })}
        <h2>Busy working on something else:</h2>
        {unavailableDevelopers.map((developer) => {
          return (
            <Developer
            key={developer.id}
            available={developer.available}
            name={developer.name}
            skills={developer.skills}
            dateJoined={developer.dateJoined} 
            />
          );
        })}
        </div>
      </div>
    );
  }
}

export default App;
