const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');

const usersRouter = require('../users/usersRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/users', usersRouter);

server.get('/hash', (req, res) => {
  try {
    const password = req.headers.password;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);
    res.status(200).json({password,hash})
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
})
//Test
server.get('/api', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;