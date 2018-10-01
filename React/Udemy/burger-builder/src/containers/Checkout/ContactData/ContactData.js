
import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 9,
                    maxLength: 9
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid: true
            }
        },
        formIsValid: false
    }

    orderHanlder = (event) => {
        event.preventDefault();

        // this.cancelPurchaseHandler();
        
        // this.setState({loading: true});

        const formData = {};

        for (let formElementIdent in this.state.orderForm) {
            console.log('formElementIdent ', formElementIdent);
            formData[formElementIdent] = this.state.orderForm[formElementIdent].value;
        }

        console.log('formData ',  formData);

        const  order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        console.log("order ", order);

        this.props.onOrderBurger(order, this.props.token);

        // axios.post('/orders.json',order)
        // .then(response => {
            
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     this.setState({loading: false});
        // })
    }

    checkValidity(value, rules) {
        
        console.log(rules);
        if (!rules) {
            return true;
        }

        let isValid = true;

        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation );
        updatedFormElement.touched = true;
        console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        <Input changed={(event) => this.inputChangedHandler(event, element.id)} 
                        key={element.id} 
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        valueType={element.config.elementConfig.placeholder}
                        value={element.config.value} />
                    ))}

                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>);

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));