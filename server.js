const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./models/index');
require('dotenv').config();

const port = process.env.PORT || "";

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'client')));

db.sequelize.sync({force: true}).then(()=>{
    console.log("dropping and re-syncing db...")
    app.listen(port, ()=>{
        console.log("Server is running on port: ", port);
    })
})

