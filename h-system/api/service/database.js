const mariadb = require('mariadb');
const dbConfig = require('../config/db')

const pool = mariadb.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

module.exports = {
    query: async (query) => {
        const conn = await pool.getConnection();
        const rows = await conn.query(query);
        conn.release();
        return rows.length > 0;
    }
}