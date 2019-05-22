"use strict";
/**
    Bind multiple component methods:

    * @param {this} context
    * @param {Array} functions

    constructor() {
        ...
        bindFunctions.call(this, ['handleClick', 'handleOther']);
    }
*/
Object.defineProperty(exports, "__esModule", { value: true });
function bindFunctions(functions) {
    functions.forEach(f => (this[f] = this[f].bind(this)));
}
exports.default = bindFunctions;
