const express = require('express');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;