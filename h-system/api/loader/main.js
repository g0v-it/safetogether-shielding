module.exports = (app) => {
    //load body parser
    app.use(require('body-parser').json()) ;

    //load middlewears
    require("./middlewares")(app);

    //load routes
    require("./routes")(app);    
}