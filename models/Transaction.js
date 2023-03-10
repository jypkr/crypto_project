const { model, Schema } = require('mongoose')

const Transaction = new Schema({
	date: Date,
	crypto_name: String,
	side: String,
	price: Number,
	amount: Number,
	total: Number,
	history: {
		type: Schema.Types.ObjectId,
		ref: 'History'
	}
})

module.exports = model('Transaction', Transaction)

