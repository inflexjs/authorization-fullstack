import dotenv from 'dotenv'
import https from 'https'
import * as fs from "fs";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import router from './router/index.js'
import errorMiddleware from "./middlewares/error.middleware.js";
dotenv.config()

const PORT = process.env.PORT || 8087
const app = express()

const options = {
	cert: fs.readFileSync('./sslcert/fullchain.pem'),
	key: fs.readFileSync('./sslcert/privkey.pem')
};

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URL)
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
		https.createServer(options, app).listen(8443)
	} catch (e) {
		console.log(e)
	}
}

start()