
import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHanlder = (event) => {
        event.preventDefault();

        // this.cancelPurchaseHandler();
        
        this.setState({loading: true});

        const formData = {};

        for (let formElementIdent in this.state.orderForm) {
            console.log('formElementIdent ', formElementIdent);
            formData[formElementIdent] = this.state.orderForm[formElementIdent].value;
        }

        console.log('formData ',  formData);

        const  order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        console.log("order ", order);

        axios.post('/orders.json',order)
        .then(response => {
            
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {

        const formElemetsArray = [];

        for (let key in this.state.orderForm) {
            formElemetsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (<form onSubmit={this.orderHanlder}>
                    {formElemetsArray.map(element => (
                        <Input changed={(event) => this.inputChangedHandler(event, element.id)} key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} />
                    ))}

                        <Button btnType="Success">ORDER</Button>
                    </form>);

        if (this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }

}

export  default ContactData;