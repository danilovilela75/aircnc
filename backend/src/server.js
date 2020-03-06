const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

mongoose.connect('mongodb://aircnc:aircnc@localhost:27017/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const routes = require('./routes');

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);

app.listen(port);