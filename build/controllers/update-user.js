"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const User_1 = require("../models/User");
const api_response_1 = require("../lib/api-response");
const update_user_schema_1 = require("../zod-schemas/update-user-schema");
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateUserData = req.body;
            // Validate the input
            const validationResult = update_user_schema_1.UpdateUserSchema.safeParse(updateUserData);
            // if validaion fails
            if (!validationResult.success) {
                console.log("[UPDATE_USER]", validationResult.error.flatten().formErrors.join(", "));
                return res
                    .status(400)
                    .json((0, api_response_1.apiResponse)(400, validationResult.error.flatten().formErrors.join(", ")));
            }
            const { id, name } = validationResult.data;
            // finding the user with id
            const existingUser = yield User_1.User.findById(updateUserData.id);
            // if user not found
            if (!existingUser) {
                return res.status(404).json((0, api_response_1.apiResponse)(404, "User not found"));
            }
            // updating the user
            const updatedUser = yield User_1.User.findByIdAndUpdate(id, { name }, {
                new: true,
            });
            // return the users
            return res
                .status(200)
                .json((0, api_response_1.apiResponse)(200, "User Updated", { user: updatedUser }));
        }
        catch (error) {
            console.log("[UPDATE_USER]", error);
            return res.status(500).json((0, api_response_1.apiResponse)(500, "Internal Server Error"));
        }
    });
}
exports.updateUser = updateUser;
