const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const path = require('path');
const cors = require('cors');
const http = require('http');

mongoose.connect('mongodb://aircnc:aircnc@localhost:27017/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const baseDir = `${__dirname}/htdocs/`;

app.get('/', (req, res) => res.sendFile('index.html', {root: baseDir}));

const connectedUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);

server.listen(port, () => console.log('Servidor on line!'));