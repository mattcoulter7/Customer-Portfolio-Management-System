const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        required: true
    },
    postcode: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    sample:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sample'
    }
})
module.exports = mongoose.model('Address', addressSchema)