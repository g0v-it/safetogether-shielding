module.exports = class Operator {
    static isInDB(username, password, callback){
        let results;
        let query = `SELECT * 
        from Operator
        where username='${username}' and
            password = SHA2('${password}', 256)
        `;

        this.query(query).then(result => {
            callback(null, result);
        }).catch(error => {
            callback(error, false);
        });
    }   


    static query(query){
        return new Promise((resolve, reject) => {
            const mariadb = require('mariadb');
            const dbConfig = require('../config/db');
            
            mariadb.createConnection({              
                host     : dbConfig.host,
                user     : dbConfig.user,
                password : dbConfig.password,
                database : dbConfig.database})
              .then(conn => {
                  conn.query(query, [2])
                  .then(rows => {
                    conn.end();
                    if(rows.length > 0){
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                  })
                  .catch(err => { 
                    reject(false);
                  });
              })
              .catch(err => {
                reject(false);
              })


    
        });
    }
}