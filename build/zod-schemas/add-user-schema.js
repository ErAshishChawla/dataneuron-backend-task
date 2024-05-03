"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserSchema = void 0;
const zod_1 = require("zod");
// Matches the following conditions:
// Starts with alphabets.
// Contains only alphabets.
// Has only one space (if present).
// Ends with alphabets.
const fullNameRegex = new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)?$");
exports.AddUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Name is required")
        .regex(fullNameRegex, "Invalid name format"),
});
