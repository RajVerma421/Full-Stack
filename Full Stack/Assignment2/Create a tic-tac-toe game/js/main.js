// main.js (entry point)
import * as Game from './gameController.js';
import * as UI from './ui.js';
import { getBoard } from './gameBoard.js';

const restartBtn = document.getElementById('restartBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

function onCellClick(index) {
  // attempt move
  const result = Game.makeMove(index);
  if (!result.ok) {
    // invalid move
    UI.showMessage('Cell is already taken or game is over.');
    return;
  }

  // update UI after move
  UI.renderBoard();

  if (result.win) {
    UI.highlightWinning(result.combo);
    UI.showMessage(`Player ${result.winner} wins!`);
  } else if (result.draw) {
    UI.showMessage('It\'s a draw!');
  } else {
    UI.showMessage(`Turn: Player ${Game.getCurrentPlayer()}`);
  }

  UI.updateScores(Game.getScores());
}

function start() {
  Game.initGame();
  UI.buildBoard(onCellClick);
  UI.renderBoard();
  UI.updateScores(Game.getScores());
  UI.showMessage('Click a cell to play.');

  restartBtn.addEventListener('click', () => {
    Game.restartGame();
    UI.buildBoard(onCellClick);
    UI.renderBoard();
    UI.showMessage('New game started. X goes first.');
  });

  resetScoreBtn.addEventListener('click', () => {
    Game.resetScores();
    UI.updateScores(Game.getScores());
  });
}

// start app when DOM is ready
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
