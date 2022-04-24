const express = require("express");
const routes = require("./routes");

const app = express();
const port = 3000;

app.set('view engine','pug');

// routes.auth(app);
routes.signup(app);
routes.homepage(app);
routes.logout(app);
routes.login(app);

module.exports = app.listen(port , () => {
    console.log("App commenced. Listening to 3000");
})