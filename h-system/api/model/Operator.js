const connection = require("./db");

module.exports = class Operator {
    static isInDB(username, password, callback){
        let results;
        let query = `SELECT * 
        from Operator
        where username='${username}' and
            password = SHA2('${password}', 256)
        `;

        this.query(query).then(result => {
            callback(null, true);
        }).catch(error => {
            callback(error, false);
        });
    }   


    static query(query){
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                connection.destroy();
                if(error || results.length == 0)
                    reject(error);
                resolve(results);
            });
        });
    }
}