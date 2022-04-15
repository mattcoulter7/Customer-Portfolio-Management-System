const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
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
    address: { // foreign column name must match map key in query router 'tables' object
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);