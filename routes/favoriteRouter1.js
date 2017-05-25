var express = require('express');
var favoriteRouter = express.Router();
var mongoose = require('mongoose');
var Favorites=require('../models/favorites');
var Dishes=require('../models/dishes');
var bodyParser = require('body-parser');
favoriteRouter.use(bodyParser.json());
var Verify = require('./verify');
favoriteRouter.route('../models/favorites');

favoriteRouter.route('/')
/*
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Favorites.find(req.query)
        .populate('postedBy dishes')
        .exec(function (err, favorite) {
        if (err) next(err);
        res.json(favorite);
    });
})
*/


.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    var userId=req.decoded._id;
    Favorites.findOne({'postedBy': userId})
        .populate('postedBy dishes')
        .exec(function (err, favorite) {
        if (err) next(err);
        res.json(favorite);
    });
})
/*
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({'dishes':req.body}, function(err, favorite) {
        if (err) next(err);
        console.log('favorite ' + favorite);
        if (!favorite) {       
                Favorites.create({'postedBy': req.decoded._id}, function (err, resp) {
                    console.log('function res ' + resp);
                    if (err) next(err);
                    resp.dishes.push(req.body);
                    resp.save(function(err, data){
                        res.json(data);
                    });
                });
        }  

    });
})
*/
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
	    Favorites.findOneAndUpdate(
	   {postedBy : req.decoded._id}, 
	   { $addToSet: { dishes: req.body} },
	   {upsert:true, new:true} , function (err, favorite) {
	          if (err) next(err);
	          console.log('dish added to favorites!');
	          res.json(favorite);
		});
})
		

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

favoriteRouter.route('/:favoriteId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Favorites.findById(req.params.favoriteId)
     .populate('postedBy dishes')
     .exec(function (err, favorite) {
        if (err) next(err);
        res.json(favorite);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findByIdAndUpdate(req.params.favoriteId, {
        $set: req.body
    }, {
        new: true
    }, function (err, favorite) {
        if (err) next(err);
        res.json(favorite);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findByIdAndRemove(req.params.favoriteId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});



module.exports = favoriteRouter;