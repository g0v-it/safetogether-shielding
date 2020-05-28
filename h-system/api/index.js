const express = require('express');
const port = 80;
const app = express();

const mainLoader = require("./loader/main");
mainLoader(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))