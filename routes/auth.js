const express = require('express');
const router = express.Router();
const { USER_LOGIN, USER_REGISTRATION } = require('../constants/UrlPath')
const User = require('../db/models/userSchema')
const bcrypt = require('bcryptjs');

// user login
router.post(USER_LOGIN, (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: 'Working fine',
        response: req.body
    })
})

// user registration
router.post(USER_REGISTRATION, async (req, res) => {
    const { name, phone, email, password, confirmPassword, address } = req.body;
    const user = new User({ name, phone, email, password, confirmPassword, address });
    const userData = await user.save();
    res.status(200).json({
        message: 'maze aagye bhai',
        response: req.body,
    })
    console.log(userData)
})

module.exports = router;