"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = tslib_1.__importDefault(require("../../../config/config"));
const apiPrefix = config_1.default.apiPrefix;
exports.default = {
    getItems(data) {
        return axios_1.default.post(`${apiPrefix}/api/items/`, data);
    },
    removeFile(data) {
        return axios_1.default.post(`${apiPrefix}/ftp/remove/`, data);
    },
    getItem(data) {
        return axios_1.default.post(`${apiPrefix}/api/get_user/`, data);
    },
    getVideo(data) {
        return axios_1.default.get(`${apiPrefix}/api/video`, data);
    },
    addVideo(data) {
        return axios_1.default.post(`${apiPrefix}/api/add-video`, data);
    },
    addItem(data) {
        return axios_1.default.post(`${apiPrefix}/api/items/add`, data);
    },
    delItem(data) {
        return axios_1.default.post(`${apiPrefix}/api/items/delete`, data);
    },
    delVideo(data) {
        return axios_1.default.post(`${apiPrefix}/api/video/delete`, data);
    },
    list(data) {
        return axios_1.default.post(`${apiPrefix}/api/items/list`, data);
    },
    updateItem(data) {
        return axios_1.default.post(`${apiPrefix}/api/items/update`, data);
    },
    deleteCollect() {
        return axios_1.default.get(`${apiPrefix}/api/items/delcol`);
    },
};
