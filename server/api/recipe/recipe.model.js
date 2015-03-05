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
    ingredients : { type: [String], required: true },
    steps       : { type: [String], required: true },
    creator     : {type: mongoose.Schema.Types.Object, ref: 'User'}
});

RecipeSchema.statics.isValidName = function (name, callback) {
    return !!name;

};

// Validate empty name
RecipeSchema
  .path('name')
  .validate(function(name) {
    return (name !== '')
  }, 'Name cannot be blank');

//RecipeSchema
//  .path('ingredients')
//  .validate(function(ingredients) {
//    return ''.test(ingredients);
//  }, 'Ingredients cannot be blank');

module.exports = mongoose.model('Recipe', RecipeSchema);
