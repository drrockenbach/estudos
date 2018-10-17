import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    menus: []
};

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.SAVE_LEFT_MENUS: return saveLeftMenus(state, action); 
        default:            return state;
    }
};

const saveLeftMenus = (state, action) => {
    return updateObject(state, {menus: action.menus})
}

export default reducer;