let alert = require('alert-node');
let service = require('../services');

function homepage(req,res){

    alert(' ping from controller');
    if(service.serviceChecking){
        res.send("App routing ..... check      App service .... check");
    }
    
}

module.exports = {homepage}