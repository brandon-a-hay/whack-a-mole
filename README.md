#Whack-a-mole
##How to run the application
This is an AngularJS application so you’ll need npm and bower to be installed on your machine. Once you’ve got that install the dependencies with:
```npm install```
Once that finishes run you can launch the application by running:
 ```npm start```
Now browse to the app at http://localhost:8000/ and click on the Start button.

To run the test suite run
```npm test```

##Features
In addition to the core features of a whack-a-mole game, there is an increasing difficulty mechanism. After 10 seconds the moles appear more frequently and during the final 10 seconds 3 moles appear at a time.

##Improvements
For this exercise I went with a very simple directory structure. As the application scales we should move logic into separate modules (ie: the logic for generating moles could go into whackamole.moles module and whackamole.moles.controller.js controller) for better organization.
Every mole appears in a random hole with no regard as to where other moles are on the grid. This should be changed so that  no mole can appear in a hole that’s already occupied.
Keep track of user’s score history.
Improve test coverage (I wrote a few tests in game/game_test.js).
Add a modal to appear when a user completes a game which tells them their score out of how many moles appeared.
Add animations when a mole appears, disappears and gets whacked.
