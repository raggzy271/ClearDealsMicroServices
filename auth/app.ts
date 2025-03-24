import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(session({ secret: "your-secret-key", resave: false, saveUninitialized: true }));

app.use("/api/auth", authRoutes);

export default app;
