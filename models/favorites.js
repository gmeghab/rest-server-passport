'use strict';
var mongoose = require('mongoose'),
    assert = require('assert');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// grab the things we need

var Schema = mongoose.Schema;


var favoritesSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});


var Favorites = mongoose.model('Favorite', favoritesSchema);

// make this available to our Node applications
module.exports = Favorites;