const mariadb = require('mariadb');
const dbConfig = require('../config/db')

const pool = mariadb.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// da sistemare in modo da permettere più richieste in una connessione (la chiusura dve essere dall'esterno)
module.exports = {
    query: async (query) => {
        const conn = await pool.getConnection();
        const rows = await conn.query({ rowsAsArray: false, sql: query });
        conn.release();
        return rows;
    }
}