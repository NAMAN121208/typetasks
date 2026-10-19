import {
  type Task,
  type TaskStatus,
  addTask,
  completeTask,
  filterByStatus,
  advanceTask,
  deleteTask,
  countByStatus,
} from "./model.js";

// Type definition for UI filter state
type FilterState = "all" | TaskStatus;

// Initial state with sample tasks for first load
const STORAGE_KEY = "typetasks_items_v1";

const initialTasks: Task[] = [
  { id: 1, title: "Define TaskStatus union & Task interface", status: "done" },
  { id: 2, title: "Wire typed model to interactive UI", status: "in-progress" },
  { id: 3, title: "Deploy TypeTasks to GitHub Pages", status: "todo" },
];

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialTasks;
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is Task =>
          typeof item === "object" &&
          item !== null &&
          typeof item.id === "number" &&
          typeof item.title === "string" &&
          (item.status === "todo" ||
            item.status === "in-progress" ||
            item.status === "done")
      );
    }
  } catch {
    // fallback if JSON parsing fails
  }
  return initialTasks;
}

function saveTasks(tasksToSave: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
}

// In-memory typed state
let tasks: Task[] = loadTasks();
let activeFilter: FilterState = "all";

// Grab DOM elements with typed assertions (no untyped logic, zero `any`)
const taskForm = document.getElementById("task-form") as HTMLFormElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyState = document.getElementById("empty-state") as HTMLDivElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");

// Counter elements
const countAll = document.getElementById("count-all") as HTMLSpanElement;
const countTodo = document.getElementById("count-todo") as HTMLSpanElement;
const countInProgress = document.getElementById("count-in-progress") as HTMLSpanElement;
const countDone = document.getElementById("count-done") as HTMLSpanElement;

/**
 * Updates UI badge counters using typed model functions.
 */
function updateCounters(): void {
  countAll.textContent = String(tasks.length);
  countTodo.textContent = String(countByStatus(tasks, "todo"));
  countInProgress.textContent = String(countByStatus(tasks, "in-progress"));
  countDone.textContent = String(countByStatus(tasks, "done"));
}

/**
 * Renders the task list based on active filter.
 */
function render(): void {
  // Get filtered tasks using typed filterByStatus
  const visibleTasks: Task[] =
    activeFilter === "all"
      ? tasks
      : filterByStatus(tasks, activeFilter);

  // Clear current list items
  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  for (const task of visibleTasks) {
    const li = document.createElement("li");
    li.className = `task-card status-${task.status}`;

    // Task details container
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "task-details";

    const titleSpan = document.createElement("span");
    titleSpan.className = `task-title ${task.status === "done" ? "done" : ""}`;
    titleSpan.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `badge badge-${task.status}`;
    badge.textContent = task.status;

    detailsDiv.appendChild(titleSpan);
    detailsDiv.appendChild(badge);

    // Actions container
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    // Advance button (todo -> in-progress -> done)
    if (task.status !== "done") {
      const advanceBtn = document.createElement("button");
      advanceBtn.className = "btn btn-advance";
      advanceBtn.title = "Advance task status";
      advanceBtn.textContent = task.status === "todo" ? "Start ➔" : "Done ✓";
      advanceBtn.addEventListener("click", () => {
        tasks = advanceTask(tasks, task.id);
        saveTasks(tasks);
        updateCounters();
        render();
      });
      actionsDiv.appendChild(advanceBtn);
    }

    // Complete button (direct completeTask operation)
    if (task.status !== "done") {
      const completeBtn = document.createElement("button");
      completeBtn.className = "btn btn-complete";
      completeBtn.title = "Mark as Done";
      completeBtn.textContent = "Complete";
      completeBtn.addEventListener("click", () => {
        tasks = completeTask(tasks, task.id);
        saveTasks(tasks);
        updateCounters();
        render();
      });
      actionsDiv.appendChild(completeBtn);
    }

    // Delete button (typed custom operation)
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-delete";
    deleteBtn.title = "Delete task";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => {
      tasks = deleteTask(tasks, task.id);
      saveTasks(tasks);
      updateCounters();
      render();
    });
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(detailsDiv);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  }

  updateCounters();
}

/**
 * Handle Add Task form submission
 */
taskForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  // Use typed addTask operation
  tasks = addTask(tasks, title);
  saveTasks(tasks);
  taskInput.value = "";
  taskInput.focus();
  render();
});

/**
 * Handle Filter button clicks
 */
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterVal = btn.dataset.filter;
    if (
      filterVal === "all" ||
      filterVal === "todo" ||
      filterVal === "in-progress" ||
      filterVal === "done"
    ) {
      activeFilter = filterVal;
      render();
    }
  });
});

// Initial render on load
render();
