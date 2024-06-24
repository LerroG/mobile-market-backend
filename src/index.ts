import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoute from './routes/auth'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 4200
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ylhyzwz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
		)

		app.listen(PORT, () => {
			console.log(`Running on PORT ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
