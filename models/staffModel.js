const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    staffId: {
        type: String,
        required: true,
        unique: true
    },
    staffStatus: {
        type: String,
        required: true,
        default: "Suspended"

    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('Staff', profileSchema)
