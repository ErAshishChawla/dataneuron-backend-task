import { Router } from "express";

import { userRouter } from "./user-router";

import { apiPaths } from "../lib/api-paths";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the API",
  });
});

apiRouter.use(apiPaths.users(), userRouter);

export { apiRouter };
