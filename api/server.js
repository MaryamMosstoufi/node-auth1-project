const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/usersRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/users', usersRouter);

//Test
server.get('/api', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;