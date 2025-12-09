// script.js - Number Pattern Generator
// Put script.js in same folder as index.html and styles.css

// Utility: pad left with padChar
function padLeft(s, width, padChar = ' ') {
  s = String(s);
  if (s.length >= width) return s;
  return padChar.repeat(width - s.length) + s;
}

// Generate right triangle
function generateTriangle(n, order = 'asc', padChar = ' ') {
  const rows = [];
  const maxWidth = String(n).length;
  for (let r = 1; r <= n; r++) {
    const nums = [];
    const count = r;
    if (order === 'asc') {
      for (let j = 1; j <= count; j++) nums.push(padLeft(j, maxWidth, padChar));
    } else {
      for (let j = count; j >= 1; j--) nums.push(padLeft(j, maxWidth, padChar));
    }
    rows.push(nums.join(' '));
  }
  return rows;
}

// Generate centered pyramid
function generatePyramid(n, order = 'asc', padChar = ' ') {
  const rows = [];
  const maxWidth = String(n).length;
  for (let r = 1; r <= n; r++) {
    const left = [];
    for (let j = 1; j <= r; j++) left.push(padLeft(j, maxWidth, padChar));
    const right = [];
    for (let j = r - 1; j >= 1; j--) right.push(padLeft(j, maxWidth, padChar));
    const inside = [...left, ...right].join(' ');
    // pad each side to center: totalCols = n*2-1 ; contentCols = r*2-1
    const totalCols = n * 2 - 1;
    const contentCols = r * 2 - 1;
    const padCount = Math.floor((totalCols - contentCols) / 2);
    // pad block equals number cell width plus a space
    const padBlock = (padChar === ' ') ? ' '.repeat(maxWidth + 1) : (padChar.repeat(maxWidth) + ' ');
    const leftPad = padBlock.repeat(padCount);
    rows.push(leftPad + inside);
  }

  if (order === 'desc') rows.reverse();
  return rows;
}

// Generate diamond
function generateDiamond(n, order = 'asc', padChar = ' ') {
  if (n === 1) return ['1'];
  const up = generatePyramid(n, 'asc', padChar);
  const down = generatePyramid(n - 1, 'desc', padChar); // exclude middle duplicate
  const rows = [...up, ...down];
  if (order === 'desc') rows.reverse();
  return rows;
}

// Render rows into container with odd/even color rows & stagger
function renderPattern(rows, container) {
  container.innerHTML = '';
  rows.forEach((rowText, idx) => {
    const div = document.createElement('div');
    div.className = 'row ' + ((idx % 2 === 0) ? 'odd' : 'even');
    div.style.animationDelay = `${idx * 40}ms`;

    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.whiteSpace = 'pre';
    span.textContent = rowText; // preserves spaces because white-space: pre
    div.appendChild(span);

    container.appendChild(div);
  });
}

// High-level generate selector
function generate(pattern, size, order, padWith) {
  const padChar = padWith === 'zero' ? '0' : ' ';
  switch (pattern) {
    case 'triangle': return generateTriangle(size, order, padChar);
    case 'pyramid': return generatePyramid(size, order, padChar);
    case 'diamond': return generateDiamond(size, order, padChar);
    default: return [];
  }
}

// DOM hooks & event wiring
document.addEventListener('DOMContentLoaded', () => {
  const patternSelect = document.getElementById('patternSelect');
  const sizeInput = document.getElementById('sizeInput');
  const orderSelect = document.getElementById('orderSelect');
  const padSelect = document.getElementById('padSelect');
  const generateBtn = document.getElementById('generateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const patternContainer = document.getElementById('patternContainer');
  const copyBtn = document.getElementById('copyBtn');

  function runGenerate() {
    let size = parseInt(sizeInput.value, 10);
    if (isNaN(size) || size < 1) size = 1;
    if (size > 30) size = 30;
    sizeInput.value = size;

    const pattern = patternSelect.value;
    const order = orderSelect.value;
    const padWith = padSelect.value;

    const rows = generate(pattern, size, order, padWith);
    renderPattern(rows, patternContainer);
  }

  generateBtn.addEventListener('click', runGenerate);
  clearBtn.addEventListener('click', () => {
    patternContainer.innerHTML = '';
  });

  copyBtn.addEventListener('click', async () => {
    const rows = Array.from(patternContainer.querySelectorAll('.row span')).map(sp => sp.textContent);
    if (rows.length === 0) {
      alert('Nothing to copy — generate a pattern first.');
      return;
    }
    const text = rows.join('\n');
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(()=> copyBtn.textContent = 'Copy Output', 1200);
    } catch (e) {
      alert('Copy failed: ' + e.message);
    }
  });

  // initial render
  runGenerate();
});
