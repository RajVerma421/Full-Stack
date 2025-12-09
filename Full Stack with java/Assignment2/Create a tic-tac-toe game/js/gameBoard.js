// gameBoard.js
// Responsible for storing board state and simple operations

const board = new Array(9).fill(null);

export function getBoard() {
  return board;
}

export function resetBoard() {
  for (let i = 0; i < board.length; i++) board[i] = null;
}

export function setCell(index, value) {
  if (index < 0 || index > 8) return false;
  if (board[index] !== null) return false;
  board[index] = value;
  return true;
}

export function getCell(index) {
  return board[index];
}
