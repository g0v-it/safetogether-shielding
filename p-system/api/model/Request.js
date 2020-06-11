const db = require('../service/database')

module.exports = {

    isInDB: async (id) => {
        const q = `
            SELECT *
            FROM Request
            WHERE id='${id}'
        `;

        return (await db.query(q)).length > 0;
    },

    save: async (request) => {
        const {
            id,
            applicant,
            req_date,
            description
        } = request;


        const insertQuery = `
            INSERT INTO Request (id, applicant, req_date, description, state)
            VALUES ("${id}", "${applicant}", "${req_date}", "${description}", "TO_ASSIGN")
        `;

        await db.query(insertQuery)
    },

    assignVolunteerTo: async (id, volunteer) => {
        const q = `
            UPDATE Request
            SET state='TO_VERIFY', volunteer='${volunteer}'
            WHERE id='${id}'
        `;

        await db.query(q);
    },

    assignCodeTo: async (id, code) => {
        const q = `
            UPDATE Request
            SET state='RUNNING', code='${code}'
            WHERE id='${id}'
        `;
        await db.query(q);
    },

    reset: async (id) => {
        const q = `
            UPDATE Request
            SET state='TO_ASSIGN'
            WHERE id='${id}'
        `;
        await db.query(q);
    },


    get: async (id) => {
        const q = `
            SELECT *
            FROM Request
            WHERE id='${id}'
        `;

        return await db.query(q);
    },

    getAll: async () => {
        const q = `
            SELECT *
            FROM Request
        `;
        return await db.query(q);
    }
}
