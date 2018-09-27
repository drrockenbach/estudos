import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';

import * as actionTypes from '../../store/actions/index';

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // Isso era necessário quando passava os parâmetros por query param. 
    // Agora que é por redux, não é mais necessário
    // componentWillMount () {

    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
        
    //     this.setState({ingredients: ingredients, price: +price});

    // }    

    // componentWillMount () {
    //     this.props.onInitPurchase();
    // };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />
        console.log(" props ",this.props);
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings} 
                    onCheckcoutCancelled={this.checkoutCancelledHandler}
                    onCheckcoutContinued={this.checoutContinuedHandler}></CheckoutSummary>

                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                    
                    {/* Antes do redux, fazia com abaixo para renderizar o contactData e passar os parâmetros. */}
                    {/* <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContacData ingredients={this.props.ings} price={this.props.price} {...props} />)}/> */}
                </div>
            )
        }

        return  summary
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps) (Checkout);