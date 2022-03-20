import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

// Configuration CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        console.log(origin)
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS error"));
        }
    }
}

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});