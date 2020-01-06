"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Password {
    static create(value) {
        return bcryptjs_1.default.hash(value, 12);
    }
    static verify(value, hashed) {
        return bcryptjs_1.default.compare(value, hashed);
    }
}
exports.default = Password;
