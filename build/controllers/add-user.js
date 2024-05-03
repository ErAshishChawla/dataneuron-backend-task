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
exports.addUser = void 0;
const User_1 = require("../models/User");
const api_response_1 = require("../lib/api-response");
const add_user_schema_1 = require("../zod-schemas/add-user-schema");
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const addUserData = req.body;
            // Validate the input
            const validationResult = add_user_schema_1.AddUserSchema.safeParse(addUserData);
            // if validaion fails
            if (!validationResult.success) {
                console.log("[ADD_USER]", validationResult.error.flatten().formErrors.join(", "));
                return res
                    .status(400)
                    .json((0, api_response_1.apiResponse)(400, validationResult.error.flatten().formErrors.join(", ")));
            }
            const { name } = validationResult.data;
            // Create a new user
            const newUser = yield User_1.User.create({ name });
            // return the users
            return res
                .status(201)
                .json((0, api_response_1.apiResponse)(201, "User Created", { user: newUser }));
        }
        catch (error) {
            console.log("[ADD_USER]", error);
            return res.status(500).json((0, api_response_1.apiResponse)(500, "Internal Server Error"));
        }
    });
}
exports.addUser = addUser;
