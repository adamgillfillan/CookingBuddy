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

RecipeSchema.statics.isValidName = function (name, callback) {
    if (name) {
        return true;
    }
    return false;
};

module.exports = mongoose.model('Recipe', RecipeSchema);