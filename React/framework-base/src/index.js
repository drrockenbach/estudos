import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import leftMenu from './store/reducers/leftMenuReducer';

import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { watchLeftMenu } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    leftMenu: leftMenu
});


const sagaMiddlware = createSagaMiddleware();


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddlware)
));

// watchAuth é um listener, que fica escutando as actions que são registradas
sagaMiddlware.run(watchLeftMenu);


const app = (
                <Provider store={store} >
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            );

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

