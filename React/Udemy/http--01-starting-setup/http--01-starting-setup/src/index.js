import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => { // Só cai nesse erro se acontecer erro na chamada. Por exemplo se estiver sem internet ou algo assim. 
              //Erros como 404 ou qualquer error retornado pelo servidor não cai aqui
    console.log(error);
    Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => { // Aqui sim da pra tratar os erros retornados pelo server, como 404
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
