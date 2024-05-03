"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const user_router_1 = require("./user-router");
const api_paths_1 = require("../lib/api-paths");
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.get("/", (req, res) => {
    return res.json({
        message: "Welcome to the API",
    });
});
apiRouter.use(api_paths_1.apiPaths.users(), user_router_1.userRouter);
