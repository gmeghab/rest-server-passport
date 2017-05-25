var express = require('express');
var leaderRouter = express.Router();
var mongoose = require('mongoose');
var Leaders=require('../models/leadership');
var bodyParser = require('body-parser');
leaderRouter.use(bodyParser.json());
var Verify = require('./verify');
leaderRouter.route('../models/leaders');

leaderRouter.route('/')
.get(function(req,res,next){
    Leaders.find(req.query)
    .exec(function (err, leader){
		if (err) next(err);
		res.json(leader);
});
})

.post(function (req, res, next) {
    Leaders.create(req.body, function (err, leader) {
        if (err) next(err);
        console.log('Leader created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})
.delete(function (req, res, next) {
    Leaders.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});


leaderRouter.route('/:leaderId')
.get(function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) next(err);
        res.json(leader);
    });
})

.put(function (req, res, next) {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) next(err);
        res.json(leader);
    });
})

.delete(function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {   
        if (err) next(err);
        res.json(resp);
    });
});

module.exports = leaderRouter;