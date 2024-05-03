import { Request, Response } from "express";

import { User } from "../models/User";

import { apiResponse } from "../lib/api-response";

import { AddUserInput, AddUserSchema } from "../zod-schemas/add-user-schema";

interface AddUserRequest extends Request {
  body: AddUserInput;
}

export async function addUser(req: AddUserRequest, res: Response) {
  try {
    const addUserData = req.body;

    // Validate the input
    const validationResult = AddUserSchema.safeParse(addUserData);

    // if validaion fails
    if (!validationResult.success) {
      console.log(
        "[ADD_USER]",
        validationResult.error.flatten().formErrors.join(", ")
      );
      return res
        .status(400)
        .json(
          apiResponse(
            400,
            validationResult.error.flatten().formErrors.join(", ")
          )
        );
    }

    const { name } = validationResult.data;

    // Create a new user
    const newUser = await User.create({ name });

    // return the users
    return res
      .status(201)
      .json(apiResponse(201, "User Created", { user: newUser }));
  } catch (error) {
    console.log("[ADD_USER]", error);
    return res.status(500).json(apiResponse(500, "Internal Server Error"));
  }
}
