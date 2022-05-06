const Sequelize = require("sequelize");
let path = require('path');
const createTable = require(path.resolve('./models'))

console.log("DB CREDS### ",process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    port: process.env.PORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
          }
    }
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

