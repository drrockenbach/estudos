import * as actionTypes from './actionTypes';

export const loadLeftMenus = () => {
    return {
        type: actionTypes.LOAD_LEFT_MENUS
    };
};

export const saveLeftMenus = (menus) => {
    return {
        type: actionTypes.SAVE_LEFT_MENUS,
        menus: menus
    };
};

export const leftMenuClicked = () => {
    return {
        type: actionTypes.LEFT_MENU_CLICKED
    }
}