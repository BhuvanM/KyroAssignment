const controller = require("../controller");

let route = {

    auth: function (app) {
        app.get('/',function(req,res){
            controller.auth(req,res);
        });
    },

    signup: function (app) {
        app.get('/signup',function(req,res){
            controller.signup(req,res);
        });
    },

    login: function (app) {
        app.get('/login',function(req,res){
            controller.login(req,res);
        });
    },

    homepage: function (app) {
        app.get("/homepage",function(req,res){
            controller.homepage(req,res);
        });
    },

    history: function (app) {
        app.get("/history",function(req,res){
            controller.history(req,res);
        });
    },

    clearHistory: function (app) {
        app.get("/clearhistory",function(req,res){
            controller.clearHistory(req,res);
        });
    },

    next: function (app) {
        app.get("/next",function(req,res){
            controller.next(req,res);
        });
    },

    logout: function(app) {
        app.get('/logout',function(req,res){
            controller.logout(req,res);
        });
    }
};

module.exports = route;