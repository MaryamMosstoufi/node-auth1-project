const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("../users/usersRouter.js");
const authRouter = require("../auth/authRouter.js");
const dbConnection = require("../data/connection.js");
const protected = require("../auth/authMiddleware.js");
const server = express();

const sessionConfiguration = {
    name: "wahahaha",
    secret: "keep it secret, keep it safe!",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.COOKIE_SECURE || false, 
        httpOnly: true, 
    },
    resave: false,
    saveUninitialized: true, 
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60, 
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.use("/api/users", protected, usersRouter);
server.use("/api/auth", authRouter);

server.get('/api', (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hash", (req, res) => {
    try {
        const password = req.headers.password;
        const rounds = process.env.HASH_ROUNDS || 8; 
        const hash = bcrypt.hashSync(password, rounds);

        res.status(200).json({ password, hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = server;