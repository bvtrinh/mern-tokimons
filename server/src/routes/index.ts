import { Express } from "express";
import TokiRoutes from "./Tokimon";
const indexRouter = (app: Express) => {
  app.use("/t", TokiRoutes);
};

export default indexRouter;
