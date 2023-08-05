const express = require('express')

//controller functions
const { registerCustomer,loginCustomer} = require('../controllers/customerController')

const router = express.Router()

//login route
router.post('/login', loginCustomer)

//register route
router.post('/register', registerCustomer)

module.exports = router