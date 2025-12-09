// gameController.js
// Game logic: players, moves, win/draw detection, score

import { getBoard, setCell, resetBoard } from './gameBoard.js';

const WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

let currentPlayer = 'X';
let scores = { X: 0, O: 0, D: 0 }; // D = draws
let gameActive = true;

export function initGame() {
  currentPlayer = 'X';
  gameActive = true;
  resetBoard();
}

export function getCurrentPlayer() {
  return currentPlayer;
}

export function isGameActive() {
  return gameActive;
}

export function makeMove(index) {
  if (!gameActive) return { ok: false };
  const ok = setCell(index, currentPlayer);
  if (!ok) return { ok: false };

  // check result
  const winnerResult = checkWinner();
  if (winnerResult.winner) {
    gameActive = false;
    scores[winnerResult.winner] += 1;
    return { ok: true, win: true, winner: winnerResult.winner, combo: winnerResult.combo };
  }

  if (isDraw()) {
    gameActive = false;
    scores.D += 1;
    return { ok: true, draw: true };
  }

  // switch player
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  return { ok: true };
}

export function checkWinner() {
  const b = getBoard();
  for (const combo of WIN_COMBOS) {
    const [a,b1,c] = combo;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return { winner: b[a], combo };
    }
  }
  return { winner: null, combo: null };
}

export function isDraw() {
  const b = getBoard();
  return b.every(cell => cell !== null) && !checkWinner().winner;
}

export function restartGame() {
  initGame();
}

export function getScores() {
  return { ...scores };
}

export function resetScores() {
  scores = { X: 0, O: 0, D: 0 };
}
