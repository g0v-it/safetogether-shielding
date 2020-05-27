const Middleware = require('./Middleware');
const KeyConfig = require('../config/key');

const authorizationService = require("../service/Authentication");
const jwt = require("jsonwebtoken");



module.exports = class Auth extends Middleware {
    static apply(req, res, next) {
        if (req.path == "/login") {
            next();
            return;
        }
        const authorization = req.headers['authorization'];

        if(authorizationService.isLogged(authorization)){
            next();
        } else{
            res.sendStatus(401);
            return;
        }
    }
}