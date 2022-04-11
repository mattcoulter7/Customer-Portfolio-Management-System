const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
var crypto = require('crypto');
const UserModel = require('../models/UserModel');

// check login valid
router.get('/',
    validateExistingUser(),
    hashPassword(),
    authenticateUser()
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

// checks if there is a user with matching user and hash
function authenticateUser() {
    return async (req, res, next) => {
        const users = await UserModel.find();
        const authUser = users.filter(u =>
            u.user == req.body.user &&
            u.hash == req.body.hash)[0];
        if (authUser) {
            return res.status(200).send({
                valid: true
            });
        }
        return res.status(400).send({
            valid: false,
            error: "Invalid Password"
        });
    }
}

function hash(password) {
    return crypto.createHash('md5').update(password).digest("hex");
}

// converts the supplied password to a hash
function hashPassword() {
    return async (req, res, next) => {
        try {
            req.body.hash = hash(req.body.password);

            // for match password validation
            if (req.body.passwordMatch) {
                req.body.hashMatch = hash(req.body.passwordMatch);
            }
        } catch (e) {
            return res.status(400).send({
                valid:false,
                error:e
            });
        }
        return next();
    }
}

// ensures both passwords match
function validateMatchPassword() {
    return async (req, res, next) => {
        if (req.body.hash == req.body.hashMatch) {
            return next();
        }
        return res.status(400).send(
            {
                valid: false,
                error: "Passwords do not match"
            });
    }
}

function validateDifferentPassword(){
    return async (req, res, next) => {
        if (req.body.hash !== req.obj.hash) {
            return next();
        }
        return res.status(400).send(
            {
                valid: false,
                error: "Password must be different to existing password"
            });
    }
}

// ensures there is no existing user, caches the user object
function validateNoExistingUser() {
    return async (req, res, next) => {
        const users = await UserModel.find();
        const duplicateUser = users.filter(u => u.user == req.body.user)[0];
        if (duplicateUser) {
            return res.status(400).send({
                valid:false,
                error:`The user ${req.body.user} already exists.`
            });
        }
        req.obj = new UserModel();
        return next();
    }
}

// ensures there is an existing user, caches the user object
function validateExistingUser(){
    return async (req, res, next) => {
        const users = await UserModel.find();
        const existingUser = users.filter(u => u.user == req.body.user)[0];
        if (existingUser) {
            req.obj = existingUser;
            return next();
        }
        return res.status(400).send({
            valid:false,
            error:`The user ${req.body.user} does not exist.`
        });
    }
}

// saves the user to the database
function saveUser() {
    return async (req, res, next) => {
        try {
            req.obj.user = req.body.user;
            req.obj.hash = req.body.hash;
            await req.obj.save();
            return res.status(200).send({
                valid:true
            });
        } catch (e) {
            return res.status(400).send({
                valid:false,
                error:e
            });
        }
    }
}
module.exports = router;