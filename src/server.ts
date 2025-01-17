import express  from "express";
import authRouter from "./routes/authRouter";
import 'dotenv/config'
import { connectDb } from "./config/db";

connectDb()
const app = express()
app.use(express.json())

app.use('/auth', authRouter)


export default app