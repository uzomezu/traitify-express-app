const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./models/index');
const userRoutes = require('./routes/user.routes');
const assessmentRoutes = require('./routes/assessment.routes');
require('dotenv').config();

const port = process.env.PORT || "";

app.use(cors());
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'client')));


// assessments table
db.assessments = require('./models/assessment.model');

//users table and authtokens table
db.users = require('./models/user.model');
db.authtokens = require('./models/authtoken.model');


// ... Routes 

app.use('/api/users', userRoutes) // ... Users
app.use('/api/assessments', assessmentRoutes) // ... Assessments

//

db.sequelize.sync({force: true}).then(()=>{
    console.log("dropping and re-syncing db...")
    app.listen(port, ()=>{
        console.log("Server is running on port: ", port);
    })
})

