const express = require('express');
const apiRouter = require('./routers/api')
const dizmeRouter = require('./routers/dizme')

const port = 80;
const app = express();


// for parsing application/json
app.use(express.json())

app.set('view engine', 'ejs')

// routes
app.use('/', dizmeRouter);
app.use('/web', apiRouter);

app.get('/app',(req,res)=>res.json("ciao"))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))