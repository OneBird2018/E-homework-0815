import express from 'express';
import {
  getTasks, addTask, updateTask, deleteTask,
  addSubtask, updateSubtask, deleteSubtask,
  getLastSaved, saveTasks
} from './taskStore.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// 允许跨域，解决前端无法获取任务的问题
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('后端已启动！');
});

// 获取所有任务
app.get('/api/tasks', (req, res) => {
  // 只返回任务和子任务的只读视图
  const tasks = getTasks().map(task => ({
    id: task.id,
    title: task.title,
    subtasks: task.subtasks.map(sub => ({ id: sub.id, title: sub.title }))
  }));
  res.json(tasks);
});
// 新增任务
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: '任务标题不能为空' });
  res.json(addTask(title));
});
// 修改任务
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const task = updateTask(id, title);
  if (!task) return res.status(404).json({ error: '任务不存在' });
  res.json(task);
});
// 删除任务
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  deleteTask(id);
  res.json({ success: true });
});
// 新增子任务
app.post('/api/tasks/:id/subtasks', (req, res) => {
  const taskId = Number(req.params.id);
  const { title } = req.body;
  const sub = addSubtask(taskId, title);
  if (!sub) return res.status(404).json({ error: '任务不存在' });
  res.json(sub);
});
// 修改子任务
app.put('/api/tasks/:id/subtasks/:subId', (req, res) => {
  const taskId = Number(req.params.id);
  const subId = Number(req.params.subId);
  const { title } = req.body;
  const sub = updateSubtask(taskId, subId, title);
  if (!sub) return res.status(404).json({ error: '子任务不存在' });
  res.json(sub);
});
// 删除子任务
app.delete('/api/tasks/:id/subtasks/:subId', (req, res) => {
  const taskId = Number(req.params.id);
  const subId = Number(req.params.subId);
  deleteSubtask(taskId, subId);
  res.json({ success: true });
});

// 保存任务并记录时间
app.post('/api/save', (req, res) => {
  saveTasks();
  res.json({ success: true, lastSaved: getLastSaved() });
});
// 获取最后保存时间
app.get('/api/lastSaved', (req, res) => {
  res.json({ lastSaved: getLastSaved() });
});

// 静态托管 HOMEwork 目录（即 index.html 所在目录）
app.use(express.static(path.resolve(__dirname, '..', 'HOMEwork')));

// 静态托管后台管理页面
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(port, () => {
  console.log(`服务器已启动，端口：${port}`);
});
