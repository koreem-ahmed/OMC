/**
 * Matrix-style background with falling math symbols
 */

const MATH_SYMBOLS = [
  "∫", "∂", "∑", "∏", "∞", "π", "√", "Σ", "Δ", "∇",
  "×", "÷", "±", "≤", "≥", "≠", "≈", "∈", "θ", "α",
  "β", "γ", "δ", "ε", "λ", "μ", "σ", "ω", "dx", "dy",
  "dt", "lim", "f'", "f''", "d²", "∂²", "∫∫", "∑∑"
];

function initMatrixBg() {
  const container = document.getElementById("matrix-bg");
  if (!container) return;

  const columns = 14;
  const symbolsPerColumn = 20;

  for (let c = 0; c < columns; c++) {
    const column = document.createElement("div");
    column.className = "matrix-column";
    column.style.animationDelay = `${Math.random() * 0.5}s`;
    column.style.animationDuration = `${25 + Math.random() * 15}s`;

    const symbols = [];
    for (let i = 0; i < symbolsPerColumn; i++) {
      symbols.push(MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)]);
    }
    for (let pass = 0; pass < 2; pass++) {
      symbols.forEach((symbol) => {
        const span = document.createElement("span");
        span.className = "matrix-symbol";
        span.textContent = symbol;
        column.appendChild(span);
      });
    }

    container.appendChild(column);
  }
}
