// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import * as expressSession from "express-session";
const session = expressSession.default || expressSession;
import MySQLStore from "express-mysql-session";

import sequelize from './config/db';
import router from "./routes/router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

const MySQLStoreClass = MySQLStore(expressSession);
const sessionStore = new MySQLStoreClass({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'session_db',
});

app.use(session({
  name: "PHPSESSID", // Match PHP session cookie name
  secret: process.env.SESSION_SECRET || "fallback-secret",
  resave: false,
  saveUninitialized: false,
  store: sessionStore, // Use MySQLStore for session storage
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 86400000
  }
}));

app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  // console.log('Session Store:', req.sessionStore);
  // console.log('Cookies', req.cookies);
  // console.log('Session Cookies', req.session.cookie);
  next();
});

app.use("/auth", router);

app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  // console.log('Session Store:', req.sessionStore);
  // console.log('Cookies', req.cookies);
  // console.log('Session Cookies', req.session.cookie);
  next();
});

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