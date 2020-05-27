const express = require('express');
const bodyparser = require("body-parser");
const port = 80;
const CORS = require('./middleware/Cors');
const Auth = require('./middleware/Auth');

const app = express();

app.use(bodyparser.json());

app.use(CORS.apply);
app.use(Auth.apply);


const ekkle = {
    ciao : "mio dio"
}

app.get('/', (req, res) => res.json(ekkle))

//const token = loginManager.connect("giovanni", "giovanni");
//console.log(token);


app.get("/unauth", (req, res) => {
    res.sendStatus(401);
});


app.post('/login', (req, res) => {
    console.log("/login");
    
    const { body } = req;
    const { username } = body;
    const { password } = body;

    const authenticationService = require('./service/Authentication');
    token = authenticationService.login(username, password, ((error, token) => {
        if(token != null){
            res.send(token);
        } else {
            res.sendStatus(401);
        }
    }));  

});


app.get('/list' ,(req, res) => {
    res.send("complimenti che ti sei connesso");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))