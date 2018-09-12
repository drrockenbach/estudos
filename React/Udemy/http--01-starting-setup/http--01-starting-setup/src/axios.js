import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

//instance.defaults.common // Aqui também da pra cadastrar os defaults

//instance.interceptors.request // Aqui também da pra cadastrar os interceptors

export default instance;