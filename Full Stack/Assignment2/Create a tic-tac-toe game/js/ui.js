// ui.js
// Handles DOM rendering and user interactions

import { getBoard } from './gameBoard.js';
import { getCurrentPlayer, isGameActive } from './gameController.js';

const boardEl = document.getElementById('board');
const currentPlayerEl = document.getElementById('currentPlayer');
const messageEl = document.getElementById('message');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDrawEl = document.getElementById('scoreDraw');

export function buildBoard(onCellClick) {
  boardEl.innerHTML = '';
  // create 9 cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', `cell ${i+1}`);
    cell.dataset.index = i;
    cell.addEventListener('click', () => onCellClick(i));
    boardEl.appendChild(cell);
  }
}

export function renderBoard() {
  const cells = boardEl.querySelectorAll('.cell');
  const board = getBoard();
  cells.forEach((cellEl, idx) => {
    const val = board[idx];
    cellEl.classList.remove('x','o','win','disabled');
    if (val === 'X') cellEl.classList.add('x');
    if (val === 'O') cellEl.classList.add('o');
    cellEl.textContent = val ? val : '';
    if (!isGameActive() && val) cellEl.classList.add('disabled');
  });

  // update turn indicator
  currentPlayerEl.textContent = getCurrentPlayer();
}

export function showMessage(text) {
  messageEl.textContent = text;
}

export function highlightWinning(combo) {
  if (!combo) return;
  const cells = boardEl.querySelectorAll('.cell');
  combo.forEach(i => {
    const el = cells[i];
    if (el) el.classList.add('win');
  });
}

// update scoreboard DOM
export function updateScores(scores) {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDrawEl.textContent = scores.D;
}
