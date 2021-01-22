import express, { json, urlencoded } from "express";
import { resolve } from "path";
import { join } from "path";
import { connect } from "./models/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import Routes from "./routes";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line
  require("dotenv").config({ path: resolve(__dirname, "../.env") });
}

const port = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(cors());

// Import in routes
Routes(app);

// Connect to DB
connect();

app.listen(port, () => console.log(`Server started on port ${port}`));
