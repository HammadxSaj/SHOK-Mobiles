const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const Connection = require('./database/db.js');
const dotenv = require('dotenv');
const DefaultData = require('./default.js');



const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

dotenv.config(); // environment variables

const PORT = 4000; // backend routing port

const USERNAME = process.env.USERNAME; // username
const PASSWORD = process.env.PASSWORD; // password

Connection(USERNAME,PASSWORD); // connect to database

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

DefaultData(); // add default data to database
