const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const ModelUtils = require('../models/ModelUtils');
const Authentication = require('../utils/Authentication')

const authenticationEnabled = false;

//#region load all schemas here
const tables = {
    'customer': new ModelUtils(require('../models/CustomerModel')),
    'address': new ModelUtils(require('../models/AddressModel')),
    'sample': new ModelUtils(require('../models/SampleModel'))
}
//#endregion

router.get('/:table', validateAuthenticated(), validateTable(), async (req, res) => {
    const resultSet = await req.schema.model.find();
    await performRecursivePopulation(req.schema, resultSet);
    return res.send(resultSet);
});

router.get('/:table/:id', validateAuthenticated(), validateTable(), async (req, res) => {
    try {
        const resultSet = await req.schema.model.findById(req.params.id);
        await performRecursivePopulation(req.schema, resultSet);
        if (resultSet) {
            return res.send(resultSet);
        } else {
            return res.status(404).send({});
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/:table', validateAuthenticated(), validateTable(), async (req, res, next) => {
    req.obj = new req.schema.model();
    next();
}, saveObj());

router.put('/:table/:id', validateAuthenticated(), validateTable(), async (req, res, next) => {
    req.obj = await req.schema.model.findById(req.params.id);
    next();
}, saveObj());

router.delete('/:table/:id', validateAuthenticated(), validateTable(), async (req, res) => {
    try {
        var result = await req.schema.model.findByIdAndDelete(req.params.id);
        return res.send(!!result);
    } catch (e) {
        return res.status(400).send(e);
    }
});

function validateAuthenticated() {
    // ensures client making request is logged in
    return async (req, res, next) => {
        // get AuthToken from Cookies
        const authToken = req.cookies['AuthToken'];
        req.user = Authentication.Instance().getAuthenticated(authToken);

        if (authenticationEnabled && !req.user) {
            return res.status(401).send("The request cannot be fulfilled as the client has not logged in.");
        }
        return next();
    }
}

function validateTable() {
    // ensures the requested table is valid, sotre is in request
    return async (req, res, next) => {
        req.schema = tables[req.params.table];
        if (!req.schema) {
            return res.status(400).send(new Error(`Table: ${req.params.table} does not exist.`));
        }
        return next()
    }
}

// saves the object to the databse
function saveObj() {
    return async (req, res) => {
        try {
            let obj = await performRecursiveSave(req.schema, req.obj, req.body);
            await performRecursivePopulation(req.schema, obj);
            return res.send(obj);
        } catch (e) {
            return res.status(400).send(e);
        }
    }
}

async function getOrCreateObj(schema, id) {
    // returns the existing schema object if it exists, otherwise creates a new one
    if (id != null) {
        return await schema.model.findById(id);
    }
    return new schema.model();
}

async function performRecursiveSave(schema, obj, body) {
    // performs save, on foreign key nested objects too
    for (const [key, value] of Object.entries(body)) {
        let resultValue = value;
        if (schema.foreignKeys.includes(key)) {
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
    for (let i in schema.foreignKeys) {
        let key = schema.foreignKeys[i];
        // populate foreign keys of the current table
        await schema.model.populate(items, {
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

module.exports = router;