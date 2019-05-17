import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var VideoSchema = new Schema({
    name: { type: String },
    src: { type: String },
    date: { type: String },
});
module.exports = mongoose.model('videos', VideoSchema);
