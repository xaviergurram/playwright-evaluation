# Playwright Evaluation

## Project Overview

This repository contains two separate Playwright assignments demonstrating end-to-end and API testing using TypeScript.

- `assignment1/`: UI automation for the OrangeHRM demo application.
- `assignment2/`: API and web integration testing for the Restful Booker demo service.

## Assignment 1 — OrangeHRM UI Tests

### What it covers

- Login functionality and validation.
- Employee search using autocomplete.
- Page Object Model with reusable page classes.

### Key files

- `assignment1/playwright.config.ts` — Playwright configuration for Chromium, Firefox, and WebKit.
- `assignment1/tests/login.spec.ts` — Login success and failure scenarios.
- `assignment1/tests/employee.spec.ts` — Employee search using autocomplete and results collection.
- `assignment1/pages/LoginPage.ts` — Login page abstractions.
- `assignment1/pages/DashboardPage.ts` — Dashboard interactions.
- `assignment1/pages/EmployeeListPage.ts` — Employee search and result handling.

### Test details

- Base URL: `https://opensource-demo.orangehrmlive.com`
- Reporter: HTML report.
- Screenshot and trace collection on test failure.

### Available scripts

From `assignment1/`:

- `npm test` — run all tests.
- `npm run regression` — run all regression tests.
- `npm run smoke` — run smoke tests tagged with `@smoke`.
- `npm run report` — display the generated HTML report.

## Assignment 2 — Restful Booker API + Web Tests

### What it covers

- Booking creation via API.
- Booking retrieval and assertion of returned data.
- Web page loading with authentication token injected into localStorage.

### Key files

- `assignment2/playwright.config.ts` — Playwright configuration with API and browser projects.
- `assignment2/tests/booking.spec.ts` — Booking creation, retrieval, and authenticated page load.
- `assignment2/tests/api-utils/ApiUtils.ts` — Reusable API helpers for authentication and booking creation.

### Test details

- API base: `https://restful-booker.herokuapp.com`
- Auth credentials: `admin` / `password123`
- Tests run in serial order due to shared booking state.

### Available scripts

From `assignment2/`:

- `npm run regression` — run the assignment test suite.

## How to Run

1. Install dependencies for each assignment:

```bash
cd assignment1
npm install
cd ../assignment2
npm install
```

2. Run Assignment 1 tests:

```bash
cd assignment1
npm test
```

3. Run Assignment 2 tests:

```bash
cd assignment2
npm run regression
```

4. View HTML reports:

```bash
cd assignment1
npm run report
```

## Notes

- Both assignments use Playwright v1.60.0 and TypeScript.
- `assignment1` uses page object abstractions for maintainability.
- `assignment2` demonstrates API test setup with reusable helper utilities and web flow validation.
- Reports and traces are generated under each assignment's `playwright-report/` and `test-results/` directories.
