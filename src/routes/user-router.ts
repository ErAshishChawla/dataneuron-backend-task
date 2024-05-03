import { Router } from "express";

import { getUsers } from "../controllers/get-users";
import { addUser } from "../controllers/add-user";
import { updateUser } from "../controllers/update-user";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.put("/", addUser);
userRouter.patch("/", updateUser);

export { userRouter };
