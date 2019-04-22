import mongoose from 'mongoose'

const Schema = mongoose.Schema

const VideoSchema = new Schema({
  name: { type: String },
  src: { type: String },
  date: { type: String },
})
module.exports = mongoose.model('videos', VideoSchema)
