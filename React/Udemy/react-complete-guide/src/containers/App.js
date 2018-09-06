import React, { Component } from 'react';
import Classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cookpit from '../components/Cookpit/Cookpit';

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

    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons} clicked={this.deletePersonHandler}  changed={this.nameChangedHandler}/>
        </div>
      );
    }

    const assignedClasses = [];

    if (this.state.persons.length <=2) {
      assignedClasses.push(Classes.red); 
    }

    if (this.state.persons.length <=1) {
      assignedClasses.push(Classes.bold); 
    }

    return (
      <div className={Classes.App}>
        <Cookpit showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          appTitle={this.props.title}/>
        {persons}
      </div>
    );
    // No final das contas, isso abaixo é o que o react vai fazer com o código acima. Apesar de acima parecer HTML, lembrando que é JSX
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;
