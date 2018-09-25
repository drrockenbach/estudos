import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action ) => {
    
    switch (action.type) {
        case actionTypes.STORE_RESULT:
             // Diferentemente do push que apenas adiciona um novo valor ao array, o concat cria uma nova instância adicionando esse novo valor.
            // Se usar o push, vai estar alterando diretamente o state, o que não deve ser feito
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
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