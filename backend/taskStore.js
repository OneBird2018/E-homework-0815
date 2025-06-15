// 任务数据存储在内存中，实际生产可用数据库替代
let tasks = [
  // 示例结构
  // { id: 1, title: '任务1', subtasks: [ { id: 1, title: '子任务1' } ] }
];
let lastSaved = null;

function getNextId(arr) {
  return arr.length ? Math.max(...arr.map(t => t.id)) + 1 : 1;
}

export function getTasks() {
  return tasks;
}

export function addTask(title) {
  const newTask = { id: getNextId(tasks), title, subtasks: [] };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id, title) {
  const task = tasks.find(t => t.id === id);
  if (task) task.title = title;
  return task;
}

export function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
}

export function addSubtask(taskId, title) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return null;
  const newSub = { id: getNextId(task.subtasks), title };
  task.subtasks.push(newSub);
  return newSub;
}

export function updateSubtask(taskId, subId, title) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return null;
  const sub = task.subtasks.find(s => s.id === subId);
  if (sub) sub.title = title;
  return sub;
}

export function deleteSubtask(taskId, subId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  task.subtasks = task.subtasks.filter(s => s.id !== subId);
}

export function getLastSaved() {
  return lastSaved;
}

export function saveTasks() {
  lastSaved = new Date().toISOString();
}
