const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    test: {
        type: String
    }
})
module.exports = mongoose.model('Sample', sampleSchema)