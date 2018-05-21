
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('./controllers/Auth');
const project = require('./controllers/Project');

const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/wripro';
const server = express();

server.use(cors({
  origin: 'http://localhost:3000',
  // origin: process.env.MONGODB_URI ? 'websitenamehere' : 'http://localhost:3000',
  credentials: true,
}));

server.use(bodyParser.json());

mongoose.connect(DB_URL);
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(express.static(path.join(__dirname, '../client/build')));

server.post('/auth/register', auth.register);
server.post('/auth/login', auth.login);
server.post('/auth/reset', auth.reset);
server.post('/auth/update', auth.update);
server.get('/projects', project.getAll);
server.post('/project/create', project.create);
server.post('/project/edit', project.edit);
server.get('/project/:id', project.get);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = server;

