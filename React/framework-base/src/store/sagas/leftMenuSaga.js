
import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
import { leftMenuClicked } from '../actions/leftMenuActions';

export function* loadLeftMenusSaga(action) {

    const menus = yield localStorage.getItem("menus");
    if (menus) {
        yield put(actions.saveLeftMenus(JSON.parse(menus)));
    } else {
        
        const response = yield axios.get("https://framework-base.firebaseio.com/menus.json");
        try {
            yield put(actions.saveLeftMenus(response.data));

            yield localStorage.setItem("menus", JSON.stringify(response.data));
        } catch(err ) {
            yield console.log("loadLeftMenusSaga - erro ao buscar menus");
        };
    }
};

export function* leftMenuClickedSaga(action) {



}