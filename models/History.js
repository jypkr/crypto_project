const { model, Schema } = require('mongoose')

const History = new Schema({
  weekNumber: Number,
  cash_balance: Number,
  crypto_balances: Number,
  cryptos: [{
    type: Schema.Types.ObjectId,
    ref: 'Crypto'
  }],
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  profit: Number,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('History', History)

