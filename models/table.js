var Sequelize = require('sequelize');
let credentials;

function create(sequelize) {   //Creating the database models
    credentials = sequelize.define('Credentials', {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
    })

    credentials.sync().then(function () {
        console.log("credentials table created")
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

module.exports = {
    create,
    enter,
    authenticate
}
