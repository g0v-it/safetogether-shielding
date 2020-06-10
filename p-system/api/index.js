const express = require('express');
const apiRouter = require('./routers/api')
const dizmeRouter = require('./routers/dizme')

const port = 8082;
const app = express();


// for parsing application/json
app.use(express.json())

app.set('view engine', 'ejs')

// routes
app.use('/', dizmeRouter);
app.use('/web', apiRouter);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))