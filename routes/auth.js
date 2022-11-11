const express = require('express');
const router = express.Router();
const { USER_LOGIN, USER_REGISTRATION } = require('../constants/UrlPath')
const {User} = require('../db/models/userSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv/config')
// user login
router.post(USER_LOGIN, async (req, res) => {

    const user = await User.findOne({email : req.body.email})

    if(!user){
     return   res.status(400).json({
            message: 'Not found',
            response: req.body
        })
    }

    if(user && bcrypt.compareSync(req.body.password , user.password)){
        const token = jwt.sign({
            userId:user.id,
            isAdmin: user.isAdmin,
        },
        process.env.SECRET_KEY
        )
        return  res.status(200).json({
            message: 'Working fine',
            response: {
                token : token, 
                email : user.email
            }
        })
    }else {
          res.status(400).json({
            message: 'Wrong Password',
         
        })
    }

})

// user registration
router.post(USER_REGISTRATION, async (req, res) => {
    const { name, phone, email, password, confirmPassword, address } = req.body;
    const user = new User({ name, phone, email, password :bcrypt.hashSync(password, 10) ,      confirmPassword : bcrypt.hashSync(confirmPassword, 10), address });
    const userData = await user.save();
    res.status(200).json({
        message: 'maze aagye bhai',
        response: userData,
    })
    console.log(userData)
})

module.exports = router;