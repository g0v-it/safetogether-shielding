const db = require('../service/database')

module.exports = {

    isInDB: async (requestUID) => {
        const q = `
        SELECT * FROM Certificate
        WHERE request_uid='${requestUID}'
        `;

        return (await db.query(q)).length > 0;
    },




    save: async (certificate) => {
        const { name,
            surname,
            birthdate,
            birthplace,
            status,
            timestamp,
            requestUID,
            operator,
            email } = certificate;


        const insertQuery = `
            INSERT INTO Certificate (user_token, request_uid, operator, name, surname, birthdate, birthplace, covid_status, req_timestamp)
            VALUES ("${email}", "${requestUID}", "${operator}", "${name}", "${surname}", "${birthdate}", "${birthplace}","${status}", ${timestamp})
        `;

        await db.query(insertQuery)
    },




    get: async (requestUID) => {
        const q = `
            SELECT user_token, request_uid, operator, name, surname, birthdate, birthplace, covid_status, req_timestamp
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
