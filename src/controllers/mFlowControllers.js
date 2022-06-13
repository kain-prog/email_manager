const client = require("../db/connection");

async function getMessages(req, res) {
    const getQuery = `SELECT * FROM public.message_flow`;
    client.query(getQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else { console.log(err.message) };
    });
}

async function createMessage(req, res) {
    const mess = req.body;
    const message = {

        template_name: mess.template_name,
        position: mess.position,

    };

    const insertQuery = `INSERT INTO public.message_flow(
        template_name, "position", id)
        VALUES ('${message.template_name}', ${message.position}, default);`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Dados inserido com sucesso!')
        }
        else { console.log(err.message) };
    });
}

module.exports = { getMessages, createMessage };