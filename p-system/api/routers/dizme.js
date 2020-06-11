const express = require('express');
const crypto = require('crypto')
const router = express.Router();

const CertificateModel = require('../model/Certificate')
const RequestModel = require('../model/Request');

const email = require('../service/email')

// todo differenziare PRoof_0002 per rilascare il certificato di volonteer,
// mentre il PROOF_00003 per verifica soltanto per il callcenter
router.post('/api/v1/verification/verify/confirm', async (req, res) => {
    const id = req.body.request_uid;
    // Per adesso, se non ho un certificato per lui facciamo che è una verify per il callcenter
    const rows = await CertificateModel.get(id);

    if (rows.length > 0) {
        const isValid = req.body.revealed_attributes.status == "healthy";
        //TODO: rimuovere il certificatap se la verify fallisce

        res.json({
            status_code: 100,
            message_code: 0,
            message: "ok",
            user_token: rows[0].user_token || "",
            result: isValid,
            action: {
                operation_type: "ISSUE_CREDENTIAL",
                credential_names: ["CPVolunteer"]
            }
        })

    } else {
        const requests = await RequestModel.get(id);
        const volunteer = requests[0].volunteer;
        const code = crypto.randomBytes(2).toString('hex');
        const isValid = req.body.revealed_attributes.status == "healthy";
        res.json({
            status_code: 100,
            message_code: 0,
            message: "ok",
            user_token: volunteer,
            result: isValid,
            action: {
                operation_type: "NO_ACTION",
            }
        })

        if (isValid) {
            await RequestModel.assignCodeTo(id, code);

            email.send(volunteer, `
Here is your secret code <strong>${code.toUpperCase()}</strong>.
        `)
        }else{
            await RequestModel.reset(id);
        }
    }
});

//  ["name", "surname", "birthdate", "birthplace", "timestamp", "department", "location"]
router.post('/api/v1/owners/credential/values_for_credential', async (req, res) => {
    const rows = await CertificateModel.get(req.body.parent_request_uid);
    const cert = rows[0];

    res.json({
        status_code: 100,
        message_code: 0,
        message: "OK",
        credential_name: "CPVolunteer",
        credential_values: {
            name: cert.name,
            surname: cert.surname,
            birthdate: cert.birthdate,
            birthplace: cert.birthplace,
            timestamp: cert.req_timestamp,
            location: cert.location,
            department: cert.department
        }
    })
})

router.post('/api/v1/owners/credential/confirm_issue', (req, res) => {
    res.status(200).end();
})

module.exports = router;
