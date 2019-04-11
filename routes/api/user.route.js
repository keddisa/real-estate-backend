var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");


router.post("/signup", (req, res, next) => {
    console.log("beginning of signup")
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        console.log("beginning of hash function")
        const user = new User({
            email: req.body.email,
            password: hash
        });
        console.log("just before save")
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });  
});

router.post("/signin", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        const token = jwt.sign(
            {email: fetchedUser.email, userId: fetchedUser._id}, 
            "this_is_a_secret_statement");
            res.status(200).json({
                token: token
            });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Auth failed"
        });
    });
});

module.exports = router;