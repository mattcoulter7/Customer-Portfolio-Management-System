const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Authentication = require('../utils/Authentication')
const ForeignMongo = require('../utils/ForeignMongo')

const authenticationEnabled = false;

//#region load all schemas here
const tables = {
    'customer': require('../models/CustomerModel'),
    'address': require('../models/AddressModel'),
    'sample': require('../models/SampleModel'),
    'userdetails': require('../models/UserDetailsModel'),
    'stockopenclose': require('../models/StockOpenClose')
}
for (const [name, schema] of Object.entries(tables)) {
    ForeignMongo.registerTable(name, schema);
}
//#endregion

router.get('/:table', validateAuthenticated(), validateTable(), async (req, res) => {
    const resultSet = await req.schema.find();
    await ForeignMongo.performRecursivePopulation(req.schema, resultSet);
    return res.send(resultSet);
});

router.get('/:table/:id', validateAuthenticated(), validateTable(), async (req, res) => {
    try {
        const resultSet = await req.schema.findById(req.params.id);
        await ForeignMongo.performRecursivePopulation(req.schema, resultSet);
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
    req.obj = await ForeignMongo.getOrCreateObj(req.schema, req.body._id);
    next();
}, saveObj());

router.put('/:table/:id', validateAuthenticated(), validateTable(), async (req, res, next) => {
    req.obj = await ForeignMongo.getOrCreateObj(req.schema, req.body._id);
    next();
}, saveObj());

router.delete('/:table/:id', validateAuthenticated(), validateTable(), async (req, res) => {
    try {
        var result = await req.schema.findByIdAndDelete(req.params.id);
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
            let obj = await ForeignMongo.performRecursiveSave(req.schema, req.obj, req.body);
            await ForeignMongo.performRecursivePopulation(req.schema, obj);
            return res.send(obj);
        } catch (e) {
            return res.status(400).send(e);
        }
    }
}

module.exports = router;