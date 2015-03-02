'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name        : { type: String, required: true},
    image       : String,
    time        : {
        prep    : Number,
        cook    : Number,
        cool    : Number,
        ready   : Number
    },
    ingredients : [String],
    steps       : [String],
    creator     : {type: mongoose.Schema.Types.Object, ref: 'User'}
});

RecipeSchema.statics.isValidName = function (name, callback) {
    if (name) {
        return true;
    }
    return false;
};

// Validate empty name
RecipeSchema
  .path('name')
  .validate(function(name) {
    return (name != '')
  }, 'Email cannot be blank');

module.exports = mongoose.model('Recipe', RecipeSchema);
