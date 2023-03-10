const router = require('express').Router()
const { History, User, Transaction, Crypto } = require('../models')
const passport = require('passport')

router.get('/history/max', passport.authenticate('jwt'), (req, res) => {
	let result = []
	for (let i = 0; i < req.user.historys.length; i++) {
		result.push(req.user.historys[i].weekNumber)
	}
	res.json(result)
})

router.get('/history/:num', passport.authenticate('jwt'), async function (req, res) {
	await History.find({ weekNumber: req.params.num, user: req.user._id })
		.then(history => res.json(history))
})

router.post('/history', passport.authenticate('jwt'), async function (req, res) {

	const currentdate = new Date()
	var oneJan = new Date(currentdate.getFullYear(), 0, 1)
	var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000))
	var ingame_weeknumber = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7)

	const history = await History.create({ weekNumber: ingame_weeknumber, cash_balance: 1000, crypto_balances: 0, profit: 0, username: req.user.username, user: req.user._id })

	await User.findByIdAndUpdate(req.user._id, { $push: { historys: history._id } })
		.then(data => res.json({
			user: data,
			history: history,
			message: "Success!"
		}))
		.catch(err => res.json({
			err: err,
			message: "unable to post history"
		}))
})


// Transaction Function........!!!!!!!!
router.put('/history/transaction/', passport.authenticate('jwt'), async function (req, res) {
	const currentdate = new Date()
	var oneJan = new Date(currentdate.getFullYear(), 0, 1)
	var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000))
	var ingame_weeknumber = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7)

	let historys = req.user.historys
	let history_id = historys.find(obj => obj.weekNumber === ingame_weeknumber)._id
	let crypto_name = req.body.crypto_name
	let amount = req.body.amount
	let cash_balance = historys.find(obj => obj.weekNumber === ingame_weeknumber).cash_balance
	let crypto_balances = historys.find(obj => obj.weekNumber === ingame_weeknumber).crypto_balances
	let total = req.body.price * amount
	let flag = true

	// selling function
	if (req.body.side === 'sell') {

		let sell_flag = true
		// check if user is able to sell the coin and amount
		await Crypto.find({ crypto_name: crypto_name, history: history_id })
			.then(data => {
				// if there is no crypto data in db or the amount in the crypto is less then req.body.amount
				if (data.length === 0 || data[0].amount === 0 || data[0].amount < amount) {
					sell_flag = false
					res.json({
						messagae: 'Not enough amount to sell',
						data: data
					})
				}
			})
			.catch(err => console.log(err))
		// Crypto.find and update Crypto and update crypto_balances, cash_balance
		if (sell_flag) {

			const transaction = await Transaction.create({ ...req.body, date: currentdate, total: total, history: history_id })

			await Crypto.find({ history: history_id, crypto_name: crypto_name })
				.then(data => {
					Crypto.findByIdAndUpdate(data[0]._id, { $inc: { amount: -amount } })
						.then(data => {
							res.json({
								crypto: data,
								message: "Crypto amount updated"
							})
						})
				})
				.catch(err => console.log(err))

			// update balance
			crypto_balances -= total
			cash_balance += total

			let profit = cash_balance + crypto_balances - 1000

			await History.findByIdAndUpdate(history_id, {
				$push: { transactions: transaction }, cash_balance: cash_balance, crypto_balances: crypto_balances, profit: profit
			})
				.then(data => {
					res.json({
						history: data,
						message: 'History updated with new balances'
					})
				})
				.catch(err => res.json({
					err: err,
					message: "unable to update balance"
				}))
		}


	}
	// able to make transaction
	else if (total <= cash_balance) {
		// crypto_balances update should be different
		crypto_balances += total
		cash_balance -= total

		// Need another function to update profit
		let profit = cash_balance + crypto_balances - 1000

		const transaction = await Transaction.create({ ...req.body, date: currentdate, total: total, history: history_id })

		// if crypto already existed
		await Crypto.find({ history: history_id, crypto_name: crypto_name })
			.then(data => {
				if (data.length !== 0) {
					flag = false
					// update amount
					Crypto.findByIdAndUpdate(data[0]._id, { $inc: { amount: amount } })
						.then(data => {
							res.json({
								crypto: data,
								message: "Crypto amount updated"
							})
						})
					// update balance
					History.findByIdAndUpdate(history_id, {
						$push: { transactions: transaction }, cash_balance: cash_balance, crypto_balances: crypto_balances, profit: profit
					})
						.then(data => {
							console.log(data)
							res.json({
								history: data,
								message: 'History updated with new balances'
							})
						})
						.catch(err => res.json({
							err: err,
							message: "unable to update balance"
						}))
				}
			})
			.catch(err => console.log(err))

		// else if there is no crypto in cryptos
		if (flag) {
			// create crypto to input
			const crypto = await Crypto.create({ ...req.body, history: history_id })
			// update balance
			History.findByIdAndUpdate(history_id, {
				$push: { transactions: transaction, cryptos: crypto }, cash_balance: cash_balance, crypto_balances: crypto_balances, profit: profit
			})
				.then(data => {
					res.json({
						history: data,
						message: 'History updated with new balances'
					})
				})
				.catch(err => res.json({
					err: err,
					message: "unable to update balance"
				}))
		}
	}
	// not able to make transaction
	else {
		res.json(
			{
				message: "Not enough cash balance"
			}
		)
	}
})

router.put('/history/:id', passport.authenticate('jwt'), async function (req, res) {
	await History.findByIdAndUpdate(req.params.id, req.body)
		.then(data => console.log(data))
		.catch(err => console.log(err))
	res.sendStatus(200)
})

router.get('/history/transaction/:weekNum', passport.authenticate('jwt'), (req, res) => {

	let historys = req.user.historys
	let weekNum = req.params.weekNum
	let history_id = historys.find(obj => obj.weekNumber.toString() === weekNum)._id

	Transaction.find({ history: history_id })
		.then(data => {
			res.json(data)
		})
})


router.delete('/history/:id', passport.authenticate('jwt'), async function (req, res) {
	await History.findByIdAndDelete(req.params.id)
	await User.findByIdAndUpdate(req.user._id, { $pull: { historys: req.params.id } })
	res.sendStatus(200)
})

module.exports = router