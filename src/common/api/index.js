import axios from 'axios'

import config from '../../../config/config'
const apiPrefix = config.apiPrefix
export default {
  getItems(data) {
    return axios.post(`${apiPrefix}/api/items/`, data)
  },
  removeFile(data) {
    return axios.post(`${apiPrefix}/ftp/remove/`, data)
  },
  getItem(data) {
    return axios.post(`${apiPrefix}/api/get_user/`, data)
  },
  getVideo(data) {
    return axios.get(`${apiPrefix}/api/video`, data)
  },
  addVideo(data) {
    return axios.post(`${apiPrefix}/api/add-video`, data)
  },
  addItem(data) {
    return axios.post(`${apiPrefix}/api/items/add`, data)
  },
  delItem(data) {
    return axios.post(`${apiPrefix}/api/items/delete`, data)
  },
  delVideo(data) {
    return axios.post(`${apiPrefix}/api/video/delete`, data)
  },
  list(data) {
    return axios.post(`${apiPrefix}/api/items/list`, data)
  },
  updateItem(data) {
    return axios.post(`${apiPrefix}/api/items/update`, data)
  },
  deleteCollect() {
    return axios.get(`${apiPrefix}/api/items/delcol`)
  },
}
