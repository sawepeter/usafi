const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    phoneNumber: {
        type: Integer,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    }
})

//static customer register method
customerSchema.statics.register = async function(phoneNumber, password, location) {
    //validation
    if(!phoneNumber || !password || !location) {
        throw Error('All fields must be filled')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not Strong enough')
    }

    const exists = await this.findOne( { phoneNumber })

    if (exists) {
        throw Error('Phone Number already registered')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const customer = await this.create({ phoneNumber, password: hash, location })

    return customer
}

//static customer login method
customerSchema.statics.login = async function(phoneNumber, password) {
    if (!phoneNumber || !password) {
        throw Error('All fields must be filled')
    }

    const customer = await this.findOne({ phoneNumber })

    if(!customer){
        throw Error('Incorrect Number')
    }

    const match = await bcrypt.compare(password, customer.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return customer
}

module.exports = mongoose.model('Customer', userSchema)