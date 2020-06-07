const db = require('../service/database')

module.exports = {
    save: async (username, email) => {
        const isInDBQuery = `SELECT *
        FROM User
        WHERE mail='${email}'
        `;
        const insertQuery = `
            INSERT INTO User (username, mail)
            VALUES ("${username}", "${email}")
        `;

        const isInDB = (await db.query(isInDBQuery)).length > 0;
        if (!isInDB)
            await db.query(insertQuery)
    }
}
