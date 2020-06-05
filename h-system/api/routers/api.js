const express = require('express');
const crypto = require('crypto')

const auth = require('../middleware/Auth').apply
const cors = require('../middleware/Cors').apply

const authenticationService = require('../service/Authentication');
const OperatorModel = require("../model/Operator");
const UserModel = require('../model/User')


const router = express.Router();
router.use(cors)

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const isInDB = await OperatorModel.isInDB(username, password);
        if (!isInDB) {
            res.status(401).end();
            return;
        }

        const token = await authenticationService.authenticate(username);
        res.json({ token })

    } catch (error) {
        res.json({ error })
    }
});


// Temporaneamente salvo qui, dopo sarà nel db
const credential = []

router.post('/issue', auth, async (req, res) => {
    const { name,
        surname,
        birthdate,
        birthplace,
        timestamp,
        status,
        username,
        email } = req.body;

    const requestUID = crypto.randomBytes(8).toString('hex');

    try {
        await UserModel.save(username, email)
    } catch (error) {
        res.status(400).end();
    }
    credential.push({ name, surname, birthdate, birthplace, timestamp, status, requestUID })
    res.render('widget', { requestUID });
})




module.exports = router;