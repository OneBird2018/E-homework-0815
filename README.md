一个基于 Express 后端的简约黑色风格作业任务清单 Web 应用，支持任务与子任务的增删改查，适合班级作业管理。

## 功能特性

- 任务与子任务的增删改查
- 实时显示最后保存时间
- 响应式设计，适配手机与桌面
- 动画启动页
- 简洁美观的黑色主题

## 快速开始

### 1. 克隆项目

```sh
git clone https://github.com/OneBird2018/E-homework-0815
cd HOMEwork
```

### 2. 安装依赖

请确保你已安装 [Node.js](https://nodejs.org/)。

```sh
npm install
```

### 3. 启动后端服务

后端需有 Express 服务，监听 `http://localhost:3000`，并实现如下 API：

- `GET /api/tasks` 获取所有任务
- `POST /api/tasks` 新建任务
- `PUT /api/tasks/:id` 修改任务
- `DELETE /api/tasks/:id` 删除任务
- `POST /api/tasks/:id/subtasks` 新建子任务
- `PUT /api/tasks/:id/subtasks/:subId` 修改子任务
- `DELETE /api/tasks/:id/subtasks/:subId` 删除子任务
- `GET /api/lastSaved` 获取最后保存时间

（可根据实际后端实现调整）

### 4. 启动前端页面

直接用浏览器打开 [index.html](D:/OneDrive/桌面/HOMEwork/index.html)。

> 注意：请确保后端服务已启动且允许跨域访问。

## 文件结构

- [index.html](D:/OneDrive/桌面/HOMEwork/index.html)：前端页面
- `media_result_20250615_58a4229b-b358-478d-8ca4-b7c69fdee401.png`：校徽图片

## 联系与支持

- [联系我们](https://yunyeblog.asia/)
- [免责声明](https://yunyeblog.asia/)
