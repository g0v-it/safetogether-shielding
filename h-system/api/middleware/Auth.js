const Middleware = require('./Middleware');

const authorizationService = require("../service/Authentication");

class Auth extends Middleware {
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

module.exports = Auth;