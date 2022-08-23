const express = require('express')
const router = express.Router()

const newControllers = require('../app/controllers/NewControllers.js')

router.get('/news', newControllers.index)

module.exports = router