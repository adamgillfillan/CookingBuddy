'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Recipe = require('./recipe.model');
var assert = require('assert');

describe('GET /api/recipes', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/recipes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('Recipe Model', function () {
  describe('.isValidName', function() {

    it('should return false for an empty string', function(done) {
      assert.equal(Recipe.isValidName(''), false);
      done();
    });
  });
});

var a = {"name":"Cinnamon Rock Candy","image":"http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps13214_CK133085B06_18_1b.jpg","time":{"prep":20,"cook":25,"cool":45,"ready":90},"ingredients":["1 cup water","3-3/4 cups sugar","1-1/4 cups light corn syrup","1 teaspoon red liquid food coloring","1 teaspoon cinnamon oil","1/3 cup confectioners' sugar"],"steps":["Line a 15-inch by 10-inch by 1-inch pan with foil.","Butter the foil and set aside.","In a large heavy saucepan, combine water, sugar, corn syrup and food coloring.","Bring to a boil over medium heat, stirring occasionally.","Cover and cook for 3 minutes to dissolve sugar crystals.","Uncover; cook on medium-high heat, without stirring, until a candy thermometer reads 300°. This takes about 25 minutes.","Remove from the heat.","Stir in cinnamon oil. Keep face away from mixture as oil is very strong.","Immediately pour onto prepared pan.","Cool completely, about 45 minutes.","Break the candy into pieces using the edge of a metal mallet.","Sprinkle both sides of candy with confectioners' sugar.","Store in airtight container."]};
describe('POST /api/recipes', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .post('/api/recipes')
      .type('json')
      .send(a)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});