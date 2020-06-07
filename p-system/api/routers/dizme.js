const express = require('express');
const router = express.Router();

const CertificateModel = require('../model/Certificate')



router.post('/api/v1/verification/verify/confirm', async (req, res) => {
    const rows = await CertificateModel.get(req.body.request_uid);
    // [user_token, request_uid, operator, name, surname, birthdate, birthplace, covid_status]
    const isValid = rows.length > 0 && rows[0].user_token == req.body.revealed_attributes.email;
    //TODO: rimuovere il certificatap se la verify fallisce
    res.json({
        status_code: 100,
        message_code: 0,
        message: "ok",
        user_token: rows[0].user_token,
        result: isValid,
        action: {
            operation_type: "ISSUE_CREDENTIAL",
            credential_names: ["CovidImmunity"]
        }
    })
});


router.post('/api/v1/owners/credential/values_for_credential', async (req, res) => {
    const rows = await CertificateModel.get(req.body.parent_request_uid);
    const cert = rows[0];
    // [user_token, request_uid, operator, name, surname, birthdate, birthplace, covid_status]
    res.json({
        status_code: 100,
        message_code: 0,
        message: "OK",
        credential_name: "CovidImmunity",
        credential_values: {
            name: cert.name,
            surname: cert.surname,
            birthdate: cert.birthdate,
            birthplace: cert.birthplace,
            timestamp: cert.req_timestamp,
            status: cert.covid_status
        }
    })
})

router.post('/api/v1/owners/credential/confirm_issue', (req, res) => {
    res.status(200).end();
})

module.exports = router;
