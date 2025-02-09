import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.routes.js"
import connectdb from "./DB/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log(`server connected at ${PORT}`);
    connectdb();

})


