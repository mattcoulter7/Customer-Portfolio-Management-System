const express = require('express');
const router = express.Router();

//#region load all schemas here
const tables = {
        'customer': require('./../models/CustomerModel')
    }
    //#endregion

router.get('/:table', validateTable(), async(req, res) => {
    const resultSet = await req.schema.find();
    return res.send(resultSet);
});

router.get('/:table/:id', validateTable(), async(req, res) => {
    try {
        const resultSet = await req.schema.findById(req.params.id);
        if (resultSet){
            return res.send(resultSet);
        } else {
            return res.status(404).send({});
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/:table', validateTable(), async(req, res, next) => {
    req.obj = new req.schema();
    next();
}, saveObj());

router.put('/:table/:id', validateTable(), async(req, res, next) => {
    req.obj = await req.schema.findById(req.params.id);
    next();
}, saveObj());

router.delete('/:table/:id', validateTable(), async(req, res) => {
    try {
        await req.schema.findByIdAndDelete(req.params.id);
        return res.send(true);
    } catch (e) {
        return res.status(400).send(e);
    }
});

function validateTable() {
    return async(req, res, next) => {
        req.schema = tables[req.params.table];
        if (!req.schema) {
            return res.status(400).send(new Error(`Table: ${req.params.table} does not exist.`));
        }
        next()
    }
}

function saveObj() {
    return async(req, res) => {
        let obj = req.obj;
        for (const [key, value] of Object.entries(req.body)) {
            obj[key] = value
        }
        try {
            obj = await obj.save();
            return res.send(obj);
        } catch (e) {
            return res.status(400).send(e);
        }
    }
}

module.exports = router;