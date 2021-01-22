import { Express } from "express";
import TokiRoutes from "./Tokimon";
import UserRoutes from "./User";

const indexRouter = (app: Express) => {
  app.use("/api/t", TokiRoutes);
  app.use("/api/u", UserRoutes);
};

export default indexRouter;
