const Sequelize = require("sequelize");
let path = require('path');
const createTable = require(path.resolve('./models'))

const sequelize = new Sequelize('mydb', 'postgres', 'psk', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
  })

let test = sequelize //Try to auth and test the connection
    .authenticate()
    .then(function() {
        console.log("DB Connected");
        createTable.create(sequelize) //To create user credentials
    })
    .catch(function(err) {
        console.log("Error connecting to database",err);
    })

