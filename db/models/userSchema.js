const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isAdmin:{
type:Boolean, 
default:false,
    },

})

userSchema.virtual('id').get(function (){
    return this._id.toHexString();
})

userSchema.set('toJSON',{
    virtuals:true,
})

exports.User = mongoose.model('user', userSchema);
exports.userSchema= userSchema

