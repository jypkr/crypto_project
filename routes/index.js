const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./cryptoRoutes.js'))
router.use('/api', require('./historyRoutes.js'))
router.use('/api', require('./leaderboardRoutes.js'))

module.exports = router