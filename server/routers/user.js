const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
var crypto = require('crypto');
const UserModel = require('../models/UserModel');

// check login valid
router.get('/', 
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
    hashPassword(),
    validateMatchPassword(),
    saveUser()
)

// checks if there is a user with matching user and hash
function authenticateUser(){
    return async (req, res, next) => {
        const users = await UserModel.find();
        const authUser = users.filter(u => 
            u.user == req.body.user && 
            u.hash == req.body.hash)[0];
        if (authUser){
            return res.status(200).send(true);
        }
        return res.status(400).send("Invalid Password");
    }
}

// converts the supplied password to a hash
function hashPassword() {
    return async (req, res, next) => {
        try {
            req.body.hash = crypto.createHash('md5').update(req.body.password).digest("hex");

            // for match password validation
            if (req.body.passwordMatch){
                req.body.hashMatch = crypto.createHash('md5').update(req.body.passwordMatch).digest("hex");
            }
        } catch(e){
            return res.status(400).send(e);
        }
        next();
    }
}

// ensures both passwords match
function validateMatchPassword(){
    return async (req, res, next) => {
        if (req.body.hash == req.body.hashMatch){
            return next();
        }
        return res.status(400).send("Passwords do not match");
    }
}

// ensures there is no existing user
function validateNoExistingUser() {
    return async (req, res, next) => {
        const users = await UserModel.find();
        const duplicateUser = users.filter(u => u.user == req.body.user)[0];
        if (duplicateUser){
            return res.status(400).send(`The user ${req.body.user} already exists.`);
        }
        next();
    }
}

// saves the user to the database
function saveUser() {
    return async (req, res, next) => {
        const obj = new UserModel();
        obj.user = req.body.user;
        obj.hash = req.body.hash;
        try {
            await obj.save();
            return res.status(200).send(true);
        } catch(e){
            return res.status(400).send(e);
        }
    }
}
module.exports = router;