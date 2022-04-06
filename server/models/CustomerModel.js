const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    DOB: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    addressid: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Customer', customerSchema)