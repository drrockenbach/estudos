import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { loadLeftMenusSaga, leftMenuClickedSaga } from './leftMenuSaga';

export function* watchLeftMenu() {
    yield takeLatest(actionTypes.LOAD_LEFT_MENUS, loadLeftMenusSaga);
    yield takeLatest(actionTypes.LEFT_MENU_CLICKED, leftMenuClickedSaga);
}