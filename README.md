# Snaptrude Tools Engineer Assignment – Draw Rectangle Feature

## 👋 Overview

This repository contains the solution to the Tools Engineer assignment from Snaptrude. The assignment involved:

1. Creating a test plan for the **Draw Rectangle** feature.
2. Automating a few test cases using the **Playwright** framework in **TypeScript**.
3. Answering a question on how source code access can aid in writing more robust verifications.

---

## 📁 Repository Structure

```
.
├── canvasPage.ts         # Page Object Model for interacting with the Snaptrude canvas
├── rectangle.spec.ts     # Test suite for the Draw Rectangle feature
└── README.md             # Assignment summary and repository details
```

---

## ✅ Exercise 1 – Test Plan

The test plan for the Draw Rectangle feature is shared separately in a [Google Sheet](). It outlines test scenarios covering:

- Tool selection
- Drawing behavior (single click, drag, edge cases)
- Rectangle constraints
- UI state changes and interactions

---

## 🤖 Exercise 2 – Test Automation

- Automated using **Playwright** and **TypeScript**.
- Structured with **Page Object Model** for maintainability.
- Test cases include:
  - Tool selection
  - Rectangle drawing with position and size verification
  - Canvas interaction edge cases

All verifications include strong assertion criteria based on canvas behavior.

---

## 💡 Question 3 – Robust Verification with Source Access

Having access to the Snaptrude frontend source code (JavaScript/TypeScript) can enhance automated tests in several ways:

1. Direct insight into the canvas model
With the source, we can read the exact coordinates, width/height, and style flags the app stores for each rectangle.
Instead of visually guessing “did a rectangle appear?”, we assert “the model now contains one rectangle at (x, y) with the expected dimensions.”
This eliminates false positives/negatives and speeds tests because we no longer need screenshots or pixel-diffs.
2. First-class, unbreakable selectors
We can add data-test-id attributes (or similar hooks) to toolbar buttons, canvas layers, etc.
Tests then locate elements by those IDs, not brittle CSS paths.
Any future UI redesign won’t break the tests, which slashes long-term maintenance.
3. Real application events instead of timeouts
The drawing tool already fires internal events (e.g., “rectangleCreated”).
Tests can subscribe to those events and know exactly when the operation is finished.
This removes the need for arbitrary “wait 500 ms” delays, making the suite faster and deterministic—crucial when we scale to thousands of tests.
4. Shared TypeScript types = compile-time safety
By importing the same Rectangle interface the app uses, our assertions are type-checked.
If the domain model changes (say width becomes w), the tests fail to compile rather than silently passing with a broken assertion.
5. Controlled, repeatable test data
With code access we can run the canvas against an in-memory store or stubbed backend in test mode.
Every test starts from a blank, predictable state; no flaky network or cached state issues.
This also speeds execution because there’s no real backend round-trip.
6. Lightweight performance instrumentation
We can expose counters (e.g., render passes or FPS drop) purely for test builds.
Tests enforce “drawing one rectangle must not trigger more than N renders,” catching performance regressions early—important for a graphics-heavy product.
7. Easier debugging & root-cause analysis
When a test fails, we can log the canvas internals or even replay actions because we understand the implementation.
This shortens the feedback loop for both QA and engineers.
8. Single source of truth for business logic
Any geometry helper (pixel-to-model conversion, snapping rules, min/max size constraints) can be invoked directly in the tests.
That ensures the verification logic is identical to production code—no risk of the test re-implementing rules incorrectly.
9. Clean CI/CD integration
Because the app and tests share hooks and types, every pull request can spin up the test runner, giving the team immediate signal on UI regressions.
The faster, flake-free suite encourages developers to rely on it, not bypass it.

---

## 🧪 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm

### Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/snaptrude-draw-rectangle-tests.git
cd snaptrude-draw-rectangle-tests
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Run tests:

```bash
npx playwright test rectangle.spec.ts
```

---

## 📞 Contact

**Niranjan Kumar**  
📧 niranjan.arkalgud@gmail.com  
