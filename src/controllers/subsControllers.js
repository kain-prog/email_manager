const { CronJob } = require("cron");
const client = require("../db/connection");
const { validacaoEmail, emailDisponible } = require('../utils/validateEmail');

async function handleSubscribers(req, res) {

    const subs = req.body;

    const subscription = {

        name: subs.name,
        email: subs.email,
        active: true,
        last_message: 0

    };

    if(validacaoEmail(subscription.email)){

        emailDisponible(subscription.email).then((result) => {
            if(result === true){
                const insertQuery = `insert into subscribers(id, name, email, active, last_message, subscription_date)
                values (default, '${subscription.name}', '${subscription.email}', ${subscription.active}, ${subscription.last_message}, current_timestamp)`;
                createSubscribers(insertQuery);
            }
            else { res.status(400).send('Email existente...') } ;
    
        });
    }

    function createSubscribers(insertQuery) {
        client.query(insertQuery, (err, result) => {
            if(!err){
                res.send('Dados inserido com sucesso!')
            }
            else { console.log(err.message) };
        });
    
    }

}

async function getSubscribers(req, res) {
    const getQuery = `SELECT * FROM public.subscribers`;
    client.query(getQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else { console.log(err.message) };
    });
}

async function getOnlyActiveSubscribers(req, res) {
    const getQuery = `SELECT * FROM public.subscribers WHERE active = true;`;
    client.query(getQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else { console.log(err.message) };
    });
}

function handleUpdateLastMessage() {

    const task = new CronJob('* * 0 * * *', () => {
        getPositionOfLastMessage().then((positionLastMessage) => {
            getAllActiveSubscribers().then((activeSubscribers) => {
                if (activeSubscribers.length > 0) {
                    updateLastMessage(positionLastMessage, activeSubscribers);
                }
            })
        })
    });
    task.start()
}

getPositionOfLastMessage = () => {
    let selectLast_Message = `SELECT MAX(position) FROM public.message_flow;`
    return new Promise((resolve, reject) => {
        client.query(selectLast_Message, (err, result) => {
            resolve(result.rows[0].max);
        });
    })
}

getAllActiveSubscribers = () => {
    let selectQuery = `SELECT * FROM public.subscribers WHERE active = true;`
    return new Promise((resolve, reject) => {
        client.query(selectQuery, (err, result) => {
            resolve(result.rows);
        });
    })
}

function updateLastMessage(position, activeSubscribers) {
    activeSubscribers.forEach(subscriber => {
        console.log(subscriber)
        if (subscriber.last_message < position) {
            subscriber.last_message = subscriber.last_message + 1;
            let updateLastMessage = `UPDATE public.subscribers SET last_message = ${subscriber.last_message} WHERE id = ${subscriber.id} ;`;
            client.query(updateLastMessage);
        }
        else {
            let updateActive = `UPDATE public.subscribers SET active = false WHERE id = ${subscriber.id} ;`
            client.query(updateActive);
        }
    })
}

module.exports = { handleSubscribers, handleUpdateLastMessage, getSubscribers, getOnlyActiveSubscribers };