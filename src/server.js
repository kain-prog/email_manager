const express = require('express');
const client = require('./db/connection');
const subsRouter = require('./routes/subsRouter');
const mFlowRouter = require('./routes/mFlowRouter');
const PORT = 3300;
const { handleUpdateLastMessage } = require('./controllers/subsControllers');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const server = express();


client.connect(err => {
    if (err){
        console.log(err)
    }
    else { console.log('Postgres Conectado.') }
})

server.use('/subscriber', express.json(), subsRouter);

server.use('/message_flow', express.json(), mFlowRouter);

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

server.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT);
    handleUpdateLastMessage();
})