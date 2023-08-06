const express = require('express')
const { createStaffProfile, 
        getAllStaff,
        getStaff, 
        updateStaffStatus } = require('../controllers/staffController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all staff routes
router.use(requireAuth)

//post staff profile
router.post('/', createStaffProfile)

//get all staffs
router.get('/', getAllStaff)

//get a single staff
router.get('/', getStaff)

//update staff status
router.get('/:id', updateStaffStatus)


module.exports = router