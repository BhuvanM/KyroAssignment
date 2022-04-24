let alert = require('alert-node');
let service = require('../services');
var path = require('path')


function auth(req,res){
    res.render(path.resolve("view/authPage.pug"));
}

function login(req,res){
    let login = {
        username : req.query.username,
        password : req.query.password
    };

    alert("good login");
}

function signup(req,res){
    res.send("signedup");
}

function logout(req,res){

    res.send("loggedout");
}
function homepage(req,res){

    alert(' ping from controller');
    if(service.serviceChecking){
        res.send("App routing ..... check      App service .... check");
    }

}

module.exports = {homepage,auth,login}