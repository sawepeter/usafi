const express = require('express')

//controller functions
const { registerCustomer,loginCustomer} = require('../controllers/customerController')

const router = express.Router()

//login route
router.post('/customer/login', loginCustomer)

//register route
router.post('/customer/register', registerCustomer)

module.exports = router