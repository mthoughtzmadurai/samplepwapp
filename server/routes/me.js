const models  = require('../models')
const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => {
	res.send( req.userInfo )
})

module.exports = router