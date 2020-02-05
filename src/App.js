import React from 'react';
import axios from "axios";
import Header from "./Header";
import DeveloperCount from "./DeveloperCount";
import Developer from "./Developer";
import AddDeveloper from "./AddDeveloper";

import './App.css';

class App extends React.Component {
  state = {
    developers: []
  };

  componentDidMount() {
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
        console.log(response)
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
    axios.delete(`https://rei5asqft1.execute-api.eu-west-1.amazonaws.com/dev/developers/${id}`)
      .then((response) => {
        const myDevs = this.state.developers    
        const filteredDevs = myDevs.filter(dev => {
        if (dev.developerId === id) return false;
          else return true;  
        })
        this.setState({
          developers: filteredDevs
        });
      })
      .catch((err) => {
        console.log(err);
      });  
  };

  bookDeveloper = dev => {
    
   const parameters = {available:!dev.available}; 
 
    axios.put(`https://rei5asqft1.execute-api.eu-west-1.amazonaws.com/dev/developers/${dev.id}`, parameters)
      .then((response) => {
        const bookedDevs = this.state.developers;
        bookedDevs.forEach(item => {
          if (item.developerId === dev.id) return item.available = parameters.available;
        }) 
        this.setState({
          developers: bookedDevs
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const availableDevelopers = this.state.developers.filter(developer => {
      return developer.available === true;
    })
    const unavailableDevelopers = this.state.developers.filter(developer => {
      return developer.available === false;
    })
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddDeveloper 
            addNewDevFunc={this.addNewDeveloper}  
            />
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
                bookDevFunc={this.bookDeveloper}
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
