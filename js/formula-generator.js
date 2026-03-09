/**
 * Random Formula Generator - Math Club
 * Generates a random formula with explanation. Uses KaTeX for LaTeX rendering.
 */

const formulaData = [
  {
    category: "algebra",
    name: "Quadratic Formula",
    latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    usage: "Solving equations of the form ax² + bx + c = 0",
    explanation: "The quadratic formula gives you the roots (solutions) of any quadratic equation. The ± means there are typically two solutions: one with the plus sign and one with the minus. The expression under the square root (b² − 4ac) is called the discriminant — if it's positive you get two real roots, zero gives one repeated root, and negative means no real roots.",
  },
  {
    category: "algebra",
    name: "Sum of Arithmetic Sequence",
    latex: "S_n = \\frac{n(a_1 + a_n)}{2} = \\frac{n}{2}(2a_1 + (n-1)d)",
    usage: "Finding the sum of the first n terms in an arithmetic sequence",
    explanation: "In an arithmetic sequence, each term increases by a constant d. To add them up, multiply the average of the first and last term by the number of terms. Gauss famously used this as a child to quickly sum 1 + 2 + 3 + … + 100.",
  },
  {
    category: "algebra",
    name: "Sum of Geometric Series",
    latex: "S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r} \\quad (r \\neq 1)",
    usage: "Sum of first n terms when r ≠ 1",
    explanation: "A geometric sequence multiplies by the same ratio r each time. This formula sums the first n terms. When |r| < 1, the infinite sum a₁/(1−r) converges — useful in finance (compound interest) and calculus.",
  },
  {
    category: "algebra",
    name: "Binomial Theorem",
    latex: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k",
    usage: "Expanding powers of binomials like (a + b)ⁿ",
    explanation: "The binomial theorem expands (a+b)ⁿ into a sum of terms. The coefficients (n choose k) come from Pascal's triangle. For example, (a+b)² = a² + 2ab + b². Essential in probability and combinatorics.",
  },
  {
    category: "geometry",
    name: "Pythagorean Theorem",
    latex: "a^2 + b^2 = c^2",
    usage: "Right triangles: c is the hypotenuse",
    explanation: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. One of the oldest and most used theorems — from construction to GPS calculations. It only works for right angles (90°).",
  },
  {
    category: "geometry",
    name: "Area of Circle",
    latex: "A = \\pi r^2",
    usage: "Area of a circle with radius r",
    explanation: "Pi (π ≈ 3.14159) is the ratio of a circle's circumference to its diameter. Squaring the radius and multiplying by π gives the area. The formula comes from splitting the circle into infinitely many thin rings and summing their areas.",
  },
  {
    category: "geometry",
    name: "Volume of Sphere",
    latex: "V = \\frac{4}{3} \\pi r^3",
    usage: "Volume of a sphere with radius r",
    explanation: "The volume of a sphere is 4/3 π times the cube of the radius. Archimedes proved that a sphere has exactly 2/3 the volume of its circumscribed cylinder — a discovery he was so proud of that he requested it on his tombstone.",
  },
  {
    category: "geometry",
    name: "Law of Cosines",
    latex: "c^2 = a^2 + b^2 - 2ab \\cos C",
    usage: "Finding sides or angles in any triangle",
    explanation: "A generalization of the Pythagorean theorem for any triangle. When C = 90°, cos C = 0 and it reduces to a² + b² = c². Use it when you know two sides and the included angle, or all three sides (to find an angle).",
  },
  {
    category: "calculus",
    name: "Power Rule",
    latex: "\\frac{d}{dx} x^n = n x^{n-1}",
    usage: "Differentiating powers of x",
    explanation: "To differentiate xⁿ, bring down the exponent and reduce the power by one. For example, d/dx(x³) = 3x². One of the first rules you learn in calculus — it works for any real n, not just positive integers.",
  },
  {
    category: "calculus",
    name: "Fundamental Theorem of Calculus",
    latex: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
    usage: "Evaluating definite integrals using antiderivatives",
    explanation: "This theorem links differentiation and integration: the definite integral of f from a to b equals F(b) − F(a), where F is any antiderivative of f. It turns the hard problem of summing infinitely many infinitesimals into finding one function.",
  },
  {
    category: "calculus",
    name: "Chain Rule",
    latex: "\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x)",
    usage: "Differentiating composite functions",
    explanation: "When you have a function inside another (like sin(x²)), multiply the derivative of the outer function (at the inner function) by the derivative of the inner function. Think of it as the rate of change propagating through the composition.",
  },
  {
    category: "trigonometry",
    name: "Pythagorean Identity",
    latex: "\\sin^2 \\theta + \\cos^2 \\theta = 1",
    usage: "Fundamental relationship between sine and cosine",
    explanation: "For any angle θ, the square of sine plus the square of cosine equals 1. It follows from the unit circle: (x,y) = (cos θ, sin θ) lies on x² + y² = 1. Used constantly to simplify trig expressions.",
  },
  {
    category: "trigonometry",
    name: "Double Angle (Sine)",
    latex: "\\sin(2\\theta) = 2 \\sin \\theta \\cos \\theta",
    usage: "Expressing sin(2θ) in terms of sin θ and cos θ",
    explanation: "The sine of twice an angle is twice the product of sine and cosine of the original angle. Comes from the angle sum formula with A = B = θ. Useful for solving equations and in Fourier analysis.",
  },
  {
    category: "trigonometry",
    name: "Law of Sines",
    latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}",
    usage: "Relating sides and angles in any triangle",
    explanation: "In any triangle, the ratio of a side to the sine of its opposite angle is constant (and equals the diameter of the circumscribed circle). Use it when you know two angles and a side, or two sides and a non-included angle.",
  },
];

function initFormulaGenerator() {
  const container = document.getElementById("formula-generator");
  if (!container) return;

  const btnEl = container.querySelector(".formula-generate-btn");
  const detailEl = container.querySelector(".formula-detail");

  if (!btnEl || !detailEl) return;

  function getRandomFormula() {
    return formulaData[Math.floor(Math.random() * formulaData.length)];
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function showFormula(formula) {
    const nameEl = detailEl.querySelector(".formula-detail-name");
    const categoryEl = detailEl.querySelector(".formula-category");
    const renderEl = detailEl.querySelector(".formula-render");
    const usageEl = detailEl.querySelector(".formula-usage");
    const explanationEl = detailEl.querySelector(".formula-explanation");

    if (nameEl) nameEl.textContent = formula.name;
    if (categoryEl) categoryEl.textContent = capitalize(formula.category);
    if (usageEl) usageEl.textContent = "When to use: " + formula.usage;
    if (explanationEl) explanationEl.textContent = formula.explanation;

    if (renderEl) {
      try {
        renderEl.innerHTML = katex.renderToString(formula.latex, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (e) {
        renderEl.textContent = formula.latex;
      }
    }

    detailEl.classList.add("active");
    detailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  btnEl.addEventListener("click", () => {
    const formula = getRandomFormula();
    showFormula(formula);
  });
}
