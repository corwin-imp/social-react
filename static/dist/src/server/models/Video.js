"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VideoSchema = new Schema({
    name: { type: String },
    src: { type: String },
    date: { type: String },
});
module.exports = mongoose_1.default.model('videos', VideoSchema);
