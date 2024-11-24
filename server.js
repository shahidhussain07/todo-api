const express = require("express")
const app = express()
const taskRoutes = require("./routes/task.route")
const connectDB = require("./db")
const bodyParser = require("body-parser")
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL

app.use(bodyParser.json())

// use routes
app.use("/api", taskRoutes)

// Start the server (only when not in a test environment)
if (process.env.NODE_ENV !== "test") {
	const startServer = async () => {
		try {
			await connectDB(MONGO_URL)
			app.listen(3000, () => {
				console.log(`Server running on port 3000`)
			})
		} catch (error) {
			console.error("Failed to start the server:", error)
		}
	}

	startServer()
}

module.exports = app
