
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

// O arterico (*) define que a function é uma generetor function.
// Faz parte do proxima geração do js e permite que código assincrono seja executado e que espere esse código terminar.

export function* logoutSaga(action) {
    // yield diz que é para esperar até que a ação termine para continuar.

    yield call ([localStorage,"removeItem"], "token");
    yield call ([localStorage,"removeItem"], "expirationDate");
    yield call ([localStorage,"removeItem"], "userId");
    
    // Faz o dispatch da action
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout());
};

export function* authSaga(action) {
    yield put(actions.authStart());
        
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAX-33MYq2-EPDkDPb5tEVzMlCxmE3UBZc";
    if (!action.isSignup) {
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAX-33MYq2-EPDkDPb5tEVzMlCxmE3UBZc";
    }

    try {
        const response = yield axios.post(url, authData);
        
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield localStorage.setItem("token", response.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.localId);
        
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.response.data.error));
    }
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        } else {
            yield put(actions.logout());
        }
    }
}