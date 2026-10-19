# TypeTasks - Part 1: Typed Data Model

A type-safe task tracker data model built in TypeScript.

## Overview

TypeTasks defines a strict, type-safe data model and pure functional operations for managing tasks without runtime errors or invalid states.

### Data Model

- **`TaskStatus`**: A literal union representing all valid task states:
  ```typescript
  type TaskStatus = "todo" | "in-progress" | "done";
  ```
- **`Task`**: The core task interface:
  ```typescript
  interface Task {
    id: number;
    title: string;
    status: TaskStatus;
  }
  ```

### Core Operations

- **`addTask(tasks: Task[], title: string): Task[]`**
  Returns a new array with a new task appended, having an auto-incremented unique ID and initial status `"todo"`.
- **`completeTask(tasks: Task[], id: number): Task[]`**
  Returns a new array where the task matching `id` has its status updated to `"done"`.
- **`filterByStatus(tasks: Task[], status: TaskStatus): Task[]`**
  Returns tasks filtered strictly by `TaskStatus`. Passing any arbitrary string (e.g., `"finished"`) produces a compile-time type error.

### Custom Operations (Make It Yours)

- **`deleteTask(tasks: Task[], id: number): Task[]`**
  Returns a new array removing the task matching `id`.
- **`advanceTask(tasks: Task[], id: number): Task[]`**
  Sequentially transitions a task: `"todo"` → `"in-progress"` → `"done"`.
- **`countByStatus(tasks: Task[], status: TaskStatus): number`**
  Returns the count of tasks matching a given status.

## Verification & Type Checks

To compile the TypeScript project and verify zero type errors:

```bash
npm run build
```

Or run the type checker directly:

```bash
npx tsc --noEmit
```
