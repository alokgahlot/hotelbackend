// npm packages import
const express = require('express');
const app = express();
require('dotenv').config();

// local imports
require('./db/Connection')

// middleware

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