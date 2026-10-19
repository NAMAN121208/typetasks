/**
 * TypeTasks - Part 1: Typed Data Model
 * A type-safe task tracker data model and operations.
 */
/**
 * Adds a new task with a unique id and a default status of "todo".
 * Returns a new array without mutating the original tasks array.
 */
export function addTask(tasks, title) {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
        id: nextId,
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}
/**
 * Marks the task with the matching id as "done".
 * Returns a new array with the updated task.
 */
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
/**
 * Filters tasks by their status.
 * Accepts only valid TaskStatus literal values.
 */
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// --- Make It Yours: Extra Typed Operations ---
/**
 * Removes a task by its id.
 * Returns a new array without the specified task.
 */
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
/**
 * Advances a task's status sequentially: "todo" -> "in-progress" -> "done".
 * If already "done", the status remains "done".
 */
export function advanceTask(tasks, id) {
    const nextStatusMap = {
        todo: "in-progress",
        "in-progress": "done",
        done: "done",
    };
    return tasks.map((task) => task.id === id ? { ...task, status: nextStatusMap[task.status] } : task);
}
/**
 * Counts how many tasks currently have the given status.
 */
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
/*
 * ============================================================================
 * Type Verification & Proof of Type Safety
 * ============================================================================
 * The following commented-out code snippets demonstrate that invalid assignments
 * and invocations are caught at compile time by TypeScript:
 *
 * 1. Missing property 'status':
 *    // @ts-expect-error
 *    const invalidTaskMissingStatus: Task = { id: 1, title: "Incomplete" };
 *    // Compile Error: Property 'status' is missing in type '{ id: number; title: string; }'
 *    // but required in type 'Task'.
 *
 * 2. Invalid id type (string instead of number):
 *    // @ts-expect-error
 *    const invalidTaskId: Task = { id: "3", title: "Invalid ID", status: "todo" };
 *    // Compile Error: Type 'string' is not assignable to type 'number'.
 *
 * 3. Invalid status string in filterByStatus:
 *    // @ts-expect-error
 *    filterByStatus([], "finished");
 *    // Compile Error: Argument of type '"finished"' is not assignable to parameter
 *    // of type 'TaskStatus'.
 * ============================================================================
 */
//# sourceMappingURL=model.js.map