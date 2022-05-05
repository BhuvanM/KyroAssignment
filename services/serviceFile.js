let Ajv = require('ajv');
let addFormats = require("ajv-formats")
let jwt = require('jsonwebtoken');
let Cookies = require('cookies');
let path = require('path');
let Tables = require(path.resolve('./models'));
let Promise = require("bluebird");
let shows = require('./api/shows.js');

let ajv = new Ajv();
addFormats(ajv,["email"]);

function serviceChecking(req,res){
    return true;
};

function signupValidation(signup) {
    let schema = {
        "type": "object",
        "properties": {
            "username": { "type": "string" },
            "password": { "type": "string" },
            "email": { "type": "string", "format": "email" }
        },
        "required": ["username", "password", "email"]
    }
    const isValid = ajv.validate(schema, signup);
    return isValid
}

function loginValidation(login) {
    console.log("LOGIN",login);
    let schema = {
        "type": "object",
        "properties":
        {
            "username": { "type": "string" },
            "password": { "type": "string" }
        }, "required": ["username", "password"]
    }
    let isValid = ajv.validate(schema, login);
    return isValid

}

function EnterDB(signup, cb) {
    var TableEntry = Promise.promisify(Tables.enter);
    TableEntry(signup).then(data => {
        cb(null, data);
    }).catch(error => { cb(error, null) })
}

function authenticate(login, callback) {
    let auth = Promise.promisify(Tables.authenticate)
    auth(login).then(Userid => {
        callback(null, Userid);
    }).catch(error => {
        callback(error, null)
    })

}

function tokenCreation(user, req, res){
    let token = jwt.sign({userId : user}, "TokenKey");
    let keys =['cookie key'];
    let cookies = new Cookies(req, res, { keys: keys })
    cookies.set('AuthenticatedToken', token, { signed: true })
}

function tokenChecking(req, res) {
    let keys = ['cookie key']
    let cookies = new Cookies(req, res, { keys: keys })
    let token = cookies.get('AuthenticatedToken', { signed: true })
    let isValid;
    let decoded;
    decoded = jwt.verify(token, "TokenKey", function (err, data) {
        if (!err) {
            if(req.query.userId == data.userId){ //user verification
                isValid = true
            }
        }
        else {
            isvalid = false
        }
    })
    return isValid
}

function tokenDeletion(req, res) {
    var keys = ['cookie key']
    var cookies = new Cookies(req, res, { keys: keys })
    cookies.set('AuthenticatedToken', "notAuthenticated", { signed: true })
}

function getashow(dat,cb){
     shows.giveshow(cb);
} 

function getNewShow(userId,cb){
    let getRandShow = Promise.promisify(shows.giveARandomShow);
    getRandShow(userId).then((show)=>{
        cb(null,show);
    }).catch((err)=>{
        console.log(err);
    });
}

function getReccHistory(userId,cb){
    let getHistory = Promise.promisify(Tables.getRecommendationHistory)

    getHistory(userId).then((history)=>{
        cb(null,history);
    }).catch((err)=>{
        console.log(err);
        cb("error",null);
    });
}

function clearRecHistory(userId,cb){
    let clearHistory = Promise.promisify(Tables.clearRecommendationHistory);
    clearHistory(userId).then((data)=>{
        cb(null,data);
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = {serviceChecking,
    signupValidation,
    tokenCreation,
    EnterDB,
    tokenDeletion,
    loginValidation,
    authenticate,
    tokenChecking,
    getashow,
    getNewShow,
    getReccHistory,
    clearRecHistory
    };