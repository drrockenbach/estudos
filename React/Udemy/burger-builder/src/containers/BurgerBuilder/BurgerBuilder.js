import React, {Component} from 'react';

import AuxHOC from '../../hoc/AuxHOC';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildConstrols'
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat:  0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('You continue!');
        this.cancelPurchaseHandler();
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <AuxHOC>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary price={this.state.totalPrice} continue={this.purchaseContinueHandler} cancel={this.cancelPurchaseHandler} ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </AuxHOC>
        );
    }
}

export default BurgerBuilder;