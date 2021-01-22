import { Express, RequestHandler } from "express";
import { join } from "path";
import TokiRoutes from "./Tokimon";
import UserRoutes from "./User";

const indexHandler: RequestHandler = async (req, res) => {
  res.sendFile(join(__dirname, "../../../client/build/index.html"));
};

const indexRouter = (app: Express) => {
  app.use("/api/t", TokiRoutes);
  app.use("/api/u", UserRoutes);
  app.get("/", indexHandler);
};

export default indexRouter;
