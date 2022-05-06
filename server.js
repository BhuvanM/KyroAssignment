const express = require("express");
const connection = require('./config')
const routes = require("./routes");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express();
const port = process.env.PORT || 80;

app.set('view engine','pug');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// app.use(express.bodyParser());
routes.auth(app);
routes.signup(app);
routes.login(app);
routes.homepage(app);
routes.history(app);
routes.clearHistory(app);
routes.next(app);
routes.logout(app);


module.exports = app.listen(port , () => {
    console.log("App commenced. Listening to 3000");
})