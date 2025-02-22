const { User } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwt = require('jsonwebtoken');
const privateKey = "null";  

const sendResponse = require("../utils/response");  

module.exports = {
    createUser: (req, res) => {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
                    return sendResponse(res, null, "Email already exists!", false, null);
                } else {
                    const newUser = new User({
                        username: req.body.username,
                        profile_picture: req.body.profile_picture,
                        email: req.body.email,
                        password: req.body.password,
                        password_confirm: req.body.password_confirm
                    });

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) throw err;
                        bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                            if (err) throw err;

                            newUser.password = hash;
                            newUser.save()
                                .then((result) => {
                                    if (req.body.password !== req.body.password_confirm) {
                                        return sendResponse(res, null, "Password mismatch!", false, null);
                                    }

                                    // If passwords match
                                    sendResponse(res, result, "Registration successful!", true, null);
                                })
                                .catch((err) => {
                                    sendResponse(res, null, "Error registering user!", false, err.message);
                                });
                        });
                    });
                }
            })
            .catch((err) => {
                sendResponse(res, null, "Error checking user email!", false, err.message);
            });
    },

    getAllData: (req, res) => {
        User.findAll()
            .then((result) => {
                sendResponse(res, result, "Users fetched successfully!", true, null);
            })
            .catch((err) => {
                sendResponse(res, null, "Error fetching users!", false, err.message);
            });
    }
};