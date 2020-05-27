var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    
    const { body } = req;
    const { username } = body;
    const { password } = body;

    const authenticationService = require('./service/Authentication');
    token = authenticationService.login(username, password, ((error, token) => {
        if(error || token == null) res.status(400);
        res.sendJson({
            error,
            token
        })
        
    }));
});

module.exports = router;