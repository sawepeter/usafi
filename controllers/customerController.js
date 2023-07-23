const Customer = require('../models/customerModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h'})
}

//customer login
const loginCustomer = async (req, res) => {

    const { phoneNumber, password} = req.body

    try {
        const customer = await Customer.login(phoneNumber, password)

        //create a token
        const token = createToken(customer._id)

        res.status(200).json({phoneNumber, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//customer signup
const registerCustomer = async (req, res) => {
    const { phoneNumber, password, location} = req.body

    try {
        const customer = await Customer.register(phoneNumber, password, location)

        //create a token
        const token = createToken(customer._id)

        res.status(200).json({phoneNumber, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {registerCustomer,loginCustomer}