const express = require('express');

const AccountsRouter = require('./router/accountsRouter');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h2>DB Helpers</h2>');
});

module.exports = server;