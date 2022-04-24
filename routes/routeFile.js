const controller = require("../controller");

let route = {
    homepage: function (app) {
        app.get("/homepage",function(req,res){
            controller.homepage(req,res);
        });
    },

    login: function (app) {
        app.get('/',function(req,res){
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