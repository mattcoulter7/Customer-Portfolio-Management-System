const mongoose = require('mongoose');

const stockOpenCloseSchema = new mongoose.Schema({
    afterHours:{
        type: Number
    },
    close:{
        type: Number
    },
    from:{
        type:Date
    },
    high:{
        type: Number
    },
    low:{
        type: Number
    },
    open:{
        type: Number
    },
    preMarket:{
        type: Number
    },
    symbol:{
        type:String
    },
    volume:{
        type: Number
    }
})

stockOpenCloseSchema.pre("save", setId())

function setId(){
    return function(next) {
        var date = new Date(this.from);
        this._id = `${date.getTime()}${this.symbol}`;
        next();
    }
}

module.exports = mongoose.model('StockOpenClose', stockOpenCloseSchema)