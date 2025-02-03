import express  from "express";
import authRouter from "./routes/authRouter";
import 'dotenv/config'
import { connectDb } from "./config/db";
import { corsConfig } from "./config/cors";
import cors from "cors"

connectDb()
const app = express()
app.use(cors(corsConfig));
app.use(express.json())

app.use('/auth', authRouter)


export default app