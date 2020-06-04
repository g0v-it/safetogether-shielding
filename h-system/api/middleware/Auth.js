const Middleware = require('./Middleware');

const authorizationService = require("../service/Authentication");

class Auth extends Middleware {
    static apply(req, res, next) {
        const authorization = req.headers['authorization'];

        if(authorizationService.isLogged(authorization)){
            next();
        } else{
            res.status(401).end();
            return;
        }
    }
}

module.exports = Auth;