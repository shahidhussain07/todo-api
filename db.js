const mongoose = require("mongoose")

const connectDB = async (MONGO_URL) => {
	try {
		// Attempt to connect to MongoDB
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log("Connected to MongoDB Server")

		mongoose.connection.on("connected", () => {
			console.log("MongoDB connection established successfully")
		})
		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB Server disconnected")
		})
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err)
		})
	} catch (error) {
		console.error("Connection Error:", error)
	}
}

module.exports = connectDB
