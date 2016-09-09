'use strict';

angular.module('whackamole.game', ['ngRoute'])
  .controller('WhackamoleCtrl', WhackamoleCtrl)
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/game', {
      templateUrl: 'game/game.html',
      controller: 'WhackamoleCtrl as vm'
    });
  }])

WhackamoleCtrl.$inject = ['$timeout'];
function WhackamoleCtrl($timeout) {
  var self = this;
  // size of the grid (5 x 5)
  self.rows = [1, 2, 3, 4, 5];
  self.columns = [1, 2, 3, 4, 5];
  self.gameStarted = false;

  self.topScore = 0;
  self.score = 0;
  // list of moles currently on the grid
  self.currentMoles = [];

  // increase the level of difficulty over time
  var levels = [
    { level: 1, moleFreq: 2000, numOfMoles: 2},
    { level: 2, moleFreq: 1600, numOfMoles: 2},
    { level: 3, moleFreq: 1500, numOfMoles: 3}
  ];
  self.currentLevel = levels[0];
  var currentLevelIndex = 0;

  var whackSound = angular.element(document.getElementById('whacksoundclip'))[0];

  // mole class
  function Mole(row, col) {
    this.row = row,
    this.col = col,
    this.whacked = false
  }

  self.startGame = function () {
    self.gameStarted = true;
    self.roundTime = 30;

    // set the first moles as soon as game begins
    self.currentMoles.push(generateMole());
    self.currentMoles.push(generateMole());

    renderMoles();
    initMoleGenerator();
    countdown();
    incrementDifficultyLevels();
  };

  self.whack = function (hole) {
    self.currentMoles.forEach(function(mole) {
      if (mole.row == hole.row && mole.col == hole.col && !mole.whacked) {
        // user whacked a mole!
        whackSound.load();
        whackSound.play();
        self.score += 1;
        mole.whacked = true;
        var moleEl = angular.element(document.getElementById(mole.row + '-' + mole.col));
        moleEl.removeClass('mole');
      }
    });
  };

  // mole functions
  function initMoleGenerator() {
    $timeout(function () {
      if (self.roundTime >= 1) {
        clearGrid();

        // pick random holes on the grid for mole to appear
        for (var i = 1; i <= self.currentLevel.numOfMoles; i++) {
          self.currentMoles.push(generateMole());
        }

        renderMoles();
        initMoleGenerator();
      } else {
        $timeout.cancel();
      }
    }, self.currentLevel.moleFreq); // how frequently moles will appear
  }

  function generateMole() {
    var row = Math.floor(Math.random()*(5-1+1)+1);
    var col = Math.floor(Math.random()*(5-1+1)+1);
    return new Mole(row, col);
  }

  function renderMoles() {
    self.currentMoles.forEach(function (mole) {
      var el = angular.element(document.getElementById(mole.row + '-' + mole.col));
      el.addClass('mole');
    });
  }

  // game timer
  function countdown() {
    $timeout(function() {
      if (self.roundTime >= 1) {
        // round is ongoing
        self.roundTime--;
        countdown();
      } else {
        // time's up!
        self.gameStarted = false;
        resetGame();
        clearGrid();
        $timeout.cancel();
      }
    }, 1000); // countdown every second
  }

  // increment the level of difficulty every 10 seconds
  function incrementDifficultyLevels() {
    $timeout(function () {
      if (self.roundTime > 1 && currentLevelIndex < levels.length - 1) {
        self.currentLevel = levels[currentLevelIndex + 1];
        currentLevelIndex ++;
        // show the new level to the user and hide after 2 seconds
        self.displayLevelAlert = true;
        hideLevelAlert();
        incrementDifficultyLevels();
      } else {
        $timeout.cancel();
      }
    }, 10000);
  }

  // hide the pop up alert showing the current level after 3 seconds
  function hideLevelAlert() {
    if (self.gameStarted) {
      $timeout(function () {
        self.displayLevelAlert = false;
      }, 3000);
    }
  }

  // end of game functions
  function clearGrid() {
    self.currentMoles.forEach(function (mole) {
      var el = angular.element(document.getElementById(mole.row + '-' + mole.col));
      el.removeClass('mole');
    });
    self.currentMoles = [];
  }

  function resetGame() {
    self.gameStarted = false;
    self.topScore = Math.max(self.topScore, self.score);
    self.score = 0;
    self.currentLevel = levels[0];
    currentLevelIndex = 0;
  }

}
