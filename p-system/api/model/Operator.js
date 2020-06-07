const db = require('../service/database')

module.exports = {
    isInDB: async (username, password) => {
        let query = `SELECT *
        from Operator
        where username='${username}' and
            password = SHA2('${password}', 256)
        `;
        return (await db.query(query)).length > 0;
    }
}