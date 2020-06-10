const express = require('express');
const crypto = require('crypto')

const config = require('../config/config');

const auth = require('../middleware/Auth').apply;
const cors = require('../middleware/Cors').apply;

const authenticationService = require('../service/Authentication');
const email = require('../service/email');

const OperatorModel = require("../model/Operator");
const UserModel = require('../model/User');
const CertificateModel = require('../model/Certificate');
const RequestModel = require('../model/Request');


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


// #####################################################
// ################### CALLCENTER ######################
// #####################################################


/**
 * [
  {
    "id": "123",
    "applicant": "Franca",
    "req_date": "12-12-12",
    "description": "Voglio il gelato",
    "state": "TO_ASSIGN",
    "code": null,
    "volunteer": null
  }
]
 */
router.get('/callcenter/requests', auth, async (req, res) => {
    try {
        res.json(await RequestModel.getAll());
    } catch (error) {
        res.status(400).end();
    }
})


/**
 * {
	"applicant": "Franca",
	"req_date": "12-12-12",
	"description":"voglio un gelato"
}
 */
router.post('/callcenter/request', auth, async (req, res) => {
    const { applicant, req_date, description } = req.body;
    try {
        await RequestModel.save({
            id: crypto.randomBytes(3).toString('hex'),
            applicant,
            req_date,
            description
        });
        res.status(201).end();
    } catch (error) {
        res.status(400).end();
    }
})




/**
 * [
  {
    "name": "marco",
    "surname": "marco",
    "mail": "mohd.miah@issgreppi.it"
  }
]
 */
router.get('/callcenter/volunteers', auth, async (req, res) => {
    try {
        res.json(await UserModel.getAll());
    } catch (error) {
        res.status(400).end();
    }
})



/**{
	"volunteer": "mohd.miah@issgreppi.it"
} */
router.put('/callcenter/request/:id', auth, async (req, res) => {
    const volunteer = req.body.volunteer;
    const id = req.params.id;
    try {
        await RequestModel.assignVolunteerTo(id, volunteer);
        const request = (await RequestModel.get(id))[0];
        const requestUID = id;
        const link = `${config.endpoint}/widget/${requestUID}`;

        await email.send(volunteer, `
${request.applicant} need your help!
<br>
Request:
<br>
${request.description}
<br>
<br>
Go to the follwing link to accept the request and verify your status.
<br>
${link}
                `)

        res.status(200).end();
    } catch (error) {
        res.status(400).end();
    }
})


module.exports = router;