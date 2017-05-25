'use strict';
var mongoose = require('mongoose'),
    assert = require('assert');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// grab the things we need

var Schema = mongoose.Schema;

//var defaultString = new Schema({ type: String, default: '' });

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var dishSchema = new Schema({
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
	 category: {
        type: String,
        required: true,
        unique: true
    },
	label: {
        type: String, default: ''
	 },
	price:{ type: Currency,required: true,min:0 },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false
    },
	  comments:[commentSchema]
},
{
    timestamps: true
});

// Setter
dishSchema.path('price').set(function(num) {
  return (num/100).toFixed(2);
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;