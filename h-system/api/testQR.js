const express = require('express');
const fs = require('fs');
const port = 8080;
const app = express();


app.use(require('body-parser').json());

app.use((req, res, next) => {
    fs.appendFileSync('reqRecivedFromDizme.json', `${JSON.stringify(req.body)}\n`);
    next();
})

app.get('/', (req, res) => {
    res.json({ msg: "Ciao mondo" })
})

app.get('/qr', (req, res) => {
    res.send(`<html>
    <div id="div_widget">
           <form>
    <script async
                        src="https://infocert-agent-cl.dizme.io/widget-svc-static/widget_viewer/dizme_widget.js"
                        data-dizme-api="000-111-222"
                        data-onauth="onDizmeAuth(res)" data-ondebug="onDebug(res)" data-request-orgid="HSystem" data-request-restrictions="{}"
                        data-request-userid="default_user_id" data-request-context=""
                        data-request-mread="True" data-request-prid="PROOF_PSYSTEM_0000001" data-request-requestuid="b"
                        data-lang="it" data-size-widget="large"></script>
                <script type="text/javascript">
                    var formFooterStatus = true;
                    function onDizmeAuth(res) {
                        console.log(res);
                        if (res.proof_status === "SUCCESS") {
                        } else if (res.proof_status === "FAILURE") {
                        } else if (res.proof_status === "ABORTED") {
                       }
                    }
                </script>
                </form>
                </div>
    </html>
    `)
})


app.post('/verification/verify/confirm', (req, res) => {
    console.log(req.body);
    res.json({
        status_code: 100,
        message_code: 0,
        message: "ok",
        action: {
            operation_type: "NO_ACTION",
        },
        user_token: "user id creato da noi",
        result: true
    })
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))