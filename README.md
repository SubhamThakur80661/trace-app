# Trace — local log viewer

A small React + Vite demo of a log viewer for local development. Logs stream in
real time, with level filters, text search, and pause/resume.

## Run it

```bash
npm install
npm run dev
```

## What it does

- Live log stream (sample data, generated in the browser)
- Filter by level: INFO, WARN, ERROR, DEBUG, with per-level counts
- Search by service or message text
- Pause and resume the stream, clear the buffer
- Error and warning counts for the lines in the buffer

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, GSAP, Framer Motion, lucide-react.

Live demo: https://trace-app-hydra-hamerins-projects.vercel.app
