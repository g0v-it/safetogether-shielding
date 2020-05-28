const express = require('express');
const port = 80;
const app = express();

const mainLoader = require("./loader/main");
mainLoader(app);

app.get('/certificates', (req, res) => {
    //TODO: put on routes
    res.json({
        ekkle: "complimenti ti sei connesso"
    });
});

app.post('/verification/verify/confirm', (req,res)=>{
    console.log(req.body);

});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))