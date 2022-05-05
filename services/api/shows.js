
const { response } = require('express');
const http = require('http');
//const fetch = require('node-fetch');
const baseMovieURL = 'https://api.tvmaze.com/shows/';
const showList = ' https://api.tvmaze.com/updates/shows'; //Gives a list of all shows in TV maze db
var path = require('path');
let Tables = require(path.resolve('./models'));
let Promise = require("bluebird");

const Client = require('node-rest-client').Client;
const client = new Client();

 function between(min, max) {//random number generator
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }
  

function giveshow(cb){
    client.get('https://api.tvmaze.com/singlesearch/shows?q=jhon', {}, function (responseJSON) {
        console.log(responseJSON);
        cb(null,responseJSON.name);
    });
}

function giveARandomShow(userId, cb){
    let maxShows = 0;
    client.get(showList, {}, function (responseJSON) {
        console.log(responseJSON);
        maxShows = Object.keys(responseJSON).length;

        let fetchShow = Promise.promisify(chooseShow);
        fetchShow(userId,maxShows).then((showID)=>{
            client.get(baseMovieURL + showID, {}, function (response) {
            console.log(response);
            //TODO store ID in db
            
            var TableEntry = Promise.promisify(Tables.enterReccShow);
            TableEntry(userId,response).then(showId => {
                cb(null, response);
            }).catch(error => { cb(error, null) })

        })
    }).catch((err) => {
        console.log(err);
    });
    });
}

function chooseShow(userId,maxShows,cb){
    let showID = between(1,maxShows);

    let notRec = Promise.promisify(Tables.showNotRecommended);
        notRec(userId,showID).then((showId)=>{
            cb(null,showId);
        }).catch((err)=>{
            console.log("recommended already");
            chooseShow(userId,maxShows,cb);
        })
}

module.exports = {
    giveshow,
    giveARandomShow
}


