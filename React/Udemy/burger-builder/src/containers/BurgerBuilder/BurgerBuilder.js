import React, {Component} from 'react';

import AuxHOC from '../../hoc/AuxHOC/AuxHOC';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildConstrols'
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            console.log(response);
            this.setState({ingredients: response.data});
        })
        .catch( error => {
            console.log(error);
            this.setState({error: true});
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const newCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }

            updatedIngredients[type] = newCount;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchasable(updatedIngredients);
        }


    }

    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        },0);

        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        // this.cancelPurchaseHandler();
        
        // this.setState({loading: true});

        // const  orders = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Diomar Rockenbach',
        //         adress: {
        //             street:'Street teste',
        //             zip: '12347891273129',
        //             country: 'Brasil'
        //         },
        //         email:'teste@teste.com'
        //     },
        //     deliveryMethod:'fastest'
        // }

        // axios.post('/orders.json',orders)
        // .then(response => {
            
        //     this.setState({loading: false, purchasing: false});
        // })
        // .catch(error => {
        //     this.setState({loading: false, purchasing: false});
        // })

        const queryParams = [];

        for (const i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + encodeURIComponent(this.state.totalPrice));

        console.log(queryParams);

        const queryString = queryParams.join('&');

        console.log(queryString);

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });

    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        let orderSummary = null;
        
        let burger =! this.state.error ? <Spinner/> : <p>Ingridients can't be loaded!</p>
        if (this.state.ingredients) {
            burger = <AuxHOC>
                <Burger ingredients={this.state.ingredients}/>
                    <BuilderControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
            </AuxHOC>;

            orderSummary = <OrderSummary price={this.state.totalPrice} continue={this.purchaseContinueHandler} cancel={this.cancelPurchaseHandler} ingredients={this.state.ingredients}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <AuxHOC>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </AuxHOC>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);