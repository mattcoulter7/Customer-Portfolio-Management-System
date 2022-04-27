const mongoose = require('mongoose');

const stockOpenCloseSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    afterHours: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    high: {
        type: Number,
        required: true
    },
    low: {
        type: Number,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    preMarket: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('StockOpenClose', stockOpenCloseSchema)