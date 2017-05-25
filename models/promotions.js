'use strict';
var mongoose = require('mongoose'),
    assert = require('assert');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// grab the things we need

var Schema = mongoose.Schema;

//var defaultString = new Schema({ type: String, default: '' });

// create a schema
var promotionSchema = new Schema({
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
	label: {
        type: String, default: ''
	 },
	price:{ type: Currency,required: true,min:0 },
    description: {
        type: String,
        required: true
    },featured: {
        type: Boolean,
        default:false
    }},
   
	 {
    timestamps: true
});

promotionSchema.path('price').set(function(num) {
  return (num/100).toFixed(2);
});


// the schema is useless so far
// we need to create a model using it
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = Promotions;