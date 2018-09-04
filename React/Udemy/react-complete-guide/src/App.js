import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserOutput from './UserOutput/UserOutput'
import UserInput from './UserInput/UserInput'

import './App.css';

class App extends Component {

  state = {
    persons: [
      {id: 'person1', name: 'Diomar', age: 32},
      {id: 'person2', name: 'Rafa', age: 3},
      {id: 'person3', name: 'Vini', age: 0}
    ],    
    username: 'Diomar',
    showPersons: false
  }

  // switchNameHandler = (newName) => {
  //   // console.log("Was clicked!");
  //   // DON'T DO THAT: this.state.persons[0].name = 'Rafael';
  //   this.setState({
  //       persons : [
  //         {name: newName, age: 32},
  //         {name: 'Rafael', age: 3}
  //       ]
  //     }
  //   )
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();

    // Essa é a forma mais nova de criar um novo array sem fazer referencia para o antigo, criando uma copia. 
    // O trecho acima, com slice, também faz isso.
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
  
  nameChangedHandler = (event, id) => {
    // console.log("Was clicked!");
    // DON'T DO THAT: this.state.persons[0].name = 'Rafael';

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({
        persons : persons
      }
    )
  }

  switchUserNameHandler = (event) => {
    this.setState(
      {
        username: event.target.value
      }
    )
  }

  togglePersonsHandler = () => {
    const doShow = this.state.showPersons;
    this.setState({showPersons: !doShow});
  }

  render() {

    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {

            return <Person click={() => this.deletePersonHandler(index)}
                      name={person.name} 
                      age={person.age} 
                      key={person.id}
                      change={(event) => this.nameChangedHandler(event, person.id)}/>

          })}
          {/* <Person name={this.state.persons[0].name} 
            change={this.nameChangedHandler}
            click={this.switchNameHandler.bind(this, 'Diomar Rockenbach')}
            age={this.state.persons[0].age}>My Hobbies: Racing</Person>
          <Person name={this.state.persons[1].name} click={this.switchNameHandler.bind(this, 'Diomar Rockenbach')}
            age={this.state.persons[1].age}></Person> */}
        </div>
      );
      style.backgroundColor = 'red';
      
    }

    const classes = [];

    if (this.state.persons.length <=2) {
      classes.push('red'); 
    }

    if (this.state.persons.length <=1) {
      classes.push('bold'); 
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>Dynamic css </p>
        {/* <button style={style}
          onClick={this.switchNameHandler.bind(this, 'Diomar Rockenbach')}>Switch Name</button>  */}
        <div>
          <button style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        </div>
        {persons}
      </div>
    );
    // No final das contas, isso abaixo é o que o react vai fazer com o código acima. Apesar de acima parecer HTML, lembrando que é JSX
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;
