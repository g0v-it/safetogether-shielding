const jwt = require("jsonwebtoken");

const KeyConfig = require('../config/key');


module.exports = class Authentication {
    static authenticate(username) {
        return jwt.sign({ username }, KeyConfig.private, { expiresIn: '1h' });
    }

    static getPayload(authorization) {
        let token = this.getToken(authorization)
        try {
            return jwt.verify(token, KeyConfig.private);
        }
        catch (error) { return null; }
    }

    static isLogged(authorization) {
        let isLogged;
        let token = this.getToken(authorization);

        try {
            token = jwt.verify(token, KeyConfig.private);
            isLogged = token !== undefined && token !== null;
            //TODO bisognerebbe controllare che effettivamente sia nel db l'operatore
        } catch (err) {
            isLogged = false;
        }

        return isLogged;
    }

    static getToken(authorization) {
        let token;
        if (typeof authorization !== 'undefined') {
            const bearer = authorization.split(' ');
            token = bearer[1];
        } else {
            token = null;
        }

        return token;
    }
}