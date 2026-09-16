# Machine Coding Questions

A collection of **interview-style React challenges** — each implemented as a standalone mini-app and wired together with React Router. Great for practice or as reference solutions.

**[→ Live Demo](https://machine-coding-question.netlify.app/)**

---

## Challenges

| Route                | Description                            |
| -------------------- | -------------------------------------- |
| `/color-explorer`    | Browse and search named CSS colors     |
| `/authentication`    | Login/register flows with user context |
| `/contact-form`      | Form UI with validation                |
| `/copy-to-clipboard` | Clipboard copy interaction             |

---

## Tech Stack

- **React** · **TypeScript** · **Vite** · **Tailwind CSS v4** · **React Router**

---

## Project Structure

```
src/
├── main.tsx          # Router setup + DATA routes
├── App.tsx           # Home page (grid of feature cards)
├── helper.tsx        # Route config (DATA), getTitle(), shared utilities
├── components/       # Layout, FeatureCard
└── modules/          # One folder per challenge (ColorExplorer, Authentication, etc.)
```

Add a route to `DATA` in `helper.tsx` — it becomes a real route and automatically appears on the home grid.

---

## Quick Start

```bash
bun install && bun dev
```

Open `http://localhost:5173`.

```bash
bun build   # Production build → dist/
bun lint    # ESLint check
```
