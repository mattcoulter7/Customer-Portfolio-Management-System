const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
var crypto = require('crypto');
const UserModel = require('../models/UserModel');
const Authentication = require('../utils/Authentication');
const res = require('express/lib/response');
const ForeignMongo = require('../utils/ForeignMongo')
const GetQueryToBody = require('../utils/GetQueryToBody');

// check login valid
router.get('/',
    GetQueryToBody(),
    validateExistingUser(),
    hashPassword(),
    authenticateUser(),
    runAuthentication()
);

// create user account
router.post('/',
    validateNoExistingUser(),
    hashPassword(),
    validateMatchPassword(),
    saveUser()
);

// update user details
router.put('/',
    validateExistingUser(),
    hashPassword(),
    validateMatchPassword(),
    validateDifferentPassword(),
    saveUser()
)

function runAuthentication() {
    // actually authorizes the client to make requests etc.
    return async(req, res, next) => {
        // get auth token for authenticated user
        const authToken = Authentication.Instance().authenticate(req.user);

        // store the token in clients cookies
        res.cookie('AuthToken', authToken);

        return res.status(200).send({
            valid: true
        });
    }
}

function authenticateUser() {
    // checks if there is a user with matching user and hash
    return async(req, res, next) => {
        const users = await UserModel.find();
        const authUser = users.filter(u =>
            u.user == req.body.user &&
            u.hash == req.body.hash)[0];
        if (authUser) {
            return next()
        }
        return res.status(400).send({
            valid: false,
            error: "Incorrect User or Password"
        });
    }
}

function hash(password) {
    return crypto.createHash('md5').update(password).digest("hex");
}

function hashPassword() {
    // converts the supplied password to a hash
    return async(req, res, next) => {
        try {
            req.body.hash = hash(req.body.password);

            // for match password validation
            if (req.body.passwordMatch) {
                req.body.hashMatch = hash(req.body.passwordMatch);
            }
        } catch (e) {
            return res.status(400).send({
                valid: false,
                error: e
            });
        }
        return next();
    }
}

function validateMatchPassword() {
    // ensures both passwords match
    return async(req, res, next) => {
        if (req.body.hash == req.body.hashMatch) {
            return next();
        }
        return res.status(400).send({
            valid: false,
            error: "Passwords do not match"
        });
    }
}

function validateDifferentPassword() {
    // ensures the password is different to the existing password
    return async(req, res, next) => {
        if (req.body.hash !== req.user.hash) {
            return next();
        }
        return res.status(400).send({
            valid: false,
            error: "Password must be different to existing password"
        });
    }
}

function validateNoExistingUser() {
    // ensures there is no existing user, caches the user object
    return async(req, res, next) => {
        const users = await UserModel.find();
        const duplicateUser = users.filter(u => u.user == req.body.user)[0];
        if (duplicateUser) {
            return res.status(400).send({
                valid: false,
                error: `The user ${req.body.user} already exists.`
            });
        }
        req.user = new UserModel();
        return next();
    }
}

function validateExistingUser() {
    // ensures there is an existing user, caches the user object
    return async(req, res, next) => {
        const users = await UserModel.find();
        const existingUser = users.filter(u => u.user == req.body.user)[0];
        if (existingUser) {
            req.user = existingUser;
            return next();
        }
        return res.status(400).send({
            valid: false,
            error: `The user ${req.body.user} does not exist.`
        });
    }
}

function saveUser() {
    // saves the user to the database
    return async(req, res, next) => {
        try {
            // save login details
            await ForeignMongo.performRecursiveSave(UserModel, req.user, req.body);

            return res.status(200).send({
                valid: true
            });
        } catch (e) {
            return res.status(400).send({
                valid: false,
                error: e
            });
        }
    }
}
module.exports = router;