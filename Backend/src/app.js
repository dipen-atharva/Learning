import express from "express";
import cors from "cors";
const app = express();

//middleware declearation
app.use(express.json());
app.use(cors());

//routes import
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

//routes declearation
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

export default app;
