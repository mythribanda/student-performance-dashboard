# Student Performance Dashboard

A dependency-free, static dashboard that fetches public Google Sheet data once on page load and calculates per-subject high and low scorers in the browser.

## Structure

- `index.html` — accessible page shell
- `css/styles.css` — responsive, mobile-first styling
- `js/config.js` — sheet settings and allowed subjects
- `js/sheetService.js` — fetches/parses quoted CSV and maps headers to objects
- `js/stats.js` — pure high/low scorer functions
- `js/ui.js` — dropdown, state, and result rendering
- `js/main.js` — application wiring and in-memory data lifecycle
- `tests.html` — small browser-based assertions for normal values, ties, blanks, and invalid marks

## Run locally

Serve this directory with any static server (for example, `npx serve .`) and visit the reported URL. ES modules do not run reliably from a `file://` URL.

## Deploy

This folder can be deployed unchanged on GitHub Pages, Netlify, or Vercel. For GitHub Pages: push it to a public repository, then in **Settings → Pages**, select **Deploy from a branch**, choose the branch and `/ (root)`, and save.

## Assumptions

The sheet remains publicly readable and retains headers named `Student Name` and the five configured subject labels. Header names, rather than fixed column positions, map data to subjects. Blank rows, unnamed students, and empty/non-numeric marks for the selected subject are ignored. Equal marks are shown as ties.
