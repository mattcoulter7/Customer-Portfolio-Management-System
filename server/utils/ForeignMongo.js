const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/types/objectid');

var tables = {};

// utils functions for querying objects with foreign objects etc.
function getForeignKeys(schema) {
    return Object.entries(schema.schema.tree).filter(keyObj => {
        return keyObj[0] != "_id" && keyObj[1].type === mongoose.Schema.Types.ObjectId
    }).map(a => a[0]);
}

function registerTable(name, schema) {
    tables[name] = schema;
}

async function getOrCreateObj(schema, id) {
    // returns the existing schema object if it exists, otherwise creates a new one
    if (id != null) {
        let found = await schema.findById(id);
        if (found) return found;
    }
    return new schema();
}

async function performRecursiveSave(schema, obj, body) {
    // performs save, on foreign key nested objects too
    const foreignKeys = getForeignKeys(schema);
    for (const [key, value] of Object.entries(body)) {
        let resultValue = value;
        if (foreignKeys.includes(key)) {
            // foreign key, need to save this relational object
            let foreignSchema = tables[key];
            let foreignObj = await getOrCreateObj(foreignSchema, value._id);
            let foreignResult = await performRecursiveSave(foreignSchema, foreignObj, value); // recursion to save all foreign links

            // want to save the id of result, instead of the nested object
            resultValue = foreignResult._id;
        }
        obj[key] = resultValue
    }
    return await obj.save();
}

async function performRecursivePopulation(schema, items) {
    // populate foreign keys with nested objects instead of id
    // items can work as an array or a key
    // perform the populations on this level
    const foreignKeys = getForeignKeys(schema);
    for (let i in foreignKeys) {
        let key = foreignKeys[i];
        // populate foreign keys of the current table
        await schema.populate(items, {
            path: key
        });

        // populate keys of the newly populated table
        var foreignSchema = tables[key];
        if (foreignSchema) {
            var children = Array.isArray(items) ? items.map(obj => obj[key]) : items[key];
            var valid = Array.isArray(items) ? children.length > 0 : children != null;
            if (valid) {
                await performRecursivePopulation(foreignSchema, children);
            }
        }
    }

    return items;
}

module.exports = {
    registerTable: registerTable,
    getOrCreateObj: getOrCreateObj,
    performRecursiveSave: performRecursiveSave,
    performRecursivePopulation: performRecursivePopulation,
};