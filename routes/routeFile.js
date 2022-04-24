const controller = require("../controller");

let route = {
    homepage: function (app) {
        app.get("/homepage",function(req,res){
            controller.homepage(req,res);
        });
    },

    auth: function (app) {
        app.get('/',function(req,res){
            controller.auth(req,res);
        });
    },

    login: function (app) {
        app.get('/login',function(req,res){
            controller.login(req,res);
        });
    },

    signup: function (app) {
        app.get('/signup',function(req,res){

        });
    },

    logout: function(app) {
        app.get('/logout',function(req,res){

        });
    }
};

module.exports = route;