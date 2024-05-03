import { Request, Response } from "express";

import { User } from "../models/User";

import { apiResponse } from "../lib/api-response";

import {
  UpdateUserInput,
  UpdateUserSchema,
} from "../zod-schemas/update-user-schema";

interface UpdateUserRequest extends Request {
  body: UpdateUserInput;
}

export async function updateUser(req: UpdateUserRequest, res: Response) {
  try {
    const updateUserData = req.body;

    // Validate the input
    const validationResult = UpdateUserSchema.safeParse(updateUserData);

    // if validaion fails
    if (!validationResult.success) {
      console.log(
        "[UPDATE_USER]",
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

    const { id, name } = validationResult.data;

    // finding the user with id
    const existingUser = await User.findById(updateUserData.id);

    // if user not found
    if (!existingUser) {
      return res.status(404).json(apiResponse(404, "User not found"));
    }

    // updating the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );

    // return the users
    return res
      .status(200)
      .json(apiResponse(200, "User Updated", { user: updatedUser }));
  } catch (error) {
    console.log("[UPDATE_USER]", error);
    return res.status(500).json(apiResponse(500, "Internal Server Error"));
  }
}
