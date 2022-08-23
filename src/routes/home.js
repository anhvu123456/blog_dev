const express = require('express')
const router = express.Router()

const homeControllers = require('../app/controllers/HomeControllers.js')

router.get('/home', homeControllers.home)
router.get('/search', homeControllers.search)

module.exports = router