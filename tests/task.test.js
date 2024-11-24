const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../server")
const Task = require("../models/task.model")
const connectDB = require("../db")

const MONGO_TEST_URL = "mongodb://localhost:27017/task_api_test"

beforeAll(async () => {
	await connectDB(MONGO_TEST_URL)
})

beforeEach(async () => {
	await Task.deleteMany() // Clear the database before each test
})

afterAll(async () => {
	await mongoose.connection.close() // Close the database connection
})

describe("Task API Unit Tests", () => {
	describe("POST /api/tasks", () => {
		it("should create a task with valid data", async () => {
			const taskData = {
				title: "Valid Task",
				description: "This is a valid task",
				dueDate: new Date(Date.now() + 86400000),
				category: "Work",
			}

			const response = await request(app)
				.post("/api/tasks")
				.send(taskData)
			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty("_id")
			expect(response.body.title).toBe(taskData.title)
		})

		it("should not create a task with a past due date", async () => {
			const taskData = {
				title: "Test Task",
				description: "This task has a past due date",
				dueDate: new Date("2020-01-01"),
			}

			const response = await request(app)
				.post("/api/tasks")
				.send(taskData)

			expect(response.status).toBe(400)
			expect(response.body.message).toBe(
				"Due date must be greater than or equal to the current date."
			)
		})

		it("should not create a task with an empty title", async () => {
			const taskData = {
				description: "This task has no title",
				dueDate: new Date(),
			}

			const response = await request(app)
				.post("/api/tasks")
				.send(taskData)

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Task title is required")
		})
	})

	describe("GET /api/tasks", () => {
		it("should fetch all tasks", async () => {
			await Task.create([
				{
					title: "Task 1",
					description: "Description 1",
					dueDate: new Date(Date.now() + 86400000),
					category: "Work",
				},
				{
					title: "Task 2",
					description: "Description 2",
					dueDate: new Date(Date.now() + 86400000),
					category: "Personal",
				},
			])

			const response = await request(app).get("/api/tasks")
			expect(response.status).toBe(200)
			expect(response.body).toHaveLength(2)
		})

		it("should fetch tasks by category (case insensitive)", async () => {
			await Task.create([
				{
					title: "Task A",
					description: "Description A",
					dueDate: new Date(Date.now() + 86400000),
					category: "Work",
				},
				{
					title: "Task B",
					description: "Description B",
					dueDate: new Date(Date.now() + 86400000),
					category: "Personal",
				},
			])

			const response = await request(app).get("/api/tasks?category=work")
			expect(response.status).toBe(200)
			expect(response.body).toHaveLength(1)
			expect(response.body[0].category).toBe("Work")
		})
	})

	describe("PATCH /api/tasks/:id", () => {
		it("should update a task with valid data", async () => {
			const task = await Task.create({
				title: "Old Task",
				description: "Old Description",
				dueDate: new Date(Date.now() + 86400000),
				category: "Work",
			})

			const updatedData = {
				title: "Updated Task",
				description: "Updated Description",
			}

			const response = await request(app)
				.patch(`/api/tasks/${task._id}`)
				.send(updatedData)
			expect(response.status).toBe(200)
			expect(response.body.title).toBe(updatedData.title)
			expect(response.body.description).toBe(updatedData.description)
		})

		it("should return 404 when updating a non-existent task", async () => {
			const invalidId = mongoose.Types.ObjectId()
			const response = await request(app)
				.patch(`/api/tasks/${invalidId}`)
				.send({ title: "Updated Task" })
			expect(response.status).toBe(404)
			expect(response.body.message).toBe("Task not found")
		})
	})

	describe("DELETE /api/tasks/:id", () => {
		it("should delete a task successfully", async () => {
			const task = await Task.create({
				title: "Task to Delete",
				description: "Will be deleted",
				dueDate: new Date(Date.now() + 86400000),
				category: "Work",
			})

			const response = await request(app).delete(`/api/tasks/${task._id}`)
			expect(response.status).toBe(200)
			expect(response.body.message).toBe("Task deleted successfully.")
		})

		it("should return 404 when deleting a non-existent task", async () => {
			const invalidId = mongoose.Types.ObjectId()
			const response = await request(app).delete(
				`/api/tasks/${invalidId}`
			)
			expect(response.status).toBe(404)
			expect(response.body.message).toBe("Task not found")
		})
	})
})
