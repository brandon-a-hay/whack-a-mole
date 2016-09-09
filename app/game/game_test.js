'use strict';

describe('whackamole', function() {

  beforeEach(function() {
    angular.mock.module('whackamole.game');
  });

  var gameController;

  beforeEach(inject(function($controller) {
    gameController = $controller('WhackamoleCtrl');
  }));

  it('should have a 5x5 grid for the holes', function () {
    expect(gameController.rows.length).toEqual(5);
    expect(gameController.columns.length).toEqual(5);
  });

  it('should have two moles on the grid when the game starts', function () {
    gameController.startGame();
    expect(gameController.currentMoles.length).toEqual(2);
  });

});
