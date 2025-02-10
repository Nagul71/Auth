import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js"
import connectdb from "./DB/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log(`server connected at ${PORT}`);
    connectdb();

})


