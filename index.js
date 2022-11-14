// npm packages import
const express = require('express');
const app = express();
require('dotenv').config();
const authJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// local imports
require('./db/Connection')

// middleware

// authentication Token 
app.use(authJwt())

// to send json data in response
app.use(express.json())

// require the router part 
app.use(require('./routes/auth'))

// port number on which the server is running
const port = process.env.PORT_NUMBER

//  server successful callback
const serverConnectionCallback = () => {
    console.log('server working fine')
}

// starting the server
app.listen(port, serverConnectionCallback)