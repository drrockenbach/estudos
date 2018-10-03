import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentWillMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = ( 
        <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* Esse redirect também vai fazer parte do case. 
                Então qualquer página que tentar acessar, que seja diferente das mapeadas, vai direcionar para a página inicial.
                Também daria para neste cenário redirecionar para uma página de 404 */}
            <Redirect to="/" /> 
          </Switch>
    );

      if (this.props.isAuthenticated) {
        routes = (
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" /> 
          </Switch>
        );
      }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
