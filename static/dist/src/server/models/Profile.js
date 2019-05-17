import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ItemSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    audio: { type: Array },
    video: { type: Array },
    photos: { type: Array },
    date: { type: Date },
});
module.exports = mongoose.model('profiles', ItemSchema);
