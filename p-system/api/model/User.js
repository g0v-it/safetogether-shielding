const db = require('../service/database')

module.exports = {
    save: async (name, surname, email) => {
        const isInDBQuery = `SELECT *
        FROM User
        WHERE mail='${email}'
        `;
        const insertQuery = `
            INSERT INTO User (name, surname, mail)
            VALUES ("${name}","${surname}", "${email}")
        `;

        const isInDB = (await db.query(isInDBQuery)).length > 0;
        if (!isInDB)
            await db.query(insertQuery)
    }
}
