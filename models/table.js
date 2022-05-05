var Sequelize = require('sequelize');
let credentials;
let recHistory; //recommendation history

function create(sequelize) {   //Creating the database models
    credentials = sequelize.define('Credentials', {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
    })

    recHistory = sequelize.define("recHistory", {
        showId : Sequelize.INTEGER,
        name : Sequelize.STRING,
        language : Sequelize.STRING,
        favourite : Sequelize.BOOLEAN
    })

    recHistory.belongsTo(credentials);

    credentials.sync().then(function () {
        console.log("credentials table created")
        recHistory.sync().then(function(){
            console.log("recommendation history table created");
        })
    })
    
};

function enter(signup, callback) { //entering user credentials into DB and ensuring that no username is taken twice to avoid conflict
    let UserId;
    credentials.findOne({ limit: 1, where: { username: signup.username } }).then(userDetails => {
        if (userDetails != null) { 
            callback("Username already taken", null); 
        }
        else {
            credentials.sync().then(function () {
                return credentials.create(signup).then(function () {
                    credentials.findOne({ limit: 1, where: {}, order: [['id', 'DESC']] }).then(userId => {
                        UserId = userId.id;
                        callback(null, UserId);
                    })
                });
            })
        }
    })

}

function enterReccShow(userId, showDetails,cb){
    let showID;
    let showDbDetails = {
        showId : showDetails.id,
        name : showDetails.name,
        language : showDetails.language,
        CredentialId : userId
    }
    recHistory.findOne({ limit: 1, where: { showId: showDetails.id , CredentialId : userId } }).then(showDetails => {
        if (showDetails != null) { 
            callback("Show ID already taken, unexpected Behaviour!", null); 
        }
        else {
            recHistory.sync().then(function () {
                return recHistory.create(showDbDetails).then(function () {
                        cb(null, showDbDetails.showId);
                });
            }).catch((err)=>{
                console.log(err);
            });
        }
    }).catch((err)=>{
        console.log(err);
    });
}

function authenticate(login, callback) { //authenticate user credentials during login

    credentials.findOne({ limit: 1, where: { username: login.username } }).then(userDetails => {
        console.log(userDetails.username, login.username, userDetails.password, login.password)
        if (userDetails.username == login.username && userDetails.password == login.password) {
            console.log("********************credentials are correct");
            callback(null, userDetails.id);
        }
        else {
            console.log("********************credentials are wrong");
            callback("Incorrect password", null);
        }
    }
    ).catch(() => {
        console.log("user not available")
        callback("Username not available", null);
    })
}

function showNotRecommended(userId,show,cb){
    recHistory.findOne({ limit: 1, where: { showId: show , CredentialId : userId } }).then(showDetails => {
        if(showDetails != null){
            cb("recommended", null);
        } else {
            cb(null, show);
        }
    }
    ).catch((err) => {
        console.log(err);  
    })
}

function getRecommendationHistory(userId,cb){
    recHistory.findAll({where: {CredentialId : userId } }).then(historyDetails => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",historyDetails);
        cb(null,historyDetails);
    }
    ).catch((err) => {
        console.log(err); 
         cb("error",null);
    })}

function clearRecommendationHistory(userId, cb){
    recHistory.destroy({where: {CredentialId : userId}}).then(data =>{
        cb(null,data);
    }).catch((err)=>{
        console.log(err);
        cb(err,null);
    });
}
module.exports = {
    create,
    enter,
    authenticate,
    showNotRecommended,
    enterReccShow,
    getRecommendationHistory,
    clearRecommendationHistory
}
