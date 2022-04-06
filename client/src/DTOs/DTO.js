// simple function to remove key values from an object based on a condition
function filterUndefined(object, callback) {
    return Object.fromEntries(Object.entries(object).filter(callback));
}

export default class DTO {
    toJSON() { // override this
        return {}
    }
    toFilteredJSON() {
        return filterUndefined(this.toJSON(), (pair) => typeof pair[1] !== "undefined")
    }
}