const client = require('../db/connection');

function validacaoEmail(email){
    const usuario = email.substring(0, email.indexOf('@'));
    const dominio = email.substring(email.indexOf('@')+ 1, email.length);

    if(
        (usuario.length >= 1) &&
        (dominio.length >= 5) &&
        (usuario.search('@')==-1) &&
        (dominio.search('@')==-1) &&
        (usuario.search(' ')==-1) &&
        (dominio.search(' ')==-1) &&
        (dominio.search('.')!=-1) &&
        (dominio.indexOf('.') >=1) &&
        (dominio.lastIndexOf('.') < dominio.length - 1)){
            return  true 
    } 
    else { 
        return false 
    };
};

    // Validação Email -> [Email duplicado] -> 

    emailDisponible = (email) => {

        const verifyEmail = `SELECT email FROM subscribers WHERE email = '${email}'`
        const emailOK = 0;

        return new Promise((resolve, reject) => {

            client.query(verifyEmail, (err, result) => {

                if(result.rowCount === emailOK){
                        resolve(true);
                }
                else{
                    resolve(false);
                }
        })
    
        });
    }

module.exports = { validacaoEmail , emailDisponible};