const router = require('express').Router()
const { Crypto, User } = require('../models')
const passport = require('passport')
const { json } = require('express')

router.get('/crypto/:history_id', async function (req, res) {
  await Crypto.find({ history: req.params.history_id })
    .then(data => {
      res.json(data)
    })
    .catch(err => res.json(err))
})

router.post('/crypto', passport.authenticate('jwt'), async function (req, res) {
  const crypto = await Crypto.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { cryptos: crypto._id } })
    .then(data => res.json({
      user: data,
      crypto: crypto,
      message: "Success!"
    }))
    .catch(err => res.json({
      err: err,
      message: "unable to post crypto"
    }))
})

router.put('/crypto/:id', passport.authenticate('jwt'), async function (req, res) {
  await Crypto.findByIdAndUpdate(req.params.id, req.body)
    .then(data => console.log(data))
    .catch(err => console.log(err))
  res.sendStatus(200)
})



router.delete('/crypto/:id', passport.authenticate('jwt'), async function (req, res) {
  await Crypto.findByIdAndDelete(req.params.id)
  await User.findByIdAndUpdate(req.user._id, { $pull: { cryptos: req.params.id } })
  res.sendStatus(200)
})

module.exports = router