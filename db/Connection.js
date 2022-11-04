const mongoose = require('mongoose');
require('dotenv').config()

// success connection code 
const successfulDbConnection = () => {
    console.log('connected')
}

// connection with database mongodb
mongoose.connect(process.env.DATABASE_LINK_TEST).then(successfulDbConnection).catch(err => {
    console.log(err)
})

