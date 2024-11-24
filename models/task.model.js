const mongoose = require("mongoose")

const task_schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Task title is required"],
		},
		description: {
			type: String,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		dueDate: {
			type: Date,
			validate: {
				validator: function (value) {
					if (value) {
						return new Date(value) >= new Date() // Due date must be in the future or present
					}
					return true
				},
				message:
					"Due date must be greater than or equal to the current date.",
			},
		},
		category: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Task = mongoose.model("Task", task_schema)

module.exports = Task
