import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import router from './router/index.js'
import errorMiddleware from "./middlewares/error.middleware.js";
dotenv.config()

const PORT = process.env.PORT || 8087
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: process.env.APP_URL
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URL)
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()