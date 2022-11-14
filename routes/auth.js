const express = require('express');
const router = express.Router();
const { USER_LOGIN, USER_REGISTRATION } = require('../constants/UrlPath')
const {User} = require('../db/models/userSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv/config')
// user login
router.post(USER_LOGIN, async (req, res) => {
console.log('hitted', req) 
var user;
req.body.email?.lenght > 0 ? 
 user = await User.findOne({email : req.body.email}) :    user = await User.findOne({phone : req.body.phone})


    if(!user){
    return   res.status(404).json({
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
       return   res.status(200).json({
            message: 'Working fine',
            response: {
                token : token, 
                email : user.email
            }
        })
    }else {
         return res.status(404).json({
            message: 'Wrong Password',
         
        })
    }

})

// user registration
router.post(USER_REGISTRATION, async (req, res) => {
    const { name, phone, email, password, address } = req.body;
    const user = new User({ name, phone, email, password :bcrypt.hashSync(password, 10) ,      address });
try {
    const userData = await user.save();
    if(userData){

    
    res.status(200).json({
        message: 'maze aagye bhai',
        response: userData,
    })
    console.log(userData)
}

} catch (error) {
    res.status(200).json({
        message: 'maze aagye bhai',
        response: error,
    })
}

 


})

module.exports = router;