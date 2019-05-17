import { browserHistory } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import Profile from '../Profile/Profile';
import io from 'socket.io-client';
import * as actionsD from '../Profile/actionsProfile';
var socket = io('', { path: '/api/chat' });
import * as types from "./types";
import { createAction } from 'redux-actions';
export var requestSignUp = createAction(types.AUTH_SIGNUP, function (data) { return ({ data: data }); });
export var requestSignOut = createAction(types.AUTH_SIGNOUT, function (data) { return ({ data: data }); });
export var receiveSignOut = createAction(types.AUTH_SIGNOUT_SUCCESS, function (data) { return ({ data: data }); });
export var requestSignIn = createAction(types.AUTH_SIGNIN, function (data) { return ({ data: data }); });
export var loadUser = createAction(types.AUTH_LOAD_SUCCESS, function (data) {
    var user = new Profile(data);
    return {
        user: user
    };
});
export var receiveSocket = createAction(types.RECEIVE_SOCKET, function (data) { return ({ data: data }); });
export var receiveUser = createAction(types.AUTH_SIGNUP_SUCCESS, function (dataB) {
    var user = new Profile(dataB);
    socket.emit('user come', user);
    return {
        user: user,
    };
});
export var receiveSignIn = createAction(types.AUTH_SIGNIN_SUCCESS, function (userbase) {
    var user = new Profile(userbase);
    socket.emit('user come', user);
    return {
        user: user,
    };
});
export var setPictureAction = createAction(types.AUTH_CHOOSE_PICTURE, function (сhoose) {
    return {
        currentPicture: сhoose,
    };
});
export function receiveAuth(dispatch) {
    var user = cookie.load('userId');
    if (user) {
        var dataB_1 = { userId: user };
        return function (dispatch) {
            return fetch('/api/get_user', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataB_1),
            })
                .then(function (response) { return response.json(); })
                .then(function (json) {
                dispatch(loadUser(json));
                dispatch(actionsD.onItem(user));
            })
                .catch(function (error) {
                throw error;
            });
        };
    }
    else {
        return { type: false };
    }
}
export function checkAuth() {
    if (cookie.load('userId')) {
        return true;
    }
    return browserHistory.push('/signin');
}
export function signOut() {
    return function (dispatch) {
        dispatch(requestSignOut());
        return fetch('/api/signout')
            .then(function (response) {
            if (response.ok) {
                var user = cookie.load('userId');
                cookie.remove('userId');
                dispatch(receiveSignOut());
                dispatch(actionsD.offItem(user));
                browserHistory.push('/');
            }
        })
            .catch(function (error) {
            throw error;
        });
    };
}
export function signUp(user) {
    return function (dispatch) {
        dispatch(requestSignUp());
        return fetch('/api/sign_up', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(function (response) { return response.json(); })
            .then(function (json) {
            cookie.save('userId', json._id);
            dispatch(actionsD.onItem(json._id));
            dispatch(receiveUser(json));
            browserHistory.push('my-profile');
        })
            .catch(function (error) {
            throw error;
        });
    };
}
export function setPicture(choose, id, dispatch) {
    var data = {
        choose: choose,
        id: id,
    };
    fetch('/api/set-picture', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(function (response) {
        dispatch(setPictureAction(choose));
    })
        .catch(function (error) {
        throw error;
    });
}
export function signIn(user) {
    return function (dispatch) {
        dispatch(requestSignIn());
        return fetch('/api/sign_in', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(function (response) { return response.json(); })
            .then(function (json) {
            cookie.save('userId', json._id);
            dispatch(actionsD.onItem(json._id));
            dispatch(receiveSignIn(json));
            browserHistory.push('/my-profile');
        })
            .catch(function (error) {
            throw error;
        });
    };
}
