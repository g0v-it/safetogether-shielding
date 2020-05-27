const jwt = require("jsonwebtoken"); 
const OperatorModel = require("../model/Operator");
const KeyConfig = require('../config/key');


module.exports = class Authentication {
    static login(username, password, callback){

        let tokenToSend;
        OperatorModel.isInDB(username, password, (error, isInDB) => {
            if(isInDB) {
                tokenToSend = jwt.sign({username}, KeyConfig.private, { expiresIn: '1h' });
            } else {
                tokenToSend = null;
            }
            
            callback(error, tokenToSend);
        });
    }


    static isLogged(authorization){
        let isLogged;
        let token = this.getToken(authorization);

        try {
            token = jwt.verify(token, KeyConfig.private);

            if(token !== undefined && token !== null)
                isLogged = true;
            
        } catch(err) {
            isLogged = false;
        }

        return isLogged;
    }

    static getToken(authorization){
        let token;
        if(typeof authorization !== 'undefined') {
            const bearer = authorization.split(' ');
            token = bearer[1];
        } else {
            token = null;
        }

        return token;
    }
}