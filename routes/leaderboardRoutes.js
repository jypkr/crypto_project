const router = require('express').Router()
const { History, User } = require('../models')
const passport = require('passport')

router.get('/leaderboard/:num', (req, res) => {
	History.find({ weekNumber: req.params.num })
		.then(historys => {
			let result = []
			for (let i = 0; i < historys.length; i++) {
				let username = historys[i].username
				let profit = historys[i].profit
				result.push({ username, profit })
			}

			result.sort((a, b) => {
				return b.profit - a.profit
			})

			let result1 = []

			for (let i = 0; i < result.length; i++) {
				let rank = i + 1
				let username = result[i].username
				let profit = result[i].profit
				result1.push({ rank, username, profit })
			}

			res.json(result1)
		})
})

module.exports = router