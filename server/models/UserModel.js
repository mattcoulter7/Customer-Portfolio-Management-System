const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    hash: { // md5 string
        type: String,
        required: true
    },
    details: { // foreign column name must match map key in query router 'tables' object
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    }
})

module.exports = mongoose.model('User', userSchema)