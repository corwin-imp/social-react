"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ItemSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    audio: { type: Array },
    video: { type: Array },
    photos: { type: Array },
    date: { type: Date },
});
module.exports = mongoose_1.default.model('profiles', ItemSchema);
