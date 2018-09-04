import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ValidationComponent from './Components/ValidationComponent';
import CharComponent from './Components/CharComponent';

class App extends Component {

  state = {
    textLenght: 0,
    text: ''
  }

  countTextHandler = (event) => {

    this.countText(event.target.value);
    
  }

  countText = (text) => {
    const length = text.length;
    this.setState({textLenght: length, text: text});
  }

  removeCharFromTextHandler = (event, index) => {

    let textArray = [...this.state.text.split('')];
    console.log('entrou index:', index);
    textArray.splice(index,1);

    const text = textArray.join('');

    this.setState({text: text});
    this.countText(text);
  }

  render() {

    const styleOK = {
      border: '1px solid green',
      margin: '4px'
    };

    const styleNOK = {
      border: '1px solid red',
      margin: '4px'
    };

    const textArray = [...this.state.text.split('')];

    let charComponents = (
      <div>
        {textArray.map((char, index) => {
          return <CharComponent key={index} click={(event) => this.removeCharFromTextHandler(event, index)} character={char}></CharComponent>
          })
        }
      </div>
    );
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ol>
          <li style={styleOK}> Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li style={styleOK}>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li style={styleOK}>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li style={styleOK}>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li style={styleOK}>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li style={styleOK}>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <p></p>
        <div>
          <span>Informe um texto:</span>
          <input type="text" onChange={(event) => this.countTextHandler(event)} value={this.state.text}></input>
          <div>
            <span>tamanho do texto: {this.state.textLenght}</span>
            <ValidationComponent lenght={this.state.textLenght}></ValidationComponent>
          </div>
          <p></p>
          {charComponents}
        </div>
      </div>
    );
  }
}

export default App;
