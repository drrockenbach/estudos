
import * as actionTypes from './actionsTypes';

const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
}

// Mágica com o redux thunk para executar código assincrono antes de rodar o dispatch do redux.
// Isso é apenas uma simulação com o setTimeout
export const storeResult = (res) => {
    return dispatch => {
        setTimeout( () =>{
            dispatch(saveResult(res));
        }, 2000);
    }    
};

export const deleteResult = (resultId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resultId
    }
};