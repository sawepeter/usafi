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

    let staff_Id =  randomString({
        length: 5,
        type: 'alphabetic',
        capitalization: 'uppercase'
    })
    

    //add staff doc to db
    try {
        const user_id = req.user._id
       let staffId = staff_Id
        const staff = await Staff.create({ firstname, email, phoneNumber,staffId, user_id }) 
        res.status(200).json(staff)       
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//fetch all staff
const getAllStaff = async (req, res) => {
    const user_id = req.user_id

    const allStaff = await Staff.find({user_id}).sort(({createdAt: -1}))

    res.status(200).json(allStaff)
}

//fetch a single staff
const getStaff = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'staff does not exist'})
    }

    const staff = await Staff.findById(id)

    if(!staff) {
        return res.status(404).json({error: 'staff does not exist'})
    }

    res.status(200).json(staff)
}

//update staff status
const updateStaffStatus = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'staff does not exist'})
    }

    const staff = await Staff.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!staff) {
        return res.status(404).json({error: 'staff does not exist'})
    }

    res.status(200).json(staff)
}

module.exports = { createStaffProfile, getAllStaff, getStaff, updateStaffStatus }