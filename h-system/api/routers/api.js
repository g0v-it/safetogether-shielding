const express = require('express');
const authenticationService = require('../service/Authentication');
const authGuard = require('../middleware/Auth').apply

const OperatorModel = require("../model/Operator");

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const isInDB = await OperatorModel.isInDB(username, password);
        if (!isInDB)
            res.status(401).end();

        const token = await authenticationService.authenticate(username);
        res.json({ token })

    } catch (error) {
        res.json({ error })
    }
});


router.post('/issue', authGuard, (req, res) => {
    console.log('body', req.body);

    res.status(200).end();
    // if(user is not registered in the nhs db)
    //     register user.
    // generate requestuid
    // temporary save the credential values in th db with the requestuid
    // send (widget.html, requestuid)
})

module.exports = router;