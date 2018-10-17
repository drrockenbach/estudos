import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import MainWrapper from './hoc/MainWrapper/MainWrapper';
import Perfil from './containers/CRUDs/Perfil/Perfil';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    
    return (
      <MainWrapper>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/perfil" component={Perfil} />
          <Redirect to="/" /> 
        </Switch>
      </MainWrapper>
    );
  }
};

export default App;
