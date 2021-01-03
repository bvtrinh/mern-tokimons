import express, {
  Request,
  Response,
  NextFunction,
  json,
  urlencoded,
} from "express";
import session from "express-session";
import { resolve } from "path";
import { config } from "dotenv";
import { join } from "path";
import { connect } from "./models/db";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
const MongoStore = connectMongo(session);

// Dotenv config
config({ path: resolve(__dirname, "../.env") });
const port = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use(express.static(join(__dirname, "public")));
app.use(urlencoded({ extended: true }));

// Connect to DB
connect();

// Sessions
app.use(
  session({
    // expire after 1 day
    // maxAge: (24 * 60 * 60 * 1000) as number,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: process.env.SESSION_SECRET as string,
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
