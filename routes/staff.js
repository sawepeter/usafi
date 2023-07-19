const express = require('express')
const { createStaffProfile } = require('../controllers/staffController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all staff routes
router.use(requireAuth)

//create staff profile
router.get('/', createStaffProfile)


module.exports = router