const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    hash: { // md5 string
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)