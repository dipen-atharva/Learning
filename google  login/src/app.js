import express from "express";
import session, { Cookie } from "express-session";
import passport from "./utils/passportConfig.js";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import cors from "cors";
dotenv.config({ path: "./.env" });

const app = express();

// use middleware
app.use(express.json({ limit: "16kb" }));
app.use(cors());

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 10000,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// import router
import userRouter from "./router/user.routes.js";
import authRouter from "./router/auth.routes.js";

// use router
app.use("/api/v1/user", userRouter);
app.use("/auth", authRouter);

export { app };
