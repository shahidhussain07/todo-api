const express = require("express")
const router = express.Router()
const {
	createTask,
	getAllTasks,
	updateTask,
	deleteTask,
	getTasksByCategory,
} = require("../controllers/task.controller")

// creating a task
router.post("/tasks", createTask)

// get all tasks
router.get("/tasks", getAllTasks)

// Update a task
router.put("/tasks/:id", updateTask)

// Delete a task
router.delete("/tasks/:id", deleteTask)

// Get tasks by category
router.get("/tasks/category/:category", getTasksByCategory)

module.exports = router
