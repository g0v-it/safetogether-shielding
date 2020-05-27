var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    
    const { body } = req;
    const { username } = body;
    const { password } = body;

    const authenticationService = require('./service/Authentication');
    token = authenticationService.login(username, password, ((error, token) => {
        if(token != null){
            res.send(token);
        } else {
            res.sendStatus(401);
        }
    }));

});

module.exports = router;