import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';

import { createStore , applyMiddleware , compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});


const sagaMiddlware = createSagaMiddleware();


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddlware)
));

// watchAuth é um listener, que fica escutando as actions que são registradas
sagaMiddlware.run(watchAuth);
sagaMiddlware.run(watchBurgerBuilder);
sagaMiddlware.run(watchOrder);

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
