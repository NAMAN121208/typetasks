# TypeTasks Pro — Type-Safe Task Tracker

A small, type-safe task tracker built with HTML, CSS, and TypeScript.

- **Live Application:** [https://naman121208.github.io/typetasks/](https://naman121208.github.io/typetasks/)
- **Repository:** [https://github.com/NAMAN121208/typetasks](https://github.com/NAMAN121208/typetasks)

---

## Overview

TypeTasks is built in two layers:
1. **Typed Logic Layer (`model.ts`)**: Defines the `TaskStatus` union, `Task` interface, and pure functional state operations (`addTask`, `completeTask`, `filterByStatus`, `advanceTask`, `deleteTask`, `countByStatus`).
2. **Interactive UI Layer (`app.ts`, `index.html`, `styles.css`)**: Connects DOM events directly to the typed model with zero `any` types and complete type safety.

---

## Features

- **Strict Type Safety**: Task status can only ever be `"todo" | "in-progress" | "done"`.
- **Pure State Operations**:
  - `addTask(tasks, title)`: Appends a newly created task with unique ID and `"todo"` status.
  - `completeTask(tasks, id)`: Sets a task's status to `"done"`.
  - `advanceTask(tasks, id)`: Sequentially moves a task from `"todo"` → `"in-progress"` → `"done"`.
  - `filterByStatus(tasks, status)`: Pure filter strictly accepting only valid `TaskStatus` literals.
  - `deleteTask(tasks, id)`: Removes a task by ID.
  - `countByStatus(tasks, status)`: Returns the live count for each status.
- **Modern Responsive Design**: Custom dark-mode UI with live counter badges, smooth card animations, and responsive mobile layouts.
- **Local Persistence**: Saves state to `localStorage` while guaranteeing valid types on restore.

---

## Building and Compiling

Ensure zero compile errors with TypeScript:

```bash
# Compile TypeScript to JavaScript
npm run build

# Run type check only
npm run typecheck
```
