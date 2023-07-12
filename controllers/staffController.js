const Staff = require('../models/staffModel')
const mongoose = require('mongoose')
const randomString = require("random-string-gen")

//create staff profile
const createStaffProfile = async (req, res) => {
    const {firstname, email, phoneNumber, staffId} = req.body

    let emptyFields = []

    if(!firstname){
        emptyFields.push('firstname')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!phoneNumber){
        emptyFields.push('phoneNumber')
    }
    
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

     staffId = randomString({
        length: 5,
        type: 'alphabetic',
        capitalization: 'uppercase'
    })



    //add staff doc to db
    try {
        const user_id = req.user._id
        const staff = await Staff.create({ firstname, email, phoneNumber,staffId, user_id }) 
        res.status(200).json(staff)       
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}