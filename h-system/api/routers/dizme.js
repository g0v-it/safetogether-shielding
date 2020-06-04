const express = require('express');
const router = express.Router();


//  ["name", "surname", "birthdate", "birthplace","timestamp", "status"]

router.post('/api/v1/verification/verify/confirm', (req, res) => {
    res.json({
        status_code: 100,
        message_code: 0,
        message: "ok",
        action: {
            operation_type: "NO_ACTION",
            // operation_type: "ISSUE_CREDENTIAL",
            // credential_names: ["CPVolunteer"]
            // credential_names: ["CovidImmunity"]
        },
        user_token: "user id creato da noi",
        result: true
    })
});

module.exports = router;