import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />;
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
            );
        }

        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps) (Checkout);