import React, { Component } from 'react';

import PizzaImage from '../components/PizzaImagem/PizzaImage';

export default class Pizza extends Component {
  render() {
    return (
      <div>
          <h1>The Pizza</h1>
          <PizzaImage />
      </div>
    );
  };
};