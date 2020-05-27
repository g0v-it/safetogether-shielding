const Middleware = require('./Middleware');
const CORSConfig = require('../config/cors');

class CORS extends Middleware {
    static apply(req, res, next) {
        res.header("Access-Control-Allow-Origin", CORSConfig.allowedOrigins); 
        res.header("Access-Control-Allow-Headers", CORSConfig.allowedHeaders);
        next();
    }
}

module.exports = CORS;