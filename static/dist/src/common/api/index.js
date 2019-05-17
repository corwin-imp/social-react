import axios from 'axios';
import config from '../../../config/config';
var apiPrefix = config.apiPrefix;
export default {
    getItems: function (data) {
        return axios.post(apiPrefix + "/api/items/", data);
    },
    removeFile: function (data) {
        return axios.post(apiPrefix + "/ftp/remove/", data);
    },
    getItem: function (data) {
        return axios.post(apiPrefix + "/api/get_user/", data);
    },
    getVideo: function (data) {
        return axios.get(apiPrefix + "/api/video", data);
    },
    addVideo: function (data) {
        return axios.post(apiPrefix + "/api/add-video", data);
    },
    addItem: function (data) {
        return axios.post(apiPrefix + "/api/items/add", data);
    },
    delItem: function (data) {
        return axios.post(apiPrefix + "/api/items/delete", data);
    },
    delVideo: function (data) {
        return axios.post(apiPrefix + "/api/video/delete", data);
    },
    list: function (data) {
        return axios.post(apiPrefix + "/api/items/list", data);
    },
    updateItem: function (data) {
        return axios.post(apiPrefix + "/api/items/update", data);
    },
    deleteCollect: function () {
        return axios.get(apiPrefix + "/api/items/delcol");
    },
};
