import { ROUTING } from '../constants/Routing';
import history from './history';
export var redirect = function (store) { return function (next) { return function (action) {
    //eslint-disable-line no-unused-vars
    if (action.type === ROUTING) {
        console.log('act', action.payload.nextUrl);
        console.log('rou', action.payload.method);
        history.push('/devices');
    }
    return next(action);
}; }; };
