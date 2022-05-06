var assert = require("assert");
const sinon = require('sinon');
let Controller = require("../../controller/controllerFile.js");


describe('controller', function(){
    let req = {
        query : {
            userId : "2"        }
    }

    let res = {};

    res =
     {
        json: sinon.spy(),
        redirect: sinon.stub().returns({ end: sinon.spy() })
    };

    it('should redirect to homePage', sinon.test(function () {
        Controller.next(req, res);
        sinon.assert.calledWith(res.redirect,'/homepage?userId=' + req.query.userId);
    }));

});