const express = require('express');
const path = require('path');
const port = 80;
const app = express();

app.use(require('body-parser').json());

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.body);
    next();
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/widget.html'))
})


app.post('/verification/verify/confirm', (req, res) => {
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