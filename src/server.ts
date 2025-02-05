import express  from "express";
import authRouter from "./routes/authRouter";
import 'dotenv/config'
import { connectDb } from "./config/db";
import { corsConfig } from "./config/cors";
import cors from "cors"
import { limiter } from "./config/limiters";
import { limitPayloadSize } from "./config/limitPayload";
import { error_cors_json } from "./middleware/error_cors_json";

connectDb()
const app = express()

app.use(cors(corsConfig))
app.use(error_cors_json)

app.use(limiter)
app.use(limitPayloadSize)
app.use(express.json())
app.use(error_cors_json)

app.use('/auth', authRouter)


export default app