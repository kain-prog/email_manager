const {Client} = require('pg');

const client = new Client ({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'camilla9745',
    database: 'subscribers'
});


module.exports = client;