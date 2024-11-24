# Task API

A simple RESTful API for managing tasks. This API allows users to create, read, update, and delete tasks, with validation for task fields such as due date and title. The API also includes functionality to filter tasks by category.

## Features

-   **Create a Task**: Create tasks with a title, description, due date, and category.
-   **Get Tasks**: Retrieve all tasks or filter tasks by category.
-   **Update a Task**: Update the task's details such as title, description, and due date.
-   **Delete a Task**: Delete a task by its ID.

## Requirements

-   Node.js 
-   MongoDB 

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-api.git
cd todo-api
```

### 2. Clone the repository

```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root directory and add your MongoDB connection string. Example:
```bash
MONGO_URL=mongodb://localhost:27017/task_api
```

### 4. Start the application
```bash
npm start
```
This will start the API server on http://localhost:3000.

# API Endpoints
### **POST** `/api/tasks`
- Description: Create a new task.
- Required Fields: `title`, `dueDate` (optional), `description` (optional), `category` (optional).

---

### **GET** `/api/tasks`
- Description: Retrieve all tasks or filter tasks by category.
- Query Parameters: 
  - `category` (optional): Filter tasks by category (case-insensitive).

---

### **PATCH** `/api/tasks/:id`
- Description: Update an existing task by its ID.
- Required Fields: Any of the task properties to update (`title`, `description`, `dueDate`, `category`, `completed`).

---

### **DELETE** `/api/tasks/:id`
- Description: Delete a task by its ID.



