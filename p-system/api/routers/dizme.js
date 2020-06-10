const express = require('express');
const router = express.Router();

const CertificateModel = require('../model/Certificate')



router.post('/api/v1/verification/verify/confirm', async (req, res) => {
    console.log(req.body)
    // Per adesso, se non ho un certificato per lui facciamo che è una verify per il callcenter


    // todo differenziare PRoof_0002 per rilascare il certificato di volonteer,
    // mentre il PROOF_00003 per verifica soltanto per il callcenter
    const rows = await CertificateModel.get(req.body.request_uid);
    const isValid = rows.length > 0 && req.body.revealed_attributes.status == "healthy";
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
