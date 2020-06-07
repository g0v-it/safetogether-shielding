/**
 * abstract class Middleware, introduced just for the sake of clarity
 */
class Middleware {
    static apply(req, res, next){
        next();
    }
}

module.exports = Middleware;