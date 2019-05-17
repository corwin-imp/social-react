'use strict';
var mongoose = require('mongoose');
var channelSchema = mongoose.Schema({
    name: String,
    id: String,
    private: Boolean,
    between: Array,
});
module.exports = mongoose.model('Channel', channelSchema);
