const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  historys: [{
    type: Schema.Types.ObjectId,
    ref: 'History'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)