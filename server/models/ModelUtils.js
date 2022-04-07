const mongoose = require('mongoose');

class ModelUtils {
    constructor(model){
        this.model = model;
    }

    get foreignKeys(){
        return Object.entries(this.model.schema.tree).filter(keyObj => {
            return keyObj[0] != "_id" && keyObj[1].type === mongoose.Schema.Types.ObjectId
        }).map(a => a[0]);
    }
}
module.exports = ModelUtils;