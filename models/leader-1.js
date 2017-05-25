'use strict';
var mongoose = require('mongoose'),
    assert = require('assert');
// grab the things we need

var Schema = mongoose.Schema;


// create a schema
var leaderSchema = new Schema({
	 name: {
        type: String,
        required: true,
        unique: true
    },
	 image: {
        type: String,
        required: true,
        unique: true
    },
	 designation: {
        type: String,
        required: true,
        unique: true
    },
	 abbr: {
        type: String,
        required: true,
        unique: true
    },
	 description: {
        type: String,
        required: true
    }},
     {
    timestamps: true
});
	

// the schema is useless so far
// we need to create a model using it
var Leadership = mongoose.model('Leadership', leaderSchema);

// make this available to our Node applications
module.exports = Leadership;