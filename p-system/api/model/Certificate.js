const db = require('../service/database')

module.exports = {

    isInDB: async (requestUID) => {
        const q = `
        SELECT * FROM Certificate
        WHERE request_uid='${requestUID}'
        `;

        return (await db.query(q)).length > 0;
    },


    // ["name", "surname", "birthdate", "birthplace", "timestamp", "department", "location"]

    save: async (certificate) => {
        const { name,
            surname,
            birthdate,
            birthplace,
            department,
            location,
            timestamp,
            requestUID,
            operator,
            email } = certificate;


        const insertQuery = `
            INSERT INTO Certificate (user_token, request_uid, operator, name, surname, birthdate, birthplace, location, department, req_timestamp)
            VALUES ("${email}", "${requestUID}", "${operator}", "${name}", "${surname}", "${birthdate}", "${birthplace}", "${location}", "${department}", ${timestamp})
        `;

        await db.query(insertQuery)
    },




    get: async (requestUID) => {
        const q = `
            SELECT *
            FROM Certificate
            WHERE request_uid='${requestUID}'
        `;
        return await db.query(q);
    },





    allFrom: async (operator) => {
        const q = `
            SELECT *
            FROM Certificate
            WHERE operator='${operator}'
        `;
        return await db.query(q);
    }
}
