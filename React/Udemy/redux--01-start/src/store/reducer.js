import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    results: []
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

            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
        case actionTypes.STORE_RESULT:
             // Diferentemente do push que apenas adiciona um novo valor ao array, o concat cria uma nova instância adicionando esse novo valor.
            // Se usar o push, vai estar alterando diretamente o state, o que não deve ser feito
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
            }
        case actionTypes.DELETE_RESULT:
            
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1);

            const updatedArray = state.results.filter(result => result.id !== action.resultElId);

            return {
                ...state,
                results: updatedArray
            }
        default:
            break;
    }

    return state;
}

export default reducer;