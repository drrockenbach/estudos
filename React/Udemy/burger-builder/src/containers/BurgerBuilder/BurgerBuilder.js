import React, {Component} from 'react';

import AuxHOC from '../../hoc/AuxHOC/AuxHOC';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildConstrols'
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burberBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

import { connect } from 'react-redux';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onIniIngredients();
        // axios.get('/ingredients.json')
        // .then(response => {
        //     console.log(response);
        //     this.setState({ingredients: response.data});
        // })
        // .catch( error => {
        //     console.log(error);
        //     this.setState({error: true});
        // })
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
        
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    //     this.updatePurchasable(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount > 0) {
    //         const newCount = oldCount - 1;
    //         const updatedIngredients = {
    //             ...this.props.ings
    //         }

    //         updatedIngredients[type] = newCount;

    //         const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    //         this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //         this.updatePurchasable(updatedIngredients);
    //     }


    // }

    updatePurchasable (ingredients) {

        // Soma todos os ingredients
        // A primeira parte com o map, retorna todos os valores dos ingredients. Ex: salad: 1, vai retornar só o 1.
        // A segunda parte com o reduce, vai receber uma funcao, que vai ser chamada para cada retorno do map.
        // A função recebe por parâmetro, no caso no sum, o valor de retorno anterior. Como na primeira vez não existe valor anterior,
        //  vai receber o segundo parâmetro, que é o valor inicial, que nesse caso é zero.
        // O segundo parâmetro, o el, é o valor passado do retorno do map, do caso de salad: 1, será 1. Então caso só existisse esse valor
        // O retorno de sum, seria 1. Caso existisse salad: 1, bacon: 2, o retorno seria 3.
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        },0);

        return sum > 0;
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
        //     ingredients: this.props.ings,
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

        // Lógica para montar query params, caso seja necessário. Não vou apagar para deixar para consulta.
        // const queryParams = [];

        // for (const i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }

        // queryParams.push('price=' + encodeURIComponent(this.props.price));

        // console.log(queryParams);

        // const queryString = queryParams.join('&');

        // console.log(queryString);

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?'+queryString
        // });

        // Com o redux, não será mais necessário passar os ingredientes por parâmetro
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render() {

        const disableInfo = {
            ...this.props.ings
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        let orderSummary = null;
        
        let burger =! this.props.error ? <Spinner/> : <p>Ingridients can't be loaded!</p>
        if (this.props.ings) {
            burger = <AuxHOC>
                <Burger ingredients={this.props.ings}/>
                    <BuilderControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler}/>
            </AuxHOC>;

            orderSummary = <OrderSummary price={this.props.price} continue={this.purchaseContinueHandler} cancel={this.cancelPurchaseHandler} ingredients={this.props.ings}/>;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner/>;
        // }

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

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burberBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burberBuilderActions.removeIngredient(ingName)),
        onIniIngredients: () => dispatch(burberBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burberBuilderActions.purchaseInit())
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));