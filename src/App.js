import React from 'react';
import uuid from "uuid/v4";
import axios from "axios";
import Header from "./Header";
import DeveloperCount from "./DeveloperCount";
import Developer from "./Developer";
import AddDeveloper from "./AddDeveloper";

import './App.css';

// Only class components can have state
// State must live in the parent of any compomnents that need to access it
class App extends React.Component {
  state = {
    developers: []
  };

  componentDidMount() {
    //Fetch the developers making a GET request using axios
    axios.get("https://rei5asqft1.execute-api.eu-west-1.amazonaws.com/dev/developers")
      .then((response) => {
        const developers = response.data.developers;
        this.setState({
          developers: developers
        })
      })
      .catch((err) => {
        console.log(err);
      })
    //Then, set the developers as the state of the application.
  }

  addNewDeveloper = (name, skills, date) => {

    const newDeveloper = {
      name: name,
      skills: skills,
      available: true,
      dateJoined: date
    };

    axios.post("https://rei5asqft1.execute-api.eu-west-1.amazonaws.com/dev/developers", newDeveloper)
      .then((response) => {
        const newDev = response.data;
        const copyOfDevs = this.state.developers.slice()
        copyOfDevs.push(newDev)

        this.setState({
          developers: copyOfDevs
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
      return developer.available == 1;
    });

    const unavailableDevelopers = this.state.developers.filter(developer => {
      return developer.available == 0;
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
                key={developer.developerId}
                available={developer.available}
                name={developer.name}
                skills={developer.skills}
                dateJoined={developer.dateJoined}
                deleteDevFunc={this.deleteDeveloper}
                bookDevFunc={this.bookDeveloper}
                id={developer.developerId}
              />
            );
          })}
          <h2>Busy working on something else:</h2>
          {unavailableDevelopers.map((developer) => {
            return (
              <Developer
                key={developer.developerId}
                available={developer.available}
                name={developer.name}
                skills={developer.skills}
                dateJoined={developer.dateJoined}
                deleteDevFunc={this.deleteDeveloper}
                id={developer.developerId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
