const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || '';

// app.use(cors());
app.use('/', express.static(path.join(__dirname, 'client')));

app.listen(port, ()=>{
    console.log("Server is running on port: ", port);
})