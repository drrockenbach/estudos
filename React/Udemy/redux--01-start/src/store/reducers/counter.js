import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action ) => {
    
    switch (action.type) {
        case actionTypes.INCREMENT:
            // Opção para editar o state de forma imutável.
            // O detalhe aqui, é que o que for retornado, irá substituir o state, então, como agora tem o results junto,
            // se retornar apenas o counter, vai sobreecrever e remover o results.

            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;

        case actionTypes.DECREMENT:

            // Forma simplificada de fazer o mesmo que acima. Aqui vai retornar um objeto com todo o state atual.
            // Ao adicionar uma propriedade que já existe no state anterior, no caso o counter, esse será sobrescrito.
            return updateObject(state, {counter: state.counter -1});
            
        case actionTypes.ADD:
            return updateObject(state, {counter: state.counter + action.value})
            
        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.value});
            
        default:
            break;
    }

    return state;
}

export default reducer;