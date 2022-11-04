const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT_NUMBER

const serverConnectionCallback = () => {
    console.log('server working fine')
}

app.listen(port, serverConnectionCallback)