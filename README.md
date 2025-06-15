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

- **DOM Insight**: Access to internal component structure and canvas DOM IDs/classes allows more accurate and stable selectors.
- **State Exposure**: Developers can expose internal state for verification (e.g., rectangle dimensions or coordinates via a test hook).
- **Better Synchronization**: Events and UI states (like tool readiness) can be hooked directly rather than relying on timing or visual delays.
- **Mocking & Isolation**: Ability to mock services or isolate canvas logic during tests ensures deterministic outcomes.

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
