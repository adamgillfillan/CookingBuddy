'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name        : String,
    image       : String,
    time        : {
        prep    : Number,
        cook    : Number,
        cool    : Number,
        ready   : Number
    },
    ingredients : [String],
    steps       : [String]
});

module.exports = mongoose.model('Recipe', RecipeSchema);