import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js"
import connectdb from "./DB/connectDB.js";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));


const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}))
app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log(`server connected at ${PORT}`);
    connectdb();

})


