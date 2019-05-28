"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_actions_1 = require("redux-actions");
const isomorphic_fetch_1 = tslib_1.__importDefault(require("isomorphic-fetch"));
const react_cookie_1 = tslib_1.__importDefault(require("react-cookie"));
const Profile_1 = tslib_1.__importDefault(require("../Profile/Profile"));
const socket_io_client_1 = tslib_1.__importDefault(require("socket.io-client"));
const actionsD = tslib_1.__importStar(require("../Profile/actionsProfile"));
const socket = socket_io_client_1.default('', { path: '/api/chat' });
const types = tslib_1.__importStar(require("./types"));
const redux_actions_2 = require("redux-actions");
exports.requestSignUp = redux_actions_2.createAction(types.AUTH_SIGNUP, data => ({ data }));
exports.requestSignOut = redux_actions_2.createAction(types.AUTH_SIGNOUT, data => ({ data }));
exports.receiveSignOut = redux_actions_2.createAction(types.AUTH_SIGNOUT_SUCCESS, data => ({ data }));
exports.requestSignIn = redux_actions_2.createAction(types.AUTH_SIGNIN, data => ({ data }));
exports.loadUser = redux_actions_2.createAction(types.AUTH_LOAD_SUCCESS, (data) => {
    const user = new Profile_1.default(data);
    return {
        user
    };
});
exports.receiveSocket = redux_actions_2.createAction(types.RECEIVE_SOCKET, data => ({ data }));
exports.receiveUser = redux_actions_2.createAction(types.AUTH_SIGNUP_SUCCESS, (dataB) => {
    const user = new Profile_1.default(dataB);
    socket.emit('user come', user);
    return {
        user,
    };
});
exports.receiveSignIn = redux_actions_2.createAction(types.AUTH_SIGNIN_SUCCESS, (userbase) => {
    const user = new Profile_1.default(userbase);
    socket.emit('user come', user);
    return {
        user,
    };
});
exports.setPictureAction = redux_actions_2.createAction(types.AUTH_CHOOSE_PICTURE, (сhoose) => {
    return {
        currentPicture: сhoose,
    };
});
function receiveAuth(dispatch) {
    const user = react_cookie_1.default.load('userId');
    if (user) {
        let dataB = { userId: user };
        return dispatch => {
            return isomorphic_fetch_1.default('/api/get_user', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataB),
            })
                .then(response => response.json())
                .then(json => {
                dispatch(exports.loadUser(json));
                dispatch(actionsD.onItem(user));
            })
                .catch(error => {
                throw error;
            });
        };
    }
    else {
        return { type: false };
    }
}
exports.receiveAuth = receiveAuth;
function checkAuth() {
    if (react_cookie_1.default.load('userId')) {
        return true;
    }
    return redux_actions_1.browserHistory.push('/signin');
}
exports.checkAuth = checkAuth;
function signOut() {
    return dispatch => {
        dispatch(exports.requestSignOut());
        return isomorphic_fetch_1.default('/api/signout')
            .then(response => {
            if (response.ok) {
                const user = react_cookie_1.default.load('userId');
                react_cookie_1.default.remove('userId');
                dispatch(exports.receiveSignOut());
                dispatch(actionsD.offItem(user));
                redux_actions_1.browserHistory.push('/');
            }
        })
            .catch(error => {
            throw error;
        });
    };
}
exports.signOut = signOut;
function signUp(user) {
    return dispatch => {
        dispatch(exports.requestSignUp());
        return isomorphic_fetch_1.default('/api/sign_up', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(json => {
            react_cookie_1.default.save('userId', json._id);
            dispatch(actionsD.onItem(json._id));
            dispatch(exports.receiveUser(json));
            redux_actions_1.browserHistory.push('my-profile');
        })
            .catch(error => {
            throw error;
        });
    };
}
exports.signUp = signUp;
function setPicture(choose, id, dispatch) {
    let data = {
        choose: choose,
        id: id,
    };
    isomorphic_fetch_1.default('/api/set-picture', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
        dispatch(exports.setPictureAction(choose));
    })
        .catch(error => {
        throw error;
    });
}
exports.setPicture = setPicture;
function signIn(user) {
    return dispatch => {
        dispatch(exports.requestSignIn());
        return isomorphic_fetch_1.default('/api/sign_in', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(json => {
            react_cookie_1.default.save('userId', json._id);
            dispatch(actionsD.onItem(json._id));
            dispatch(exports.receiveSignIn(json));
            redux_actions_1.browserHistory.push('/my-profile');
        })
            .catch(error => {
            throw error;
        });
    };
}
exports.signIn = signIn;