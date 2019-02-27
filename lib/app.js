const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const ensureAuth = require('./utils/ensure-auth')();
require('dotenv').config()

const auth = require('./routes/auth');
const resources = require('./routes/resources');

app.use(cors());
app.use(morgan('combined'));
app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/resources', ensureAuth, resources);

app.use(errorHandler());

module.exports = app;
