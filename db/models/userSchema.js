const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

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
})

// bcrypting the password
const bcryptPassword = async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
    }
    next()
}

//  pre method is used to bcrypt password before posting data to database
userSchema.pre('save', bcryptPassword);

module.exports = mongoose.model('user', userSchema);

