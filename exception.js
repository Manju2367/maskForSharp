"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownArgumentsError = void 0;
class UnknownArgumentsError extends Error {
    constructor(message, options) {
        super(message, options);
    }
}
exports.UnknownArgumentsError = UnknownArgumentsError;
