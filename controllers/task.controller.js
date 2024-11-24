const Task = require("../models/task.model")

// create a task
exports.createTask = async (req, res) => {
	const { title, description, dueDate, category } = req.body

	if (!title) {
		return res.status(400).json({ error: "Task title is required." })
	}

	try {
		const newTask = new Task({
			title,
			description,
			category,
			dueDate: dueDate ? new Date(dueDate) : null, // Ensure the dueDate is converted to a Date object
		})

		// Save the task
		const savedTask = await newTask.save()
		res.status(201).json(savedTask)
	} catch (error) {
		res.status(500).json({ error: "Failed to create task." })
	}
}

// Get all tasks
exports.getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find()
		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch tasks." })
	}
}

// update tasks by id
exports.updateTask = async (req, res) => {
	const { id } = req.params
	const updates = req.body

	try {
		const task = await Task.findById(id)

		if (!task) {
			return res.status(404).json({ error: "Task not found." })
		}

		if (task.completed && updates.completed) {
			return res
				.status(400)
				.json({ error: "Task is already marked as completed." })
		}

		Object.assign(task, updates)
		await task.save()

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ error: "Failed to update task." })
	}
}

// Delete a task
exports.deleteTask = async (req, res) => {
	const { id } = req.params

	try {
		const task = await Task.findByIdAndDelete(id)

		if (!task) {
			return res.status(404).json({ error: "Task not found." })
		}

		res.status(200).json({ message: "Task deleted successfully." })
	} catch (error) {
		res.status(500).json({ error: "Failed to delete task." })
	}
}

// Get tasks by category
exports.getTasksByCategory = async (req, res) => {
	const { category } = req.params

	if (!category) {
		return res.status(400).json({ error: "Category is required." })
	}

	try {
		// Perform a case-insensitive search using a regular expression
		const tasks = await Task.find({
			category: { $regex: new RegExp(`^${category}$`, "i") },
		})

		if (tasks.length === 0) {
			return res
				.status(404)
				.json({ message: "No tasks found for this category." })
		}

		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch tasks by category." })
	}
}
