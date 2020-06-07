const express = require('express');
const crypto = require('crypto')

const auth = require('../middleware/Auth').apply;
const cors = require('../middleware/Cors').apply;

const authenticationService = require('../service/Authentication');
const OperatorModel = require("../model/Operator");
const UserModel = require('../model/User');
const CertificateModel = require('../model/Certificate');


const router = express.Router();
// Cors only for apis
router.use(cors)



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const isInDB = await OperatorModel.isInDB(username, password);
        if (!isInDB) {
            res.status(401).end();
            return;
        }

        const token = authenticationService.authenticate(username);
        res.json({ token })

    } catch (error) {
        res.json({ error })
    }
});





router.get('/widget/:requestUID', async (req, res) => {
    const requestUID = req.params.requestUID;
    try {
        if (await CertificateModel.isInDB(requestUID))
            res.render('widget', { requestUID }).end();
    } catch (error) {
        res.status(400).end()
    }
    res.status(404).end();
})



//  ["name", "surname", "birthdate", "birthplace", "timestamp", "department", "location"]

router.post('/issue', auth, async (req, res) => {
    const { name,
        surname,
        birthdate,
        birthplace,
        department,
        location,

        email } = req.body;

    const requestUID = crypto.randomBytes(3).toString('hex');

    try {
        const operator = authenticationService.getPayload(req.headers['authorization']).username;
        await UserModel.save(name, surname, email)
        await CertificateModel.save({ name, surname, birthdate, birthplace, department, location, email, requestUID, operator, timestamp: Date.now() })

    } catch (error) {
        res.status(400).end();
        return;
    }
    res.json(requestUID);
})





router.get('/certificates', auth, async (req, res) => {
    let rows;
    try {
        const operator = authenticationService.getPayload(req.headers['authorization']).username;
        rows = (await CertificateModel.allFrom(operator)).map(r => ({
            name: r.name,
            surname: r.surname,
            birthdate: r.birthdate,
            birthplace: r.birthplace,
            department: r.department,
            location: r.location,
            timestamp: r.req_timestamp
        }));

    } catch (error) {
        res.status(400).end();
        return;
    }
    res.json(rows);
})




module.exports = router;