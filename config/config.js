const Sequelize = require("sequelize");
let path = require('path');
const createTable = require(path.resolve('./models'))
let psk = '161552b9a6a2cab4ad17d2a8b5399cb6df8201435d9b7ba8b3a7304929d8e92f';

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

