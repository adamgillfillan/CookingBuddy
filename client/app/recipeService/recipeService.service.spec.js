'use strict';

describe('Service: recipeService', function () {

  // load the service's module
  beforeEach(module('cookingBuddy20App'));

  // instantiate service
  var recipeService;
  beforeEach(inject(function (_recipeService_) {
    recipeService = _recipeService_;
  }));

  it('should do something', function () {
    expect(!!recipeService).toBe(true);
  });

});
