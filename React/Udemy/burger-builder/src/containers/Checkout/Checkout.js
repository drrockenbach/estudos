import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route} from 'react-router-dom';

import ContacData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount () {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        
        this.setState({ingredients: ingredients, price: +price});

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {

        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                onCheckcoutCancelled={this.checkoutCancelledHandler}
                onCheckcoutContinued={this.checoutContinuedHandler}></CheckoutSummary>

                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContacData ingredients={this.state.ingredients} price={this.state.price} {...props} />)}/>
            </div>
        )
    }

}

export default Checkout;