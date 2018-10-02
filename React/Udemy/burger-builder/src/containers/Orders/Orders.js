import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        // axios.get('/orders.json')
        // .then(res => {
        //     const fetchedOrders = [];
        //     for (let key in res.data) {
        //         fetchedOrders.push({...res.data[key], id: key});
        //     }

        //     console.log(fetchedOrders);

        //     this.setState({loading: false, orders: fetchedOrders});
        // })
        // .catch(err => {
        //     this.setState({loading: false});
        // })
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                ))}
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId))
    };
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
