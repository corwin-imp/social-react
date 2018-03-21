var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    age: String,
    gender: String,
    password: String,
    email: String,
    friends: Array,
    country: String,
    ip: String,
    city: String,
    channels: Array,
    audio: Array,
    video: Array,
    picture: String,
    photos: Array,
    date: Date,
  },
  facebook: {
    id: String,
    username: String,
    token: String,
    email: String,
  },
})

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', UserSchema)
