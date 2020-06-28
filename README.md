###### My first react-redux project
28 Juin - 1.0 - Stable<br/>
This game is stable because you can start the game, play as rules must be for a minesweeper, and you can also lose or win the game<br/>
You can reset the game, change your column and row number
##BUG:
- The first click on the matrix can be a bomb actually, this is an alternative rule of the minesweeper
## TODO:
####1.1:
- Use redux-observable instead of catching state change with will/shouldUpdate (a full rework is necessary)
- Put limiter on stateHandle like column/row modifier
- Add more stateHandle, for mine number, for 
####Better game value:
- Timer and time saver
- Add unit tests
- Better style, like real bomb image for mined zone, and some kind of "ground" for hidden zone
## RECENT WORK DONE:
####1.0:
- Store has been full rework to allow replaceReducer usage, useful for reset game
- Corner neighbourhood are not count > check function has been full rework, as well as neighbourhood function
- Reset game to begin a new game > I've use willUpdate and shouldUpdate function to catch state change
- Endgame do not make all zone clickable but only the last one showed
- Better endgame, with win or lose announcer
- Add to overlay : Size input > New component stateHandle


