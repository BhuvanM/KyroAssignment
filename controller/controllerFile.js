let alert = require('alert-node');
let service = require('../services');
var path = require('path');
var crypto = require('crypto');
var Promise = require('bluebird')



function auth(req,res){
    res.render(path.resolve("view/authPage.pug"));
}

function login(req, res) {   //In case of login , credentials are verified and token is also created and verified from the cookies
    let login = {
        username: req.query.username,
        password: req.query.password
    }
    
    let isValid = service.loginValidation(login); //data validation
    if (!isValid) {
        alert("Invalid datatype for login")
        res.redirect('/')
    }
    else {
        let key = crypto.scryptSync(login.password, 'salt', 24);
        let iv = Buffer.alloc(16, 0); 
        var cipher = crypto.createCipheriv('aes192', key ,iv);//Password encryption
        let encrypt = cipher.update(login.password, 'utf8', 'hex');
        encrypt += cipher.final('hex');
        login.password = encrypt;

        var authenticate = Promise.promisify(service.authenticate);//login authentication
        authenticate(login).then(userId => {
            console.log("*******" + userId)
            service.tokenCreation(userId, req, res) //token stored in cookies
            res.redirect('/homepage?userId=' + userId);
        }).catch(error => {
            alert(error)  //A pop up alert will be given in case of msimatch
            res.redirect('/')
        })
    }
}

function signup(req,res){
    var signupDetails = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email
    }
    let isValid = service.signupValidation(signupDetails); //service
    if (!isValid) {
        alert("Invalid datatype for signup")
        res.redirect('/')
    }
    else {
        let key = crypto.scryptSync(signupDetails.password, 'salt', 24);
        let iv = Buffer.alloc(16, 0); 
        var cipher = crypto.createCipheriv('aes192', key ,iv);//Password encryption
        let encrypt = cipher.update(signupDetails.password, 'utf8', 'hex');
        encrypt += cipher.final('hex');
        signupDetails.password = encrypt;

        let TableEntry = Promise.promisify(service.EnterDB) //user credentials entry into database //TODO Table entries
        TableEntry(signupDetails).then(userId => {
            service.tokenCreation(userId, req, res);
            res.redirect('/homepage?userId=' + userId);
        }).catch(error => {
            alert(error)
            res.redirect('/')
        })
    }
}

function homepage(req, res) {  // homepage
    let userId = req.query.userId;
    if (!service.tokenChecking(req, res)) {   //Token checking from cookies to ensure you have gone through login or signup
        alert("Session Timeout. Please Login again");
        res.redirect('/');
    }
    else {
        if(userId){
            alert("Wlecome to Kyro TV");
            let serv = Promise.promisify(service.getNewShow);
            serv(userId).then(show => {
                res.send(show);
            }).catch(error => {
                    alert(error)
            })
        } else {
            res.redirect('/');
        }
        
    }
}

function logout(req, res) {  //Token is changed to not authorized in cookie and returned to login page
    service.tokenDeletion(req, res);
    res.redirect('/');
}

module.exports = {
    auth,
    login,
    signup,
    homepage,
    logout}