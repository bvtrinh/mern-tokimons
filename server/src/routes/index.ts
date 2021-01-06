import { Express } from "express";
import TokiRoutes from "./Tokimon";
import UserRoutes from "./User";

const indexRouter = (app: Express) => {
  app.use("/t", TokiRoutes);
  app.use("/u", UserRoutes);
};

export default indexRouter;
