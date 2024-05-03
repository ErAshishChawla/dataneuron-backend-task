"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
function apiResponse(status, message, data) {
    return {
        status,
        message,
        data,
        success: status >= 200 && status < 300,
    };
}
exports.apiResponse = apiResponse;
