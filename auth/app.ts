import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/db';
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import router from "./routes/router";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "fallback-secret",
  resave: false,
  saveUninitialized: true
}));
app.use("/auth", router);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;