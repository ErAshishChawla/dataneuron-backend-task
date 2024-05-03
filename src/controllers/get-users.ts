import { Request, Response } from "express";

import { User } from "../models/User";

import { apiResponse } from "../lib/api-response";

export async function getUsers(req: Request, res: Response) {
  try {
    // Get all users from the database
    const allUsers = await User.find();

    // return the users
    return res.status(200).json(
      apiResponse(200, "Success", {
        users: allUsers,
      })
    );
  } catch (error) {
    console.log("[GET_USERS]", error);
    return res.status(500).json(apiResponse(500, "Internal Server Error"));
  }
}
