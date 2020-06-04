const express = require('express');
const path = require('path');
const port = 80;
const app = express();

app.use(require('body-parser').json());

app.use((req, res, next) => {
    console.log(req.url, req.body);
    console.log();
    next();
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/widget.html'))
})


// ##############  Test delle api dizme. ##################

app.post('/api/v1/verification/verify/confirm', (req, res) => {
    res.json({
        status_code: 100,
        message_code: 0,
        message: "ok",
        action: {
            // operation_type: "NO_ACTION",
            operation_type: "ISSUE_CREDENTIAL",
            // credential_names: ["CPVolunteer"]
            credential_names: ["CovidImmunity"]
        },
        user_token: "user id creato da noi",
        result: true
    })
});

app.post('/api/v1/owners/credential/values_for_credential', (req, res) => {
    res.json({
        status_code: 100,
        message_code: 0,
        message: "OK",
        credential_name: "CovidImmunity",
        credential_values: {
            name: "Mohd",
            surname: "Miah",
            birthdate: "10/10/1998",
            birthplace: "Napoli",
            timestamp: Date.now().toString(),
            status: "immune"
            // department: "MI 3",
            // location: "Milano"
        }
    })
})

app.post('/api/v1/owners/credential/confirm_issue', (req, res) => {
    res.status(200).end();
})
// ############################################################



/*
// Pseudo codice per hsystem

post /credential
    if(user is not registered in the nhs db)
        register user.
    generate requestuid
    temporary save the credential values in th db with the requestuid
    send (widget.html, requestuid)



post /api/v1/verification/verify/confirm
    if(user is not registered in the nhs db)
        send error
        return
    else
        send {
            ...
            operation_type: "ISSUE_CREDENTIAL",  credential_names: ["CoviImmunity"]
            ...
        }


post /api/v1/owners/credential/values_for_credential
    from db get values for credential using parent_request_uid as key
    return values



post /api/v1/owners/credential/confirm_issue
    send 200


 */


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))