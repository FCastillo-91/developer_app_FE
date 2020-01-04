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
      { name: "Harine Vijay", skills: ["Java"], available: false, dateJoined: "2019-12-01", id: uuid() },
      { name: "Ilga Koko", skills: ["HTML", "TDD", "React"], available: false, dateJoined: "2019-10-22", id: uuid() },
      { name: "Nichola Evans", skills: ["CSS", "Ruby", "Python"], available: false, dateJoined: "2019-11-02", id: uuid() },
    ],
  }

  addNewDeveloper = (name, skills, date) => {

    const newDeveloper = {
      name: name,
      skills: skills,
      available: true,
      dateJoined: date,
      id: uuid()
    }

    const copyOfDevs = this.state.developers.slice()
    copyOfDevs.push(newDeveloper)

    this.setState({
      developers: copyOfDevs
    })
  }

  deleteDeveloper = (id) => {
    const filteredDevs = this.state.developers.filter(dev => {
      if (dev.id === id) return false;
      else return true;
    })

    this.setState({
      developers: filteredDevs
    })
  }

  bookDeveloper = (id) => {
    const bookedDevs = this.state.developers;

    bookedDevs.forEach(dev => {
      if (dev.id === id) return dev.available = false;
    })

    this.setState({
      developers: bookedDevs
    })
  }
  //make a copy of the state and book the developer
  // const bookedDevs = this.state.developers.
  //update the state with the new longer array

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
                deleteDevFunc={this.deleteDeveloper}
                bookDevFunc={this.bookDeveloper}
                id={developer.id}
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
                deleteDevFunc={this.deleteDeveloper}
                id={developer.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
