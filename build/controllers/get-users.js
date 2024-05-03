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
exports.getUsers = void 0;
const User_1 = require("../models/User");
const api_response_1 = require("../lib/api-response");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get all users from the database
            const allUsers = yield User_1.User.find();
            // return the users
            return res.status(200).json((0, api_response_1.apiResponse)(200, "Success", {
                users: allUsers,
            }));
        }
        catch (error) {
            console.log("[GET_USERS]", error);
            return res.status(500).json((0, api_response_1.apiResponse)(500, "Internal Server Error"));
        }
    });
}
exports.getUsers = getUsers;
