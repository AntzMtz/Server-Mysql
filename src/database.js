const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log("Conexion Pedida");

        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log("DEMACIADOS NUMERO DE CONEXIONES");

        } else if (err.code === 'ENOTFOUND') {
            console.log("No existe conexión");

        } else if (err.code === 'ECONNREFUSED') {
            console.log("Conexion rechazada");

        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log("Parametros Incorrectos");

        } else {
            console.log("Error:" + err.code);

        }
    } else {
        if (connection) {
            connection.release();
            console.log('Conexion establecida');
            return;
        }
    }
});
pool.query = promisify(pool.query);

module.exports = pool;