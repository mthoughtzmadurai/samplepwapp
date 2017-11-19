const express = require('express')
const router  = express.Router()
const Auth    = require('../middleware/okta.auth')
const config  = require('../config/config')

const auth = new Auth(config);

// route controllers
router.use('/'          ,               require('./api'))
router.use('/me'        ,               require('./me'))
router.use('/architects', auth.protect, require('./architects'))
router.use('/buildings' ,               require('./buildings'))

module.exports = router
